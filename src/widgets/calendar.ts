import { css, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { widgetStyles } from "../styles";
import type { EntityRef, WidgetConfig } from "../types";
import { addDays, entityName, formatTime, normaliseEntities, parseDate, relativeDayLabel, startOfDay } from "../utils";
import { YadWidget } from "./base";

export interface CalendarConfig extends WidgetConfig {
  type: "calendar";
  entities: EntityRef[];
  days?: number;
  max_events?: number;
  show_location?: boolean;
  refresh_minutes?: number;
  show_weekends?: boolean;
  highlight_weekends?: boolean;
  show_calendar_badge?: boolean;
  day_position?: "top" | "left" | "right";
  time_position?: "below" | "right";
}

interface RawEvent {
  summary: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
  location?: string;
}

interface CalEvent {
  summary: string;
  start: Date;
  end: Date;
  allDay: boolean;
  location?: string;
  color: string;
  calendarName: string;
  calendarIcon?: string;
}

const PALETTE = ["var(--h-accent)", "var(--h-sage)", "var(--h-sky)", "var(--h-amber)", "#b07aa1", "#c9a27e"];

const CACHE_PREFIX = "yad-calendar:";
/** A fetch started by another tab or an earlier page load is trusted to finish within this window. */
const PENDING_MS = 3 * 60_000;
const FAILURE_BACKOFF_MS = 2 * 60_000;
const REQUEST_TIMEOUT_MS = 15_000;
/** Lets a refresh timer that fires just before the cache expires still fetch. */
const FRESHNESS_SLACK_MS = 30_000;

type StoredEvent = Omit<CalEvent, "start" | "end"> & { start: string; end: string };

interface PendingRequest {
  promise: Promise<RawEvent[]>;
  timedOut: boolean;
  params: string;
}

// callApi cannot be cancelled. Do not start another request for a timed-out calendar
// in this page until the original request settles.
const pendingRequests = new Map<string, PendingRequest>();

interface CalendarCache {
  day: string;
  fetchedAt?: number;
  pendingSince?: number;
  failedAt?: number;
  events?: StoredEvent[];
  calendars?: (StoredEvent[] | null)[];
  calendarFetchedAt?: (number | null)[];
  errors?: string[];
}

/**
 * Calendar results shared through localStorage so page reloads, kiosk refreshes and other
 * tabs reuse recent events instead of hitting Home Assistant (and remote CalDAV servers) again.
 */
const readCache = (key: string): CalendarCache | undefined => {
  try {
    const raw = window.localStorage.getItem(CACHE_PREFIX + key);
    return raw ? (JSON.parse(raw) as CalendarCache) : undefined;
  } catch {
    return undefined;
  }
};

const writeCache = (key: string, value: CalendarCache): void => {
  try {
    window.localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable: fall back to in-memory behaviour.
  }
};

const toStored = (events: CalEvent[]): StoredEvent[] =>
  events.map((e) => ({ ...e, start: e.start.toISOString(), end: e.end.toISOString() }));

const fromStored = (events: StoredEvent[]): CalEvent[] =>
  events.map((e) => ({ ...e, start: new Date(e.start), end: new Date(e.end) }));

@customElement("yad-widget-calendar")
export class YadCalendar extends YadWidget<CalendarConfig> {
  @state() private _events?: CalEvent[];
  @state() private _unavailable = false;
  private _timer?: number;
  private _timerMinutes?: number;
  private _fetchedKey?: string;
  private _inflight = false;
  private _lastFetch = 0;
  private _retryTimer?: number;

  private _scheduleRetry(delay = 15_000): void {
    if (this._retryTimer) return;
    this._retryTimer = window.setTimeout(() => {
      this._retryTimer = undefined;
      void this._fetch();
    }, delay);
  }

  protected watchedEntities(): string[] {
    return normaliseEntities(this.config.entities).map((e) => e.entity);
  }

  connectedCallback(): void {
    super.connectedCallback();
    // updated() performs the single initial fetch.
    this._fetchedKey = undefined;
    document.addEventListener("visibilitychange", this._onVisibility);
    this.requestUpdate();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener("visibilitychange", this._onVisibility);
    window.clearInterval(this._timer);
    this._timer = undefined;
    window.clearTimeout(this._retryTimer);
    this._retryTimer = undefined;
  }

  private _onVisibility = (): void => {
    if (!document.hidden && Date.now() - this._lastFetch > this._refreshMinutes() * 60_000) void this._fetch();
  };

  private _refreshMinutes(): number {
    return Math.max(1, Number(this.config.refresh_minutes) || 10);
  }

  protected updated(): void {
    if (!this.hass) return;
    const key = JSON.stringify([this.config.entities, this.config.days]);
    if (key !== this._fetchedKey) {
      this._fetchedKey = key;
      this._events = undefined;
      this._unavailable = false;
      void this._fetch(true);
    }
    const minutes = this._refreshMinutes();
    if (!this._timer || minutes !== this._timerMinutes) {
      window.clearInterval(this._timer);
      this._timerMinutes = minutes;
      this._timer = window.setInterval(() => void this._fetch(), minutes * 60_000);
    }
  }

  private _applyEvents(events: CalEvent[]): void {
    const now = Date.now();
    this._events = events
      .filter((e) => e.end.getTime() > now)
      .sort((a, b) => a.start.getTime() - b.start.getTime() || Number(b.allDay) - Number(a.allDay));
  }

  private async _fetchCalendar(entity: string, params: string): Promise<RawEvent[]> {
    let request = pendingRequests.get(entity);
    if (request?.timedOut) throw new Error("previous request is still pending");
    if (request && request.params !== params) throw new Error("another request is still pending");
    if (!request) {
      const promise = this.hass!.callApi<RawEvent[]>("GET", `calendars/${entity}?${params}`);
      request = { promise, timedOut: false, params };
      pendingRequests.set(entity, request);
      const current = request;
      void promise.then(
        () => { if (pendingRequests.get(entity) === current) pendingRequests.delete(entity); },
        () => { if (pendingRequests.get(entity) === current) pendingRequests.delete(entity); },
      );
    }
    const current = request;
    let timer: number | undefined;
    try {
      return await Promise.race([
        current.promise,
        new Promise<never>((_, reject) => {
          timer = window.setTimeout(() => {
            current.timedOut = true;
            reject(new Error("request timed out"));
          }, REQUEST_TIMEOUT_MS);
        }),
      ]);
    } finally {
      window.clearTimeout(timer);
    }
  }

  private async _fetch(force = false): Promise<void> {
    if (!this.hass || this._inflight) return;
    if (!force && document.hidden) return;
    const cals = normaliseEntities(this.config.entities);
    const configKey = JSON.stringify([this.config.entities, this.config.days]);
    const start = startOfDay(new Date());
    const end = addDays(start, this.config.days ?? 7);
    const day = start.toISOString();
    const cacheKey = JSON.stringify([cals, this.config.days ?? 7]);
    const now = Date.now();
    const cached = readCache(cacheKey);
    const sameDay = cached?.day === day;
    if (sameDay && cached.events) {
      this._applyEvents(fromStored(cached.events));
      this._unavailable = false;
    } else if (sameDay && cached.errors?.length) {
      this._events = undefined;
      this._unavailable = true;
    }
    if (sameDay) {
      const fresh = cached.fetchedAt !== undefined && now - cached.fetchedAt < this._refreshMinutes() * 60_000 - FRESHNESS_SLACK_MS;
      const pending = cached.pendingSince !== undefined && now - cached.pendingSince < PENDING_MS;
      const backingOff = cached.failedAt !== undefined && now - cached.failedAt < FAILURE_BACKOFF_MS;
      if (fresh || pending || backingOff) {
        this._lastFetch = cached.fetchedAt ?? now;
        // Pick up another tab's (or an interrupted page load's) results once they land.
        if (pending && !fresh) this._scheduleRetry();
        else if (backingOff) this._scheduleRetry(Math.max(1, FAILURE_BACKOFF_MS - (now - cached.failedAt!)));
        return;
      }
    }
    this._inflight = true;
    this._lastFetch = now;
    writeCache(cacheKey, { ...(sameDay ? cached : {}), day, pendingSince: now });
    const params = `start=${encodeURIComponent(start.toISOString())}&end=${encodeURIComponent(end.toISOString())}`;
    try {
      // Sequential on purpose: remote (e.g. CalDAV) calendars each tie up an HA worker thread.
      const results: (StoredEvent[] | null)[] = cals.map((_, i) => sameDay ? cached.calendars?.[i] ?? null : null);
      const fetchedAt: (number | null)[] = cals.map((_, i) => sameDay ? cached.calendarFetchedAt?.[i] ?? null : null);
      const errors: string[] = [];
      for (const [i, cal] of cals.entries()) {
        if (!this.hass || !this.isConnected || this._fetchedKey !== configKey) {
          writeCache(cacheKey, { ...(sameDay ? cached : {}), day, pendingSince: undefined });
          return;
        }
        if (cached?.errors?.length && fetchedAt[i] !== null &&
            now - fetchedAt[i]! < this._refreshMinutes() * 60_000 - FRESHNESS_SLACK_MS) continue;
        try {
          const raw = await this._fetchCalendar(cal.entity, params);
          const events = raw.map<CalEvent>((ev) => ({
            summary: ev.summary,
            start: parseDate(ev.start.dateTime ?? ev.start.date!),
            end: parseDate(ev.end.dateTime ?? ev.end.date!),
            allDay: !ev.start.dateTime,
            location: ev.location,
            color: cal.color ?? PALETTE[i % PALETTE.length],
            calendarName: entityName(this.hass?.states[cal.entity], cal.name, cal.entity),
            calendarIcon: cal.icon,
          }));
          results[i] = toStored(events);
          fetchedAt[i] = Date.now();
        } catch (err) {
          const message = err && typeof err === "object" && "message" in err ? String(err.message) : String(err);
          errors.push(`${cal.entity}: ${message}`);
          console.warn(`Could not load calendar ${cal.entity}:`, err);
          // A stale successful result may be displayed, but must be retried.
          fetchedAt[i] = null;
        }
        if (!this.isConnected || this._fetchedKey !== configKey) {
          writeCache(cacheKey, { ...(sameDay ? cached : {}), day, pendingSince: undefined });
          return;
        }
        if (results.some((events) => events !== null)) {
          const events = results.flatMap((events) => events ?? []);
          this._applyEvents(fromStored(events));
          this._unavailable = false;
          writeCache(cacheKey, { day, pendingSince: now, events, calendars: results, calendarFetchedAt: fetchedAt, errors });
        }
      }
      const hasEvents = results.some((events) => events !== null) || cals.length === 0;
      const events = results.flatMap((items) => items ?? []);
      writeCache(cacheKey, {
        day, events: hasEvents ? events : undefined, calendars: results, calendarFetchedAt: fetchedAt, errors,
        ...(errors.length ? { failedAt: Date.now() } : { fetchedAt: Date.now() }),
      });
      if (hasEvents) {
        this._applyEvents(fromStored(events));
        this._unavailable = false;
      } else {
        this._events = undefined;
        this._unavailable = true;
      }
      if (errors.length) this._scheduleRetry(FAILURE_BACKOFF_MS);
    } finally {
      this._inflight = false;
      if (this.isConnected && this._fetchedKey !== configKey) void this._fetch(true);
    }
  }

  private _timeLabel(e: CalEvent): string {
    if (e.allDay) return "All day";
    const fmt = (d: Date) => formatTime(this.hass, d);
    return `${fmt(e.start)} – ${fmt(e.end)}`;
  }

  private _displayDay(e: CalEvent, today: Date): Date | undefined {
    let day = new Date(Math.max(startOfDay(e.start).getTime(), today.getTime()));
    if (this.config.show_weekends === false) {
      while (day.getDay() === 0 || day.getDay() === 6) day = addDays(day, 1);
    }
    return day < e.end && day < addDays(today, this.config.days ?? 7) ? day : undefined;
  }

  protected render() {
    const title = this.config.title ?? "Coming up";
    const header = html`<div class="head"><ha-icon icon="mdi:calendar-heart"></ha-icon>${title}</div>`;
    if (this._unavailable) return html`${header}<div class="empty">No calendar events available</div>`;
    if (!this._events) return html`${header}<div class="empty">Loading…</div>`;

    const today = startOfDay(new Date());
    const events = this._events.filter((e) => this._displayDay(e, today)).slice(0, this.config.max_events ?? 8);
    if (!events.length) return html`${header}<div class="empty"><ha-icon icon="mdi:sofa-outline"></ha-icon>Nothing planned — enjoy the downtime</div>`;

    const groups = new Map<number, CalEvent[]>();
    for (const e of events) {
      const day = this._displayDay(e, today)!.getTime();
      if (!groups.has(day)) groups.set(day, []);
      groups.get(day)!.push(e);
    }

    return html`
      ${header}
      <div class="list scroll ${this.config.day_position === "left" || this.config.day_position === "right" ? `day-${this.config.day_position}` : "day-top"}">
        ${[...groups.entries()].map(([day, evs]) => {
          const weekend = !!this.config.highlight_weekends && [0, 6].includes(new Date(day).getDay());
          return html`
            <div class="day">
              <div class="day-label ${day === today.getTime() ? "today" : ""} ${weekend ? "weekend" : ""}">${relativeDayLabel(this.hass, new Date(day))}${weekend ? html`<ha-icon icon="mdi:sofa-outline" aria-label="Weekend"></ha-icon>` : nothing}</div>
              <div class="day-events">
                ${evs.map(
                  (e) => html`<div class="event ${weekend ? "weekend" : ""}">
                    <span class="bar ${this.config.show_calendar_badge !== false ? "badge" : ""}" style="background:${e.color}" title=${e.calendarName} aria-label=${e.calendarName}>
                      ${this.config.show_calendar_badge === false ? nothing : e.calendarIcon
                        ? html`<ha-icon icon=${e.calendarIcon}></ha-icon>`
                        : Array.from(e.calendarName)[0]?.toLocaleUpperCase()}
                    </span>
                    <div class="body">
                      <div class="summary">${e.summary}</div>
                      ${this.config.time_position === "right"
                        ? this.config.show_location && e.location ? html`<div class="meta muted">${e.location}</div>` : nothing
                        : html`<div class="meta muted num">${this._timeLabel(e)}${this.config.show_location && e.location ? html` · ${e.location}` : nothing}</div>`}
                    </div>
                    ${this.config.time_position === "right" ? html`<div class="event-time muted num">${this._timeLabel(e)}</div>` : nothing}
                  </div>`,
                )}
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }

  static styles = [
    widgetStyles,
    css`
      .list {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 8px;
        mask-image: linear-gradient(to bottom, #000 85%, transparent);
        padding-bottom: 16px;
      }
      :host([auto-height]) .list { mask-image: none; padding-bottom: 0; }
      .day, .day-events {
        display: flex;
        flex-direction: column;
        gap: 8px;
        min-width: 0;
      }
      .day-left .day, .day-right .day {
        display: grid;
        grid-template-columns: minmax(0, min(7rem, 28%)) minmax(0, 1fr);
        align-items: start;
      }
      .day-right .day { grid-template-columns: minmax(0, 1fr) minmax(0, min(7rem, 28%)); }
      .day-right .day-label { grid-column: 2; grid-row: 1; text-align: right; justify-content: flex-end; }
      .day-right .day-events { grid-column: 1; grid-row: 1; }
      .day-left .day-label, .day-right .day-label { margin-top: 0; overflow-wrap: anywhere; }
      .day-label {
        font-size: 0.8rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--h-muted);
        margin-top: 6px;
      }
      .day-label.today {
        color: var(--h-accent);
      }
      .day-label.weekend { color: var(--h-accent); display: flex; align-items: center; gap: 8px; }
      .day-label.weekend ha-icon { --mdc-icon-size: 16px; }
      .event.weekend {
        background: color-mix(in srgb, var(--h-accent) 8%, var(--h-surface-2));
        box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--h-accent) 28%, var(--h-surface-2));
      }
      .day:first-child .day-label {
        margin-top: 0;
      }
      .event {
        display: flex;
        gap: 12px;
        align-items: stretch;
        padding: 10px 12px;
        border-radius: var(--h-radius-sm);
        background: var(--h-surface-2);
      }
      .bar {
        width: 5px;
        border-radius: 4px;
        flex: none;
      }
      .bar.badge { width: 26px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.8rem; color: #fff; text-shadow: 0 1px 3px #000; }
      .bar ha-icon { --mdc-icon-size: 18px; }
      .body {
        min-width: 0;
        flex: 1;
      }
      .summary {
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .meta {
        font-size: 0.85rem;
        font-weight: 600;
        margin-top: 2px;
        overflow-wrap: anywhere;
      }
      .event-time { font-size: 0.85rem; font-weight: 600; text-align: right; max-width: 45%; }
    `,
  ];
}
