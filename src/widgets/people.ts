import { css, html, nothing } from "lit";
import { customElement } from "lit/decorators.js";
import { widgetStyles } from "../styles";
import type { EntityRef, WidgetConfig } from "../types";
import { capitalise, entityName, normaliseEntities, openMoreInfo } from "../utils";
import { YadWidget } from "./base";

export interface PeopleConfig extends WidgetConfig {
  type: "people";
  entities: EntityRef[];
  show_state?: boolean;
}

const initials = (name: string): string =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p.charAt(0).toUpperCase())
    .join("");

@customElement("yad-widget-people")
export class YadPeople extends YadWidget<PeopleConfig> {
  protected watchedEntities(): string[] {
    return normaliseEntities(this.config.entities).map((e) => e.entity);
  }

  protected render() {
    const people = normaliseEntities(this.config.entities);
    return html`
      ${this.config.title ? html`<div class="head"><ha-icon icon="mdi:home-account"></ha-icon>${this.config.title}</div>` : nothing}
      <div class="people">
        ${people.map((p) => {
          const s = this.hass?.states[p.entity];
          const name = entityName(s, p.name, p.entity);
          const home = s?.state === "home";
          const away = s?.state === "not_home";
          const label = home ? "Home" : away ? "Away" : s ? capitalise(this.hass?.formatEntityState?.(s) ?? s.state) : "Unknown";
          const pic: string | undefined = s?.attributes.entity_picture;
          return html`<div class="person ${home ? "home" : "away"}" @click=${() => !this.displayOnly && openMoreInfo(this, p.entity)}>
            <div class="avatar">
              ${pic ? html`<img src=${pic} alt="" />` : html`<span>${initials(name)}</span>`}
              <span class="dot"></span>
            </div>
            <div class="name">${name.split(" ")[0]}</div>
            ${this.config.show_state !== false ? html`<div class="state">${label}</div>` : nothing}
          </div>`;
        })}
      </div>
    `;
  }

  static styles = [
    widgetStyles,
    css`
      .people {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-wrap: wrap;
        gap: 12px;
        min-height: 0;
      }
      .person {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        cursor: pointer;
        min-width: 64px;
      }
      .avatar {
        --size: clamp(48px, 34cqh, 84px);
        width: var(--size);
        height: var(--size);
        border-radius: 50%;
        position: relative;
        display: grid;
        place-items: center;
        background: var(--h-accent-soft);
        color: var(--h-accent);
        font-weight: 800;
        font-size: calc(var(--size) * 0.36);
      }
      .avatar img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
      .away .avatar img,
      .away .avatar span:first-child {
        filter: grayscale(0.8);
        opacity: 0.6;
      }
      .dot {
        position: absolute;
        right: 2%;
        bottom: 2%;
        width: 26%;
        height: 26%;
        border-radius: 50%;
        background: var(--h-muted);
        border: 3px solid var(--h-surface);
      }
      .home .dot {
        background: var(--h-sage);
      }
      .name {
        font-weight: 800;
      }
      .state {
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--h-muted);
      }
      .home .state {
        color: var(--h-sage);
      }
    `,
  ];
}
