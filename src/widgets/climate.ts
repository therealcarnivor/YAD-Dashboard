import { css, html, nothing, PropertyValues } from "lit";
import { customElement, state } from "lit/decorators.js";
import { widgetStyles } from "../styles";
import type { WidgetConfig } from "../types";
import { capitalise, entityName, formatNumber, isUnavailable, openMoreInfo } from "../utils";
import { HearthWidget } from "./base";

export interface ClimateConfig extends WidgetConfig {
  type: "climate";
  entity: string;
  name?: string;
  show_modes?: boolean;
  humidity_entity?: string;
}

const MODE_ICONS: Record<string, string> = {
  off: "mdi:power",
  heat: "mdi:fire",
  cool: "mdi:snowflake",
  heat_cool: "mdi:sun-snowflake-variant",
  auto: "mdi:thermostat-auto",
  dry: "mdi:water-percent",
  fan_only: "mdi:fan",
};

const ACTION_TEXT: Record<string, string> = {
  heating: "Heating",
  cooling: "Cooling",
  idle: "Idle",
  off: "Off",
  drying: "Drying",
  fan: "Fan",
  preheating: "Preheating",
};

@customElement("hearth-widget-climate")
export class HearthClimate extends HearthWidget<ClimateConfig> {
  @state() private _pendingTarget?: number;
  private _debounce?: number;

