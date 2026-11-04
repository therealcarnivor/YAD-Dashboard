import { css, html, nothing } from "lit";
import { customElement } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { widgetStyles } from "../styles";
import type { EntityRef, HassEntity, WidgetConfig } from "../types";
import { domainOf, entityName, formatNumber, formatState, isUnavailable, normaliseEntities, openMoreInfo, pressHandlers } from "../utils";
import { YadWidget } from "./base";

export interface TogglesConfig extends WidgetConfig {
  type: "toggles";
  entities: EntityRef[];
  min_tile_width?: number;
}

const ON_STATES = new Set(["on", "open", "opening", "unlocked", "playing", "home", "active", "heat", "cool"]);

const isOn = (s?: HassEntity) => !!s && ON_STATES.has(s.state);

const subtitle = (hass: any, s?: HassEntity): string => {
  if (!s || s.state === "unavailable") return "Unavailable";
  const domain = domainOf(s.entity_id);
  // Scenes/buttons report a timestamp (or "unknown") as their state, which isn't useful here.
  if (domain === "scene" || domain === "script") return s.state === "on" ? "Running" : "Tap to run";
  if (domain === "button" || domain === "input_button") return "Tap to press";
  if (isUnavailable(s)) return "Unavailable";
  if (domain === "light" && s.state === "on" && typeof s.attributes.brightness === "number") {
    return `On · ${formatNumber(hass, (s.attributes.brightness / 255) * 100, 0)}%`;
  }
  return formatState(hass, s);
};

@customElement("yad-widget-toggles")
export class YadToggles extends YadWidget<TogglesConfig> {
  private _handlers = new Map<string, ReturnType<typeof pressHandlers>>();

  protected watchedEntities(): string[] {
    return normaliseEntities(this.config.entities).map((e) => e.entity);
  }

  private _toggle(entityId: string): void {
    const domain = domainOf(entityId);
    if (domain === "scene" || domain === "script") {
      this.callService(domain, "turn_on", { entity_id: entityId });
    } else if (domain === "button" || domain === "input_button") {
      this.callService(domain, "press", { entity_id: entityId });
    } else if (domain === "lock") {
      this.callService("lock", this.hass?.states[entityId]?.state === "locked" ? "unlock" : "lock", { entity_id: entityId });
    } else if (domain === "cover") {
      this.callService("cover", "toggle", { entity_id: entityId });
    } else {
      this.callService("homeassistant", "toggle", { entity_id: entityId });
    }
  }

  private _press(entityId: string) {
    let h = this._handlers.get(entityId);
    if (!h) {
      h = pressHandlers(
        () => this._toggle(entityId),
        () => openMoreInfo(this, entityId),
      );
      this._handlers.set(entityId, h);
    }
    return h;
  }

  protected render() {
    const items = normaliseEntities(this.config.entities);
    return html`
      ${this.config.title ? html`<div class="head"><ha-icon icon="mdi:lightbulb-group-outline"></ha-icon>${this.config.title}</div>` : nothing}
      <div class="grid scroll" style="--min:${this.config.min_tile_width ?? 150}px">
        ${items.map((item) => {
          const s = this.hass?.states[item.entity];
          const on = isOn(s);
          const rgb = on && Array.isArray(s?.attributes.rgb_color) ? `rgb(${s!.attributes.rgb_color.join(",")})` : undefined;
          const h = this._press(item.entity);
          return html`<div
            class="tile ${on ? "on" : ""} ${!s || s.state === "unavailable" ? "unavailable" : ""}"
            style=${styleMap(rgb ? { "--tint": rgb } : {})}
            role="button"
            @pointerdown=${h.down}
            @pointerup=${h.up}
            @pointerleave=${h.cancel}
            @pointercancel=${h.cancel}
            @contextmenu=${(e: Event) => e.preventDefault()}
          >
            <div class="icon">
              ${item.icon
                ? html`<ha-icon .icon=${item.icon}></ha-icon>`
                : html`<ha-state-icon .hass=${this.hass} .stateObj=${s}></ha-state-icon>`}
            </div>
            <div class="text">
              <div class="name">${entityName(s, item.name, item.entity)}</div>
              <div class="state">${subtitle(this.hass, s)}</div>
            </div>
          </div>`;
        })}
      </div>
    `;
  }

  static styles = [
    widgetStyles,
    css`
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(var(--min), 100%), 1fr));
        grid-auto-rows: minmax(64px, 1fr);
        gap: 10px;
        flex: 1;
      }
      .tile {
        --tint: var(--h-amber);
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 14px;
        border-radius: var(--h-radius-sm);
        background: var(--h-surface-2);
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
        transition: background 0.25s ease, transform 0.15s ease;
        min-width: 0;
        touch-action: manipulation;
      }
      .tile:active {
        transform: scale(0.97);
      }
      .icon {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: var(--h-surface);
        color: var(--h-muted);
        flex: none;
        transition: background 0.25s ease, color 0.25s ease;
      }
      .tile.on {
        background: color-mix(in srgb, var(--tint) 18%, var(--h-surface));
      }
      .tile.on .icon {
        background: var(--tint);
        color: #fff;
        box-shadow: 0 4px 14px -4px var(--tint);
      }
      .tile.unavailable {
        opacity: 0.5;
      }
      @container (max-height: 170px) {
        .head {
          display: none;
        }
      }
      @container (max-height: 150px) {
        .grid {
          grid-auto-rows: minmax(44px, 1fr);
          gap: 8px;
        }
        .tile {
          padding: 4px 10px;
          gap: 8px;
        }
        .icon {
          width: 34px;
          height: 34px;
          --mdc-icon-size: 20px;
        }
      }
      .text {
        min-width: 0;
      }
      .name {
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .state {
        font-size: 0.82rem;
        font-weight: 600;
        color: var(--h-muted);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `,
  ];
}
