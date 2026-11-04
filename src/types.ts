import type { CustomPalette } from "./palettes";

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed: string;
  last_updated: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  language: string;
  locale?: { language: string; time_format?: string };
  themes?: { darkMode?: boolean };
  user?: { name?: string };
  config?: { time_zone?: string; unit_system?: Record<string, string> };
  callService(domain: string, service: string, data?: Record<string, unknown>, target?: Record<string, unknown>): Promise<unknown>;
  callApi<T>(method: "GET" | "POST" | "PUT" | "DELETE", path: string, data?: Record<string, unknown>): Promise<T>;
  callWS<T>(msg: Record<string, unknown>): Promise<T>;
  connection: {
    subscribeMessage<T>(callback: (msg: T) => void, msg: Record<string, unknown>): Promise<() => void>;
  };
  formatEntityState?(stateObj: HassEntity, state?: string): string;
}

export type EntityRef = string | { entity: string; name?: string; icon?: string; color?: string };

export type WidgetType =
  | "clock"
  | "weather"
  | "calendar"
  | "energy"
  | "climate"
  | "toggles"
  | "sensors"
  | "media"
  | "people"
  | "card";

export interface WidgetConfig {
  type: WidgetType;
  title?: string;
  col_span?: number;
  row_span?: number;
  portrait_col_span?: number;
  portrait_row_span?: number;
  /** Which orientations the widget is shown in. */
  visibility?: "all" | "landscape" | "portrait";
  /** Render without the tile background (useful for the clock). */
  transparent?: boolean;
  [key: string]: any;
}

export interface DashboardConfig {
  type: string;
  /** Light/dark mode, or "ha" to use the active Home Assistant theme. */
  theme?: "auto" | "light" | "dark" | "ha";
  /** A key of PALETTES, or "custom". */
  palette?: string;
  custom_palette?: CustomPalette;
  accent_color?: string;
  background?: string;
  orientation?: "auto" | "landscape" | "portrait";
  /** "fill" uses whatever space is available, or a key of SCREENS / "custom" for a fixed resolution. */
  screen?: string;
  screen_width?: number;
  screen_height?: number;
  /** UI scale for fixed screens; "auto" picks one from the resolution. */
  ui_scale?: number | string;
  columns?: number;
  portrait_columns?: number;
  /** "screen" fills the viewport (ideal with ?kiosk), "auto" grows with content, or any CSS height. */
  height?: string;
  row_height?: number;
  gap?: number;
  display_only?: boolean;
  hide_cursor?: boolean;
  widgets: WidgetConfig[];
}

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
    loadCardHelpers?: () => Promise<any>;
  }
}
