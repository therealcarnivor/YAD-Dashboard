/* Local preview harness: mocks the bits of Home Assistant the card relies on. */
import * as mdi from "@mdi/js";
import "../src/yad-card";

const iconPath = (name?: string): string => {
  if (!name) return "";
  const key = "mdi" + name.replace(/^mdi:/, "").replace(/(^|-)(\w)/g, (_, __, c: string) => c.toUpperCase());
  return (mdi as Record<string, string>)[key] ?? mdi.mdiHelpCircleOutline;
};

const svgFor = (path: string) =>
  `<svg viewBox="0 0 24 24" style="width:var(--mdc-icon-size,24px);height:var(--mdc-icon-size,24px);display:block;fill:currentColor"><path d="${path}"/></svg>`;

class HaIcon extends HTMLElement {
  static observedAttributes = ["icon"];
  set icon(v: string) {
    this.setAttribute("icon", v);
  }
  attributeChangedCallback() {
    this.style.display = "inline-flex";
    (this.shadowRoot ?? this.attachShadow({ mode: "open" })).innerHTML = svgFor(iconPath(this.getAttribute("icon") ?? ""));
  }
}
customElements.define("ha-icon", HaIcon);

const DOMAIN_ICONS: Record<string, string> = {
  light: "mdi:lightbulb",
  switch: "mdi:toggle-switch-variant",
  fan: "mdi:fan",
  sensor: "mdi:eye",
  lock: "mdi:lock",
  scene: "mdi:palette",
};
class HaStateIcon extends HTMLElement {
  set stateObj(s: any) {
    const icon = s?.attributes.icon ?? DOMAIN_ICONS[s?.entity_id.split(".")[0]] ?? "mdi:circle-outline";
    this.style.display = "inline-flex";
    (this.shadowRoot ?? this.attachShadow({ mode: "open" })).innerHTML = svgFor(iconPath(icon));
  }
  set hass(_: unknown) {}
}
customElements.define("ha-state-icon", HaStateIcon);

class MockMarkdown extends HTMLElement {
  setConfig(c: any) {
    this.innerHTML = `<div style="padding:4px;font-size:1.1rem;line-height:1.5">${c.content}</div>`;
  }
  set hass(_: unknown) {}
}
customElements.define("mock-markdown-card", MockMarkdown);
(window as any).loadCardHelpers = async () => ({
  createCardElement: (c: any) => {
    const el = document.createElement("mock-markdown-card") as any;
    el.setConfig(c);
    return el;
  },
});

const ent = (entity_id: string, state: string, attributes: Record<string, unknown> = {}) => ({
  entity_id,
  state,
  attributes,
  last_changed: new Date().toISOString(),
  last_updated: new Date().toISOString(),
});

