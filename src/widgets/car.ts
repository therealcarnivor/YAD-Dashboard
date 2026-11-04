import { css, html, nothing } from "lit";
import { customElement } from "lit/decorators.js";
import { widgetStyles } from "../styles";
import type { EntityRef, HassEntity, WidgetConfig } from "../types";
import { entityName, formatState, isUnavailable, normaliseEntities, numericState, openMoreInfo } from "../utils";
import { YadWidget } from "./base";

export interface CarConfig extends WidgetConfig {
  type: "car";
  name?: string;
  charge_entity?: string;
  fuel_entity?: string;
  range_entity?: string;
  location_entity?: string;
  plugged_in_entity?: string;
  charging_entity?: string;
  entities?: EntityRef[];
}

const FIELDS = [
  ["charge_entity", "Charge", "mdi:battery"],
  ["fuel_entity", "Fuel", "mdi:gas-station"],
  ["range_entity", "Range", "mdi:map-marker-distance"],
  ["location_entity", "Location", "mdi:map-marker"],
  ["plugged_in_entity", "Plugged in", "mdi:ev-plug-type2"],
  ["charging_entity", "Charging", "mdi:ev-station"],
] as const;

@customElement("yad-widget-car")
export class YadCar extends YadWidget<CarConfig> {
  protected watchedEntities(): string[] {
    return [
      ...FIELDS.flatMap(([key]) => this.config[key] ? [this.config[key]!] : []),
      ...normaliseEntities(this.config.entities).map((item) => item.entity),
    ];
  }

  private _available(id?: string): HassEntity | undefined {
    const entity = id ? this.hass?.states[id] : undefined;
    return entity && !isUnavailable(entity) && entity.state.trim() !== "" ? entity : undefined;
  }

  protected render() {
    const items = FIELDS.flatMap(([key, label, icon]) => {
      const entity = this._available(this.config[key]);
      if (!entity) return [];
      const percentage = key === "charge_entity" || key === "fuel_entity";
      const value = percentage ? numericState(entity) : undefined;
      return [{ entity, label, icon, value, percentage }];
    });
    const extras = normaliseEntities(this.config.entities).flatMap((item) => {
      const entity = this._available(item.entity);
      return entity ? [{ entity, label: entityName(entity, item.name), icon: item.icon ?? "mdi:gauge", value: undefined, percentage: false }] : [];
    });
    const all = [...items, ...extras];
    return html`
      <div class="head"><ha-icon icon="mdi:car"></ha-icon>${this.config.title ?? this.config.name ?? "Car"}</div>
      ${all.length ? html`<div class="items scroll">
        ${all.map(({ entity, label, icon, value, percentage }) => html`
          <div class="item" @click=${() => !this.displayOnly && openMoreInfo(this, entity.entity_id)}>
            <ha-icon icon=${icon}></ha-icon>
            <div class="body">
              <div class="label muted">${label}</div>
              <div class="value num">${percentage && value !== undefined ? `${value}%` : formatState(this.hass, entity)}</div>
              ${percentage && value !== undefined ? html`
                <progress max="100" value=${Math.min(100, Math.max(0, value))} aria-label=${label}></progress>
              ` : nothing}
            </div>
          </div>
        `)}
      </div>` : html`<div class="empty">${this.watchedEntities().length ? "No vehicle data available" : "Select vehicle sensors in the widget editor"}</div>`}
    `;
  }

  static styles = [
    widgetStyles,
    css`
      .items { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(140px, 100%), 1fr)); gap: 10px; }
      .item { display: flex; align-items: center; gap: 10px; padding: 12px; border-radius: var(--h-radius-sm); background: var(--h-surface-2); cursor: pointer; }
      .item ha-icon { color: var(--h-accent); flex: none; }
      .body { min-width: 0; flex: 1; }
      .label { font-size: 0.8rem; font-weight: 600; }
      .value { font-weight: 700; overflow-wrap: anywhere; }
      progress { width: 100%; height: 6px; accent-color: var(--h-accent); }
      :host([display-only]) .item { cursor: default; }
    `,
  ];
}
