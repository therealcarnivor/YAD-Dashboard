import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { DashboardConfig, HomeAssistant, WidgetConfig, WidgetType } from "../types";
import { fireEvent } from "../utils";
import { LABELS, LAYOUT_SCHEMA, WIDGETS } from "../widgets/registry";

const GENERAL_SCHEMA = [
  {
    type: "grid",
    name: "",
    schema: [
      {
        name: "theme",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "auto", label: "Auto (follow HA light/dark)" },
              { value: "light", label: "Hearth light" },
              { value: "dark", label: "Hearth dark" },
              { value: "ha", label: "Use my HA theme" },
            ],
          },
        },
      },
      {
        name: "orientation",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "auto", label: "Auto (detect)" },
              { value: "landscape", label: "Landscape" },
              { value: "portrait", label: "Portrait" },
            ],
          },
        },
      },
      { name: "columns", selector: { number: { min: 1, max: 12, mode: "box" } } },
      { name: "portrait_columns", selector: { number: { min: 1, max: 12, mode: "box" } } },
      {
        name: "height",
        selector: {
          select: {
            mode: "dropdown",
            custom_value: true,
            options: [
              { value: "screen", label: "Fill the screen" },
              { value: "auto", label: "Fixed row height (scrolls)" },
            ],
          },
        },
      },
      { name: "row_height", selector: { number: { min: 60, max: 600, step: 10, mode: "box", unit_of_measurement: "px" } } },
      { name: "gap", selector: { number: { min: 0, max: 48, mode: "box", unit_of_measurement: "px" } } },
      { name: "accent_color", selector: { text: {} } },
    ],
  },
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
  theme: "Theme",
  orientation: "Orientation",
  columns: "Columns (landscape)",
  portrait_columns: "Columns (portrait)",
  height: "Height",
  row_height: "Row height (when not filling screen)",
  gap: "Spacing",
  accent_color: "Accent colour (e.g. #d4774f)",
  background: "Background image URL (optional)",
  display_only: "Display only (no touch)",
  hide_cursor: "Hide mouse cursor",
};

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

  protected render() {
    if (!this._config || !this.hass) return nothing;
    if (this._selected !== undefined) return this._renderWidgetEditor(this._selected);

    return html`
      <div class="section">
        <div class="section-title"><ha-icon icon="mdi:palette-outline"></ha-icon>Look & layout</div>
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${GENERAL_SCHEMA}
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
  `;
}