const states: Record<string, any> = {};
const add = (e: ReturnType<typeof ent>) => (states[e.entity_id] = e);
add(ent("weather.home", "partlycloudy", { friendly_name: "Home", temperature: 14, temperature_unit: "°C", humidity: 72, wind_speed: 18, wind_speed_unit: "km/h" }));
add(ent("calendar.family", "off", { friendly_name: "Family" }));
add(ent("calendar.bins", "off", { friendly_name: "Bins" }));
add(ent("climate.living_room", "heat", { friendly_name: "Living Room", current_temperature: 20.5, temperature: 21.5, hvac_action: "heating", hvac_modes: ["off", "heat", "auto"], min_temp: 7, max_temp: 30, target_temp_step: 0.5, current_humidity: 48 }));
add(ent("light.kitchen", "on", { friendly_name: "Kitchen", brightness: 200, rgb_color: [255, 180, 107] }));
add(ent("light.lounge_lamp", "on", { friendly_name: "Lounge Lamp", brightness: 90, rgb_color: [255, 160, 90] }));
add(ent("light.hallway", "off", { friendly_name: "Hallway" }));
add(ent("switch.coffee_machine", "off", { friendly_name: "Coffee Machine", icon: "mdi:coffee-maker" }));
add(ent("light.garden", "off", { friendly_name: "Garden" }));
add(ent("scene.movie_night", "scening", { friendly_name: "Movie Night", icon: "mdi:movie-open" }));
add(ent("sensor.outdoor_temp", "11.8", { friendly_name: "Outside", unit_of_measurement: "°C", icon: "mdi:thermometer" }));
add(ent("sensor.bedroom_temp", "19.2", { friendly_name: "Bedroom", unit_of_measurement: "°C", icon: "mdi:bed" }));
add(ent("sensor.co2", "612", { friendly_name: "Air quality", unit_of_measurement: "ppm", icon: "mdi:molecule-co2" }));
add(ent("sensor.washing_machine", "Rinsing", { friendly_name: "Washer", icon: "mdi:washing-machine" }));
add(ent("sensor.house_power", "1240", { friendly_name: "House power", unit_of_measurement: "W" }));
add(ent("sensor.energy_today", "9.4", { friendly_name: "Energy today", unit_of_measurement: "kWh" }));
add(ent("sensor.solar_power", "860", { friendly_name: "Solar", unit_of_measurement: "W" }));
add(ent("sensor.battery", "76", { friendly_name: "Battery", unit_of_measurement: "%" }));
add(ent("sensor.energy_cost", "2.14", { friendly_name: "Cost", unit_of_measurement: "£" }));
add(ent("media_player.kitchen", "playing", { friendly_name: "Kitchen Speaker", media_title: "Harvest Moon", media_artist: "Neil Young", supported_features: 4 | 16 | 32, volume_level: 0.4 }));
add(ent("person.alex", "home", { friendly_name: "Alex Carter" }));
add(ent("person.sam", "not_home", { friendly_name: "Sam Carter" }));
add(ent("person.jo", "Work", { friendly_name: "Jo" }));
add(ent("sensor.car_charge", "72", { friendly_name: "Car battery", unit_of_measurement: "%" }));
add(ent("sensor.car_range", "218", { friendly_name: "Car range", unit_of_measurement: "km" }));
add(ent("device_tracker.car", "home", { friendly_name: "Family car" }));
add(ent("binary_sensor.car_plug", "on", { friendly_name: "Car plugged in" }));
add(ent("binary_sensor.car_charging", "off", { friendly_name: "Car charging" }));

const at = (dayOffset: number, h: number, m = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + dayOffset);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
};
const day = (offset: number) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
const EVENTS: Record<string, any[]> = {
  "calendar.family": [
    { summary: "School run", start: { dateTime: at(0, 23, 0) }, end: { dateTime: at(0, 23, 30) } },
    { summary: "Dinner with Grandma", start: { dateTime: at(1, 18, 30) }, end: { dateTime: at(1, 21, 0) }, location: "The Old Mill" },
    { summary: "Swimming lessons", start: { dateTime: at(2, 16, 0) }, end: { dateTime: at(2, 17, 0) } },
    { summary: "Anniversary 🎉", start: { date: day(3) }, end: { date: day(4) } },
  ],
  "calendar.bins": [{ summary: "Recycling collection", start: { date: day(1) }, end: { date: day(2) } }],
};

const forecast = ["sunny", "partlycloudy", "rainy", "cloudy", "sunny", "pouring", "partlycloudy"].map((condition, i) => ({
  datetime: at(i, 12),
  condition,
  temperature: 15 - (i % 3) + (i === 4 ? 3 : 0),
  templow: 7 + (i % 2),
  precipitation_probability: condition.includes("rain") || condition === "pouring" ? 70 : 0,
}));

const params = new URLSearchParams(location.search);

