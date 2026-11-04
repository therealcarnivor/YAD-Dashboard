import { css, html, nothing, PropertyValues } from "lit";
import { customElement, state } from "lit/decorators.js";
import { widgetStyles } from "../styles";
import type { EntityRef, WidgetConfig } from "../types";
import { addDays, formatTime, normaliseEntities, parseDate, relativeDayLabel, startOfDay } from "../utils";
import { HearthWidget } from "./base";

export interface CalendarConfig extends WidgetConfig {
  type: "calendar";
  entities: EntityRef[];
  days?: number;
  max_events?: number;
  show_location?: boolean;
  refresh_minutes?: number;
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
}

const PALETTE = ["var(--h-accent)", "var(--h-sage)", "var(--h-sky)", "var(--h-amber)", "#b07aa1", "#c9a27e"];

@customElement("hearth-widget-calendar")
export class HearthCalendar extends HearthWidget<CalendarConfig> {
  @state() private _events?: CalEvent[];
  @state() private _error?: string;
  private _timer?: number;
  private _fetchedKey?: string;

  protected watchedEntities(): string[] {
    return normaliseEntities(this.config.entities).map((e) => e.entity);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._fetchedKey = undefined;
    if (this.hass) void this._fetch();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.clearInterval(this._timer);
    this._timer = undefined;
  }

  protected updated(changed: PropertyValues): void {
    const key = JSON.stringify([this.config.entities, this.config.days]);
    if ((changed.has("config") || changed.has("hass")) && this.hass && key !== this._fetchedKey) {
      this._fetchedKey = key;
      void this._fetch();
    }
    if (!this._timer && this.hass) {
      this._timer = window.setInterval(() => void this._fetch(), (this.config.refresh_minutes ?? 5) * 60_000);
    }
  }

  private async _fetch(): Promise<void> {
    if (!this.hass) return;
    const cals = normaliseEntities(this.config.entities);
    const start = startOfDay(new Date());
    const end = addDays(start, this.config.days ?? 7);
    const params = `start=${encodeURIComponent(start.toISOString())}&end=${encodeURIComponent(end.toISOString())}`;
    try {
      const results = await Promise.all(
        cals.map(async (cal, i) => {
          const raw = await this.hass!.callApi<RawEvent[]>("GET", `calendars/${cal.entity}?${params}`);
          return raw.map<CalEvent>((ev) => {
            const allDay = !ev.start.dateTime;
            return {
              summary: ev.summary,
              start: parseDate(ev.start.dateTime ?? ev.start.date!),
              end: parseDate(ev.end.dateTime ?? ev.end.date!),
              allDay,
              location: ev.location,
              color: cal.color ?? PALETTE[i % PALETTE.length],
            };
          });
        }),
      );
      const now = Date.now();
      this._events = results
        .flat()
        .filter((e) => e.end.getTime() > now)
        .sort((a, b) => a.start.getTime() - b.start.getTime() || Number(b.allDay) - Number(a.allDay));
      this._error = undefined;
    } catch (err) {
      this._error = (err as Error)?.message ?? "Could not load calendar";
    }
  }

  private _timeLabel(e: CalEvent): string {
    if (e.allDay) return "All day";
    const fmt = (d: Date) => formatTime(this.hass, d);
    return `${fmt(e.start)} – ${fmt(e.end)}`;
  }

  protected render() {
    const title = this.config.title ?? "Coming up";
    const header = html`<div class="head"><ha-icon icon="mdi:calendar-heart"></ha-icon>${title}</div>`;
    if (this._error) return html`${header}<div class="empty"><ha-icon icon="mdi:calendar-alert"></ha-icon>${this._error}</div>`;
    if (!this._events) return html`${header}<div class="empty">Loading…</div>`;

    const events = this._events.slice(0, this.config.max_events ?? 8);
    if (!events.length) {
      return html`${header}<div class="empty"><ha-icon icon="mdi:sofa-outline"></ha-icon>Nothing planned — enjoy the downtime</div>`;
    }

    const today = startOfDay(new Date());
    const groups = new Map<number, CalEvent[]>();
    for (const e of events) {
      const day = Math.max(startOfDay(e.start).getTime(), today.getTime());
      if (!groups.has(day)) groups.set(day, []);
      groups.get(day)!.push(e);
    }

    return html`
      ${header}
      <div class="list scroll">
        ${[...groups.entries()].map(
          ([day, evs]) => html`
            <div class="day-label ${day === today.getTime() ? "today" : ""}">${relativeDayLabel(this.hass, new Date(day))}</div>
            ${evs.map(
              (e) => html`<div class="event">
                <span class="bar" style="background:${e.color}"></span>
                <div class="body">
                  <div class="summary">${e.summary}</div>
                  <div class="meta muted num">
                    ${this._timeLabel(e)}${this.config.show_location && e.location ? html` · ${e.location}` : nothing}
                  </div>
                </div>
              </div>`,
            )}
          `,
        )}
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
