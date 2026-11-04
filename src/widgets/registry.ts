import type { WidgetConfig, WidgetType } from "../types";
import "./clock";
import "./weather";
import "./calendar";
import "./energy";
import "./climate";
import "./toggles";
import "./sensors";
import "./media";
import "./people";
import "./card";
import "./car";
import "./spacer";

export interface WidgetDefinition {
  label: string;
  icon: string;
  tag: string;
  defaults: Partial<WidgetConfig>;
  /** ha-form schema for the visual editor. */
  schema: any[];
}

const entity = (name: string, domain?: string | string[], required = false) => ({
  name,
  required,
  selector: { entity: domain ? { domain } : {} },
});

const entities = (name: string, domain?: string | string[]) => ({
  name,
  selector: { entity: { multiple: true, ...(domain ? { domain } : {}) } },
});

const number = (name: string, min: number, max: number, step = 1) => ({
  name,
  selector: { number: { min, max, step, mode: "box" } },
});

const bool = (name: string) => ({ name, selector: { boolean: {} } });
const text = (name: string) => ({ name, selector: { text: {} } });

const select = (name: string, options: [string, string][]) => ({
  name,
  selector: { select: { mode: "dropdown", options: options.map(([value, label]) => ({ value, label })) } },
});

export const WIDGETS: Record<WidgetType, WidgetDefinition> = {
  clock: {
    label: "Clock & greeting",
    icon: "mdi:clock-outline",
    tag: "yad-widget-clock",
    defaults: { col_span: 2, row_span: 1, transparent: true, greeting: true, greet_by_name: true },
    schema: [
      {
        type: "grid",
        name: "",
        schema: [
          bool("greeting"),
          bool("greet_by_name"),
          text("name"),
          bool("show_date"),
          bool("show_seconds"),
          select("time_format", [
            ["auto", "Follow Home Assistant"],
            ["24", "24 hour"],
            ["12", "12 hour"],
          ]),
        ],
      },
    ],
  },
  weather: {
    label: "Weather & forecast",
    icon: "mdi:weather-partly-cloudy",
    tag: "yad-widget-weather",
    defaults: { col_span: 2, row_span: 2, forecast_type: "daily", forecast_count: 5 },
    schema: [
      entity("entity", "weather", true),
      {
        type: "grid",
        name: "",
        schema: [
          select("forecast_type", [
            ["daily", "Daily"],
            ["hourly", "Hourly"],
            ["twice_daily", "Twice daily"],
          ]),
          number("forecast_count", 0, 10),
          bool("show_details"),
        ],
      },
    ],
  },
  calendar: {
    label: "Calendar agenda",
    icon: "mdi:calendar-month-outline",
    tag: "yad-widget-calendar",
    defaults: { col_span: 1, row_span: 3, days: 7, max_events: 8, show_weekends: true, highlight_weekends: false, show_calendar_badge: true },
    schema: [
      text("title"),
      entities("entities", "calendar"),
      {
        type: "grid",
        name: "",
        schema: [number("days", 1, 31), number("max_events", 1, 50), bool("show_location"), bool("show_weekends"), bool("highlight_weekends"), bool("show_calendar_badge"), number("refresh_minutes", 1, 120)],
      },
    ],
  },
  energy: {
    label: "Energy usage",
    icon: "mdi:lightning-bolt-outline",
    tag: "yad-widget-energy",
    defaults: { col_span: 2, row_span: 2, show_graph: true, hours_to_show: 24 },
    schema: [
      text("title"),
      entity("power_entity", "sensor"),
      entity("today_entity", "sensor"),
      entity("solar_power_entity", "sensor"),
      entity("solar_today_entity", "sensor"),
      entity("battery_entity", "sensor"),
      entity("cost_entity", "sensor"),
      { type: "grid", name: "", schema: [bool("show_graph"), number("hours_to_show", 1, 168)] },
    ],
  },
  climate: {
    label: "Climate / thermostat",
    icon: "mdi:thermostat",
    tag: "yad-widget-climate",
    defaults: { col_span: 1, row_span: 2, show_modes: true },
    schema: [
      entity("entity", "climate", true),
      { type: "grid", name: "", schema: [text("name"), bool("show_modes")] },
      entity("humidity_entity", "sensor"),
    ],
  },
  toggles: {
    label: "Lights & switches",
    icon: "mdi:lightbulb-group-outline",
    tag: "yad-widget-toggles",
    defaults: { col_span: 2, row_span: 1 },
    schema: [
      text("title"),
      entities("entities", ["light", "switch", "fan", "input_boolean", "scene", "script", "cover", "lock", "button", "input_button"]),
      number("min_tile_width", 100, 400, 10),
    ],
  },
  sensors: {
    label: "Sensors",
    icon: "mdi:gauge",
    tag: "yad-widget-sensors",
    defaults: { col_span: 2, row_span: 1, layout: "grid" },
    schema: [
      text("title"),
      entities("entities"),
      {
        type: "grid",
        name: "",
        schema: [
          select("layout", [
            ["grid", "Tiles"],
            ["list", "List"],
          ]),
          number("min_tile_width", 100, 400, 10),
        ],
      },
    ],
  },
  media: {
    label: "Media player",
    icon: "mdi:music-circle-outline",
    tag: "yad-widget-media",
    defaults: { col_span: 2, row_span: 1 },
    schema: [entity("entity", "media_player", true), { type: "grid", name: "", schema: [text("name"), bool("show_volume")] }],
  },
  people: {
    label: "People & presence",
    icon: "mdi:account-group-outline",
    tag: "yad-widget-people",
    defaults: { col_span: 1, row_span: 1 },
    schema: [text("title"), entities("entities", "person"), bool("show_state")],
  },
  card: {
    label: "Any Home Assistant card",
    icon: "mdi:card-outline",
    tag: "yad-widget-card",
    defaults: { col_span: 1, row_span: 1, card: { type: "markdown", content: "Hello from YAD 👋" } },
    schema: [],
  },
  car: {
    label: "Car / vehicle",
    icon: "mdi:car",
    tag: "yad-widget-car",
    defaults: { col_span: 2, row_span: 2 },
    schema: [
      text("title"),
      entity("charge_entity", "sensor"),
      entity("fuel_entity", "sensor"),
      entity("range_entity", "sensor"),
      entity("location_entity", "device_tracker"),
      entity("plugged_in_entity", ["binary_sensor", "sensor"]),
      entity("charging_entity", ["binary_sensor", "sensor"]),
      entities("entities"),
    ],
  },
  spacer: {
    label: "Spacer / divider",
    icon: "mdi:minus",
    tag: "yad-widget-spacer",
    defaults: { col_span: 4, row_span: 0.25, transparent: true, style: "blank" },
    schema: [select("style", [["blank", "Blank spacer"], ["line", "Horizontal line"], ["dashed", "Dashed line"]]), { name: "line_color", selector: { text: {} } }],
  },
};

