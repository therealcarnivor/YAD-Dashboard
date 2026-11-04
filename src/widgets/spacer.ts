import { css, html, nothing } from "lit";
import { customElement } from "lit/decorators.js";
import { widgetStyles } from "../styles";
import type { WidgetConfig } from "../types";
import { YadWidget } from "./base";

export interface SpacerConfig extends WidgetConfig {
  type: "spacer";
  style?: "blank" | "line" | "dashed";
  line_color?: string;
}

@customElement("yad-widget-spacer")
export class YadSpacer extends YadWidget<SpacerConfig> {
  protected watchedEntities(): string[] {
    return [];
  }

  protected render() {
    const style = this.config.style ?? "blank";
    return style === "blank"
      ? nothing
      : html`<div class="line ${style}" style=${this.config.line_color ? `border-color:${this.config.line_color}` : ""} role="separator"></div>`;
  }

  static styles = [
    widgetStyles,
    css`
      :host { justify-content: center; }
      .line { width: 100%; border-top: 1px solid var(--h-border); }
      .dashed { border-top-style: dashed; }
    `,
  ];
}
