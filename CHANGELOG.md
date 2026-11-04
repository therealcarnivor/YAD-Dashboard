# Changelog

All notable changes to YAD are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/).

Add new entries under **Unreleased** as you work — they're moved under the new version number automatically when a release is cut.

## [Unreleased]

## [0.5.1] - 2026-11-04

### Changed

- Removed the dashboard-wide Compact layout. Automatic height is now controlled directly in each widget's Size & placement and shrinks only that tile within the normal grid.
- Screen presets, custom resolution, scaling and fill-screen settings remain available at all times. Saved `layout_mode` values are ignored and removed when editing.
- Automatic-height limits respect the assigned grid area, with scrollable content capped without moving neighbouring widgets.

## [0.5.0] - 2026-11-04

### Added

- Optional compact dashboard layout with per-widget automatic height and configurable limits for scrollable content.
- Content- and width-responsive vertical packing that preserves column spans, fixed-height widgets, portrait overrides and explicit spacer heights.
- Browser coverage for independent packing, automatic height limits, entity updates and compatibility with the existing fixed grid.

### Fixed

- Weekend event highlights now use a subtle palette-accent tint and inset border, preventing clipping at the sides of the calendar list.

## [0.4.0] - 2026-11-04

### Added

- HA media browsing and native image uploads for backgrounds, with image-only opacity, blur, fit and position controls, signed-URL renewal and visible loading errors.
- Calendar weekend highlighting and show/hide controls, plus calendar initials or custom icons in widened colour bars.
- A vehicle widget for optional charge/fuel, range, tracker location, EV connection/charging and additional sensors; unavailable or unconfigured readings are omitted.
- Quarter-row spacer widgets with blank, solid-line and dashed-line styles, including portrait height overrides.
- Production-browser tests for background resolution and source changes, calendar filtering and badges, sparse vehicle data and quarter-row geometry.

### Changed

- The editor's colour palette section is collapsible and starts closed.

## [0.3.1] - 2026-11-04

### Added

- Automated Chromium checks for the production bundle's card registration, clock rendering, widgets, editor and card-picker entry.
- HACS validation and browser tests must pass before a GitHub release is published.

## [0.3.0] - 2026-11-04

### Added

- Screenshots and a release badge in the README.

### Changed

- **Renamed to YAD (Yet Another Dashboard).** The card type is now `custom:yad-card` and the bundle is `yad.js`. The repository moves to `therealcarnivor/YAD-Dashboard`; GitHub redirects the old URL.
- Existing `custom:hearth-dashboard-card` configs keep working, but if you added the resource by hand, change its URL to `/hacsfiles/YAD-Dashboard/yad.js` (HACS) or `/local/yad.js` (manual install).
- The CSS font override variable is now `--yad-font` (`--hearth-font` still works).

## [0.2.1] - 2026-11-04

### Added

- Versioned releases: GitHub releases with the bundled card attached, so HACS can show release notes and let you pick or roll back versions.
- The card version is shown at the bottom of the visual editor.

## [0.2.0] - 2026-11-04

### Added

- Screen size presets — 720p, 1080p, 1440p, 4K, 7" tablet, 16:10 tablets, iPad and custom resolutions — in portrait or landscape. The layout is rendered at that resolution and scaled to fit, with automatic UI scaling for high-resolution panels.
- Nine colour palettes, each with a light and dark variant: Hearth, Scandi oak, Nordic, Cottage garden, Coastal, Lavender, Rosewood, Urban loft and Midnight indigo.
- Custom palette with a colour wheel picker for background, tiles, text, accent and status colours, set separately for light and dark mode.
- Clock widget: `greet_by_name` option for a greeting without a name.

### Changed

- Buttons filled with the accent colour now use a contrasting icon colour in dark mode.
- The accent colour override uses the new colour wheel picker.

## [0.1.0] - 2026-11-04

### Added

- First release: a single panel-mode card with a configurable widget grid.
- Widgets: clock & greeting, weather, calendar, energy, climate, lights & switches, sensors, media, people, and an embedded card for any other Home Assistant card.
- Portrait and landscape layouts, display-only (no touch) mode, hidden cursor option.
- Light, dark and Home Assistant theme modes with an accent colour override.
- Visual editor for adding, ordering and configuring widgets.

[Unreleased]: https://github.com/therealcarnivor/YAD-Dashboard/compare/v0.5.1...HEAD
[0.5.1]: https://github.com/therealcarnivor/YAD-Dashboard/compare/v0.5.0...v0.5.1
[0.5.0]: https://github.com/therealcarnivor/YAD-Dashboard/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/therealcarnivor/YAD-Dashboard/compare/v0.3.1...v0.4.0
[0.3.1]: https://github.com/therealcarnivor/YAD-Dashboard/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/therealcarnivor/YAD-Dashboard/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/therealcarnivor/YAD-Dashboard/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/therealcarnivor/YAD-Dashboard/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/therealcarnivor/YAD-Dashboard/releases/tag/v0.1.0
