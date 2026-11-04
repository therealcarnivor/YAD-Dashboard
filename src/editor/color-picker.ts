import { css, html, LitElement, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { fireEvent } from "../utils";

interface Hsv {
  h: number;
  s: number;
  v: number;
}

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

export const normaliseHex = (value: string | undefined): string | undefined => {
  if (!value) return undefined;
  let hex = value.trim().replace(/^#/, "").toLowerCase();
  if (/^[0-9a-f]{3}$/.test(hex)) hex = [...hex].map((c) => c + c).join("");
  return /^[0-9a-f]{6}$/.test(hex) ? `#${hex}` : undefined;
};

export const hexToHsv = (hex: string): Hsv => {
  const n = parseInt(hex.slice(1), 16);
  const r = ((n >> 16) & 255) / 255;
  const g = ((n >> 8) & 255) / 255;
  const b = (n & 255) / 255;
  const max = Math.max(r, g, b);
  const d = max - Math.min(r, g, b);
  let h = 0;
  if (d) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
  }
  return { h: (h * 60 + 360) % 360, s: max ? d / max : 0, v: max };
};

export const hsvToHex = ({ h, s, v }: Hsv): string => {
  const f = (n: number) => {
    const k = (n + h / 60) % 6;
    return v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
  };
  return `#${[f(5), f(3), f(1)].map((x) => Math.round(x * 255).toString(16).padStart(2, "0")).join("")}`;
};

/** A compact colour field that expands into a hue/saturation wheel with a brightness slider. */
@customElement("yad-color-picker")
export class YadColorPicker extends LitElement {
  @property() public label = "";
  @property() public value?: string;
  /** Shown (faded) when no value is set, e.g. the palette's own colour. */
  @property() public placeholder?: string;
  @state() private _open = false;
  @state() private _hsv: Hsv = { h: 0, s: 0, v: 1 };
  @state() private _text = "";
  @query(".wheel") private _wheel?: HTMLElement;

  protected willUpdate(changed: Map<string, unknown>): void {
    if (changed.has("value") || changed.has("placeholder")) {
      const hex = normaliseHex(this.value) ?? normaliseHex(this.placeholder);
      if (hex && hsvToHex(this._hsv) !== hex) this._hsv = hexToHsv(hex);
      this._text = this.value ?? "";
    }
  }

  private _emit(value: string | undefined): void {
    this.value = value;
    fireEvent(this, "value-changed", { value });
  }

  private _setHsv(hsv: Hsv): void {
    this._hsv = hsv;
    this._emit(hsvToHex(hsv));
  }

  private _pickFromPointer(ev: PointerEvent): void {
    const rect = this._wheel!.getBoundingClientRect();
    const r = rect.width / 2;
    const dx = ev.clientX - rect.left - r;
    const dy = ev.clientY - rect.top - r;
    const h = ((Math.atan2(dx, -dy) * 180) / Math.PI + 360) % 360;
    const s = clamp(Math.hypot(dx, dy) / r, 0, 1);
    this._setHsv({ h, s, v: this._hsv.v || 1 });
  }

  private _onPointerDown = (ev: PointerEvent): void => {
    ev.preventDefault();
    this._wheel!.setPointerCapture(ev.pointerId);
    this._pickFromPointer(ev);
  };

  private _onPointerMove = (ev: PointerEvent): void => {
    if (this._wheel!.hasPointerCapture(ev.pointerId)) this._pickFromPointer(ev);
  };

  private _onBrightness(ev: Event): void {
    this._setHsv({ ...this._hsv, v: Number((ev.target as HTMLInputElement).value) / 100 });
  }

  private _onText(ev: Event): void {
    const raw = (ev.target as HTMLInputElement).value;
    this._text = raw;
    const hex = normaliseHex(raw);
    if (hex) {
      this._hsv = hexToHsv(hex);
      this._emit(hex);
    } else if (!raw) {
      this._emit(undefined);
    }
  }

  protected render() {
    const shown = normaliseHex(this.value) ?? normaliseHex(this.placeholder);
    const { h, s, v } = this._hsv;
    const rad = (h * Math.PI) / 180;
    const markerX = 50 + Math.sin(rad) * s * 50;
    const markerY = 50 - Math.cos(rad) * s * 50;
    const pure = hsvToHex({ h, s, v: 1 });

    return html`
      <div class="field">
        <button class="swatch ${this.value ? "" : "unset"}" style="--c:${shown ?? "transparent"}" @click=${() => (this._open = !this._open)} title="Pick a colour"></button>
        <div class="text">
          <label>${this.label}</label>
          <input .value=${this._text} placeholder=${this.placeholder ?? "#rrggbb"} spellcheck="false" @input=${this._onText} />
        </div>
        ${this.value ? html`<button class="icon" title="Reset to palette" @click=${() => this._emit(undefined)}>✕</button>` : nothing}
        <button class="icon" title=${this._open ? "Close" : "Colour wheel"} @click=${() => (this._open = !this._open)}>${this._open ? "▴" : "▾"}</button>
      </div>
      ${this._open
        ? html`<div class="panel">
            <div class="wheel" @pointerdown=${this._onPointerDown} @pointermove=${this._onPointerMove}>
              <div class="shade" style="opacity:${1 - v}"></div>
              <div class="marker" style="left:${markerX}%;top:${markerY}%;background:${shown}"></div>
            </div>
            <div class="slider-row">
              <span>Brightness</span>
              <input type="range" min="0" max="100" .value=${String(Math.round(v * 100))} style="--pure:${pure}" @input=${this._onBrightness} />
            </div>
          </div>`
        : nothing}
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    .field {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 8px;
      border: 1px solid var(--divider-color, #ddd);
      border-radius: 12px;
    }
    button {
      all: unset;
      cursor: pointer;
    }
    .swatch {
      flex: none;
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: var(--c);
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.12);
    }
    .swatch.unset {
      opacity: 0.55;
      background: linear-gradient(135deg, transparent 46%, rgba(0, 0, 0, 0.25) 47%, rgba(0, 0, 0, 0.25) 53%, transparent 54%), var(--c);
    }
    .text {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
    }
    label {
      font-size: 0.78em;
      color: var(--secondary-text-color);
    }
    input:not([type="range"]) {
      all: unset;
      font: inherit;
      color: var(--primary-text-color);
      font-family: ui-monospace, monospace;
    }
    input::placeholder {
      color: var(--secondary-text-color);
      opacity: 0.7;
    }
    .icon {
      width: 30px;
      height: 30px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      color: var(--secondary-text-color);
    }
    .icon:hover {
      background: var(--secondary-background-color);
    }
    .panel {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding: 14px 8px 4px;
    }
    .wheel {
      position: relative;
      width: min(220px, 70vw);
      aspect-ratio: 1;
      border-radius: 50%;
      background: radial-gradient(circle closest-side, #fff, rgba(255, 255, 255, 0)),
        conic-gradient(#f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00);
      touch-action: none;
      cursor: crosshair;
    }
    .shade {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: #000;
      pointer-events: none;
    }
    .marker {
      position: absolute;
      width: 22px;
      height: 22px;
      margin: -11px 0 0 -11px;
      border-radius: 50%;
      border: 3px solid #fff;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25), 0 2px 6px rgba(0, 0, 0, 0.3);
      pointer-events: none;
    }
    .slider-row {
      display: flex;
      align-items: center;
      gap: 10px;
      width: min(260px, 100%);
      font-size: 0.85em;
      color: var(--secondary-text-color);
    }
    input[type="range"] {
      flex: 1;
      appearance: none;
      height: 10px;
      border-radius: 5px;
      background: linear-gradient(90deg, #000, var(--pure));
      outline: none;
    }
    input[type="range"]::-webkit-slider-thumb {
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.3);
    }
    input[type="range"]::-moz-range-thumb {
      width: 20px;
      height: 20px;
      border: none;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.3);
    }
  `;
}
