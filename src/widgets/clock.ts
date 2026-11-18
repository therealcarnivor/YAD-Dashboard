import { css, html, nothing, type PropertyValues } from "lit";
import { customElement, state } from "lit/decorators.js";
import { widgetStyles } from "../styles";
import type { EntityRef, WidgetConfig } from "../types";
import { capitalise, entityName, formatTime, lang, normaliseEntities, openMoreInfo, use12h } from "../utils";
import { YadWidget } from "./base";

export interface ClockConfig extends WidgetConfig {
  type: "clock";
  /** Set to false to show only the people. */
  show_clock?: boolean;
  /** People shown beside the clock. */
  entities?: EntityRef[];
  show_state?: boolean;
  /** Which side the clock sits on; the people take the other side. */
  clock_position?: "left" | "right";
  time_format?: "auto" | "12" | "24";
  show_seconds?: boolean;
  show_date?: boolean;
  greeting?: boolean;
  /** Include a name in the greeting ("Good morning, Sam") or just "Good morning". */
  greet_by_name?: boolean;
  /** Name to greet; defaults to the logged-in Home Assistant user. */
  name?: string;
}

const initials = (name: string): string =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p.charAt(0).toUpperCase())
    .join("");

const PEOPLE_GAP = 12;
const MAX_AVATAR = 140;
const MIN_AVATAR = 28;

/** Picks the column count that gives the largest avatars that still fit n people in the box. */
const fitPeople = (n: number, width: number, height: number, labelFactor: number): { cols: number; size: number } => {
  let best = { cols: n, size: MIN_AVATAR };
  let bestSize = -1;
  for (let cols = 1; cols <= n; cols++) {
    const rows = Math.ceil(n / cols);
    const cellW = (width - (cols - 1) * PEOPLE_GAP) / cols;
    const cellH = Number.isFinite(height) ? (height - (rows - 1) * PEOPLE_GAP) / rows : Infinity;
    const size = Math.min(cellW * 0.9, cellH / labelFactor, MAX_AVATAR);
    if (size > bestSize + 0.5) {
      bestSize = size;
      best = { cols, size: Math.max(MIN_AVATAR, size) };
    }
  }
  return best;
};

const greetingFor = (hour: number): string =>
  hour < 5 ? "Good night" : hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

@customElement("yad-widget-clock")
export class YadClock extends YadWidget<ClockConfig> {
  @state() private _now = new Date();
  @state() private _box = { w: 0, h: 0 };
  private _timer?: number;
  private _observer = new ResizeObserver((entries) => {
    const r = entries[0]?.contentRect;
    if (!r) return;
    const w = Math.round(r.width);
    const h = Math.round(r.height);
    if (w !== this._box.w || h !== this._box.h) this._box = { w, h };
  });
  private _observed?: Element;

  protected watchedEntities(): string[] {
    return normaliseEntities(this.config?.entities).map((e) => e.entity);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._schedule();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.clearTimeout(this._timer);
    this._observer.disconnect();
    this._observed = undefined;
  }

  protected updated(_changed: PropertyValues): void {
    const el = this.renderRoot.querySelector(".people-area") ?? undefined;
    if (el === this._observed) return;
    this._observer.disconnect();
    this._observed = el;
    if (el) this._observer.observe(el);
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
    const name = c.greet_by_name === false ? undefined : c.name || this.hass?.user?.name?.split(" ")[0];

    const people = normaliseEntities(c.entities);
    const showClock = c.show_clock !== false;
    return html`
      <div class="wrap ${c.clock_position === "right" ? "clock-right" : ""}">
        ${showClock
          ? html`<div class="clock">
              ${c.greeting !== false
                ? html`<div class="greeting">${greetingFor(this._now.getHours())}${name ? html`, <span>${name}</span>` : ""}</div>`
                : ""}
              <div class="time num">
                ${time}${c.show_seconds ? html`<span class="sec">${seconds}</span>` : ""}${suffix
                  ? html`<span class="ampm">${suffix}</span>`
                  : ""}
              </div>
              ${c.show_date !== false ? html`<div class="date">${date}</div>` : ""}
            </div>`
          : nothing}
        ${people.length ? this._renderPeople(people, showClock) : nothing}
      </div>
    `;
  }

