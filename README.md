# Hearth Dashboard

A warm, modern, **modular widget dashboard** for Home Assistant — built for wall tablets, kitchen displays and kiosks.

One card, in a **panel view**, renders a full-screen grid of widgets that you configure from the visual editor or YAML. It fills the screen (perfect with `?kiosk`), adapts to **portrait or landscape**, and can run as a **display-only** screen with touch disabled.

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://hacs.xyz/docs/faq/custom_repositories)
[![GitHub release](https://img.shields.io/github/v/release/therealcarnivor/HA-Dashboard)](https://github.com/therealcarnivor/HA-Dashboard/releases)

![Hearth Dashboard in landscape with the Hearth light palette](https://raw.githubusercontent.com/therealcarnivor/HA-Dashboard/main/docs/images/landscape-light.png)

| Midnight indigo, dark mode | Coastal palette, portrait |
| --- | --- |
| ![Landscape dashboard with the Midnight indigo dark palette](https://raw.githubusercontent.com/therealcarnivor/HA-Dashboard/main/docs/images/landscape-dark.png) | ![Portrait dashboard with the Coastal palette](https://raw.githubusercontent.com/therealcarnivor/HA-Dashboard/main/docs/images/portrait-coastal.png) |

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

### Updates and versions

Hearth Dashboard uses [semantic versioning](https://semver.org/) with [GitHub releases](https://github.com/therealcarnivor/HA-Dashboard/releases). HACS tells you when a new version is available and shows its release notes. To install an older version, open the repository in HACS and choose **⋮ → Redownload**, then pick the version. See [CHANGELOG.md](CHANGELOG.md) for the full history. The installed version appears at the bottom of the card editor and in the browser console.

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
| `theme` | `auto` | Light/dark mode: `auto` (follows HA light/dark), `light`, `dark`, or `ha` to use your HA theme colours instead of a palette |
| `palette` | `hearth` | Colour palette (each has a light and dark variant): `hearth`, `scandi`, `nordic`, `cottage`, `coastal`, `lavender`, `rose`, `urban`, `indigo`, or `custom` |
| `custom_palette` | – | Your own colours when `palette: custom` — see [Colour palettes](#colour-palettes) |
| `accent_color` | palette | Override the accent colour of any palette, e.g. `"#7c9a7e"` |
| `background` | – | Optional background image URL (tiles become frosted glass) |
| `orientation` | `auto` | `auto` (detects screen orientation), `landscape` or `portrait` |
| `screen` | `fill` | `fill` uses the available space, or lay out for a fixed resolution: `720p`, `1080p`, `1440p`, `4k`, `wsvga` (1024×600), `wxga` (1280×800), `wuxga` (1920×1200), `ipad` (2048×1536), or `custom` — see [Screen sizes](#screen-sizes) |
| `screen_width` / `screen_height` | – | Resolution in px when `screen: custom` |
| `ui_scale` | `auto` | UI scale for fixed screens, like OS display scaling (`1`, `1.5`, `2`…) |
| `columns` | `4` | Grid columns in landscape |
| `portrait_columns` | `2` | Grid columns in portrait |
| `height` | `screen` | When `screen: fill`: `screen` fills the viewport with rows sized to fit; `auto` uses fixed `row_height` rows; or any CSS height |
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

**clock** — `greeting` (true), `greet_by_name` (true; set `false` for just "Good morning"), `name` (defaults to the HA user's first name), `show_date` (true), `show_seconds` (false), `time_format` (`auto`, `12`, `24`).

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

### Screen sizes

Pick the resolution of the display the dashboard is for (`screen: 1080p`, `screen: 4k`, …) and set `orientation: portrait` or `landscape`. Hearth lays the grid out for exactly that screen and scales it to fit whatever it's viewed on — so the editor preview on your laptop matches the wall tablet pixel for pixel, letterboxed in the palette colours.

High-resolution panels get a matching UI scale automatically (like Windows/macOS display scaling): a 4K screen lays out like 1080p but renders twice as sharp, 1440p uses 150%. Override with `ui_scale` if text looks too big or small. Use `screen: custom` with `screen_width`/`screen_height` for anything else.

### Colour palettes

Choose a palette in the editor's gallery — every palette comes in light and dark, and `theme: auto` switches between them with Home Assistant. With `palette: custom`, pick your own colours using the colour wheel; anything you leave empty falls back to the Hearth palette:

```yaml
palette: custom
custom_palette:
  light:
    background: "#eef3ef"
    surface: "#ffffff"   # tiles
    text: "#1f2d26"
    accent: "#0f766e"
    success: "#4f8a6a"   # on / home
    warm: "#e3a24b"      # lights & heating
    info: "#4f8fbf"      # cooling, rain, solar
  dark:
    accent: "#f59e0b"
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

The demo page accepts `?dark=1`, `?theme=light|dark|ha`, `?palette=<name>|custom`, `?screen=1080p|4k|…`, `?orientation=portrait|landscape`, `?greet=0` and `?display_only=1`.

`dist/hearth-dashboard.js` is committed so HACS can install straight from the repository, and each GitHub release also includes it as a download.

### Releasing a new version

1. As you work, add entries under **Unreleased** in [CHANGELOG.md](CHANGELOG.md).
2. Cut the release in one of two ways:
   - **From your PC:** `npm version patch` (bug fixes), `npm version minor` (new features) or `npm version major` (breaking changes). This bumps `package.json`, syncs `src/version.ts`, moves the Unreleased notes under the new version, rebuilds `dist`, commits "Release vX.Y.Z", tags it and pushes.
   - **From GitHub:** **Actions → Release → Run workflow**, pick the bump type and run it. The workflow does the same steps.
3. The [Release workflow](.github/workflows/release.yml) builds the card, checks the tag matches `package.json`, and publishes a GitHub release with the changelog notes and `hearth-dashboard.js` attached. HACS then offers it as an update.

Versions with a suffix (for example `npm version prerelease --preid beta` → `1.2.0-beta.0`) are published as pre-releases, which HACS only shows to people who opt in to beta versions.

## License

MIT
