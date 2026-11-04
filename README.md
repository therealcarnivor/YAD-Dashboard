# Hearth Dashboard

A warm, modern, **modular widget dashboard** for Home Assistant — built for wall tablets, kitchen displays and kiosks.

One card, in a **panel view**, renders a full-screen grid of widgets that you configure from the visual editor or YAML. It fills the screen (perfect with `?kiosk`), adapts to **portrait or landscape**, and can run as a **display-only** screen with touch disabled.

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://hacs.xyz/docs/faq/custom_repositories)

## Widgets

| Type | What it shows |
| --- | --- |
| `clock` | Time, date and a friendly greeting ("Good morning, Alex") |
| `weather` | Current conditions, high/low, humidity & wind, daily/hourly forecast |
| `calendar` | Agenda across one or more calendars, grouped by day, colour-coded |
| `energy` | Live power, 24h usage graph, energy today, solar, battery and cost |
| `climate` | Thermostat dial with current/target temperature, +/- and HVAC modes |
| `toggles` | Lights & switches (also fans, scenes, scripts, covers, locks, buttons) |
| `sensors` | Any sensors as tiles or a list |
| `media` | Now playing with artwork and transport controls |
| `people` | Who's home, with avatars and presence |
| `card` | **Any existing Home Assistant card** (built-in or custom) embedded as a widget |

## Installation

### HACS (recommended)

1. In HACS, open the ⋮ menu → **Custom repositories**.
2. Add `https://github.com/therealcarnivor/HA-Dashboard` with type **Dashboard**.
3. Search for **Hearth Dashboard**, install it, and reload your browser.

HACS registers the resource automatically. If it doesn't, add it manually under **Settings → Dashboards → ⋮ → Resources**: URL `/hacsfiles/HA-Dashboard/hearth-dashboard.js`, type **JavaScript module**.

### Manual

Copy `dist/hearth-dashboard.js` to `<config>/www/hearth-dashboard.js` and add `/local/hearth-dashboard.js` as a **JavaScript module** resource.

## Setting up the dashboard

1. **Settings → Dashboards → Add dashboard** → *New dashboard from scratch*.
2. Open it, choose **Edit dashboard**, then edit the view and set **View type** to **Panel (single card)**.
3. Add a card and pick **Hearth Dashboard** (or use a *Manual* card with `type: custom:hearth-dashboard-card`).
4. Configure the look and add widgets in the visual editor.
5. Open the dashboard with `?kiosk` on the URL (e.g. `/dashboard-home/0?kiosk`) for a full-screen display. Hearth fills the viewport by default (`height: screen`).

