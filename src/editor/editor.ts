import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { PALETTES, type PaletteColors } from "../palettes";
import { SCREENS } from "../screens";
import type { DashboardConfig, HomeAssistant, WidgetConfig, WidgetType } from "../types";
import { fireEvent } from "../utils";
import { LABELS, LAYOUT_SCHEMA, WIDGETS } from "../widgets/registry";
import "./color-picker";

const select = (name: string, options: [string, string][], custom = false) => ({
  name,
  selector: { select: { mode: "dropdown", custom_value: custom, options: options.map(([value, label]) => ({ value, label })) } },
});
const number = (name: string, min: number, max: number, unit?: string, step = 1) => ({
  name,
  selector: { number: { min, max, step, mode: "box", ...(unit ? { unit_of_measurement: unit } : {}) } },
});

const generalSchema = (config: DashboardConfig) => {
  const screen = config.screen ?? "fill";
  return [
    {
      type: "grid",
      name: "",
      schema: [
        select("screen", [["fill", "Fill available space"], ...Object.entries(SCREENS).map(([k, v]): [string, string] => [k, v.label]), ["custom", "Custom resolution…"]]),
        select("orientation", [
          ["auto", "Auto (detect)"],
          ["landscape", "Landscape"],
          ["portrait", "Portrait"],
        ]),
        ...(screen === "custom" ? [number("screen_width", 320, 7680, "px"), number("screen_height", 320, 7680, "px")] : []),
        ...(screen !== "fill"
          ? [select("ui_scale", [["auto", "Auto"], ["1", "100%"], ["1.25", "125%"], ["1.5", "150%"], ["1.75", "175%"], ["2", "200%"], ["3", "300%"]])]
          : []),
        number("columns", 1, 12),
        number("portrait_columns", 1, 12),
        ...(screen === "fill"
          ? [select("height", [["screen", "Fill the screen"], ["auto", "Fixed row height (scrolls)"]], true), number("row_height", 60, 600, "px", 10)]
          : []),
        number("gap", 0, 48, "px"),
      ],
    },
    {
      type: "grid",
      name: "",
      schema: [
        select("theme", [
          ["auto", "Auto (follow HA light/dark)"],
          ["light", "Light"],
          ["dark", "Dark"],
          ["ha", "Use my HA theme (ignores palette)"],
        ]),
      ],
    },
  ];
};

const BEHAVIOUR_SCHEMA = [
  { name: "background", selector: { text: {} } },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "display_only", selector: { boolean: {} } },
      { name: "hide_cursor", selector: { boolean: {} } },
    ],
  },
];

const GENERAL_LABELS: Record<string, string> = {
  screen: "Screen size",
  screen_width: "Screen width",
  screen_height: "Screen height",
  ui_scale: "UI scale",
  theme: "Light / dark mode",
  orientation: "Orientation",
  columns: "Columns (landscape)",
  portrait_columns: "Columns (portrait)",
  height: "Height",
  row_height: "Row height (when not filling screen)",
  gap: "Spacing",
  background: "Background image URL (optional)",
  display_only: "Display only (no touch)",
  hide_cursor: "Hide mouse cursor",
};

const CUSTOM_FIELDS: [keyof PaletteColors, string][] = [
  ["background", "Background"],
  ["surface", "Tiles"],
  ["text", "Text"],
  ["accent", "Accent"],
  ["success", "On / home"],
  ["warm", "Lights & heating"],
  ["info", "Cooling & info"],
];

/** Removes keys the user cleared so the YAML stays tidy. */
const clean = <T extends Record<string, any>>(obj: T): T =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined && v !== "" && v !== null)) as T;

