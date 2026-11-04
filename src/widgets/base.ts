import { LitElement, PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import type { HomeAssistant, WidgetConfig } from "../types";

export abstract class HearthWidget<C extends WidgetConfig = WidgetConfig> extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ attribute: false }) public config!: C;
  @property({ type: Boolean, reflect: true, attribute: "display-only" }) public displayOnly = false;

  /** Entities whose state changes should trigger a re-render. */
  protected abstract watchedEntities(): string[];

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.size !== 1 || !changed.has("hass")) return true;
    const old = changed.get("hass") as HomeAssistant | undefined;
    if (!old || !this.hass) return true;
    if (old.locale !== this.hass.locale || old.themes !== this.hass.themes) return true;
    return this.watchedEntities().some((id) => old.states[id] !== this.hass!.states[id]);
  }

  protected callService(domain: string, service: string, data: Record<string, unknown>): void {
    if (this.displayOnly || !this.hass) return;
    void this.hass.callService(domain, service, data);
  }
}
