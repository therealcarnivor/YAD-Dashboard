import { css, html, nothing, svg } from "lit";
import { customElement, state } from "lit/decorators.js";
import { widgetStyles } from "../styles";
import type { HassEntity, WidgetConfig } from "../types";
import { formatNumber, formatState, isUnavailable, numericState, openMoreInfo } from "../utils";
import { YadWidget } from "./base";

export interface EnergyConfig extends WidgetConfig {
  type: "energy";
  power_entity?: string;
  solar_power_entity?: string;
  battery_entity?: string;
  today_entity?: string;
  solar_today_entity?: string;
  cost_entity?: string;
  show_graph?: boolean;
  hours_to_show?: number;
}

type HistoryResponse = Record<string, Array<{ s: string; lu: number }>>;
type StatisticsResponse = Record<string, Array<{ start: number; mean?: number | null }>>;

const BUCKETS = 48;
const REFRESH_MS = 5 * 60_000;

/** Returns [value, unit] scaled to kW when the sensor reports large W values. */
const powerParts = (hass: any, stateObj?: HassEntity): [string, string] => {
  const n = numericState(stateObj);
  if (n === undefined || !stateObj) return ["–", ""];
  const unit: string = stateObj.attributes.unit_of_measurement ?? "W";
  if (unit === "W" && Math.abs(n) >= 1000) return [formatNumber(hass, n / 1000, 2), "kW"];
  return [formatNumber(hass, n, unit === "W" ? 0 : 2), unit];
};

@customElement("yad-widget-energy")
export class YadEnergy extends YadWidget<EnergyConfig> {
  @state() private _series?: number[];
  private _timer?: number;
  private _fetchedKey?: string;
  private _inflight = false;
  private _lastFetch = 0;

  protected watchedEntities(): string[] {
    const c = this.config;
    return [c.power_entity, c.solar_power_entity, c.battery_entity, c.today_entity, c.solar_today_entity, c.cost_entity].filter(
      (e): e is string => !!e,
    );
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
  }

  private _onVisibility = (): void => {
    if (!document.hidden && Date.now() - this._lastFetch > REFRESH_MS) void this._fetchHistory();
  };

  protected updated(): void {
    if (this.config.show_graph === false || !this.config.power_entity || !this.hass) return;
    const key = `${this.config.power_entity}|${this.config.hours_to_show}`;
    if (key !== this._fetchedKey) {
      this._fetchedKey = key;
      void this._fetchHistory(true);
    }
    if (!this._timer) this._timer = window.setInterval(() => void this._fetchHistory(), REFRESH_MS);
  }

  private async _fetchHistory(force = false): Promise<void> {
    const entity = this.config.power_entity;
    if (!this.hass || !entity || this.config.show_graph === false || this._inflight) return;
    if (!force && document.hidden) return;
    this._inflight = true;
    this._lastFetch = Date.now();
    const hours = this.config.hours_to_show ?? 24;
    const end = new Date();
    const start = new Date(end.getTime() - hours * 3_600_000);
    try {
      let points = await this._fetchStatistics(entity, start, end);
      // Sensors without a state_class have no statistics; fall back to raw history.
      if (!points.length) {
        const res = await this.hass.callWS<HistoryResponse>({
          type: "history/history_during_period",
          start_time: start.toISOString(),
          end_time: end.toISOString(),
          entity_ids: [entity],
          minimal_response: true,
          no_attributes: true,
        });
        points = (res[entity] ?? [])
          .map((p) => ({ t: p.lu * 1000, v: Number(p.s) }))
          .filter((p) => Number.isFinite(p.v));
      }
      this._series = this._bucket(points, start.getTime(), end.getTime());
    } catch {
      this._series = undefined;
    } finally {
      this._inflight = false;
    }
  }

  /** 5-minute long-term statistics: at most 12 rows per hour regardless of how often the sensor updates. */
  private async _fetchStatistics(entity: string, start: Date, end: Date): Promise<{ t: number; v: number }[]> {
    try {
      const res = await this.hass!.callWS<StatisticsResponse>({
        type: "recorder/statistics_during_period",
        start_time: start.toISOString(),
        end_time: end.toISOString(),
        statistic_ids: [entity],
        period: "5minute",
        types: ["mean"],
      });
      return (res[entity] ?? [])
        .filter((p): p is { start: number; mean: number } => typeof p.mean === "number" && Number.isFinite(p.mean))
        .map((p) => ({ t: p.start, v: p.mean }));
    } catch {
      return [];
    }
  }

  /** Time-weighted step averaging into fixed buckets so the sparkline is smooth and even. */
  private _bucket(points: { t: number; v: number }[], start: number, end: number): number[] {
    if (!points.length) return [];
    const size = (end - start) / BUCKETS;
    const out: number[] = [];
    let idx = 0;
    let current = points[0].v;
    for (let b = 0; b < BUCKETS; b++) {
      const bStart = start + b * size;
      const bEnd = bStart + size;
      let acc = 0;
      let cursor = bStart;
      while (idx < points.length && points[idx].t < bEnd) {
        const t = Math.max(points[idx].t, bStart);
        acc += current * (t - cursor);
        cursor = t;
        current = points[idx].v;
        idx++;
      }
      acc += current * (bEnd - cursor);
      out.push(acc / size);
    }
    return out;
  }

