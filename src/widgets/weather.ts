import { css, html, nothing, PropertyValues } from "lit";
import { customElement, state } from "lit/decorators.js";
import { widgetStyles } from "../styles";
import type { WidgetConfig } from "../types";
import { capitalise, formatNumber, formatState, isUnavailable, lang, openMoreInfo } from "../utils";
import { YadWidget } from "./base";

export interface WeatherConfig extends WidgetConfig {
  type: "weather";
  entity: string;
  forecast_type?: "daily" | "hourly" | "twice_daily";
  forecast_count?: number;
  show_details?: boolean;
}

interface Forecast {
  datetime: string;
  condition?: string;
  temperature?: number;
  templow?: number;
  precipitation_probability?: number;
  is_daytime?: boolean;
}

export const WEATHER_ICONS: Record<string, string> = {
  "clear-night": "mdi:weather-night",
  cloudy: "mdi:weather-cloudy",
  exceptional: "mdi:alert-circle-outline",
  fog: "mdi:weather-fog",
  hail: "mdi:weather-hail",
  lightning: "mdi:weather-lightning",
  "lightning-rainy": "mdi:weather-lightning-rainy",
  partlycloudy: "mdi:weather-partly-cloudy",
  pouring: "mdi:weather-pouring",
  rainy: "mdi:weather-rainy",
  snowy: "mdi:weather-snowy",
  "snowy-rainy": "mdi:weather-snowy-rainy",
  sunny: "mdi:weather-sunny",
  windy: "mdi:weather-windy",
  "windy-variant": "mdi:weather-windy-variant",
};

const WEATHER_LABELS: Record<string, string> = {
  "clear-night": "Clear night",
  partlycloudy: "Partly cloudy",
  "lightning-rainy": "Thunderstorms",
  "snowy-rainy": "Sleet",
  "windy-variant": "Windy",
  exceptional: "Exceptional",
};

const iconFor = (condition?: string, night = false): string => {
  if (night && (condition === "sunny" || condition === "clear-night")) return "mdi:weather-night";
  if (night && condition === "partlycloudy") return "mdi:weather-night-partly-cloudy";
  return WEATHER_ICONS[condition ?? ""] ?? "mdi:weather-cloudy";
};

const toneFor = (condition?: string): string =>
  condition === "sunny" ? "sun" : condition === "clear-night" ? "night" : /rain|pour|hail|lightning/.test(condition ?? "") ? "rain" : "cloud";

@customElement("yad-widget-weather")
export class YadWeather extends YadWidget<WeatherConfig> {
  @state() private _forecast?: Forecast[];
  private _unsub?: Promise<() => void>;
  private _subscribedKey?: string;

