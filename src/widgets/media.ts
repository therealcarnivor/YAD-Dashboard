import { css, html, nothing } from "lit";
import { customElement } from "lit/decorators.js";
import { widgetStyles } from "../styles";
import type { WidgetConfig } from "../types";
import { entityName, isUnavailable, openMoreInfo } from "../utils";
import { YadWidget } from "./base";

export interface MediaConfig extends WidgetConfig {
  type: "media";
  entity: string;
  name?: string;
  show_volume?: boolean;
}

// media_player supported_features bit flags
const SUPPORT_PREVIOUS = 16;
const SUPPORT_NEXT = 32;
const SUPPORT_VOLUME_SET = 4;

@customElement("yad-widget-media")
export class YadMedia extends YadWidget<MediaConfig> {
  protected watchedEntities(): string[] {
    return [this.config.entity];
  }

  private _call(service: string, extra: Record<string, unknown> = {}): void {
    this.callService("media_player", service, { entity_id: this.config.entity, ...extra });
  }

  private _volume(ev: Event): void {
    const value = Number((ev.target as HTMLInputElement).value);
    this._call("volume_set", { volume_level: value / 100 });
  }

  protected render() {
    const s = this.hass?.states[this.config.entity];
    if (!s) {
      return html`<div class="empty"><ha-icon icon="mdi:speaker-off"></ha-icon>Media player not found<br /><small>${this.config.entity}</small></div>`;
    }
    const a = s.attributes;
    const name = entityName(s, this.config.name ?? this.config.title);
    const active = s.state === "playing" || s.state === "paused" || s.state === "buffering";
    const art: string | undefined = active ? a.entity_picture_local ?? a.entity_picture : undefined;
    const features: number = a.supported_features ?? 0;

    if (!active) {
      return html`
        <div class="head"><ha-icon icon="mdi:music-note-outline"></ha-icon>${name}</div>
        <div class="empty" @click=${() => !this.displayOnly && openMoreInfo(this, this.config.entity)}>
          <ha-icon icon=${isUnavailable(s) ? "mdi:speaker-off" : "mdi:music-note-off-outline"}></ha-icon>
          ${isUnavailable(s) ? "Unavailable" : "Nothing playing"}
        </div>
      `;
    }

    return html`
      ${art ? html`<div class="backdrop" style="background-image:url('${art}')"></div>` : nothing}
      <div class="head"><ha-icon icon="mdi:music-note-outline"></ha-icon>${name}</div>
      <div class="content">
        <div class="art" @click=${() => !this.displayOnly && openMoreInfo(this, this.config.entity)}>
          ${art ? html`<img src=${art} alt="" />` : html`<ha-icon icon="mdi:music"></ha-icon>`}
        </div>
        <div class="info">
          <div class="title">${a.media_title ?? "Unknown"}</div>
          <div class="artist muted">${a.media_artist ?? a.media_album_name ?? a.app_name ?? ""}</div>
          <div class="controls control">
            ${features & SUPPORT_PREVIOUS
              ? html`<button class="round" @click=${() => this._call("media_previous_track")}><ha-icon icon="mdi:skip-previous"></ha-icon></button>`
              : nothing}
            <button class="round primary big" @click=${() => this._call("media_play_pause")}>
              <ha-icon icon=${s.state === "playing" ? "mdi:pause" : "mdi:play"}></ha-icon>
            </button>
            ${features & SUPPORT_NEXT
              ? html`<button class="round" @click=${() => this._call("media_next_track")}><ha-icon icon="mdi:skip-next"></ha-icon></button>`
              : nothing}
          </div>
          ${this.config.show_volume && features & SUPPORT_VOLUME_SET
            ? html`<input
                class="volume control"
                type="range"
                min="0"
                max="100"
                .value=${String(Math.round((a.volume_level ?? 0) * 100))}
                @change=${this._volume}
              />`
            : nothing}
        </div>
      </div>
    `;
  }

  static styles = [
    widgetStyles,
    css`
      :host([auto-height]) .art { height: min(32cqw, 120px); }
      :host {
        position: relative;
      }
      .backdrop {
        position: absolute;
        inset: -40px;
        background-size: cover;
        background-position: center;
        filter: blur(40px) saturate(1.3);
        opacity: 0.28;
        pointer-events: none;
      }
      .head,
      .content {
        position: relative;
      }
      .content {
        flex: 1;
        min-height: 0;
        overflow: hidden;
        display: flex;
        align-items: center;
        gap: clamp(12px, 4cqw, 24px);
      }
      .art {
        height: min(100%, 50cqw);
        aspect-ratio: 1;
        border-radius: var(--h-radius-sm);
        overflow: hidden;
        background: var(--h-surface-2);
        display: grid;
        place-items: center;
        flex: none;
        box-shadow: var(--h-shadow);
        cursor: pointer;
      }
      .art img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .art ha-icon {
        --mdc-icon-size: 40%;
        color: var(--h-muted);
      }
      .info {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .title {
        font-size: clamp(1.05rem, 7cqmin, 1.6rem);
        font-weight: 800;
        line-height: 1.2;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .artist {
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .controls {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 10px;
      }
      .big {
        width: 56px;
        height: 56px;
      }
      .volume {
        width: 100%;
        margin-top: 8px;
        accent-color: var(--h-accent);
      }
      @container (max-height: 200px) {
        .head,
        .volume {
          display: none;
        }
        .title {
          -webkit-line-clamp: 1;
        }
        .controls {
          margin-top: 4px;
        }
      }
      @container (max-width: 300px) {
        .art {
          display: none;
        }
      }
    `,
  ];
}
