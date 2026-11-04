import { css, html, PropertyValues } from "lit";
import { customElement, state } from "lit/decorators.js";
import { widgetStyles } from "../styles";
import type { WidgetConfig } from "../types";
import { HearthWidget } from "./base";

export interface CardWidgetConfig extends WidgetConfig {
  type: "card";
  card: Record<string, unknown> & { type: string };
}

/** Embeds any existing Lovelace card (built-in or custom) as a widget. */
@customElement("hearth-widget-card")
export class HearthCardWidget extends HearthWidget<CardWidgetConfig> {
  @state() private _card?: HTMLElement & { hass?: unknown };
  @state() private _error?: string;
  private _builtFor?: string;

  protected watchedEntities(): string[] {
    return [];
  }

  // The embedded card decides for itself when to re-render, so always forward hass.
  protected shouldUpdate(): boolean {
    return true;
  }

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has("config")) {
      const key = JSON.stringify(this.config.card ?? null);
      if (key !== this._builtFor) {
        this._builtFor = key;
        void this._build();
      }
    }
    if (this._card && this.hass) this._card.hass = this.hass;
  }

  private async _build(): Promise<void> {
    const cardConfig = this.config.card;
    if (!cardConfig?.type) {
      this._card = undefined;
      this._error = "Add a `card:` configuration to this widget.";
      return;
    }
    try {
      const helpers = await window.loadCardHelpers?.();
      if (!helpers) throw new Error("Card helpers unavailable");
      const el = helpers.createCardElement(cardConfig) as HTMLElement & { hass?: unknown };
      el.addEventListener("ll-rebuild", (ev) => {
        ev.stopPropagation();
        this._builtFor = undefined;
        this.requestUpdate("config");
      });
      if (this.hass) el.hass = this.hass;
      this._card = el;
      this._error = undefined;
    } catch (err) {
      this._error = (err as Error).message;
    }
  }

  protected render() {
    if (this._error) return html`<div class="empty"><ha-icon icon="mdi:card-remove-outline"></ha-icon>${this._error}</div>`;
    return html`<div class="wrap scroll">${this._card}</div>`;
  }

  static styles = [
    widgetStyles,
    css`
      .wrap {
        flex: 1;
        height: 100%;
        --ha-card-background: transparent;
        --ha-card-box-shadow: none;
        --ha-card-border-width: 0;
        --ha-card-border-radius: var(--h-radius-sm);
        --primary-text-color: var(--h-text);
        --secondary-text-color: var(--h-muted);
      }
    `,
  ];
}