  protected watchedEntities(): string[] {
    return [this.config.entity];
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._unsubscribe();
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (this.hass) this._subscribe();
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has("hass") || changed.has("config")) this._subscribe();
  }

  private _unsubscribe(): void {
    this._unsub?.then((u) => u()).catch(() => undefined);
    this._unsub = undefined;
    this._subscribedKey = undefined;
  }

  private _subscribe(): void {
    if (!this.hass || !this.config?.entity || !this.isConnected) return;
    const type = this.config.forecast_type ?? "daily";
    const key = `${this.config.entity}|${type}`;
    if (this._subscribedKey === key) return;
    this._unsubscribe();
    this._subscribedKey = key;
    this._unsub = this.hass.connection.subscribeMessage<{ forecast: Forecast[] }>(
      (msg) => (this._forecast = msg.forecast),
      { type: "weather/subscribe_forecast", forecast_type: type, entity_id: this.config.entity },
    );
    this._unsub.catch(() => {
      // Older HA versions or entities without forecast support: fall back to the attribute.
      this._forecast = this.hass?.states[this.config.entity]?.attributes.forecast;
    });
  }

  private _label(f: Forecast): string {
    const d = new Date(f.datetime);
    const type = this.config.forecast_type ?? "daily";
    if (type === "hourly") {
      return new Intl.DateTimeFormat(lang(this.hass), { hour: "numeric" }).format(d);
    }
    const day = new Intl.DateTimeFormat(lang(this.hass), { weekday: "short" }).format(d);
    return type === "twice_daily" ? `${day}${f.is_daytime === false ? " ☾" : ""}` : day;
  }

  protected render() {
    const stateObj = this.hass?.states[this.config.entity];
    if (!stateObj) {
      return html`<div class="empty"><ha-icon icon="mdi:weather-cloudy-alert"></ha-icon>Weather entity not found<br /><small>${this.config.entity}</small></div>`;
    }
    const a = stateObj.attributes;
    const unit = a.temperature_unit ?? "°";
    const deg = unit.startsWith("°") ? "°" : ` ${unit}`;
    const night = stateObj.state === "clear-night";
    const forecast = (this._forecast ?? []).slice(0, this.config.forecast_count ?? 5);
    const today = this.config.forecast_type === "hourly" || !this._forecast?.length ? undefined : this._forecast[0];
    const formatted = formatState(this.hass, stateObj);
    const condition = isUnavailable(stateObj)
      ? "Unavailable"
      : formatted === stateObj.state || formatted === capitalise(stateObj.state)
        ? WEATHER_LABELS[stateObj.state] ?? capitalise(stateObj.state.replace(/-/g, " "))
        : formatted;

    return html`
      <div class="now tone-${toneFor(stateObj.state)}" @click=${() => !this.displayOnly && openMoreInfo(this, this.config.entity)}>
        <div class="icon-wrap"><ha-icon icon=${iconFor(stateObj.state, night)}></ha-icon></div>
        <div class="main">
          <div class="temp num">${a.temperature !== undefined ? formatNumber(this.hass, a.temperature, 0) : "–"}<span>${deg}</span></div>
          <div class="cond">${capitalise(condition)}</div>
          ${today?.temperature !== undefined
            ? html`<div class="hilo muted num">
                ↑ ${formatNumber(this.hass, today.temperature, 0)}${deg}
                ${today.templow !== undefined ? html` · ↓ ${formatNumber(this.hass, today.templow, 0)}${deg}` : nothing}
              </div>`
            : nothing}
        </div>
        ${this.config.show_details !== false
          ? html`<div class="details">
              ${a.humidity !== undefined
                ? html`<span class="chip"><ha-icon icon="mdi:water-percent"></ha-icon>${formatNumber(this.hass, a.humidity, 0)}%</span>`
                : nothing}
              ${a.wind_speed !== undefined
                ? html`<span class="chip"
                    ><ha-icon icon="mdi:weather-windy"></ha-icon>${formatNumber(this.hass, a.wind_speed, 0)} ${a.wind_speed_unit ?? ""}</span
                  >`
                : nothing}
            </div>`
          : nothing}
      </div>
      ${forecast.length
        ? html`<div class="forecast">
            ${forecast.map(
              (f) => html`<div class="day">
                <div class="label">${this._label(f)}</div>
                <ha-icon icon=${iconFor(f.condition, f.is_daytime === false)}></ha-icon>
                <div class="t num">${f.temperature !== undefined ? formatNumber(this.hass, f.temperature, 0) + "°" : ""}</div>
                ${f.templow !== undefined ? html`<div class="tl num">${formatNumber(this.hass, f.templow, 0)}°</div>` : nothing}
                ${f.precipitation_probability
                  ? html`<div class="rain num">${f.precipitation_probability}%</div>`
                  : nothing}
              </div>`,
            )}
          </div>`
        : nothing}
    `;
  }

  static styles = [
    widgetStyles,
    css`
      .now {
        display: flex;
        align-items: center;
        gap: clamp(12px, 4cqw, 28px);
        flex: 1;
        min-height: 0;
        overflow: hidden;
        flex-wrap: wrap;
        align-content: center;
        cursor: pointer;
      }
      .icon-wrap {
        width: clamp(64px, 30cqmin, 140px);
        height: clamp(64px, 30cqmin, 140px);
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: var(--h-amber-soft);
        color: var(--h-amber);
        flex: none;
      }
      .tone-rain .icon-wrap,
      .tone-cloud .icon-wrap {
        background: color-mix(in srgb, var(--h-sky) 16%, transparent);
        color: var(--h-sky);
      }
      .tone-night .icon-wrap {
        background: color-mix(in srgb, var(--h-sky) 14%, transparent);
        color: var(--h-text);
      }
      .icon-wrap ha-icon {
        --mdc-icon-size: clamp(36px, 17cqmin, 84px);
      }
      .main {
        flex: 1;
        min-width: 120px;
      }
      .temp {
        font-size: clamp(2.5rem, 22cqmin, 5.5rem);
        font-weight: 300;
        line-height: 1;
        letter-spacing: -0.03em;
      }
      .temp span {
        font-size: 0.5em;
        vertical-align: top;
        color: var(--h-muted);
      }
      .cond {
        font-size: clamp(1rem, 6cqmin, 1.5rem);
        font-weight: 700;
        margin-top: 4px;
      }
      .hilo {
        font-size: 0.95rem;
        margin-top: 2px;
        font-weight: 600;
      }
      .details {
        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: flex-end;
      }
      .forecast {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 1fr;
        gap: 6px;
        padding-top: 14px;
        margin-top: 10px;
        border-top: 1px solid var(--h-border);
        flex: none;
      }
      .day {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        padding: 8px 2px;
        border-radius: var(--h-radius-sm);
      }
      .day:first-child {
        background: var(--h-surface-2);
      }
      .day ha-icon {
        --mdc-icon-size: 26px;
        color: var(--h-accent);
      }
      .label {
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--h-muted);
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .t {
        font-weight: 700;
      }
      .tl {
        font-size: 0.85rem;
        color: var(--h-muted);
      }
      .rain {
        font-size: 0.75rem;
        color: var(--h-sky);
        font-weight: 700;
      }
      @container (max-height: 250px) {
        .forecast {
          display: none;
        }
      }
      @container (max-height: 330px) {
        .details {
          display: none;
        }
      }
      @container (max-width: 420px) {
        .details {
          flex-direction: row;
          flex-wrap: wrap;
          width: 100%;
          align-items: center;
        }
      }
    `,
  ];
}
