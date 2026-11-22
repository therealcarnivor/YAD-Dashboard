import { css, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { resolveImageMedia } from "../image-media";
import { widgetStyles } from "../styles";
import type { MediaSource, WidgetConfig } from "../types";
import { fireEvent } from "../utils";
import { YadWidget } from "./base";

export interface MenuItem {
  name: string;
  /** Dashboard path, for example /yad-kitchen/0. */
  path: string;
  icon?: string;
  background_media?: MediaSource;
}

export interface MenuConfig extends WidgetConfig {
  type: "menu";
  items?: MenuItem[];
  direction?: "vertical" | "horizontal";
  show_icons?: boolean;
  /** Button text size in px; icons scale with it. */
  font_size?: number;
  page_mode?: boolean;
  active_page?: string;
}

const trim = (p: string): string => p.split(/[?#]/)[0].replace(/\/+$/, "") || "/";

interface ImageRequest {
  timer?: number;
}

@customElement("yad-widget-menu")
export class YadMenu extends YadWidget<MenuConfig> {
  @state() private _path = window.location.pathname;
  @state() private _images = new Map<string, { url?: string; error?: string }>();
  private _imageRequests = new Map<string, ImageRequest>();
  private readonly _sync = (): void => {
    this._path = window.location.pathname;
  };

  protected watchedEntities(): string[] {
    return [];
  }

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("location-changed", this._sync);
    window.addEventListener("popstate", this._sync);
    this._sync();
    this.requestUpdate();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("location-changed", this._sync);
    window.removeEventListener("popstate", this._sync);
    for (const request of this._imageRequests.values()) window.clearTimeout(request.timer);
    this._imageRequests.clear();
    this._images = new Map();
  }

  protected updated(): void {
    if (!this.isConnected) return;
    const sources = new Set((this.config.items ?? []).map((item) => item?.background_media?.media_content_id).filter((source): source is string => !!source));
    for (const [source, request] of this._imageRequests) {
      if (!sources.has(source)) {
        window.clearTimeout(request.timer);
        this._imageRequests.delete(source);
        const images = new Map(this._images);
        images.delete(source);
        this._images = images;
      }
    }
    for (const source of sources) {
      if (this._imageRequests.has(source) || (source.startsWith("media-source://") && !this.hass)) continue;
      const request: ImageRequest = {};
      this._imageRequests.set(source, request);
      void this._resolveImage(source, request);
    }
  }

  private async _resolveImage(source: string, request: ImageRequest): Promise<void> {
    window.clearTimeout(request.timer);
    try {
      const url = source.startsWith("media-source://") ? await resolveImageMedia(this.hass!, source) : source;
      if (this._imageRequests.get(source) !== request) return;
      this._images = new Map(this._images).set(source, { url });
      if (source.startsWith("media-source://")) {
        request.timer = window.setTimeout(() => void this._resolveImage(source, request), 23 * 60 * 60 * 1000);
      }
    } catch (error) {
      if (this._imageRequests.get(source) !== request) return;
      this._setImageError(source, request, error instanceof Error ? error.message : "Could not load background image");
    }
  }

  private _setImageError(source: string, request: ImageRequest, error: string): void {
    window.clearTimeout(request.timer);
    this._images = new Map(this._images).set(source, { error });
    request.timer = window.setTimeout(() => void this._resolveImage(source, request), 60_000);
  }

  private _imageFailed(source: string, url: string): void {
    const request = this._imageRequests.get(source);
    if (request && this._images.get(source)?.url === url) {
      this._setImageError(source, request, "Could not load background image");
    }
  }

  private _active(item: MenuItem): boolean {
    if (this.config.page_mode) return item.path === this.config.active_page;
    const target = trim(item.path);
    const here = trim(this._path);
    return here === target || here.startsWith(`${target}/`);
  }

  private _go(item: MenuItem): void {
    if (this.displayOnly || !item.path || this._active(item)) return;
    if (this.config.page_mode) {
      fireEvent(this, "yad-page-selected", { page: item.path });
      return;
    }
    // Keep query flags such as ?kiosk when moving between dashboards.
    const url = /[?#]/.test(item.path) ? item.path : `${item.path}${window.location.search}`;
    window.history.pushState(null, "", url);
    window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
  }

  protected render() {
    const items = (this.config.items ?? []).filter((i) => i?.name && i.path);
    const icons = this.config.show_icons !== false;
    if (!items.length) {
      return html`<div class="empty"><ha-icon icon="mdi:menu"></ha-icon>Add menu buttons</div>`;
    }
    const size = Number(this.config.font_size);
    const fontStyle = size > 0 ? `font-size:${size}px` : "";
    return html`
      ${this.config.title ? html`<div class="head"><ha-icon icon="mdi:menu"></ha-icon>${this.config.title}</div>` : nothing}
      <nav class="menu ${this.config.direction === "horizontal" ? "horizontal" : ""}" style=${fontStyle}>
        ${items.map((item) => {
          const active = this._active(item);
          const source = item.background_media?.media_content_id;
          const image = source ? this._images.get(source) : undefined;
          return html`<button class="item ${active ? "active" : ""} ${image?.url ? "has-image" : ""}" aria-current=${active ? "page" : "false"} @click=${() => this._go(item)}>
            ${source && image?.url ? html`<img class="button-image" src=${image.url} alt="" @error=${() => this._imageFailed(source, image.url!)}>` : nothing}
            ${icons && item.icon ? html`<ha-icon icon=${item.icon}></ha-icon>` : nothing}
            <span class="label">${item.name}</span>
            ${image?.error ? html`<span class="image-error" role="alert" title=${image.error}>Image unavailable: ${image.error}</span>` : nothing}
          </button>`;
        })}
      </nav>
    `;
  }

  static styles = [
    widgetStyles,
    css`
      .menu {
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .menu.horizontal { flex-direction: row; }
      .item {
        all: unset;
        position: relative;
        overflow: hidden;
        isolation: isolate;
        box-sizing: border-box;
        flex: 1 1 0;
        min-width: 0;
        min-height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 8px 14px;
        border-radius: var(--h-radius-sm);
        background: var(--h-surface-2);
        color: var(--h-text);
        font-weight: 700;
        cursor: pointer;
        transition: background 0.2s ease, color 0.2s ease, transform 0.15s ease;
        -webkit-tap-highlight-color: transparent;
      }
      .item:active { transform: scale(0.97); }
      .item:focus-visible { outline: 2px solid var(--h-accent); outline-offset: 2px; }
      .item ha-icon {
        --mdc-icon-size: 1.4em;
        flex: none;
        color: var(--h-muted);
      }
      .label {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .item.active {
        background: var(--h-accent-soft);
        color: var(--h-accent);
        cursor: default;
      }
      .item.active ha-icon { color: var(--h-accent); }
      .button-image {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -2;
      }
      .item.has-image::before {
        content: "";
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: -1;
      }
      .item.has-image, .item.has-image ha-icon { color: #fff; }
      .item.has-image.active::after {
        content: "";
        position: absolute;
        inset: 0;
        border: 3px solid var(--h-accent);
        border-radius: inherit;
        pointer-events: none;
      }
      .image-error { font-size: 0.7em; color: var(--h-muted); overflow: hidden; text-overflow: ellipsis; }
      :host([auto-height]) .item { flex: none; }
    `,
  ];
}