/** Grid placement fields shared by every widget in the visual editor. */
export const LAYOUT_SCHEMA = [
  {
    type: "grid",
    name: "",
    schema: [
      number("col_span", 1, 12),
      number("row_span", 1, 12),
      number("portrait_col_span", 1, 12),
      number("portrait_row_span", 1, 12),
      select("visibility", [
        ["all", "Always"],
        ["landscape", "Landscape only"],
        ["portrait", "Portrait only"],
      ]),
      bool("transparent"),
    ],
  },
];

export const spacerLayoutSchema = LAYOUT_SCHEMA.map((group) => ({
  ...group,
  schema: group.schema.map((field) =>
    field.name === "row_span" || field.name === "portrait_row_span"
      ? number(field.name, 0.25, 1, 0.25)
      : field,
  ),
}));

export const LABELS: Record<string, string> = {
  entity: "Entity",
  entities: "Entities",
  title: "Title",
  name: "Name",
  greeting: "Show greeting",
  greet_by_name: "Greet by name",
  show_date: "Show date",
  show_seconds: "Show seconds",
  time_format: "Time format",
  forecast_type: "Forecast type",
  forecast_count: "Forecast items",
  show_details: "Show humidity & wind",
  days: "Days ahead",
  max_events: "Max events",
  show_location: "Show location",
  refresh_minutes: "Refresh (minutes)",
  show_weekends: "Show weekend events",
  highlight_weekends: "Highlight weekends",
  show_calendar_badge: "Show calendar initial / icon",
  charge_entity: "Charge level (%)",
  fuel_entity: "Fuel level (%)",
  range_entity: "Remaining range",
  location_entity: "Vehicle location",
  plugged_in_entity: "EV plugged in",
  charging_entity: "EV charging",
  style: "Spacer style",
  line_color: "Line colour (optional)",
  power_entity: "Current power (W/kW)",
  today_entity: "Energy used today",
  solar_power_entity: "Solar power now",
  solar_today_entity: "Solar energy today",
  battery_entity: "Battery level (%)",
  cost_entity: "Cost today",
  show_graph: "Show usage graph",
  hours_to_show: "Graph hours",
  show_modes: "Show mode buttons",
  humidity_entity: "Humidity sensor (optional)",
  min_tile_width: "Minimum tile width (px)",
  layout: "Layout",
  show_volume: "Show volume slider",
  show_state: "Show home/away",
  col_span: "Width (columns)",
  row_span: "Height (rows)",
  portrait_col_span: "Portrait width",
  portrait_row_span: "Portrait height",
  visibility: "Show in",
  transparent: "No background",
  auto_height: "Automatic height",
  auto_height_max: "Maximum automatic height",
};
