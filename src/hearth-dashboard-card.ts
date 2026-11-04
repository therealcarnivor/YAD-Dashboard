import { css, html, LitElement, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { html as staticHtml, unsafeStatic } from "lit/static-html.js";
import { paletteVars, resolvePalette } from "./palettes";
import { autoScale, SCREENS } from "./screens";
import { themeStyles } from "./styles";
import type { DashboardConfig, HomeAssistant, WidgetConfig } from "./types";
import { WIDGETS } from "./widgets/registry";
import "./editor/editor";

import { VERSION } from "./version";

export const CARD_TAG = "hearth-dashboard-card";
export const EDITOR_TAG = "hearth-dashboard-card-editor";

const DEFAULTS = {
  theme: "auto",
  palette: "hearth",
  orientation: "auto",
  screen: "fill",
  columns: 4,
  portrait_columns: 2,
  height: "screen",
  row_height: 180,
  gap: 16,
  display_only: false,
  hide_cursor: false,
} as const;

@customElement(CARD_TAG)
export class HearthDashboardCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  /** Set by Home Assistant when rendered inside the card editor preview. */
  @property({ type: Boolean }) public preview = false;
  @state() private _config?: DashboardConfig;
  @state() private _portraitMedia = window.matchMedia("(orientation: portrait)").matches;
  /** Available width and distance from the top of the page, used to fit fixed screen sizes. */
  @state() private _size = { width: 0, top: 0 };
  private _mql = window.matchMedia("(orientation: portrait)");
  private _onOrientation = (e: MediaQueryListEvent) => (this._portraitMedia = e.matches);
  private _resizeObserver = new ResizeObserver(() => this._measure());
  private _onWindowResize = () => this._measure();

  private _measure(): void {
    const rect = this.getBoundingClientRect();
    const top = Math.max(0, rect.top + window.scrollY);
    if (Math.abs(rect.width - this._size.width) > 0.5 || Math.abs(top - this._size.top) > 0.5) {
      this._size = { width: rect.width, top };
    } else if (this._config?.screen && this._config.screen !== "fill") {
      this.requestUpdate();
    }
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement(EDITOR_TAG);
  }

  public static getStubConfig(hass?: HomeAssistant): Partial<DashboardConfig> {
    const ids = Object.keys(hass?.states ?? {});
    const of = (domain: string, n: number) => ids.filter((id) => id.startsWith(`${domain}.`)).slice(0, n);
    const widgets: WidgetConfig[] = [{ type: "clock", col_span: 2, row_span: 1, transparent: true }];
    const weather = of("weather", 1)[0];
    if (weather) widgets.push({ type: "weather", entity: weather, col_span: 2, row_span: 2 });
    const calendars = of("calendar", 3);
    if (calendars.length) widgets.push({ type: "calendar", entities: calendars, col_span: 1, row_span: 3 });
    const climate = of("climate", 1)[0];
    if (climate) widgets.push({ type: "climate", entity: climate, col_span: 1, row_span: 2 });
    const lights = of("light", 6);
    if (lights.length) widgets.push({ type: "toggles", entities: lights, col_span: 2, row_span: 1 });
    const people = of("person", 4);
    if (people.length) widgets.push({ type: "people", entities: people, col_span: 1, row_span: 1 });
    return { theme: "auto", columns: 4, portrait_columns: 2, widgets };
  }

  public setConfig(config: DashboardConfig): void {
    if (!config) throw new Error("Invalid configuration");
    if (config.widgets !== undefined && !Array.isArray(config.widgets)) throw new Error("`widgets` must be a list");
    for (const w of config.widgets ?? []) {
      if (!w || typeof w !== "object" || !w.type) throw new Error("Every widget needs a `type`");
    }
    this._config = { ...config, widgets: config.widgets ?? [] };
  }

  public getCardSize(): number {
    return 12;
  }

  public getGridOptions() {
    return { columns: "full", rows: "auto" };
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._mql.addEventListener("change", this._onOrientation);
    this._portraitMedia = this._mql.matches;
    this._resizeObserver.observe(this);
    window.addEventListener("resize", this._onWindowResize);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._mql.removeEventListener("change", this._onOrientation);
    this._resizeObserver.disconnect();
    window.removeEventListener("resize", this._onWindowResize);
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (!this._config) return false;
    // Widgets filter their own hass updates; only re-render here when needed.
    if (changed.size === 1 && changed.has("hass")) {
      const old = changed.get("hass") as HomeAssistant | undefined;
      this._pushHass();
      return !old || old.themes?.darkMode !== this.hass?.themes?.darkMode;
    }
    return true;
  }

  /** Passes new hass objects straight to widgets without re-rendering the whole grid. */
  private _pushHass(): void {
    this.renderRoot?.querySelectorAll<HTMLElement & { hass?: HomeAssistant }>(".tile > *").forEach((el) => (el.hass = this.hass));
  }

  private get _portrait(): boolean {
    const o = this._config?.orientation ?? DEFAULTS.orientation;
    return o === "portrait" || (o === "auto" && this._portraitMedia);
  }

  private get _themeClass(): string {
    const t = this._config?.theme ?? DEFAULTS.theme;
    if (t === "auto") return this.hass?.themes?.darkMode ? "dark" : "light";
    return t;
  }

  private _renderWidget(w: WidgetConfig, portrait: boolean, columns: number) {
    const def = WIDGETS[w.type];
    const displayOnly = !!this._config!.display_only;
    const merged = { ...def?.defaults, ...w };
    const colSpan = Math.min(columns, Math.max(1, (portrait ? merged.portrait_col_span : undefined) ?? merged.col_span ?? 1));
    const rowSpan = Math.max(1, (portrait ? merged.portrait_row_span : undefined) ?? merged.row_span ?? 1);
    const style = { gridColumn: `span ${colSpan}`, gridRow: `span ${rowSpan}` };

    if (!def) {
      return html`<div class="tile error" style=${styleMap(style)}>Unknown widget type “${w.type}”</div>`;
    }
    const tag = unsafeStatic(def.tag);
    return html`<div class=${classMap({ tile: true, transparent: !!merged.transparent, [`w-${w.type}`]: true })} style=${styleMap(style)}>
      ${staticHtml`<${tag} .hass=${this.hass} .config=${merged} .displayOnly=${displayOnly}></${tag}>`}
    </div>`;
  }

  /** Logical canvas size for a fixed screen preset, or undefined when filling the available space. */
  private _fixedScreen(c: DashboardConfig, portrait: boolean): { width: number; height: number; scale: number } | undefined {
    const screen = c.screen ?? DEFAULTS.screen;
    if (screen === "fill") return undefined;
    const preset = SCREENS[screen];
    let w = preset?.width ?? Number(c.screen_width);
    let h = preset?.height ?? Number(c.screen_height);
    if (!(w > 0 && h > 0)) return undefined;
    if (portrait !== h > w) [w, h] = [h, w];
    const uiScale = Number(c.ui_scale);
    const scale = uiScale > 0 ? uiScale : autoScale(w, h);
    return { width: Math.round(w / scale), height: Math.round(h / scale), scale };
  }

  protected render() {
    if (!this._config) return nothing;
    const c = { ...DEFAULTS, ...this._config };
    const portrait = this._portrait;
    const columns = Math.max(1, portrait ? c.portrait_columns : c.columns);
    const fixed = this._fixedScreen(c, portrait);
    const fill = !!fixed || c.height !== "auto";
    const visible = c.widgets.filter((w) => {
      const v = w.visibility ?? "all";
      return v === "all" || (v === "portrait") === portrait;
    });

    const themeClass = this._themeClass;
    const vars: Record<string, string> = {
      "--cols": String(columns),
      "--gap": `${c.gap}px`,
      "--row-height": `${c.row_height}px`,
      ...(themeClass === "ha" ? {} : paletteVars(resolvePalette(c.palette, themeClass === "dark", c.custom_palette), themeClass === "dark")),
    };
    if (c.accent_color) {
      vars["--h-accent"] = c.accent_color;
      vars["--h-accent-soft"] = `color-mix(in srgb, ${c.accent_color} 15%, transparent)`;
    }
    if (c.background) vars["--h-bg-image"] = `url("${c.background}")`;

    let canvasStyle: Record<string, string> = {};
    if (fixed) {
      // Scale the fixed-resolution canvas to fit the space we have, keeping its aspect ratio.
      const availW = this._size.width || fixed.width;
      const availH = this.preview || c.height === "auto" ? Infinity : Math.max(240, window.innerHeight - this._size.top);
      const k = Math.min(availW / fixed.width, availH / fixed.height);
      const frameH = Number.isFinite(availH) ? availH : fixed.height * k;
      vars.height = `${Math.floor(frameH)}px`;
      canvasStyle = {
        width: `${fixed.width}px`,
        height: `${fixed.height}px`,
        transform: `scale(${k})`,
        left: `${Math.max(0, (availW - fixed.width * k) / 2)}px`,
        top: `${Math.max(0, (frameH - fixed.height * k) / 2)}px`,
        visibility: this._size.width ? "visible" : "hidden",
      };
    } else {
      vars.height = c.height === "screen" ? (this.preview ? "640px" : "100dvh") : c.height === "auto" ? "auto" : c.height;
    }

    return html`
      <div
        class=${classMap({
          hearth: true,
          [themeClass]: true,
          portrait,
          landscape: !portrait,
          fill,
          fixed: !!fixed,
          "display-only": c.display_only,
          "hide-cursor": c.hide_cursor,
          "has-bg": !!c.background,
        })}
        style=${styleMap(vars)}
      >
        <div class="canvas" style=${styleMap(canvasStyle)}>
          <div class="grid">
            ${visible.length
              ? visible.map((w) => this._renderWidget(w, portrait, columns))
              : html`<div class="tile intro">Add some widgets in the card editor to get started.</div>`}
          </div>
        </div>
      </div>
    `;
  }

  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
      }
      .hearth {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        background: radial-gradient(120% 80% at 0% 0%, var(--h-bg-2) 0%, transparent 60%), var(--h-bg);
        color: var(--h-text);
        font-family: var(--h-font);
        overflow: hidden;
        -webkit-font-smoothing: antialiased;
      }
      .hearth.has-bg {
        background: var(--h-bg-image) center / cover no-repeat, var(--h-bg);
      }
      .hearth.has-bg .tile:not(.transparent) {
        backdrop-filter: blur(18px) saturate(1.2);
        -webkit-backdrop-filter: blur(18px) saturate(1.2);
      }
      .canvas {
        position: relative;
        box-sizing: border-box;
        padding: var(--gap);
        container-type: inline-size;
      }
      .fill .canvas {
        height: 100%;
      }
      .fixed .canvas {
        position: absolute;
        top: 0;
        transform-origin: 0 0;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
        grid-auto-rows: var(--row-height);
        grid-auto-flow: row dense;
        gap: var(--gap);
      }
      .fill .grid {
        height: 100%;
        grid-auto-rows: minmax(0, 1fr);
      }
      .tile {
        position: relative;
        min-width: 0;
        min-height: 0;
        overflow: hidden;
        padding: clamp(14px, 1.6cqw, 22px);
        border-radius: var(--h-radius);
        background: var(--h-surface);
        box-shadow: var(--h-shadow);
        border: 1px solid var(--h-border);
        animation: rise 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both;
      }
      .tile.transparent {
        background: transparent;
        box-shadow: none;
        border-color: transparent;
      }
      .tile.error,
      .tile.intro {
        display: grid;
        place-items: center;
        color: var(--h-muted);
        font-weight: 600;
        text-align: center;
      }
      .tile.intro {
        grid-column: 1 / -1;
        min-height: 160px;
      }
      .display-only .grid {
        pointer-events: none;
        user-select: none;
        -webkit-user-select: none;
      }
      .hide-cursor,
      .hide-cursor * {
        cursor: none !important;
      }
      @keyframes rise {
        from {
          opacity: 0;
          transform: translateY(8px);
        }
        to {
          opacity: 1;
          transform: none;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .tile {
          animation: none;
        }
      }
    `,
  ];
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_TAG,
  name: "Hearth Dashboard",
  description: "A modular, widget-based home dashboard for wall tablets and kiosks.",
  preview: false,
  documentationURL: "https://github.com/therealcarnivor/HA-Dashboard",
});

console.info(`%c HEARTH-DASHBOARD %c ${VERSION} `, "color:#fff;background:#d4774f;font-weight:700;border-radius:4px 0 0 4px", "color:#d4774f;background:#f3eee7;border-radius:0 4px 4px 0");
