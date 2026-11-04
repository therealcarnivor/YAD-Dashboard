import { css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { widgetStyles } from "../styles";
import type { WidgetConfig } from "../types";
import { formatTime, lang, use12h } from "../utils";
import { HearthWidget } from "./base";

export interface ClockConfig extends WidgetConfig {
  type: "clock";
  time_format?: "auto" | "12" | "24";
  show_seconds?: boolean;
  show_date?: boolean;
  greeting?: boolean;
  name?: string;
}

const greetingFor = (hour: number): string =>
  hour < 5 ? "Good night" : hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

@customElement("hearth-widget-clock")
export class HearthClock extends HearthWidget<ClockConfig> {
  @state() private _now = new Date();
  private _timer?: number;

  protected watchedEntities(): string[] {
    return [];
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._schedule();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.clearTimeout(this._timer);
  }

  private _schedule(): void {
    const now = new Date();
    this._now = now;
    const delay = this.config?.show_seconds ? 1000 - now.getMilliseconds() : 60_000 - now.getSeconds() * 1000 - now.getMilliseconds();
    this._timer = window.setTimeout(() => this._schedule(), delay + 20);
  }

  protected render() {
    const c = this.config;
    const fmt = c.time_format === "auto" ? undefined : c.time_format;
    const twelve = use12h(this.hass, fmt);
    let time = formatTime(this.hass, this._now, fmt);
    let suffix = "";
    if (twelve) {
      const m = time.match(/^(.*?)\s*([ap]\.?\s?m\.?)$/i);
      if (m) {
        time = m[1];
        suffix = m[2];
      }
    }
    const seconds = String(this._now.getSeconds()).padStart(2, "0");
    const date = new Intl.DateTimeFormat(lang(this.hass), { weekday: "long", day: "numeric", month: "long" }).format(this._now);
    const name = c.name ?? this.hass?.user?.name?.split(" ")[0];

    return html`
      <div class="clock">
        ${c.greeting !== false
          ? html`<div class="greeting">${greetingFor(this._now.getHours())}${name ? html`, <span>${name}</span>` : ""}</div>`
          : ""}
        <div class="time num">
          ${time}${c.show_seconds ? html`<span class="sec">${seconds}</span>` : ""}${suffix
            ? html`<span class="ampm">${suffix}</span>`
            : ""}
        </div>
        ${c.show_date !== false ? html`<div class="date">${date}</div>` : ""}
      </div>
    `;
  }

  static styles = [
    widgetStyles,
    css`
      .clock {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.4cqh;
        min-height: 0;
      }
      .greeting {
        font-size: clamp(1rem, 14cqh, 1.8rem);
        font-weight: 600;
        color: var(--h-muted);
      }
      .greeting span {
        color: var(--h-accent);
      }
      .time {
        font-size: clamp(2.5rem, min(58cqh, 26cqw), 10rem);
        font-weight: 300;
        line-height: 1;
        letter-spacing: -0.03em;
      }
      .sec,
      .ampm {
        font-size: 0.32em;
        font-weight: 500;
        color: var(--h-muted);
        margin-left: 0.25em;
        letter-spacing: 0;
      }
      .date {
        font-size: clamp(1rem, 14cqh, 2rem);
        font-weight: 600;
      }
    `,
  ];
}