  private _sparkline(values: number[]) {
    const w = 300;
    const h = 100;
    const max = Math.max(...values, 1);
    const min = Math.min(...values, 0);
    const range = max - min || 1;
    const pts = values.map((v, i) => [(i / (values.length - 1)) * w, h - ((v - min) / range) * (h - 8) - 4]);
    let d = `M ${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1];
      const [x1, y1] = pts[i];
      const cx = (x0 + x1) / 2;
      d += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`;
    }
    return svg`
      <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" class="spark">
        <defs>
          <linearGradient id="yad-energy-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="var(--h-accent)" stop-opacity="0.35"></stop>
            <stop offset="100%" stop-color="var(--h-accent)" stop-opacity="0"></stop>
          </linearGradient>
        </defs>
        <path d="${d} L ${w} ${h} L 0 ${h} Z" fill="url(#yad-energy-fill)"></path>
        <path d=${d} fill="none" stroke="var(--h-accent)" stroke-width="2.5" vector-effect="non-scaling-stroke" stroke-linecap="round"></path>
      </svg>`;
  }

  private _stat(icon: string, label: string, entity?: string, tone = "") {
    if (!entity) return nothing;
    const stateObj = this.hass?.states[entity];
    const value = isUnavailable(stateObj)
      ? "–"
      : entity === this.config.solar_power_entity
        ? powerParts(this.hass, stateObj).join(" ")
        : formatState(this.hass, stateObj);
    return html`<div class="stat ${tone}" @click=${() => !this.displayOnly && openMoreInfo(this, entity)}>
      <ha-icon icon=${icon}></ha-icon>
      <div>
        <div class="stat-value num">${value}</div>
        <div class="stat-label">${label}</div>
      </div>
    </div>`;
  }

  protected render() {
    const c = this.config;
    const power = c.power_entity ? this.hass?.states[c.power_entity] : undefined;
    const [value, unit] = powerParts(this.hass, power);
    const battery = c.battery_entity ? numericState(this.hass?.states[c.battery_entity]) : undefined;
    const batteryIcon =
      battery === undefined ? "mdi:battery" : `mdi:battery${battery >= 95 ? "" : battery < 10 ? "-outline" : `-${Math.round(battery / 10) * 10}`}`;

    return html`
      <div class="head"><ha-icon icon="mdi:lightning-bolt"></ha-icon>${c.title ?? "Energy"}</div>
      ${c.power_entity
        ? html`<div class="now" @click=${() => !this.displayOnly && openMoreInfo(this, c.power_entity!)}>
            <span class="value num">${value}</span><span class="unit">${unit}</span>
            <span class="now-label muted">using now</span>
          </div>`
        : nothing}
      ${c.show_graph !== false && this._series?.length ? html`<div class="graph">${this._sparkline(this._series)}</div>` : html`<div class="grow"></div>`}
      <div class="stats">
        ${this._stat("mdi:home-lightning-bolt-outline", "Today", c.today_entity)}
        ${this._stat("mdi:solar-power-variant-outline", "Solar now", c.solar_power_entity, "sun")}
        ${this._stat("mdi:white-balance-sunny", "Solar today", c.solar_today_entity, "sun")}
        ${this._stat(batteryIcon, "Battery", c.battery_entity, "sage")}
        ${this._stat("mdi:cash", "Cost today", c.cost_entity)}
      </div>
    `;
  }

  static styles = [
    widgetStyles,
    css`
      .now {
        display: flex;
        align-items: baseline;
        gap: 6px;
        flex-wrap: wrap;
        cursor: pointer;
      }
      .value {
        font-size: clamp(2.2rem, 18cqmin, 4.5rem);
        font-weight: 300;
        line-height: 1;
        letter-spacing: -0.03em;
      }
      .unit {
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--h-muted);
      }
      .now-label {
        font-weight: 600;
        margin-left: 6px;
      }
      .graph,
      .grow {
        flex: 1;
        min-height: 0;
        margin: 8px -4px;
      }
      .spark {
        width: 100%;
        height: 100%;
        display: block;
      }
      :host([auto-height]) .graph { flex: none; height: 100px; }
      :host([auto-height]) .grow { flex: none; margin: 4px 0; }
      .stats {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        flex: none;
      }
      .stat {
        flex: 1 1 120px;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        background: var(--h-surface-2);
        border-radius: var(--h-radius-sm);
        cursor: pointer;
        min-width: 0;
      }
      .stat ha-icon {
        --mdc-icon-size: 22px;
        color: var(--h-accent);
        flex: none;
      }
      .stat.sun ha-icon {
        color: var(--h-amber);
      }
      .stat.sage ha-icon {
        color: var(--h-sage);
      }
      .stat-value {
        font-weight: 800;
        white-space: nowrap;
      }
      .stat-label {
        font-size: 0.78rem;
        color: var(--h-muted);
        font-weight: 600;
      }
      @container (max-height: 280px) {
        .graph {
          display: none;
        }
      }
    `,
  ];
}