> `?kiosk` requires a kiosk add-on such as [kiosk-mode](https://github.com/NemesisRE/kiosk-mode). Without kiosk mode, set `height: calc(100vh - 56px)` so the grid accounts for the HA header.

## Configuration

### Dashboard options

| Option | Default | Description |
| --- | --- | --- |
| `theme` | `auto` | `auto` (follows HA light/dark), `light`, `dark`, or `ha` to use your HA theme colours |
| `accent_color` | theme | Any CSS colour, e.g. `"#7c9a7e"` |
| `background` | – | Optional background image URL (tiles become frosted glass) |
| `orientation` | `auto` | `auto` (detects screen orientation), `landscape` or `portrait` |
| `columns` | `4` | Grid columns in landscape |
| `portrait_columns` | `2` | Grid columns in portrait |
| `height` | `screen` | `screen` fills the viewport with rows sized to fit; `auto` uses fixed `row_height` rows; or any CSS height |
| `row_height` | `180` | Row height in px when `height: auto` |
| `gap` | `16` | Spacing between tiles in px |
| `display_only` | `false` | Disable all touch/clicks and hide controls — a pure information display |
| `hide_cursor` | `false` | Hide the mouse cursor (useful for kiosk PCs) |
| `widgets` | – | List of widgets (below) |

### Options shared by every widget

| Option | Description |
| --- | --- |
| `type` | Widget type (see table above) |
| `title` | Optional title for the widget |
| `col_span` / `row_span` | Size in grid cells (landscape) |
| `portrait_col_span` / `portrait_row_span` | Size override for portrait |
| `visibility` | `all` (default), `landscape` or `portrait` |
| `transparent` | Render without the tile background (default for `clock`) |

Widgets are packed into the grid in order, filling gaps automatically.

### Widget options

**clock** — `greeting` (true), `name` (defaults to the HA user's first name), `show_date` (true), `show_seconds` (false), `time_format` (`auto`, `12`, `24`).

**weather** — `entity` (required), `forecast_type` (`daily`, `hourly`, `twice_daily`), `forecast_count` (5), `show_details` (true).

**calendar** — `entities` (list of calendars; use `{ entity: calendar.x, color: "#hex" }` to set colours), `days` (7), `max_events` (8), `show_location` (false), `refresh_minutes` (5).

**energy** — `power_entity` (current consumption in W or kW), `today_entity`, `solar_power_entity`, `solar_today_entity`, `battery_entity`, `cost_entity`, `show_graph` (true), `hours_to_show` (24). All optional — show only what you have.

**climate** — `entity` (required), `name`, `show_modes` (true), `humidity_entity`.

**toggles** — `entities` (strings or `{ entity, name, icon }`), `min_tile_width` (150). Tap to toggle, long-press for more info.

**sensors** — `entities` (strings or `{ entity, name, icon, color }`), `layout` (`grid` or `list`), `min_tile_width` (140).

**media** — `entity` (required), `name`, `show_volume` (false).

**people** — `entities` (person entities), `show_state` (true).

**card** — `card`: any Lovelace card configuration.

### Example

```yaml
type: custom:hearth-dashboard-card
theme: auto
columns: 4
portrait_columns: 2
widgets:
  - type: clock
    col_span: 2
  - type: weather
    entity: weather.home
    row_span: 2
  - type: calendar
    entities:
      - calendar.family
      - entity: calendar.bin_collection
        color: "#6f9273"
    row_span: 4
    portrait_row_span: 2
  - type: climate
    entity: climate.living_room
    row_span: 2
  - type: energy
    power_entity: sensor.house_power
    today_entity: sensor.energy_today
    solar_power_entity: sensor.solar_power
    battery_entity: sensor.battery_level
    row_span: 2
  - type: media
    entity: media_player.kitchen
    portrait_col_span: 2
  - type: toggles
    title: Lights
    col_span: 2
    entities:
      - light.kitchen
      - light.lounge_lamp
      - switch.coffee_machine
      - entity: scene.movie_night
        icon: mdi:movie-open
  - type: people
    entities: [person.alex, person.sam]
  - type: sensors
    title: Around the house
    col_span: 2
    visibility: portrait
    entities: [sensor.outdoor_temperature, sensor.bedroom_temperature]
  - type: card
    card:
      type: markdown
      content: "🧺 Bins go out on **Thursday**"
```

### Display-only mode

Set `display_only: true` for a screen nobody should touch (hallway clock, TV, picture frame). All interaction is disabled, controls such as thermostat buttons and media controls are hidden, and only state is shown. Combine with `hide_cursor: true` on a PC-based kiosk.

## Development

```bash
npm install
npm run build      # -> dist/hearth-dashboard.js
npm run watch      # rebuild on change
npm run typecheck
npm run demo       # builds demo/build/demo.js with a mocked Home Assistant
npx http-server .  # then open http://localhost:8080/demo/
```

The demo page accepts `?dark=1`, `?theme=light|dark|ha`, `?orientation=portrait|landscape` and `?display_only=1`.

`dist/hearth-dashboard.js` is committed so HACS can install straight from the repository; publishing a GitHub release also attaches it as a release asset (see `.github/workflows/release.yml`).

## License

MIT
