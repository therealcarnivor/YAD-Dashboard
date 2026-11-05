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
/** Lets a refresh timer that fires just before the cache expires still fetch. */
const FRESHNESS_SLACK_MS = 30_000;

type StoredEvent = Omit<CalEvent, "start" | "end"> & { start: string; end: string };

interface CalendarCache {
  day: string;
  fetchedAt?: number;
  pendingSince?: number;
  failedAt?: number;
  events?: StoredEvent[];
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
  @state() private _error?: string;
  private _timer?: number;
  private _timerMinutes?: number;
  private _fetchedKey?: string;
  private _inflight = false;
  private _lastFetch = 0;
  private _retryTimer?: number;

  private _scheduleRetry(): void {
    if (this._retryTimer) return;
    this._retryTimer = window.setTimeout(() => {
      this._retryTimer = undefined;
      void this._fetch(true);
    }, 15_000);
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

  private async _fetch(force = false): Promise<void> {
    if (!this.hass || this._inflight) return;
    if (!force && document.hidden) return;
    const cals = normaliseEntities(this.config.entities);
    const start = startOfDay(new Date());
    const end = addDays(start, this.config.days ?? 7);
    const day = start.toISOString();
    const cacheKey = JSON.stringify([cals, this.config.days ?? 7]);
    const now = Date.now();
    const cached = readCache(cacheKey);
    const sameDay = cached?.day === day;
    if (sameDay && cached.events) this._applyEvents(fromStored(cached.events));
    if (sameDay) {
      const fresh = cached.fetchedAt !== undefined && now - cached.fetchedAt < this._refreshMinutes() * 60_000 - FRESHNESS_SLACK_MS;
      const pending = cached.pendingSince !== undefined && now - cached.pendingSince < PENDING_MS;
      const backingOff = cached.failedAt !== undefined && now - cached.failedAt < FAILURE_BACKOFF_MS;
      if (fresh || pending || backingOff) {
        this._lastFetch = cached.fetchedAt ?? now;
        if (cached.events) this._error = undefined;
        // Pick up another tab's (or an interrupted page load's) results once they land.
        if (pending && !fresh) this._scheduleRetry();
        return;
      }
    }
    this._inflight = true;
    this._lastFetch = now;
    writeCache(cacheKey, { ...(sameDay ? cached : {}), day, pendingSince: now });
    const params = `start=${encodeURIComponent(start.toISOString())}&end=${encodeURIComponent(end.toISOString())}`;
    try {
      // Sequential on purpose: remote (e.g. CalDAV) calendars each tie up an HA worker thread.
      const results: CalEvent[][] = [];
      for (const [i, cal] of cals.entries()) {
        if (!this.hass || !this.isConnected) {
          writeCache(cacheKey, { ...(sameDay ? cached : {}), day, pendingSince: undefined });
          return;
        }
        const raw = await this.hass.callApi<RawEvent[]>("GET", `calendars/${cal.entity}?${params}`);
        results.push(
          raw.map<CalEvent>((ev) => ({
            summary: ev.summary,
            start: parseDate(ev.start.dateTime ?? ev.start.date!),
            end: parseDate(ev.end.dateTime ?? ev.end.date!),
            allDay: !ev.start.dateTime,
            location: ev.location,
            color: cal.color ?? PALETTE[i % PALETTE.length],
            calendarName: entityName(this.hass?.states[cal.entity], cal.name, cal.entity),
            calendarIcon: cal.icon,
          })),
        );
      }
      const events = results.flat();
      writeCache(cacheKey, { day, fetchedAt: Date.now(), events: toStored(events) });
      this._applyEvents(events);
      this._error = undefined;
    } catch (err) {
      writeCache(cacheKey, { ...(sameDay ? cached : {}), day, pendingSince: undefined, failedAt: Date.now() });
      this._error = (err as Error)?.message ?? "Could not load calendar";
    } finally {
      this._inflight = false;
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
    if (this._error) return html`${header}<div class="empty"><ha-icon icon="mdi:calendar-alert"></ha-icon>${this._error}</div>`;
    if (!this._events) return html`${header}<div class="empty">Loading…</div>`;

    const today = startOfDay(new Date());
    const events = this._events.filter((e) => this._displayDay(e, today)).slice(0, this.config.max_events ?? 8);
    if (!events.length) {
      return html`${header}<div class="empty"><ha-icon icon="mdi:sofa-outline"></ha-icon>Nothing planned — enjoy the downtime</div>`;
    }

    const groups = new Map<number, CalEvent[]>();
    for (const e of events) {
      const day = this._displayDay(e, today)!.getTime();
      if (!groups.has(day)) groups.set(day, []);
      groups.get(day)!.push(e);
    }

    return html`
      ${header}
      <div class="list scroll">
        ${[...groups.entries()].map(([day, evs]) => {
          const weekend = !!this.config.highlight_weekends && [0, 6].includes(new Date(day).getDay());
          return html`
            <div class="day-label ${day === today.getTime() ? "today" : ""} ${weekend ? "weekend" : ""}">${relativeDayLabel(this.hass, new Date(day))}${weekend ? html`<ha-icon icon="mdi:sofa-outline" aria-label="Weekend"></ha-icon>` : nothing}</div>
            ${evs.map(
              (e) => html`<div class="event ${weekend ? "weekend" : ""}">
                <span class="bar ${this.config.show_calendar_badge !== false ? "badge" : ""}" style="background:${e.color}" title=${e.calendarName} aria-label=${e.calendarName}>
                  ${this.config.show_calendar_badge === false ? nothing : e.calendarIcon
                    ? html`<ha-icon icon=${e.calendarIcon}></ha-icon>`
                    : Array.from(e.calendarName)[0]?.toLocaleUpperCase()}
                </span>
                <div class="body">
                  <div class="summary">${e.summary}</div>
                  <div class="meta muted num">
                    ${this._timeLabel(e)}${this.config.show_location && e.location ? html` · ${e.location}` : nothing}
                  </div>
                </div>
              </div>`,
            )}
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
      .day-label:first-child {
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
      }
    `,
  ];
}