@customElement("hearth-dashboard-card-editor")
export class HearthDashboardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: DashboardConfig;
  @state() private _selected?: number;
  @state() private _adding = false;
  @state() private _yamlError?: string;

  public setConfig(config: DashboardConfig): void {
    this._config = { ...config, widgets: config.widgets ?? [] };
    if (this._selected !== undefined && this._selected >= this._config.widgets.length) this._selected = undefined;
  }

  connectedCallback(): void {
    super.connectedCallback();
    void this._loadHaComponents();
  }

  /** ha-form / entity pickers are lazy-loaded by HA; borrow a built-in editor to make sure they exist. */
  private async _loadHaComponents(): Promise<void> {
    if (customElements.get("ha-form") && customElements.get("ha-entity-picker")) return;
    try {
      const helpers = await window.loadCardHelpers?.();
      const card = await helpers?.createCardElement({ type: "entities", entities: [] });
      await card?.constructor?.getConfigElement?.();
      this.requestUpdate();
    } catch {
      /* editor still works in YAML mode */
    }
  }

  private _commit(config: DashboardConfig): void {
    this._config = config;
    fireEvent(this, "config-changed", { config });
  }

  private _generalChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    const { widgets, ...rest } = ev.detail.value as DashboardConfig;
    this._commit({ ...clean(rest), widgets: this._config!.widgets } as DashboardConfig);
  }

  private _updateWidget(index: number, widget: WidgetConfig): void {
    const widgets = [...this._config!.widgets];
    widgets[index] = widget;
    this._commit({ ...this._config!, widgets });
  }

  private _widgetChanged(ev: CustomEvent, index: number): void {
    ev.stopPropagation();
    this._updateWidget(index, clean({ ...ev.detail.value, type: this._config!.widgets[index].type }));
  }

  private _cardYamlChanged(ev: CustomEvent, index: number): void {
    ev.stopPropagation();
    if (ev.detail.isValid === false) {
      this._yamlError = "Invalid YAML";
      return;
    }
    this._yamlError = undefined;
    this._updateWidget(index, { ...this._config!.widgets[index], card: ev.detail.value });
  }

  private _add(type: WidgetType): void {
    const widget = { type, ...WIDGETS[type].defaults } as WidgetConfig;
    const widgets = [...this._config!.widgets, widget];
    this._adding = false;
    this._selected = widgets.length - 1;
    this._commit({ ...this._config!, widgets });
  }

  private _move(index: number, delta: number): void {
    const widgets = [...this._config!.widgets];
    const target = index + delta;
    if (target < 0 || target >= widgets.length) return;
    [widgets[index], widgets[target]] = [widgets[target], widgets[index]];
    this._commit({ ...this._config!, widgets });
  }

  private _remove(index: number): void {
    const widgets = this._config!.widgets.filter((_, i) => i !== index);
    this._selected = undefined;
    this._commit({ ...this._config!, widgets });
  }

  private _duplicate(index: number): void {
    const widgets = [...this._config!.widgets];
    widgets.splice(index + 1, 0, structuredClone(widgets[index]));
    this._commit({ ...this._config!, widgets });
  }

  private _summary(w: WidgetConfig): string {
    if (w.title) return w.title;
    const ids: string[] = w.entity ? [w.entity] : (w.entities ?? []).map((e: any) => (typeof e === "string" ? e : e.entity));
    if (w.power_entity) ids.push(w.power_entity);
    if (w.type === "card") return w.card?.type ?? "";
    return ids
      .map((id) => this.hass?.states[id]?.attributes.friendly_name ?? id)
      .slice(0, 3)
      .join(", ");
  }

  private _label = (s: { name: string }) => LABELS[s.name] ?? GENERAL_LABELS[s.name] ?? s.name;

  private _set(patch: Partial<DashboardConfig>): void {
    this._commit(clean({ ...this._config!, ...patch }) as DashboardConfig);
  }

  private _setCustomColor(mode: "light" | "dark", key: keyof PaletteColors, value: string | undefined): void {
    const current = this._config!.custom_palette ?? {};
    const colors = clean({ ...current[mode], [key]: value });
    const next = clean({ ...current, [mode]: Object.keys(colors).length ? colors : undefined });
    this._set({ custom_palette: Object.keys(next).length ? next : undefined });
  }

  private _renderLook() {
    const config = this._config!;
    const palette = config.palette ?? "hearth";
    const usingHa = config.theme === "ha";
    const swatches = (c: PaletteColors) =>
      html`<span class="mini" style="background:${c.background}">
        <i style="background:${c.surface}"></i><i style="background:${c.accent}"></i><i style="background:${c.success}"></i><i style="background:${c.text}"></i>
      </span>`;

    return html`<div class="section">
      <div class="section-title"><ha-icon icon="mdi:palette-outline"></ha-icon>Colour palette</div>
      ${usingHa ? html`<p class="hint">Palettes are ignored while “Use my HA theme” is selected above.</p>` : nothing}
      <div class="palettes ${usingHa ? "disabled" : ""}">
        ${Object.entries(PALETTES).map(
          ([key, p]) => html`<button class="palette ${palette === key ? "selected" : ""}" @click=${() => this._set({ palette: key })}>
            <span class="pair">${swatches(p.light)}${swatches(p.dark)}</span>
            <span class="p-name">${p.label}</span>
            <span class="p-desc">${p.description}</span>
          </button>`,
        )}
        <button class="palette ${palette === "custom" ? "selected" : ""}" @click=${() => this._set({ palette: "custom" })}>
          <span class="pair"><span class="mini rainbow"></span></span>
          <span class="p-name">Custom</span>
          <span class="p-desc">Pick your own colours</span>
        </button>
      </div>

      ${palette === "custom" && !usingHa
        ? (["light", "dark"] as const).map(
            (mode) => html`<div class="custom">
              <div class="sub-title">${mode === "light" ? "Light mode colours" : "Dark mode colours"}</div>
              <div class="pickers">
                ${CUSTOM_FIELDS.map(
                  ([key, label]) => html`<hearth-color-picker
                    .label=${label}
                    .value=${config.custom_palette?.[mode]?.[key]}
                    .placeholder=${PALETTES.hearth[mode][key]}
                    @value-changed=${(e: CustomEvent) => {
                      e.stopPropagation();
                      this._setCustomColor(mode, key, e.detail.value);
                    }}
                  ></hearth-color-picker>`,
                )}
              </div>
            </div>`,
          )
        : nothing}

      <div class="sub-title">Accent override (optional)</div>
      <hearth-color-picker
        .label=${"Accent colour — applies to any palette"}
        .value=${config.accent_color}
        @value-changed=${(e: CustomEvent) => {
          e.stopPropagation();
          this._set({ accent_color: e.detail.value });
        }}
      ></hearth-color-picker>
    </div>`;
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    if (this._selected !== undefined) return this._renderWidgetEditor(this._selected);

    return html`
      <div class="section">
        <div class="section-title"><ha-icon icon="mdi:monitor-screenshot"></ha-icon>Screen & layout</div>
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${generalSchema(this._config)}
          .computeLabel=${this._label}
          @value-changed=${this._generalChanged}
        ></ha-form>
        ${this._config.screen && this._config.screen !== "fill"
          ? html`<p class="hint">
              The dashboard is laid out for this exact resolution and scaled to fit whatever screen it's viewed on, so the
              preview here matches the wall display. <b>UI scale</b> works like your OS display scaling — Auto renders 4K like
              1080p but sharper.
            </p>`
          : nothing}
      </div>

      ${this._renderLook()}

      <div class="section">
        <div class="section-title"><ha-icon icon="mdi:tune-variant"></ha-icon>Behaviour</div>
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${BEHAVIOUR_SCHEMA}
          .computeLabel=${this._label}
          @value-changed=${this._generalChanged}
        ></ha-form>
      </div>

      <div class="section">
        <div class="section-title"><ha-icon icon="mdi:view-grid-outline"></ha-icon>Widgets</div>
        <div class="list">
          ${this._config.widgets.map((w, i) => {
            const def = WIDGETS[w.type];
            return html`<div class="row">
              <ha-icon class="type-icon" icon=${def?.icon ?? "mdi:help-circle-outline"}></ha-icon>
              <div class="row-text" @click=${() => (this._selected = i)}>
                <div class="row-title">${def?.label ?? w.type}</div>
                <div class="row-sub">${this._summary(w)}</div>
              </div>
              <button title="Move up" ?disabled=${i === 0} @click=${() => this._move(i, -1)}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
              <button title="Move down" ?disabled=${i === this._config!.widgets.length - 1} @click=${() => this._move(i, 1)}>
                <ha-icon icon="mdi:arrow-down"></ha-icon>
              </button>
              <button title="Duplicate" @click=${() => this._duplicate(i)}><ha-icon icon="mdi:content-copy"></ha-icon></button>
              <button title="Edit" @click=${() => (this._selected = i)}><ha-icon icon="mdi:pencil"></ha-icon></button>
              <button title="Remove" class="danger" @click=${() => this._remove(i)}><ha-icon icon="mdi:delete-outline"></ha-icon></button>
            </div>`;
          })}
        </div>
        ${this._adding
          ? html`<div class="picker">
              ${(Object.keys(WIDGETS) as WidgetType[]).map(
                (t) => html`<button class="pick" @click=${() => this._add(t)}>
                  <ha-icon icon=${WIDGETS[t].icon}></ha-icon><span>${WIDGETS[t].label}</span>
                </button>`,
              )}
            </div>
            <button class="text-btn" @click=${() => (this._adding = false)}>Cancel</button>`
          : html`<button class="add" @click=${() => (this._adding = true)}><ha-icon icon="mdi:plus"></ha-icon>Add widget</button>`}
      </div>
    `;
  }

  private _renderWidgetEditor(index: number) {
    const w = this._config!.widgets[index];
    const def = WIDGETS[w.type];
    const data = { ...def?.defaults, ...w };
    // The entity picker only handles plain IDs; keep richer `{ entity, color, ... }` lists YAML-only.
    const richEntities = Array.isArray(w.entities) && w.entities.some((e: unknown) => typeof e !== "string");
    const schema = richEntities ? def?.schema.filter((s) => s.name !== "entities") ?? [] : def?.schema ?? [];
    return html`
      <div class="editor-head">
        <button @click=${() => (this._selected = undefined)} title="Back"><ha-icon icon="mdi:arrow-left"></ha-icon></button>
        <ha-icon icon=${def?.icon ?? "mdi:help"}></ha-icon>
        <span>${def?.label ?? w.type}</span>
      </div>
      ${richEntities
        ? html`<p class="hint">This widget's entities use custom names/colours/icons — edit them in the code editor (Show code editor).</p>`
        : nothing}
      ${schema.length
        ? html`<div class="section">
            <ha-form
              .hass=${this.hass}
              .data=${data}
              .schema=${schema}
              .computeLabel=${this._label}
              @value-changed=${(e: CustomEvent) => this._widgetChanged(e, index)}
            ></ha-form>
          </div>`
        : nothing}
      ${w.type === "card"
        ? html`<div class="section">
            <div class="section-title"><ha-icon icon="mdi:code-braces"></ha-icon>Card configuration (YAML)</div>
            <p class="hint">Paste the YAML of any Home Assistant card — built-in or custom.</p>
            <ha-yaml-editor
              .hass=${this.hass}
              .defaultValue=${w.card}
              @value-changed=${(e: CustomEvent) => this._cardYamlChanged(e, index)}
            ></ha-yaml-editor>
            ${this._yamlError ? html`<div class="error">${this._yamlError}</div>` : nothing}
          </div>`
        : nothing}
      <div class="section">
        <div class="section-title"><ha-icon icon="mdi:arrow-expand-all"></ha-icon>Size & placement</div>
        <ha-form
          .hass=${this.hass}
          .data=${data}
          .schema=${LAYOUT_SCHEMA}
          .computeLabel=${this._label}
          @value-changed=${(e: CustomEvent) => this._widgetChanged(e, index)}
        ></ha-form>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    .section {
      margin-bottom: 20px;
    }
    .section-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
      font-size: 1.05rem;
      margin-bottom: 10px;
    }
    .section-title ha-icon {
      color: var(--primary-color);
    }
    .list {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .row {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 6px 6px 6px 12px;
      border: 1px solid var(--divider-color);
      border-radius: 12px;
    }
    .type-icon {
      color: var(--primary-color);
      margin-right: 8px;
    }
    .row-text {
      flex: 1;
      min-width: 0;
      cursor: pointer;
    }
    .row-title {
      font-weight: 500;
    }
    .row-sub {
      font-size: 0.85em;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    button {
      all: unset;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      color: var(--secondary-text-color);
    }
    button:hover {
      background: var(--secondary-background-color);
    }
    button[disabled] {
      opacity: 0.3;
      cursor: default;
    }
    button.danger:hover {
      color: var(--error-color);
    }
    button.add,
    button.text-btn {
      width: auto;
      height: auto;
      border-radius: 10px;
      padding: 8px 14px;
      margin-top: 10px;
      gap: 6px;
      color: var(--primary-color);
      font-weight: 500;
    }
    .picker {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 8px;
      margin-top: 10px;
    }
    button.pick {
      width: auto;
      height: auto;
      border-radius: 12px;
      padding: 12px;
      gap: 10px;
      justify-content: flex-start;
      border: 1px solid var(--divider-color);
      color: var(--primary-text-color);
    }
    button.pick ha-icon {
      color: var(--primary-color);
    }
    .editor-head {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 600;
      font-size: 1.1rem;
      margin-bottom: 16px;
    }
    .editor-head ha-icon {
      color: var(--primary-color);
    }
    .hint {
      margin: 0 0 8px;
      color: var(--secondary-text-color);
      font-size: 0.9em;
    }
    .error {
      color: var(--error-color);
      margin-top: 6px;
    }
    .palettes {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 8px;
    }
    .palettes.disabled {
      opacity: 0.45;
      pointer-events: none;
    }
    button.palette {
      width: auto;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2px;
      padding: 10px;
      border-radius: 14px;
      border: 1px solid var(--divider-color);
      color: var(--primary-text-color);
    }
    button.palette.selected {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 1px var(--primary-color);
    }
    .pair {
      display: flex;
      gap: 4px;
      width: 100%;
      margin-bottom: 6px;
    }
    .mini {
      flex: 1;
      height: 34px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 3px;
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
    }
    .mini i {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
    }
    .mini i:first-child {
      width: 14px;
      height: 18px;
      border-radius: 4px;
    }
    .mini.rainbow {
      background: conic-gradient(#f87171, #fbbf24, #a3e635, #34d399, #38bdf8, #a78bfa, #f472b6, #f87171);
    }
    .p-name {
      font-weight: 600;
      font-size: 0.92em;
    }
    .p-desc {
      font-size: 0.78em;
      color: var(--secondary-text-color);
    }
    .sub-title {
      font-weight: 600;
      margin: 16px 0 8px;
    }
    .pickers {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 8px;
    }
  `;
}