  private _renderPeople(people: ReturnType<typeof normaliseEntities>, beside: boolean) {
    const showState = this.config.show_state !== false;
    const height = this.autoHeight ? Infinity : this._box.h;
    const fit = this._box.w > 0 && height > 0
      ? fitPeople(people.length, this._box.w, height, showState ? 1.6 : 1.4)
      : { cols: people.length, size: 48 };
    return html`<div class="people-area ${beside ? "beside" : ""}">
      ${this.config.title ? html`<div class="head"><ha-icon icon="mdi:home-account"></ha-icon>${this.config.title}</div>` : nothing}
      <div class="people-box">
        <div class="people" style="--size:${fit.size.toFixed(1)}px;--pcols:${fit.cols}">
          ${people.map((p) => {
            const s = this.hass?.states[p.entity];
            const name = entityName(s, p.name, p.entity);
            const home = s?.state === "home";
            const away = s?.state === "not_home";
            const label = home ? "Home" : away ? "Away" : s ? capitalise(this.hass?.formatEntityState?.(s) ?? s.state) : "Unknown";
            const pic: string | undefined = s?.attributes.entity_picture;
            return html`<div class="person ${home ? "home" : "away"}" @click=${() => !this.displayOnly && openMoreInfo(this, p.entity)}>
              <div class="avatar">
                ${pic ? html`<img src=${pic} alt="" />` : html`<span>${initials(name)}</span>`}
                <span class="dot"></span>
              </div>
              <div class="name">${name.split(" ")[0]}</div>
              ${showState ? html`<div class="state">${label}</div>` : nothing}
            </div>`;
          })}
        </div>
      </div>
    </div>`;
  }

  static styles = [
    widgetStyles,
    css`
      .wrap {
        flex: 1;
        display: flex;
        gap: 16px;
        min-height: 0;
        min-width: 0;
      }
      .wrap.clock-right { flex-direction: row-reverse; }
      .people-area {
        flex: 1 1 0;
        min-width: 0;
        min-height: 0;
        display: flex;
        flex-direction: column;
      }
      .people-area.beside { flex: 2 1 0; }
      .people-box {
        flex: 1;
        min-height: 0;
        position: relative;
      }
      .people {
        position: absolute;
        inset: 0;
        display: grid;
        grid-template-columns: repeat(var(--pcols), minmax(0, 1fr));
        grid-auto-rows: 1fr;
        gap: ${PEOPLE_GAP}px;
        place-items: center;
      }
      :host([auto-height]) .people { position: static; }
      .person {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: calc(var(--size) * 0.05);
        cursor: pointer;
        min-width: 0;
        max-width: 100%;
      }
      .avatar {
        width: var(--size);
        height: var(--size);
        border-radius: 50%;
        position: relative;
        display: grid;
        place-items: center;
        background: var(--h-accent-soft);
        color: var(--h-accent);
        font-weight: 800;
        font-size: calc(var(--size) * 0.36);
      }
      .avatar img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
      .away .avatar img,
      .away .avatar span:first-child {
        filter: grayscale(0.8);
        opacity: 0.6;
      }
      .dot {
        position: absolute;
        right: 2%;
        bottom: 2%;
        width: 26%;
        height: 26%;
        border-radius: 50%;
        background: var(--h-muted);
        border: max(2px, calc(var(--size) * 0.04)) solid var(--h-surface);
      }
      .home .dot { background: var(--h-sage); }
      .name {
        font-weight: 800;
        font-size: max(11px, calc(var(--size) * 0.2));
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .state {
        font-size: max(10px, calc(var(--size) * 0.16));
        font-weight: 700;
        color: var(--h-muted);
      }
      .home .state { color: var(--h-sage); }
      .clock {
        flex: 3 1 0;
        min-width: 0;
        container-type: inline-size;
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
      :host([auto-height]) .clock { gap: 6px; }
      :host([auto-height]) .greeting,
      :host([auto-height]) .date { font-size: clamp(1rem, 4cqw, 1.4rem); }
      :host([auto-height]) .time { font-size: clamp(2.5rem, 20cqw, 6rem); }
    `,
  ];
}
