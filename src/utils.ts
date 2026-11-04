import type { EntityRef, HassEntity, HomeAssistant } from "./types";

export interface NormalisedEntity {
  entity: string;
  name?: string;
  icon?: string;
  color?: string;
}

export const normaliseEntities = (list: EntityRef[] | undefined): NormalisedEntity[] =>
  (list ?? [])
    .map((e) => (typeof e === "string" ? { entity: e } : e))
    .filter((e): e is NormalisedEntity => !!e && typeof e.entity === "string" && e.entity.length > 0);

export const fireEvent = (node: EventTarget, type: string, detail?: unknown): void => {
  node.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
};

export const openMoreInfo = (node: EventTarget, entityId: string): void =>
  fireEvent(node, "hass-more-info", { entityId });

export const domainOf = (entityId: string): string => entityId.split(".")[0];

export const entityName = (stateObj: HassEntity | undefined, override?: string, fallback = ""): string =>
  override || stateObj?.attributes.friendly_name || stateObj?.entity_id || fallback;

export const isUnavailable = (stateObj?: HassEntity): boolean =>
  !stateObj || stateObj.state === "unavailable" || stateObj.state === "unknown";

export const numericState = (stateObj?: HassEntity): number | undefined => {
  if (!stateObj || stateObj.state === "" || stateObj.state === null) return undefined;
  const n = Number(stateObj.state);
  return Number.isFinite(n) ? n : undefined;
};

export const lang = (hass?: HomeAssistant): string => hass?.locale?.language || hass?.language || navigator.language;

export const formatState = (hass: HomeAssistant | undefined, stateObj: HassEntity | undefined): string => {
  if (!stateObj) return "—";
  if (hass?.formatEntityState) {
    try {
      return hass.formatEntityState(stateObj);
    } catch {
      /* fall through */
    }
  }
  const unit = stateObj.attributes.unit_of_measurement;
  const n = numericState(stateObj);
  const value = n !== undefined ? formatNumber(hass, n) : capitalise(stateObj.state.replace(/_/g, " "));
  return unit ? `${value} ${unit}` : value;
};

export const formatNumber = (hass: HomeAssistant | undefined, n: number, maxFractionDigits = 1): string =>
  new Intl.NumberFormat(lang(hass), { maximumFractionDigits: maxFractionDigits }).format(n);

export const capitalise = (s: string): string => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

export const use12h = (hass?: HomeAssistant, override?: string): boolean => {
  if (override === "12") return true;
  if (override === "24") return false;
  const fmt = hass?.locale?.time_format;
  if (fmt === "12") return true;
  if (fmt === "24") return false;
  const locale = fmt === "system" ? undefined : lang(hass);
  return new Intl.DateTimeFormat(locale, { hour: "numeric" }).resolvedOptions().hour12 === true;
};

export const formatTime = (hass: HomeAssistant | undefined, d: Date, override?: string): string =>
  new Intl.DateTimeFormat(lang(hass), { hour: "numeric", minute: "2-digit", hour12: use12h(hass, override) }).format(d);

export const startOfDay = (d: Date): Date => new Date(d.getFullYear(), d.getMonth(), d.getDate());

export const addDays = (d: Date, days: number): Date => {
  const r = new Date(d);
  r.setDate(r.getDate() + days);
  return r;
};

/** Parses "YYYY-MM-DD" as a local date rather than UTC midnight. */
export const parseDate = (value: string): Date => {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [y, m, d] = value.split("-").map(Number);
    return new Date(y, m - 1, d);
  }
  return new Date(value);
};

export const relativeDayLabel = (hass: HomeAssistant | undefined, d: Date): string => {
  const today = startOfDay(new Date());
  const diff = Math.round((startOfDay(d).getTime() - today.getTime()) / 86_400_000);
  if (diff === 0 || diff === 1) {
    return capitalise(new Intl.RelativeTimeFormat(lang(hass), { numeric: "auto" }).format(diff, "day"));
  }
  return new Intl.DateTimeFormat(lang(hass), { weekday: "long", day: "numeric", month: "short" }).format(d);
};

/** Tap vs. long-press handling that works for both mouse and touch. */
export const pressHandlers = (onTap: () => void, onHold: () => void) => {
  let timer: number | undefined;
  let held = false;
  let active = false;
  return {
    down: () => {
      held = false;
      active = true;
      timer = window.setTimeout(() => {
        held = true;
        onHold();
      }, 550);
    },
    up: () => {
      window.clearTimeout(timer);
      if (active && !held) onTap();
      active = false;
    },
    cancel: () => {
      window.clearTimeout(timer);
      active = false;
    },
  };
};
