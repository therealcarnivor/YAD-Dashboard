import { css, html, nothing } from "lit";
import { customElement } from "lit/decorators.js";
import { widgetStyles } from "../styles";
import type { EntityRef, HomeAssistant, HassEntity, WidgetConfig } from "../types";
import { entityName, formatNumber, isUnavailable, normaliseEntities, numericState, openMoreInfo } from "../utils";
import { YadWidget } from "./base";

export interface SensorsConfig extends WidgetConfig {
  type: "sensors";
  entities: EntityRef[];
  layout?: "grid" | "list";
  min_tile_width?: number;
}

/** Splits a sensor into [value, unit] so the number can be emphasised. */
const valueParts = (hass: HomeAssistant | undefined, s?: HassEntity): [string, string] => {
  if (!s || isUnavailable(s)) return ["–", ""];
  const n = numericState(s);
  const unit = s.attributes.unit_of_measurement ?? "";
  if (n !== undefined) return [formatNumber(hass, n, 1), unit];
  const formatted = hass?.formatEntityState ? hass.formatEntityState(s) : s.state;
  return [formatted, ""];
};

@customElement("yad-widget-sensors")
export class YadSensors extends YadWidget<SensorsConfig> {
  protected watchedEntities(): string[] {
    return normaliseEntities(this.config.entities).map((e) => e.entity);
  }

  protected render() {
    const items = normaliseEntities(this.config.entities);
    const layout = this.config.layout ?? "grid";
    return html`
      ${this.config.title ? html`<div class="head"><ha-icon icon="mdi:gauge"></ha-icon>${this.config.title}</div>` : nothing}
      <div class="${layout} scroll" style="--min:${this.config.min_tile_width ?? 140}px">
        ${items.map((item) => {
          const s = this.hass?.states[item.entity];
          const [value, unit] = valueParts(this.hass, s);
          return html`<div class="item" @click=${() => !this.displayOnly && openMoreInfo(this, item.entity)}>
            <div class="icon" style=${item.color ? `color:${item.color}` : ""}>
              ${item.icon
                ? html`<ha-icon .icon=${item.icon}></ha-icon>`
                : html`<ha-state-icon .hass=${this.hass} .stateObj=${s}></ha-state-icon>`}
            </div>
            <div class="name">${entityName(s, item.name, item.entity)}</div>
            <div class="value num">${value}${unit ? html`<span class="unit">${unit}</span>` : nothing}</div>
          </div>`;
        })}
      </div>
    `;
  }

  static styles = [
    widgetStyles,
    css`
      .grid {
        flex: 1;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(var(--min), 100%), 1fr));
        grid-auto-rows: minmax(90px, 1fr);
        gap: 10px;
      }
      .grid .item {
        display: grid;
        grid-template-areas: "icon name" "value value";
        grid-template-columns: auto 1fr;
        align-content: space-between;
        gap: 6px 8px;
        padding: 12px 14px;
        border-radius: var(--h-radius-sm);
        background: var(--h-surface-2);
        cursor: pointer;
        min-width: 0;
      }
      .list {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      .list .item {
        display: grid;
        grid-template-areas: "icon name value";
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: 12px;
        padding: 10px 2px;
        border-bottom: 1px solid var(--h-border);
        cursor: pointer;
      }
      .list .item:last-child {
        border-bottom: none;
      }
      .icon {
        grid-area: icon;
        color: var(--h-accent);
        display: flex;
      }
      .icon ha-icon,
      .icon ha-state-icon {
        --mdc-icon-size: 22px;
      }
      .name {
        grid-area: name;
        font-size: 0.88rem;
        font-weight: 700;
        color: var(--h-muted);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        align-self: center;
      }
      .value {
        grid-area: value;
        font-size: 1.7rem;
        font-weight: 400;
        letter-spacing: -0.02em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .list .value {
        font-size: 1.15rem;
        font-weight: 700;
      }
      .unit {
        font-size: 0.55em;
        font-weight: 700;
        color: var(--h-muted);
        margin-left: 3px;
      }
      @container (max-height: 190px) {
        .head {
          display: none;
        }
        .grid {
          grid-auto-rows: minmax(64px, 1fr);
        }
        .grid .item {
          padding: 8px 12px;
          gap: 2px 8px;
        }
        .value {
          font-size: 1.35rem;
        }
      }
    `,
  ];
}