  protected watchedEntities(): string[] {
    return [this.config.entity, this.config.humidity_entity].filter((e): e is string => !!e);
  }

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has("hass") && this._pendingTarget !== undefined && this._debounce === undefined) {
      this._pendingTarget = undefined;
    }
  }

  private _nudge(direction: 1 | -1): void {
    const stateObj = this.hass?.states[this.config.entity];
    if (!stateObj || this.displayOnly) return;
    const a = stateObj.attributes;
    const step = a.target_temp_step ?? (this.hass?.config?.unit_system?.temperature === "°F" ? 1 : 0.5);
    const current = this._pendingTarget ?? a.temperature;
    if (typeof current !== "number") return;
    const next = Math.min(a.max_temp ?? 35, Math.max(a.min_temp ?? 5, Math.round((current + step * direction) / step) * step));
    this._pendingTarget = next;
    window.clearTimeout(this._debounce);
    this._debounce = window.setTimeout(() => {
      this._debounce = undefined;
      this.callService("climate", "set_temperature", { entity_id: this.config.entity, temperature: next });
    }, 900);
  }

  private _setMode(mode: string): void {
    this.callService("climate", "set_hvac_mode", { entity_id: this.config.entity, hvac_mode: mode });
  }

  protected render() {
    const stateObj = this.hass?.states[this.config.entity];
    if (!stateObj) {
      return html`<div class="empty"><ha-icon icon="mdi:thermostat"></ha-icon>Climate entity not found<br /><small>${this.config.entity}</small></div>`;
    }
    const a = stateObj.attributes;
    const unavailable = isUnavailable(stateObj);
    const target: number | undefined = this._pendingTarget ?? a.temperature;
    const action: string = a.hvac_action ?? stateObj.state;
    const tone = action === "heating" || action === "preheating" ? "heat" : action === "cooling" ? "cool" : stateObj.state === "off" ? "off" : "idle";
    const fmt = (n: number) => formatNumber(this.hass, n, 1);
    const humidity = this.config.humidity_entity ? this.hass?.states[this.config.humidity_entity]?.state : a.current_humidity;

    // Ring shows target within the device's min/max range.
    const min = a.min_temp ?? 5;
    const max = a.max_temp ?? 35;
    const pct = target !== undefined ? Math.min(1, Math.max(0, (target - min) / (max - min))) : 0;
    const R = 46;
    const C = 2 * Math.PI * R * 0.75;

    return html`
      <div class="head">
        <ha-icon icon="mdi:thermostat"></ha-icon>${entityName(stateObj, this.config.name ?? this.config.title)}
        <span class="spacer"></span>
        <span class="chip action ${tone}">${unavailable ? "Unavailable" : ACTION_TEXT[action] ?? capitalise(action.replace(/_/g, " "))}</span>
      </div>
      <div class="body">
        <button class="round control" aria-label="Lower" @click=${() => this._nudge(-1)}><ha-icon icon="mdi:minus"></ha-icon></button>
        <div class="dial ${tone}" @click=${() => !this.displayOnly && openMoreInfo(this, this.config.entity)}>
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r=${R} class="track" stroke-dasharray="${C} 999" transform="rotate(135 50 50)"></circle>
            <circle cx="50" cy="50" r=${R} class="fill" stroke-dasharray="${C * pct} 999" transform="rotate(135 50 50)"></circle>
          </svg>
          <div class="readout">
            <div class="current num">${a.current_temperature !== undefined ? fmt(a.current_temperature) : "–"}<span>°</span></div>
            <div class="target muted num">
              ${target !== undefined
                ? html`Set to <strong>${fmt(target)}°</strong>`
                : a.target_temp_low !== undefined
                  ? html`<strong>${fmt(a.target_temp_low)}–${fmt(a.target_temp_high)}°</strong>`
                  : nothing}
            </div>
            ${humidity !== undefined && humidity !== null
              ? html`<div class="hum muted num"><ha-icon icon="mdi:water-percent"></ha-icon>${humidity}%</div>`
              : nothing}
          </div>
        </div>
        <button class="round control" aria-label="Raise" @click=${() => this._nudge(1)}><ha-icon icon="mdi:plus"></ha-icon></button>
      </div>
      ${this.config.show_modes !== false && Array.isArray(a.hvac_modes)
        ? html`<div class="modes">
            ${(a.hvac_modes as string[]).map(
              (m) => html`<button
                class="mode ${m === stateObj.state ? "active" : ""}"
                ?disabled=${this.displayOnly}
                @click=${() => this._setMode(m)}
                title=${capitalise(m.replace(/_/g, " "))}
              >
                <ha-icon icon=${MODE_ICONS[m] ?? "mdi:thermostat"}></ha-icon>
              </button>`,
            )}
          </div>`
        : nothing}
    `;
  }

  static styles = [
    widgetStyles,
    css`
      .action.heat {
        background: var(--h-accent-soft);
        color: var(--h-accent);
      }
      .action.cool {
        background: color-mix(in srgb, var(--h-sky) 16%, transparent);
        color: var(--h-sky);
      }
      .body {
        flex: 1;
        min-height: 0;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
      }
      .dial {
        position: relative;
        height: 100%;
        max-height: min(78cqw, 260px);
        aspect-ratio: 1;
        cursor: pointer;
        min-height: 0;
      }
      .dial svg {
        width: 100%;
        height: 100%;
        display: block;
      }
      circle {
        fill: none;
        stroke-width: 7;
        stroke-linecap: round;
      }
      .track {
        stroke: var(--h-surface-2);
      }
      .fill {
        stroke: var(--h-muted);
        transition: stroke-dasharray 0.4s ease;
      }
      .heat .fill {
        stroke: var(--h-accent);
      }
      .cool .fill {
        stroke: var(--h-sky);
      }
      .idle .fill {
        stroke: var(--h-sage);
      }
      .readout {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
      }
      .current {
        font-size: clamp(1.8rem, 16cqmin, 3.6rem);
        font-weight: 300;
        line-height: 1;
        letter-spacing: -0.03em;
      }
      .current span {
        font-size: 0.55em;
        vertical-align: top;
        color: var(--h-muted);
      }
      .target {
        font-size: 0.9rem;
        font-weight: 600;
        margin-top: 4px;
      }
      .target strong {
        color: var(--h-text);
      }
      .hum {
        display: flex;
        align-items: center;
        gap: 2px;
        font-size: 0.8rem;
        font-weight: 600;
        margin-top: 2px;
      }
      .hum ha-icon {
        --mdc-icon-size: 14px;
      }
      .modes {
        display: flex;
        justify-content: center;
        gap: 8px;
        margin-top: 10px;
        flex: none;
        flex-wrap: wrap;
      }
      .mode {
        all: unset;
        width: 42px;
        height: 42px;
        border-radius: 14px;
        display: grid;
        place-items: center;
        background: var(--h-surface-2);
        color: var(--h-muted);
        cursor: pointer;
        transition: background 0.2s ease, color 0.2s ease;
      }
      .mode ha-icon {
        --mdc-icon-size: 22px;
      }
      .mode.active {
        background: var(--h-accent);
        color: #fff;
      }
      .mode[disabled] {
        cursor: default;
      }
      :host([display-only]) .mode:not(.active) {
        display: none;
      }
      @container (max-height: 220px) {
        .modes {
          display: none;
        }
      }
    `,
  ];
}