const hass: any = {
  states,
  language: "en-GB",
  locale: { language: "en-GB", time_format: "language" },
  themes: { darkMode: params.get("dark") === "1" },
  user: { name: "Alex Carter" },
  config: { unit_system: { temperature: "°C" } },
  callService: async (domain: string, service: string, data: any) => {
    console.log("callService", domain, service, data);
    const id = data.entity_id;
    if (service === "toggle" && states[id]) {
      states[id] = { ...states[id], state: states[id].state === "on" ? "off" : "on" };
      update();
    }
  },
  callApi: async (_m: string, path: string) => EVENTS[path.split("?")[0].replace("calendars/", "")] ?? [],
  callWS: async (msg: any) => {
    const id = msg.entity_ids[0];
    const start = new Date(msg.start_time).getTime() / 1000;
    return {
      [id]: Array.from({ length: 96 }, (_, i) => ({
        s: String(400 + 900 * Math.max(0, Math.sin((i / 96) * Math.PI * 2 - 1.2)) + (i % 7) * 40 + (i > 70 && i < 80 ? 1500 : 0)),
        lu: start + i * 900,
      })),
    };
  },
  connection: {
    subscribeMessage: async (cb: (m: any) => void) => {
      setTimeout(() => cb({ forecast }), 50);
      return () => undefined;
    },
  },
};

const card = document.createElement("yad-card") as any;
const update = () => {
  card.hass = { ...hass, states: { ...states } };
};

card.setConfig({
  type: "custom:yad-card",
  theme: params.get("theme") ?? "auto",
  orientation: params.get("orientation") ?? "auto",
  display_only: params.get("display_only") === "1",
  palette: params.get("palette") ?? "hearth",
  screen: params.get("screen") ?? "fill",
  custom_palette: params.get("palette") === "custom" ? { light: { background: "#e9f0ec", accent: "#0f766e" }, dark: { accent: "#f59e0b" } } : undefined,
  columns: 4,
  portrait_columns: 2,
  widgets: [
    { type: "clock", col_span: 2, row_span: 1, transparent: true, greet_by_name: params.get("greet") !== "0" },
    { type: "weather", entity: "weather.home", col_span: 1, row_span: 2, portrait_col_span: 1 },
    { type: "calendar", entities: ["calendar.family", { entity: "calendar.bins", color: "#6f9273" }], highlight_weekends: params.get("showcase") === "1", col_span: 1, row_span: 4, portrait_row_span: 2 },
    { type: "climate", entity: "climate.living_room", col_span: 1, row_span: 2 },
    {
      type: "energy",
      power_entity: "sensor.house_power",
      today_entity: "sensor.energy_today",
      solar_power_entity: "sensor.solar_power",
      battery_entity: "sensor.battery",
      col_span: 1,
      row_span: 2,
    },
    { type: "media", entity: "media_player.kitchen", col_span: 1, row_span: 1, portrait_col_span: 2 },
    {
      type: "toggles",
      title: "Lights & switches",
      entities: ["light.kitchen", "light.lounge_lamp", "light.hallway", "switch.coffee_machine", "light.garden", "scene.movie_night"],
      col_span: 2,
      row_span: 1,
      portrait_col_span: 2,
    },
    
    { type: "people", entities: ["person.alex", "person.sam", "person.jo"], col_span: 1, row_span: 1 },
    {
      type: "sensors",
      title: "Around the house",
      entities: ["sensor.outdoor_temp", "sensor.bedroom_temp", "sensor.co2", "sensor.washing_machine"],
      col_span: 2,
      row_span: 1,
      visibility: "portrait",
    },
    { type: "card", card: { type: "markdown", content: "🧺 <b>Bins out tonight</b> — recycling week." }, col_span: 1, row_span: 1, visibility: "portrait" },
    ...(params.get("showcase") === "1" ? [
      { type: "spacer", style: "line", col_span: 4, row_span: 0.25, portrait_col_span: 2 },
      { type: "car", title: "Family car", charge_entity: "sensor.car_charge", range_entity: "sensor.car_range", location_entity: "device_tracker.car", plugged_in_entity: "binary_sensor.car_plug", charging_entity: "binary_sensor.car_charging", col_span: 2, row_span: 2 },
    ] : []),
  ],
});
update();
document.body.appendChild(card);
