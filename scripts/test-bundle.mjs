import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { chromium } from "playwright";

const manifest = JSON.parse(await readFile(new URL("../hacs.json", import.meta.url), "utf8"));
const bundle = await readFile(process.env.YAD_TEST_BUNDLE ?? new URL(`../dist/${manifest.filename}`, import.meta.url));
const server = createServer((request, response) => {
  if (request.url === "/") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end("<!doctype html><title>YAD bundle test</title>");
  } else if (request.url === `/${manifest.filename}`) {
    response.writeHead(200, { "Content-Type": "text/javascript" });
    response.end(bundle);
  } else {
    response.writeHead(404);
    response.end();
  }
});

await new Promise((resolve, reject) => {
  server.once("error", reject);
  server.listen(0, "127.0.0.1", resolve);
});

let browser;
try {
  browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const address = server.address();
  await page.goto(`http://127.0.0.1:${address.port}/`);
  const result = await page.evaluate(async (filename) => {
    await import(`/${filename}`);
    const hass = {
      states: {},
      language: "en-GB",
      locale: { language: "en-GB", time_format: "24" },
      themes: { darkMode: false },
      user: { name: "Test User" },
      config: { unit_system: { temperature: "C" } },
    };
    const widgets = ["clock", "weather", "calendar", "energy", "climate", "toggles", "sensors", "media", "menu", "card", "car", "spacer"];
    for (const type of widgets) {
      if (!customElements.get(`yad-widget-${type}`)) throw new Error(`Missing widget: ${type}`);
    }
    const rendered = [];
    for (const tag of ["yad-card", "hearth-dashboard-card"]) {
      const Card = customElements.get(tag);
      if (!Card) throw new Error(`Missing card: ${tag}`);
      const card = new Card();
      card.setConfig({ type: `custom:${tag}`, widgets: [{ type: "clock" }] });
      card.hass = hass;
      document.body.append(card);
      await card.updateComplete;
      const clock = card.shadowRoot.querySelector("yad-widget-clock");
      if (!clock) throw new Error(`${tag} did not render its clock`);
      await clock.updateComplete;
      if (!clock.shadowRoot.textContent.includes("Test")) throw new Error(`${tag} did not render its greeting`);
      const editor = Card.getConfigElement();
      if (editor.localName !== "yad-card-editor" || !customElements.get(editor.localName)) {
        throw new Error(`${tag} has no registered editor`);
      }
      if (!Array.isArray(Card.getStubConfig(hass).widgets)) throw new Error(`${tag} has no starter config`);
      card.remove();
      rendered.push(tag);
    }
    if (!customElements.get("yad-color-picker")) throw new Error("Missing colour picker");
    return {
      rendered,
      picker: window.customCards.filter((card) => card.type === "yad-card").map((card) => card.name),
    };
  }, manifest.filename);
  assert.deepEqual(result.rendered, ["yad-card", "hearth-dashboard-card"]);
  assert.deepEqual(result.picker, ["YAD – Yet Another Dashboard"]);
  const features = await page.evaluate(async () => {
    const check = (condition, message) => { if (!condition) throw new Error(message); };
    const settle = async (element) => {
      await element.updateComplete;
      await new Promise((resolve) => setTimeout(resolve, 40));
      await element.updateComplete;
    };
    const state = (entity_id, value, attributes = {}) => ({ entity_id, state: value, attributes });
    const image = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><rect width="10" height="10" fill="tan"/></svg>');
    const calls = [];
    let resolveMedia;
    const hass = {
      states: {
        "sensor.charge": state("sensor.charge", "0"),
        "sensor.fuel": state("sensor.fuel", "unknown"),
        "sensor.range": state("sensor.range", "150", { unit_of_measurement: "km" }),
        "device_tracker.car": state("device_tracker.car", "home"),
        "binary_sensor.plug": state("binary_sensor.plug", "off"),
        "calendar.family": state("calendar.family", "off", { friendly_name: "Family" }),
      },
      language: "en-GB", locale: { language: "en-GB", time_format: "24" },
      user: { name: "Test User" }, themes: { darkMode: false },
      callWS: async (message) => {
        calls.push(message);
        if (message.media_content_id === "media-source://pending") return new Promise((resolve) => { resolveMedia = resolve; });
        if (message.media_content_id === "media-source://error") throw new Error("Media access denied");
        if (message.media_content_id === "media-source://audio") return { url: image, mime_type: "audio/mpeg" };
        return { url: image, mime_type: "image/svg+xml" };
      },
    };
    const card = document.createElement("yad-card");
    card.hass = hass;
    card.setConfig({ type: "custom:yad-card", height: "auto", row_height: 180, gap: 16, background_media: { media_content_id: "media-source://test" }, background_opacity: 35, background_blur: 4, background_fit: "contain", widgets: [{ type: "clock" }] });
    document.body.append(card);
    await settle(card);
    const background = card.shadowRoot.querySelector(".background-image");
    check(background?.src === image && background.style.opacity === "0.35" && background.style.filter === "blur(4px)" && background.style.objectFit === "contain", "Background source/opacity/blur/fit failed");
    check(calls[0].type === "media_source/resolve_media", "Background must use HA media resolver");
    const baseConfig = { type: "custom:yad-card", height: "auto", row_height: 180, gap: 16, columns: 1, orientation: "landscape", widgets: [{ type: "clock", row_span: 1 }] };
    card.setConfig(baseConfig);
    await settle(card);
    check(!card.shadowRoot.querySelector(".background-image"), "Clearing the background failed");
    const normalHeight = card.shadowRoot.querySelector(".tile").getBoundingClientRect().height;
    check(Math.abs(normalHeight - 180) < 1, "Original row height changed");
    card.setConfig({ ...baseConfig, widgets: [{ type: "spacer", row_span: 0.25, style: "line" }, { type: "clock", row_span: 1 }] });
    await settle(card);
    const spacer = card.shadowRoot.querySelector(".w-spacer");
    const clockTile = card.shadowRoot.querySelector(".w-clock");
    check(spacer.style.gridRow === "span 1" && clockTile.style.gridRow === "span 4", "Quarter-row grid spans are wrong");
    check(Math.abs(clockTile.getBoundingClientRect().height - normalHeight) < 1, "Quarter-row grid changed ordinary widget height");
    check(Math.abs(spacer.getBoundingClientRect().height - (180 - 3 * 16) / 4) < 1, "Quarter-row spacing geometry is wrong");
    const divider = spacer.querySelector("yad-widget-spacer");
    await settle(divider);
    check(divider.shadowRoot.querySelector('[role="separator"]'), "Horizontal divider did not render");
    card.setConfig({ ...baseConfig, gap: 0, orientation: "portrait", widgets: [{ type: "spacer", row_span: 0.25, portrait_row_span: 0.5, style: "blank" }] });
    await settle(card);
    check(card.shadowRoot.querySelector(".w-spacer").getBoundingClientRect().height === 90, "Portrait spacer half-row should be 90px without gaps");
    check(!card.shadowRoot.querySelector("yad-widget-spacer").shadowRoot.querySelector('[role="separator"]'), "Blank spacer should not render a line");
    for (const height of [0.25, 0.5, 0.75, 1]) {
      card.setConfig({ ...baseConfig, gap: 0, widgets: [{ type: "spacer", row_span: height }] });
      await settle(card);
      check(card.shadowRoot.querySelector(".w-spacer").getBoundingClientRect().height === 180 * height, `Spacer ${height} height is wrong`);
    }
    let invalidRejected = false;
    try { card.setConfig({ ...baseConfig, widgets: [{ type: "spacer", row_span: 0.3 }] }); } catch { invalidRejected = true; }
    check(invalidRejected, "Invalid fractional spacer heights must be rejected");
    card.setConfig({ ...baseConfig, background: "media-source://error" });
    await settle(card);
    check(card.shadowRoot.querySelector('[role="alert"]')?.textContent.includes("Media access denied"), "Media resolver error must be visible");
    card.setConfig({ ...baseConfig, background: "media-source://audio" });
    await settle(card);
    check(card.shadowRoot.querySelector('[role="alert"]')?.textContent.includes("Select an image"), "Non-image media must be rejected visibly");
    card.setConfig({ ...baseConfig, background: "media-source://pending" });
    await settle(card);
    card.setConfig({ ...baseConfig, background: image });
    await settle(card);
    resolveMedia({ url: "/stale.png", mime_type: "image/png" });
    await settle(card);
    check(card.shadowRoot.querySelector(".background-image").src === image, "Stale media resolution overwrote the new URL");
    card.remove();

    const car = document.createElement("yad-widget-car");
    car.config = { type: "car", charge_entity: "sensor.charge", fuel_entity: "sensor.fuel", range_entity: "sensor.range", location_entity: "device_tracker.car", plugged_in_entity: "binary_sensor.plug", charging_entity: "binary_sensor.missing" };
    car.hass = hass;
    document.body.append(car);
    await settle(car);
    check(car.shadowRoot.querySelectorAll(".item").length === 4 && car.shadowRoot.textContent.includes("0%"), "Vehicle should show zero charge and only available configured sensors");
    const moreInfo = [];
    car.addEventListener("hass-more-info", (event) => moreInfo.push(event.detail.entityId));
    car.shadowRoot.querySelector(".item").click();
    check(moreInfo[0] === "sensor.charge", "Vehicle more-info action is missing");
    car.displayOnly = true;
    await settle(car);
    car.shadowRoot.querySelector(".item").click();
    check(moreInfo.length === 1, "Display-only vehicle must not open more-info");
    car.hass = { ...hass, states: { ...hass.states, "sensor.charge": state("sensor.charge", "unavailable"), "sensor.fuel": state("sensor.fuel", "42") } };
    await settle(car);
    check(car.shadowRoot.querySelectorAll(".item").length === 4 && car.shadowRoot.textContent.includes("42%") && !car.shadowRoot.textContent.includes("0%"), "Vehicle state updates did not hide unavailable data and show newly available fuel");
    car.config = { type: "car" };
    await settle(car);
    check(car.shadowRoot.querySelectorAll(".item").length === 0 && car.shadowRoot.querySelector(".empty"), "Unconfigured vehicle should have no empty sensor placeholders");
    car.remove();

    const today = new Date(); today.setHours(0, 0, 0, 0);
    const saturday = new Date(today); saturday.setDate(today.getDate() + ((6 - today.getDay() + 7) % 7)); saturday.setHours(23, 0, 0, 0);
    const monday = new Date(saturday); monday.setDate(saturday.getDate() + 2); monday.setHours(12, 0, 0, 0);
    const event = (summary, start) => ({ summary, start: { dateTime: start.toISOString() }, end: { dateTime: new Date(start.getTime() + 30 * 60000).toISOString() } });
    const calendar = document.createElement("yad-widget-calendar");
    calendar.hass = { ...hass, callApi: async () => [event("Weekend outing", saturday), event("Weekday school", monday)] };
    calendar.config = { type: "calendar", entities: ["calendar.family"], days: 14, highlight_weekends: true, show_weekends: true };
    document.body.append(calendar);
    await settle(calendar);
    check(calendar.shadowRoot.querySelectorAll(".event").length === 2 && calendar.shadowRoot.querySelector(".event.weekend"), "Weekend highlight is missing");
    calendar.style.setProperty("--h-surface-2", "#eeeeee");
    const weekend = calendar.shadowRoot.querySelector(".event.weekend");
    let previousTint;
    for (const [accent, headingColor] of [["#287f8e", "rgb(40, 127, 142)"], ["#858aff", "rgb(133, 138, 255)"], ["#d4774f", "rgb(212, 119, 79)"]]) {
      calendar.style.setProperty("--h-accent", accent);
      const style = getComputedStyle(weekend);
      check(style.outlineStyle === "none" && style.boxShadow.includes("inset"), "Weekend border must stay inside the event to avoid clipped sides");
      check(style.backgroundColor !== previousTint, "Weekend tint must follow the selected palette accent");
      check(getComputedStyle(calendar.shadowRoot.querySelector(".day-label.weekend")).color === headingColor, "Weekend heading must use the selected palette accent");
      previousTint = style.backgroundColor;
    }
    check(calendar.shadowRoot.querySelector(".bar.badge").textContent.trim() === "F" && calendar.shadowRoot.querySelector(".bar").title === "Family", "Calendar initial and accessible name are missing");
    calendar.config = { ...calendar.config, day_position: "right", time_position: "right" };
    await settle(calendar);
    check(calendar.shadowRoot.querySelector(".day-right .day-label.weekend ha-icon") && calendar.shadowRoot.querySelector(".event.weekend .event-time"), "Weekend highlighting must remain visible in side layouts");
    calendar.config = { ...calendar.config, show_weekends: false, max_events: 1 };
    await settle(calendar);
    check(calendar.shadowRoot.querySelectorAll(".event").length === 1 && calendar.shadowRoot.textContent.includes("Weekday school") && !calendar.shadowRoot.textContent.includes("Weekend outing"), "Weekend filter must run before the max-events limit");
    calendar.config = { ...calendar.config, show_weekends: true, show_calendar_badge: false, highlight_weekends: false };
    await settle(calendar);
    check(!calendar.shadowRoot.querySelector(".badge") && !calendar.shadowRoot.querySelector(".weekend"), "Calendar display toggles did not turn off");
    calendar.config = { ...calendar.config, entities: [{ entity: "calendar.family", name: "School", icon: "mdi:school", color: "#123456" }], show_calendar_badge: true };
    await settle(calendar);
    check(calendar.shadowRoot.querySelector(".bar ha-icon")?.getAttribute("icon") === "mdi:school" && calendar.shadowRoot.querySelector(".bar").title === "School", "Calendar custom icon/name are missing");
    calendar.remove();
    localStorage.clear();

    const layoutCalendar = document.createElement("yad-widget-calendar");
    const mondayDate = [monday.getFullYear(), String(monday.getMonth() + 1).padStart(2, "0"), String(monday.getDate()).padStart(2, "0")].join("-");
    const nextDay = new Date(monday); nextDay.setDate(monday.getDate() + 1);
    const nextDate = [nextDay.getFullYear(), String(nextDay.getMonth() + 1).padStart(2, "0"), String(nextDay.getDate()).padStart(2, "0")].join("-");
    let layoutCalls = 0;
    layoutCalendar.hass = { ...hass, callApi: async () => {
      layoutCalls++;
      return [
        { summary: "All day event", start: { date: mondayDate }, end: { date: nextDate }, location: "Library" },
        { ...event("Timed meeting", monday), location: "Meeting room" },
        event("No location", new Date(monday.getTime() + 60 * 60000)),
      ];
    } };
    layoutCalendar.config = { type: "calendar", entities: ["calendar.family"], days: 14, show_location: true };
    layoutCalendar.style.width = "480px";
    document.body.append(layoutCalendar);
    await settle(layoutCalendar);
    const root = layoutCalendar.shadowRoot;
    check(root.querySelectorAll(".day").length === 1 && root.querySelectorAll(".day .event").length === 3, "Events on the same day must share one day heading");
    check(root.querySelector(".list.day-top") && !root.querySelector(".event-time") && root.querySelector(".meta").textContent.includes("All day") && root.querySelector(".meta").textContent.includes("Library"), "Default calendar layout must keep time and location below the event");
    for (const dayPosition of ["left", "right", "top"]) {
      for (const timePosition of ["right", "below"]) {
        layoutCalendar.config = { ...layoutCalendar.config, day_position: dayPosition, time_position: timePosition };
        await settle(layoutCalendar);
        const day = root.querySelector(".day");
        const label = day.querySelector(".day-label").getBoundingClientRect();
        const events = day.querySelector(".day-events").getBoundingClientRect();
        check(dayPosition === "top" ? label.bottom <= events.top : dayPosition === "left" ? label.right <= events.left : label.left >= events.right, `Day heading is not positioned ${dayPosition}`);
        const rows = [...day.querySelectorAll(".event")];
        if (timePosition === "right") {
          check(rows[0].querySelector(".event-time").textContent.trim() === "All day" && rows[0].querySelector(".body .meta").textContent.trim() === "Library", "All-day time or location is missing from right-hand layout");
          check(rows[1].querySelector(".event-time").textContent.includes("12:00") && rows[1].querySelector(".body .meta").textContent.trim() === "Meeting room", "Timed event or location is missing from right-hand layout");
          check(!rows[2].querySelector(".body .meta") && rows[2].querySelector(".event-time"), "Missing locations must not leave an empty location row");
          check(rows[1].querySelector(".event-time").getBoundingClientRect().left >= rows[1].querySelector(".body").getBoundingClientRect().right, "Time must appear to the right of the event body");
        } else {
          check(!day.querySelector(".event-time") && rows[1].querySelector(".meta").textContent.includes("12:00") && rows[1].querySelector(".meta").textContent.includes("Meeting room"), "Below layout must retain time and location together");
        }
      }
    }
    layoutCalendar.config = { ...layoutCalendar.config, time_position: "right", show_location: false };
    await settle(layoutCalendar);
    check(!root.querySelector(".body .meta") && root.querySelectorAll(".event-time").length === 3 && layoutCalls === 1, "Layout changes should hide locations without refetching events");
    layoutCalendar.style.width = "280px";
    layoutCalendar.config = { ...layoutCalendar.config, day_position: "left", show_location: true };
    await settle(layoutCalendar);
    const narrowDay = root.querySelector(".day");
    check(narrowDay.scrollWidth <= narrowDay.clientWidth && [...narrowDay.querySelectorAll(".event")].every((row) => row.scrollWidth <= row.clientWidth), "Side layouts must fit a narrow calendar without horizontal overflow");
    layoutCalendar.remove();
    localStorage.clear();

    let apiCalls = 0;
    let release;
    const cooldownHass = { ...hass, callApi: async () => { apiCalls++; await new Promise((resolve) => { release = resolve; }); return [event("Cached outing", monday)]; } };
    const mount = async () => {
      const element = document.createElement("yad-widget-calendar");
      element.hass = cooldownHass;
      element.config = { type: "calendar", entities: ["calendar.family"], days: 14 };
      document.body.append(element);
      await settle(element);
      return element;
    };
    const first = await mount();
    const concurrent = await mount();
    check(apiCalls === 1, "A second page/tab must not fetch while another fetch is pending");
    release();
    await settle(first);
    check(first.shadowRoot.textContent.includes("Cached outing"), "Fetched calendar events did not render");
    first.remove();
    concurrent.remove();
    const reloaded = await mount();
    check(apiCalls === 1 && reloaded.shadowRoot.textContent.includes("Cached outing"), "A reload within the refresh interval must reuse cached events");
    reloaded.remove();
    localStorage.clear();

    const realSetTimeout = window.setTimeout;
    const realWarn = console.warn;
    const calendarWarnings = [];
    console.warn = (...args) => { calendarWarnings.push(args); };
    window.setTimeout = (callback, delay, ...args) => realSetTimeout(callback, delay === 15000 ? 20 : delay, ...args);
    try {
      let stalled = false;
      let releaseStalled;
      let slowCalls = 0;
      let goodCalls = 0;
      const partial = document.createElement("yad-widget-calendar");
      partial.config = { type: "calendar", entities: ["calendar.slow", "calendar.good"], days: 14 };
      partial.hass = { ...hass, callApi: async (_method, path) => {
        if (path.startsWith("calendars/calendar.slow?")) {
          slowCalls++;
          if (stalled) return new Promise((resolve) => { releaseStalled = resolve; });
          return [event("Slow calendar event", monday)];
        }
        goodCalls++;
        return [event("Good calendar event", monday)];
      } };
      document.body.append(partial);
      await settle(partial);
      check(partial.shadowRoot.textContent.includes("Slow calendar event"), "Initial calendar data did not load");
      const cacheKey = Object.keys(localStorage).find((key) => key.startsWith("yad-calendar:"));
      const expire = () => {
        const cached = JSON.parse(localStorage.getItem(cacheKey));
        cached.fetchedAt = 0;
        cached.failedAt = 0;
        localStorage.setItem(cacheKey, JSON.stringify(cached));
      };
      stalled = true;
      expire();
      await partial._fetch();
      await settle(partial);
      check(partial.shadowRoot.textContent.includes("Good calendar event") && partial.shadowRoot.textContent.includes("Slow calendar event"), "A timed-out calendar must not hide working or cached events");
      check(!partial.shadowRoot.textContent.includes("request timed out") && !partial.shadowRoot.querySelector('[role="alert"]'), "A calendar timeout must not be shown on the dashboard");
      expire();
      await partial._fetch();
      check(slowCalls === 2 && goodCalls === 2, "Retrying a failure must not duplicate a pending request or refetch a fresh calendar");
      releaseStalled([event("Late response", monday)]);
      await settle(partial);
      stalled = false;
      expire();
      await partial._fetch();
      await settle(partial);
      check(slowCalls === 3 && !partial.shadowRoot.querySelector('[role="alert"]'), "A settled calendar must recover on a later refresh");
      partial.remove();
      localStorage.clear();

      const failed = document.createElement("yad-widget-calendar");
      failed.config = { type: "calendar", entities: ["calendar.bad", "calendar.good"], days: 14 };
      failed.hass = { ...hass, callApi: async (_method, path) => {
        if (path.startsWith("calendars/calendar.bad?")) throw new Error("Access denied");
        return [event("Available event", monday)];
      } };
      document.body.append(failed);
      await settle(failed);
      check(failed.shadowRoot.textContent.includes("Available event") && !failed.shadowRoot.textContent.includes("Access denied") && !failed.shadowRoot.querySelector('[role="alert"]'), "A rejected calendar must not block other calendars or show an error");
      check(calendarWarnings.some(([message, error]) => message.includes("calendar.bad") && error.message === "Access denied"), "Calendar failures must be logged to the browser console");
      failed.remove();
      const partialReload = document.createElement("yad-widget-calendar");
      partialReload.config = failed.config;
      partialReload.hass = failed.hass;
      document.body.append(partialReload);
      await settle(partialReload);
      check(partialReload.shadowRoot.textContent.includes("Available event") && !partialReload.shadowRoot.textContent.includes("Access denied") && !partialReload.shadowRoot.querySelector('[role="alert"]'), "Cached partial failures must not show errors");
      partialReload.remove();
      localStorage.clear();

      const allFailed = document.createElement("yad-widget-calendar");
      allFailed.config = { type: "calendar", entities: ["calendar.bad"], days: 14 };
      allFailed.hass = { ...hass, callApi: async () => { throw new Error("Access denied"); } };
      document.body.append(allFailed);
      await settle(allFailed);
      check(allFailed.shadowRoot.textContent.includes("No calendar events available") && !allFailed.shadowRoot.textContent.includes("Access denied"), "Complete calendar failures must show a neutral message");
      allFailed.remove();
      const failedReload = document.createElement("yad-widget-calendar");
      failedReload.config = allFailed.config;
      failedReload.hass = allFailed.hass;
      document.body.append(failedReload);
      await settle(failedReload);
      check(failedReload.shadowRoot.textContent.includes("No calendar events available") && !failedReload.shadowRoot.textContent.includes("Access denied") && !failedReload.shadowRoot.textContent.includes("Loading"), "A cached failure must show a neutral message after reload");
      const failedCacheKey = Object.keys(localStorage).find((key) => key.startsWith("yad-calendar:"));
      const failedCache = JSON.parse(localStorage.getItem(failedCacheKey));
      failedCache.failedAt = 0;
      localStorage.setItem(failedCacheKey, JSON.stringify(failedCache));
      failedReload.hass = { ...hass, callApi: async () => [event("Recovered event", monday)] };
      await failedReload._fetch();
      await settle(failedReload);
      check(failedReload.shadowRoot.textContent.includes("Recovered event") && !failedReload.shadowRoot.textContent.includes("No calendar events available"), "A recovered calendar must show its events");
      failedReload.remove();
      localStorage.clear();

      let releaseOld;
      const changing = document.createElement("yad-widget-calendar");
      changing.config = { type: "calendar", entities: ["calendar.old"], days: 14 };
      changing.hass = { ...hass, callApi: async (_method, path) => {
        if (path.startsWith("calendars/calendar.old?")) return new Promise((resolve) => { releaseOld = resolve; });
        return [event("New configuration", monday)];
      } };
      document.body.append(changing);
      await changing.updateComplete;
      changing.config = { ...changing.config, entities: ["calendar.new"] };
      await changing.updateComplete;
      releaseOld([event("Old configuration", monday)]);
      await settle(changing);
      check(changing.shadowRoot.textContent.includes("New configuration") && !changing.shadowRoot.textContent.includes("Old configuration"), "Changing calendars during a fetch must load the new configuration");
      changing.remove();
      localStorage.clear();
    } finally {
      window.setTimeout = realSetTimeout;
      console.warn = realWarn;
    }

    const menuCalls = [];
    let releaseMenuImage;
    const menu = document.createElement("yad-widget-menu");
    const selectedMedia = { media_content_id: "media-source://menu-one", media_content_type: "image/png" };
    const menuItems = [
      { name: "Home", path: "/", icon: "mdi:home", background_media: selectedMedia },
      { name: "Kitchen", path: "/kitchen", background_media: selectedMedia },
      { name: "Bedroom", path: "/bedroom", background_media: { media_content_id: "media-source://pending-menu" } },
      { name: "Plain", path: "/plain" },
    ];
    menu.config = { type: "menu", items: menuItems };
    menu.style.setProperty("--h-accent", "#287f8e");
    menu.hass = { ...hass, callWS: async (message) => {
      menuCalls.push(message.media_content_id);
      if (message.media_content_id === "media-source://pending-menu") return new Promise((resolve) => { releaseMenuImage = resolve; });
      if (message.media_content_id === "media-source://bad-menu") throw new Error("Media access denied");
      if (message.media_content_id === "media-source://audio-menu") return { url: image, mime_type: "audio/mpeg" };
      return { url: image, mime_type: "image/svg+xml" };
    } };
    document.body.append(menu);
    await settle(menu);
    check(menu.shadowRoot.querySelectorAll(".button-image").length === 2 && menuCalls.filter((id) => id === "media-source://menu-one").length === 1, "Menu buttons must share and render resolved images");
    check(menu.shadowRoot.querySelector(".item.active.has-image")?.getAttribute("aria-current") === "page" && menu.shadowRoot.querySelector(".item.has-image ha-icon"), "Image buttons must retain active and icon states");
    check(getComputedStyle(menu.shadowRoot.querySelector(".button-image")).objectFit === "cover" && getComputedStyle(menu.shadowRoot.querySelector(".item.has-image"), "::before").backgroundColor === "rgba(0, 0, 0, 0.6)", "Menu images must fill buttons with a readable overlay");
    check(getComputedStyle(menu.shadowRoot.querySelector(".item.active.has-image"), "::after").borderTopWidth === "3px", "The active image button must remain visibly highlighted");
    const previousUrl = location.href;
    history.replaceState(null, "", "/?kiosk");
    menu.shadowRoot.querySelectorAll(".item")[1].click();
    check(location.pathname === "/kitchen" && location.search === "?kiosk", "Image buttons must preserve menu navigation and kiosk flags");
    history.replaceState(null, "", previousUrl);
    window.dispatchEvent(new CustomEvent("location-changed"));
    menu.config = { ...menu.config, items: [
      menuItems[0],
      { ...menuItems[1], background_media: { media_content_id: "media-source://bad-menu" } },
      { ...menuItems[2], background_media: { media_content_id: "media-source://audio-menu" } },
      menuItems[3],
    ] };
    await settle(menu);
    releaseMenuImage({ url: "/stale-menu.png", mime_type: "image/png" });
    await settle(menu);
    const menuButtons = [...menu.shadowRoot.querySelectorAll(".item")];
    check(!menu.shadowRoot.querySelector('img[src="/stale-menu.png"]') && menuButtons[1].textContent.includes("Image unavailable") && menuButtons[1].querySelector('[role="alert"]').title.includes("Media access denied"), "Menu image errors and stale resolutions must be handled");
    check(menuButtons[2].querySelector('[role="alert"]').title.includes("Select an image"), "Menu backgrounds must reject non-image media");
    menuButtons[0].querySelector("img").dispatchEvent(new Event("error"));
    await settle(menu);
    check(menu.shadowRoot.querySelector(".item [role=alert]")?.textContent.includes("Image unavailable"), "Broken menu image URLs must be visible");
    menu.config = { ...menu.config, items: [menuItems[3]] };
    await settle(menu);
    check(!menu.shadowRoot.querySelector(".button-image") && !menu.shadowRoot.querySelector('[role="alert"]'), "Removing an image must restore a normal button");
    menu.remove();

    const editor = document.createElement("yad-card-editor");
    editor.hass = hass;
    editor.setConfig(baseConfig);
    document.body.append(editor);
    await settle(editor);
    check(!editor.shadowRoot.querySelector("details.palette-section").open, "Palette should be collapsed initially");
    const backgroundForm = [...editor.shadowRoot.querySelectorAll("ha-form")].find((form) => form.schema.some((field) => field.name === "background_media"));
    const mediaSelector = backgroundForm.schema.find((field) => field.name === "background_media").selector.media;
    check(mediaSelector.image_upload === true && mediaSelector.accept[0] === "image/*", "Native HA media browsing/image upload is not configured");
    let config;
    editor.addEventListener("config-changed", (event) => { config = event.detail.config; });
    backgroundForm.dispatchEvent(new CustomEvent("value-changed", { detail: { value: { ...backgroundForm.data, background: "/old.png", background_media: { media_content_id: "media-source://image_upload/test", media_content_type: "image/png" } } } }));
    await settle(editor);
    check(config.background_media.media_content_id === "media-source://image_upload/test" && !config.background, "Media selection must replace the URL");
    const updatedForm = [...editor.shadowRoot.querySelectorAll("ha-form")].find((form) => form.schema.some((field) => field.name === "background_media"));
    updatedForm.dispatchEvent(new CustomEvent("value-changed", { detail: { value: { ...updatedForm.data, background: "/new.png" } } }));
    await settle(editor);
    check(config.background === "/new.png" && !config.background_media && config.widgets.length === 1, "URL entry must clear media selection and preserve widgets");
    editor.remove();
    const calendarEditor = document.createElement("yad-card-editor");
    calendarEditor.hass = hass;
    calendarEditor.setConfig({ type: "custom:yad-card", widgets: [{ type: "calendar", entities: ["calendar.family"] }] });
    document.body.append(calendarEditor);
    await settle(calendarEditor);
    calendarEditor.shadowRoot.querySelector('button[title="Edit"]').click();
    await settle(calendarEditor);
    const calendarForm = [...calendarEditor.shadowRoot.querySelectorAll("ha-form")].find((form) => form.schema.some((field) => field.schema?.some((child) => child.name === "day_position")));
    const layoutFields = calendarForm.schema.flatMap((field) => field.schema ?? []);
    check(layoutFields.find((field) => field.name === "day_position").selector.select.options.map((option) => option.value).join(",") === "top,left,right" && layoutFields.find((field) => field.name === "time_position").selector.select.options.map((option) => option.value).join(",") === "below,right", "Calendar layout selectors are missing from the editor");
    let calendarConfig;
    calendarEditor.addEventListener("config-changed", (event) => { calendarConfig = event.detail.config; });
    calendarForm.dispatchEvent(new CustomEvent("value-changed", { detail: { value: { ...calendarForm.data, day_position: "left", time_position: "right" } } }));
    check(calendarConfig.widgets[0].day_position === "left" && calendarConfig.widgets[0].time_position === "right", "Calendar layout choices must persist in widget configuration");
    calendarEditor.remove();
    const menuEditor = document.createElement("yad-card-editor");
    menuEditor.hass = hass;
    menuEditor.setConfig({ type: "custom:yad-card", widgets: [{ type: "menu", items: [menuItems[0]] }] });
    document.body.append(menuEditor);
    await settle(menuEditor);
    menuEditor.shadowRoot.querySelector('button[title="Edit"]').click();
    await settle(menuEditor);
    const menuForm = [...menuEditor.shadowRoot.querySelectorAll("ha-form")].find((form) => form.schema.some((field) => field.name === "items"));
    const imageSelector = menuForm.schema.find((field) => field.name === "items").selector.object.fields.background_media.selector.media;
    check(imageSelector.image_upload && imageSelector.accept[0] === "image/*", "Menu editor must use the HA image picker with uploads");
    let menuConfig;
    menuEditor.addEventListener("config-changed", (event) => { menuConfig = event.detail.config; });
    menuForm.dispatchEvent(new CustomEvent("value-changed", { detail: { value: { ...menuForm.data, items: [menuItems[0], menuItems[3]] } } }));
    check(menuConfig.widgets[0].items[0].background_media.media_content_id === selectedMedia.media_content_id && menuConfig.widgets[0].items[1].name === "Plain", "Menu editor must persist button images and other items");
    menuEditor.remove();

    const pagesEditor = document.createElement("yad-card-editor");
    pagesEditor.hass = hass;
    pagesEditor.setConfig({ ...baseConfig, widgets: [{ type: "menu", direction: "horizontal", font_size: 20, items: [menuItems[0]] }, { type: "clock", title: "Original clock" }] });
    document.body.append(pagesEditor);
    await settle(pagesEditor);
    let pagesConfig;
    let pagesConfigEvents = 0;
    pagesEditor.addEventListener("config-changed", (event) => { pagesConfig = event.detail.config; pagesConfigEvents++; });
    const pagesSection = pagesEditor.shadowRoot.querySelector("details.pages-section");
    check(!pagesSection.open, "Pages & menu must start collapsed");
    pagesSection.querySelector("summary").click();
    await settle(pagesEditor);
    check(pagesSection.open && !pagesConfig, "Expanding the section must not change the saved config");
    [...pagesEditor.shadowRoot.querySelectorAll("button")].find((button) => button.textContent.includes("Set up pages")).click();
    await settle(pagesEditor);
    check(pagesConfig.pages.length === 1 && pagesConfig.pages[0].widgets.length === 2 && pagesConfig.widgets.length === 0, "Enabling pages must retain existing widgets on the first page");
    check(pagesConfig.shared_menu.direction === "horizontal" && pagesConfig.shared_menu.font_size === 20, "Existing menu appearance must be retained as shared settings");
    [...pagesEditor.shadowRoot.querySelectorAll("button")].find((button) => button.textContent.includes("Add page")).click();
    await settle(pagesEditor);
    check(pagesConfig.pages.length === 2 && pagesConfig.pages[1].widgets[0].type === "menu", "A new page must have a shared menu for navigation");
    let pageToggles = pagesEditor.shadowRoot.querySelectorAll(".page-toggle");
    check(pageToggles[0].getAttribute("aria-expanded") === "false" && pageToggles[1].getAttribute("aria-expanded") === "true" && pagesEditor.shadowRoot.querySelectorAll(".page ha-form").length === 1, "Adding a page must expand only that page");
    const configEventsBeforeToggle = pagesConfigEvents;
    pageToggles[0].click();
    await settle(pagesEditor);
    pageToggles = pagesEditor.shadowRoot.querySelectorAll(".page-toggle");
    check(pageToggles[0].getAttribute("aria-expanded") === "true" && pageToggles[1].getAttribute("aria-expanded") === "false" && pagesEditor.shadowRoot.querySelectorAll(".page ha-form").length === 1, "Opening another page must collapse the previous page");
    pageToggles[0].click();
    await settle(pagesEditor);
    check(pagesEditor.shadowRoot.querySelectorAll(".page ha-form").length === 0, "An open page can be collapsed");
    pagesEditor.shadowRoot.querySelectorAll(".page-toggle")[1].click();
    await settle(pagesEditor);
    check(pagesConfigEvents === configEventsBeforeToggle, "Expanding pages must not change the saved config");
    const pageForm = pagesEditor.shadowRoot.querySelector(".page ha-form");
    check(pageForm.schema.find((field) => field.name === "background_media").selector.media.image_upload, "Page button image must use the media picker");
    pageForm.dispatchEvent(new CustomEvent("value-changed", { detail: { value: { ...pageForm.data, name: "Kitchen", icon: "mdi:stove", background_media: selectedMedia } } }));
    await settle(pagesEditor);
    check(pagesConfig.pages[1].name === "Kitchen" && pagesConfig.pages[1].background_media.media_content_id === selectedMedia.media_content_id, "Page menu details must be saved");
    const sharedMenuForm = [...pagesEditor.shadowRoot.querySelectorAll("ha-form")].find((form) => form.schema.some((field) => field.schema?.some((child) => child.name === "direction")));
    sharedMenuForm.dispatchEvent(new CustomEvent("value-changed", { detail: { value: { ...sharedMenuForm.data, direction: "vertical", show_icons: false } } }));
    check(pagesConfig.shared_menu.direction === "vertical" && pagesConfig.shared_menu.show_icons === false, "Shared menu appearance must be editable once");
    const timerForm = [...pagesEditor.shadowRoot.querySelectorAll("ha-form")].find((form) => form.schema.some((field) => field.name === "return_home_minutes"));
    check(timerForm.data.return_home_minutes === 0, "Home timer must default to disabled");
    timerForm.dispatchEvent(new CustomEvent("value-changed", { detail: { value: { return_home_minutes: 5 } } }));
    check(pagesConfig.return_home_minutes === 5 && pagesConfig.shared_menu.direction === "vertical", "Home timer must be saved without changing the menu");
    [...pagesEditor.shadowRoot.querySelectorAll("button")].find((button) => button.textContent.includes("Add widget")).click();
    await settle(pagesEditor);
    [...pagesEditor.shadowRoot.querySelectorAll("button.pick")].find((button) => button.textContent.includes("Sensors")).click();
    await settle(pagesEditor);
    check(pagesConfig.pages[1].widgets.some((widget) => widget.type === "sensors") && pagesConfig.pages[0].widgets.length === 2, "Adding a widget must affect only the selected page");
    pagesEditor.shadowRoot.querySelector('.editor-head button[title="Back"]').click();
    await settle(pagesEditor);
    check(pagesEditor.shadowRoot.querySelector("details.pages-section").open, "Returning from widget editing must preserve the open section");
    pagesEditor.shadowRoot.querySelectorAll(".page-toggle")[0].click();
    await settle(pagesEditor);
    pagesEditor.shadowRoot.querySelector(".page .text-btn").click();
    await settle(pagesEditor);
    check(pagesEditor.shadowRoot.textContent.includes("Original clock"), "Selecting a page must show its widget list");
    pagesEditor.shadowRoot.querySelector('.list button[title="Edit"]').click();
    await settle(pagesEditor);
    check(pagesEditor.shadowRoot.textContent.includes("Menu buttons are configured in Pages & menu.") && ![...pagesEditor.shadowRoot.querySelectorAll("ha-form")].some((form) => form.schema.some((field) => field.name === "items")), "Page menu widgets must use shared configuration rather than editing button lists");
    pagesEditor.shadowRoot.querySelector('.editor-head button[title="Back"]').click();
    await settle(pagesEditor);
    pagesEditor.shadowRoot.querySelector('.page button[title="Move page down"]').click();
    await settle(pagesEditor);
    check(pagesConfig.pages[1].name === "Home" && pagesConfig.pages[1].widgets.some((widget) => widget.type === "clock"), "Reordering pages must preserve their widgets");
    check(pagesEditor.shadowRoot.querySelectorAll(".page-toggle")[1].getAttribute("aria-expanded") === "true", "The expanded page must remain open after reordering");
    const currentSection = pagesEditor.shadowRoot.querySelector("details.pages-section");
    currentSection.querySelector("summary").click();
    await settle(pagesEditor);
    check(!currentSection.open, "Pages & menu must be collapsible");
    currentSection.querySelector("summary").click();
    await settle(pagesEditor);
    check(currentSection.open && pagesEditor.shadowRoot.querySelectorAll(".page-toggle")[1].getAttribute("aria-expanded") === "true", "Reopening the section must retain the expanded page");
    const generalForm = pagesEditor.shadowRoot.querySelector("ha-form");
    generalForm.dispatchEvent(new CustomEvent("value-changed", { detail: { value: { ...generalForm.data, columns: 5 } } }));
    check(pagesConfig.pages.length === 2 && pagesConfig.columns === 5 && pagesConfig.return_home_minutes === 5, "General settings must preserve pages and the home timer");
    await settle(pagesEditor);
    pagesEditor.shadowRoot.querySelector('.page button[title="Remove page"]').click();
    await settle(pagesEditor);
    check(pagesConfig.pages.length === 2 && pagesEditor.shadowRoot.textContent.includes("Remove this page and all its widgets?"), "Page removal must require confirmation");
    check(pagesEditor.shadowRoot.querySelectorAll(".page-toggle")[0].getAttribute("aria-expanded") === "true" && pagesEditor.shadowRoot.querySelectorAll(".page ha-form").length === 1, "Removing a collapsed page must open only its confirmation");
    [...pagesEditor.shadowRoot.querySelectorAll(".page button")].find((button) => button.textContent.trim() === "Remove page").click();
    await settle(pagesEditor);
    check(pagesConfig.pages.length === 1 && pagesConfig.pages[0].name === "Home", "Confirming removal must remove only the chosen page");
    pagesEditor.remove();

    const newPagesEditor = document.createElement("yad-card-editor");
    newPagesEditor.hass = hass;
    newPagesEditor.setConfig(baseConfig);
    document.body.append(newPagesEditor);
    await settle(newPagesEditor);
    let newPagesConfig;
    newPagesEditor.addEventListener("config-changed", (event) => { newPagesConfig = event.detail.config; });
    newPagesEditor.shadowRoot.querySelector("details.pages-section summary").click();
    await settle(newPagesEditor);
    [...newPagesEditor.shadowRoot.querySelectorAll("button")].find((button) => button.textContent.includes("Set up pages")).click();
    check(newPagesConfig.pages[0].widgets.some((widget) => widget.type === "clock") && newPagesConfig.pages[0].widgets.some((widget) => widget.type === "menu"), "Page setup must add navigation without losing existing widgets");
    newPagesEditor.remove();

    const originalUrl = location.href;
    history.replaceState(null, "", "/?kiosk#dashboard");
    const pageCard = document.createElement("yad-card");
    pageCard.hass = { ...hass, callWS: async () => ({ url: image, mime_type: "image/svg+xml" }) };
    const pageConfig = {
      ...baseConfig,
      widgets: [],
      shared_menu: { direction: "horizontal", show_icons: false, font_size: 22 },
      pages: [
        { id: "home", name: "Home", icon: "mdi:home", widgets: [{ type: "menu" }, { type: "clock" }] },
        { id: "kitchen", name: "Kitchen", icon: "mdi:stove", background_media: selectedMedia, widgets: [{ type: "menu" }, { type: "spacer" }] },
      ],
    };
    pageCard.setConfig(pageConfig);
    document.body.append(pageCard);
    await settle(pageCard);
    let pageMenu = pageCard.shadowRoot.querySelector("yad-widget-menu");
    await settle(pageMenu);
    check(pageCard.shadowRoot.querySelector("yad-widget-clock") && pageMenu.shadowRoot.querySelectorAll(".item").length === 2 && pageMenu.shadowRoot.querySelector(".active").textContent.includes("Home"), "The first page and shared menu must render by default");
    check(pageMenu.shadowRoot.querySelector(".menu.horizontal") && !pageMenu.shadowRoot.querySelector(".item ha-icon") && pageMenu.shadowRoot.querySelector(".menu").style.fontSize === "22px", "Shared menu appearance must apply to the page");
    pageMenu.shadowRoot.querySelectorAll(".item")[1].click();
    await settle(pageCard);
    pageMenu = pageCard.shadowRoot.querySelector("yad-widget-menu");
    await settle(pageMenu);
    check(pageCard.shadowRoot.querySelector("yad-widget-spacer") && !pageCard.shadowRoot.querySelector("yad-widget-clock") && pageMenu.shadowRoot.querySelector(".active").textContent.includes("Kitchen"), "Switching pages must render only that page's widgets and highlight it");
    check(pageMenu.shadowRoot.querySelector(".menu.horizontal") && !pageMenu.shadowRoot.querySelector(".item ha-icon"), "All pages must use the same menu appearance");
    check(new URL(location.href).searchParams.get("yad-page") === "kitchen" && location.search.includes("kiosk") && location.hash === "#dashboard", "Page navigation must preserve query flags and hash");
    check(pageMenu.shadowRoot.querySelectorAll(".button-image").length === 1, "The shared menu must display page images");
    const back = new Promise((resolve) => window.addEventListener("popstate", resolve, { once: true }));
    history.back();
    await back;
    await settle(pageCard);
    check(pageCard.shadowRoot.querySelector("yad-widget-clock"), "Browser back must restore the previous page");
    history.replaceState(null, "", "/?kiosk&yad-page=kitchen");
    const reloadedPage = document.createElement("yad-card");
    reloadedPage.hass = hass;
    reloadedPage.setConfig(pageConfig);
    document.body.append(reloadedPage);
    await settle(reloadedPage);
    check(reloadedPage.shadowRoot.querySelector("yad-widget-spacer"), "A page link must restore the selected page on reload");
    reloadedPage.remove();
    history.replaceState(null, "", "/?kiosk&yad-page=missing");
    window.dispatchEvent(new CustomEvent("location-changed"));
    await settle(pageCard);
    check(pageCard.shadowRoot.querySelector("yad-widget-clock"), "Unknown page IDs must fall back to the first page");
    pageCard.remove();
    const previewCard = document.createElement("yad-card");
    previewCard.preview = true;
    previewCard.hass = hass;
    previewCard.setConfig(pageConfig);
    document.body.append(previewCard);
    await settle(previewCard);
    const previewUrl = location.href;
    window.dispatchEvent(new CustomEvent("yad-editor-page-selected", { detail: { page: "kitchen" } }));
    await settle(previewCard);
    check(previewCard.shadowRoot.querySelector("yad-widget-spacer") && location.href === previewUrl, "Editing a page must update the card preview without navigating the dashboard");
    const previewMenu = previewCard.shadowRoot.querySelector("yad-widget-menu");
    await settle(previewMenu);
    previewMenu.shadowRoot.querySelector(".item").click();
    await settle(previewCard);
    check(previewCard.shadowRoot.querySelector("yad-widget-clock") && location.href === previewUrl, "Preview menu navigation must not change the dashboard URL");
    previewCard.remove();

    const nativeSetTimeout = window.setTimeout;
    const nativeClearTimeout = window.clearTimeout;
    const timers = new Map();
    let timerId = -1;
    window.setTimeout = (callback, delay, ...args) => {
      if (delay === 60_000 || delay === 120_000) {
        const id = timerId--;
        timers.set(id, { callback, delay, args });
        return id;
      }
      return nativeSetTimeout(callback, delay, ...args);
    };
    window.clearTimeout = (id) => {
      if (id < 0) timers.delete(id);
      else nativeClearTimeout(id);
    };
    try {
      history.replaceState(null, "", "/?kiosk&yad-page=kitchen#dashboard");
      const timedCard = document.createElement("yad-card");
      timedCard.hass = hass;
      timedCard.setConfig({ ...pageConfig, return_home_minutes: 1 });
      document.body.append(timedCard);
      await settle(timedCard);
      check(timers.size === 1 && [...timers.values()][0].delay === 60_000, "A linked non-home page must start the configured minute timer");
      timedCard.setConfig({ ...pageConfig, return_home_minutes: 1, gap: 12 });
      check(timers.size === 1 && timers.has(-1), "Unrelated configuration updates must not restart the timer");
      timedCard.setConfig({ ...pageConfig, return_home_minutes: 2 });
      check(timers.size === 1 && [...timers.values()][0].delay === 120_000, "Changing the duration must replace the timer");
      timedCard.setConfig({ ...pageConfig, return_home_minutes: 0 });
      check(timers.size === 0, "Setting the timer to zero must cancel it");
      const threePages = { ...pageConfig, pages: [...pageConfig.pages, { id: "office", name: "Office", widgets: [{ type: "menu" }] }], return_home_minutes: 1 };
      timedCard.setConfig(threePages);
      const previousTimer = [...timers.keys()][0];
      history.replaceState(null, "", "/?kiosk&yad-page=office#dashboard");
      window.dispatchEvent(new CustomEvent("location-changed"));
      check(timers.size === 1 && !timers.has(previousTimer), "Switching between non-home pages must restart the timer");
      history.replaceState(null, "", "/?kiosk&yad-page=home#dashboard");
      window.dispatchEvent(new CustomEvent("location-changed"));
      check(timers.size === 0, "Navigating home manually must cancel the timer");
      history.replaceState(null, "", "/?kiosk&yad-page=kitchen#dashboard");
      window.dispatchEvent(new CustomEvent("location-changed"));
      const homeTimer = [...timers.values()][0];
      timers.clear();
      homeTimer.callback(...homeTimer.args);
      await settle(timedCard);
      const returnedUrl = new URL(location.href);
      check(timedCard.shadowRoot.querySelector("yad-widget-clock") && returnedUrl.searchParams.has("kiosk") && !returnedUrl.searchParams.has("yad-page") && location.hash === "#dashboard", "Timer must return home and preserve other URL parameters and hash");
      check(timers.size === 0, "No timer should run on the home page");
      history.replaceState(null, "", "/?kiosk&yad-page=kitchen#dashboard");
      window.dispatchEvent(new CustomEvent("location-changed"));
      check(timers.size === 1, "Navigating away from home must start a timer");
      timedCard.remove();
      check(timers.size === 0, "Disconnecting the card must cancel the timer");
      document.body.append(timedCard);
      check(timers.size === 1, "Reconnecting on a non-home page must restart the timer");
      timedCard.preview = true;
      await settle(timedCard);
      check(timers.size === 0, "Editor previews must not run the timer");
      timedCard.remove();
      for (const invalid of [-1, 0.5, 35792]) {
        let rejected = false;
        try { timedCard.setConfig({ ...pageConfig, return_home_minutes: invalid }); } catch { rejected = true; }
        check(rejected, "Invalid home timer values must be rejected");
      }
    } finally {
      window.setTimeout = nativeSetTimeout;
      window.clearTimeout = nativeClearTimeout;
    }
    history.replaceState(null, "", originalUrl);
    window.dispatchEvent(new CustomEvent("location-changed"));
    return ["background controls and failures", "quarter-row geometry", "vehicle data and actions", "calendar weekends, badges and layouts", "menu button images", "internal pages and editor", "editor media/upload and collapsed palettes"];
  });
  console.log(`PASS features: ${features.join("; ")}`);
  await page.setViewportSize({ width: 1000, height: 800 });
  const automaticHeight = await page.evaluate(async () => {
    const check = (condition, message) => { if (!condition) throw new Error(message); };
    const settle = async (card) => {
      await card.updateComplete;
      await new Promise((resolve) => setTimeout(resolve, 650));
    };
    const state = (entity_id, value, attributes = {}) => ({ entity_id, state: value, attributes });
    const entities = Object.fromEntries(Array.from({ length: 30 }, (_, i) => {
      const id = `sensor.test_${i}`;
      return [id, state(id, String(i), { friendly_name: `Reading ${i}` })];
    }));
    const hass = {
      states: {
        ...entities,
        "sensor.charge": state("sensor.charge", "50"),
        "sensor.range": state("sensor.range", "120"),
        "person.test": state("person.test", "home", { friendly_name: "Test" }),
        "weather.test": state("weather.test", "sunny", { temperature: 16, humidity: 60 }),
        "climate.test": state("climate.test", "heat", { temperature: 21, current_temperature: 20, hvac_modes: ["off", "heat"] }),
        "media_player.test": state("media_player.test", "playing", { media_title: "Test track", supported_features: 4 | 16 | 32 }),
      },
      user: { name: "Test" }, language: "en-GB", locale: { language: "en-GB", time_format: "24" },
      callApi: async () => [],
      callWS: async () => ({}),
      connection: { subscribeMessage: async (callback) => { callback({ forecast: [] }); return () => {}; } },
    };
    const card = document.createElement("yad-card");
    card.style.width = "900px";
    card.hass = hass;
    const config = {
      type: "custom:yad-card", layout_mode: "compact", columns: 2, portrait_columns: 1, orientation: "landscape",
      height: "auto", screen: "fill", row_height: 180, gap: 16,
      widgets: [
        { type: "car", charge_entity: "sensor.charge", auto_height: true, col_span: 1, row_span: 1 },
        { type: "clock", auto_height: false, row_span: 2, col_span: 1 },
        { type: "car", charge_entity: "sensor.charge", auto_height: true, col_span: 1, row_span: 1 },
        { type: "sensors", entities: Object.keys(entities), layout: "list", auto_height: true, auto_height_max: 240, col_span: 2, row_span: 3 },
      ],
    };
    card.setConfig(config);
    document.body.append(card);
    await settle(card);
    const tiles = () => [...card.shadowRoot.querySelectorAll(".tile")];
    const rect = (element) => element.getBoundingClientRect();
    const assertNoOverlap = () => {
      const boxes = tiles().map(rect);
      for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i], b = boxes[j];
        check(a.right <= b.left + 1 || b.right <= a.left + 1 || a.bottom <= b.top + 1 || b.bottom <= a.top + 1, `Compact widgets ${i}/${j} overlap`);
      }
    };
    assertNoOverlap();
    check(!card.shadowRoot.querySelector(".compact"), "Removed compact mode must not be rendered for legacy configurations");
    check(rect(tiles()[0]).height < 180, "Short vehicle widget did not shrink to content");
    check(Math.abs(rect(tiles()[1]).height - 376) < 1, "Manual widget row-based height changed");
    check(rect(tiles()[2]).top < rect(tiles()[1]).bottom - 100, "Widgets below an automatic-height widget must move up");
    check(rect(tiles()[2]).top - rect(tiles()[0]).bottom < 16 + 33 + 16 + 1, "Automatic-height grid space must fit its content to the nearest quarter row");
    check(rect(tiles()[3]).height <= 241, "Automatic-height cap was exceeded");
    const sensorList = tiles()[3].querySelector("yad-widget-sensors").shadowRoot.querySelector(".scroll");
    check(sensorList.scrollHeight > sensorList.clientHeight + 100, "Long sensor lists must scroll inside the capped widget");
    card.hass = { ...hass, states: { ...hass.states, "sensor.charge": state("sensor.charge", "unavailable") } };
    await settle(card);
    assertNoOverlap();
    card.setConfig({ ...config, orientation: "portrait" });
    await settle(card);
    check(tiles().every((tile) => Math.abs(rect(tile).width - 868) < 1), "Portrait column spans did not clamp to one column");
    assertNoOverlap();
    card.style.width = "520px";
    await settle(card);
    check(tiles().every((tile) => Math.abs(rect(tile).width - 488) < 1), "Compact tiles did not resize with the card width");
    assertNoOverlap();
    card.style.width = "900px";
    card.setConfig({ ...config, layout_mode: "grid", height: "auto", screen: "fill", widgets: [{ type: "car", charge_entity: "sensor.charge", auto_height: true, col_span: 1, row_span: 2 }] });
    await settle(card);
    check(tiles()[0].firstElementChild.hasAttribute("auto-height") && rect(tiles()[0]).height < 376, "Individual automatic height must work in the normal grid");
    for (const screen of ["1080p", "4k"]) {
      card.setConfig({ ...config, screen, height: "screen" });
      await settle(card);
      check(card.shadowRoot.querySelector(".fixed") && card.shadowRoot.querySelector(".fill"), "Automatic height must preserve screen presets and scaling");
      assertNoOverlap();
      const span = (tile) => Number(tile.style.gridRow.match(/span (\d+)/)[1]);
      check(span(tiles()[0]) < 4 && span(tiles()[1]) === 8 && span(tiles()[3]) <= 12, "Automatic widgets must fit within their row span while manual spans are kept");
      check(rect(tiles()[2]).top < rect(tiles()[1]).bottom, "Widgets below must move up on fixed screens");
    }
    const growth = { ...config, screen: "1080p", height: "screen", columns: 1 };
    const car = { type: "car", charge_entity: "sensor.charge", col_span: 1, row_span: 2 };
    card.setConfig({ ...growth, widgets: [{ ...car, auto_height: false }, { type: "clock", col_span: 1, row_span: 2 }] });
    await settle(card);
    const manualOnlyHeight = rect(tiles()[1]).height;
    card.setConfig({ ...growth, widgets: [{ ...car, auto_height: true }, { type: "clock", col_span: 1, row_span: 2 }] });
    await settle(card);
    check(rect(tiles()[1]).height > manualOnlyHeight + 50, "Widgets without automatic height must grow into freed space on fixed screens");
    card.setConfig({ ...growth, widgets: [{ ...car, auto_height: true }, { ...car, auto_height: true }, { ...car, auto_height: true }] });
    await settle(card);
    check(card.shadowRoot.querySelector(".packed"), "All-automatic fixed layouts must pack rows");
    check(rect(tiles()[1]).top - rect(tiles()[0]).bottom < 80 && rect(tiles()[2]).top - rect(tiles()[1]).bottom < 80, "All-automatic widgets must pack to the top instead of spreading out");
    assertNoOverlap();
    card.hass = hass;
    const intrinsicWidgets = [
      { type: "clock" },
      { type: "weather", entity: "weather.test" },
      { type: "climate", entity: "climate.test" },
      { type: "media", entity: "media_player.test" },
      { type: "people", entities: ["person.test"] },
      { type: "energy", power_entity: "sensor.charge", show_graph: false },
      { type: "calendar", entities: [], title: "Calendar" },
      { type: "toggles", entities: [] },
    ];
    card.setConfig({ ...config, screen: "fill", widgets: intrinsicWidgets.map((widget) => ({ ...widget, auto_height: true, col_span: 1, row_span: 3 })) });
    await settle(card);
    assertNoOverlap();
    const climate = card.shadowRoot.querySelector("yad-widget-climate");
    check(rect(climate.shadowRoot.querySelector(".dial")).height > 100, "Automatic climate dial collapsed");
    const media = card.shadowRoot.querySelector("yad-widget-media");
    check(rect(media.shadowRoot.querySelector(".art")).height > 50, "Automatic media artwork collapsed");
    const sizes = tiles().map((tile) => [tile.firstElementChild.localName, rect(tile).height]);
    check(sizes.every(([, height]) => height > 20 && height <= 601), "An auto-height widget collapsed or exceeded its cap");
    let embedded;
    window.loadCardHelpers = async () => ({
      createCardElement: () => {
        embedded = document.createElement("div");
        embedded.style.height = "70px";
        embedded.textContent = "Embedded content";
        return embedded;
      },
    });
    card.setConfig({ ...config, widgets: [
      { type: "card", card: { type: "markdown" }, auto_height: true, col_span: 2, row_span: 2 },
      { type: "spacer", row_span: 0.25, col_span: 2 },
      { type: "car", charge_entity: "sensor.charge", auto_height: true, visibility: "portrait", col_span: 1 },
    ] });
    await settle(card);
    check(tiles().length === 2, "Compact layout must honour orientation visibility");
    check(Math.abs(rect(tiles()[1]).height - 33) < 1, "Compact spacer quarter-row size changed");
    const embeddedHeight = rect(tiles()[0]).height;
    const spacerTop = rect(tiles()[1]).top;
    embedded.style.height = "170px";
    await settle(card);
    check(Math.abs(rect(tiles()[0]).height - embeddedHeight - 100) < 1, "Embedded content should grow its automatic-height tile");
    check(rect(tiles()[1]).top - spacerTop > 100 - 1 - 49, "Widgets below should move down when automatic-height content grows");
    assertNoOverlap();
    delete window.loadCardHelpers;
    const editor = document.createElement("yad-card-editor");
    editor.hass = hass;
    editor.setConfig(config);
    document.body.append(editor);
    await settle(editor);
    const form = editor.shadowRoot.querySelector("ha-form");
    const fields = form.schema.flatMap((group) => group.schema ?? [group]).map((field) => field.name);
    check(!fields.includes("layout_mode") && fields.includes("screen") && fields.includes("row_height"), "Screen presets must always be available and Compact mode must be removed");
    editor.setConfig({ ...config, screen: "custom" });
    await settle(editor);
    const customFields = editor.shadowRoot.querySelector("ha-form").schema.flatMap((group) => group.schema ?? [group]).map((field) => field.name);
    check(customFields.includes("screen_width") && customFields.includes("screen_height") && customFields.includes("ui_scale"), "Custom resolution and scaling controls must remain available");
    editor.shadowRoot.querySelector('button[title="Edit"]').click();
    await settle(editor);
    const widgetFields = [...editor.shadowRoot.querySelectorAll("ha-form")].flatMap((form) => form.schema.flatMap((group) => group.schema ?? [group])).map((field) => field.name);
    check(widgetFields.includes("auto_height") && widgetFields.includes("auto_height_max"), "Per-widget automatic height controls are missing");
    editor.remove();
    card.remove();
    return sizes;
  });
  console.log(`PASS individual automatic height: stable grid placement, screen presets, caps, state updates and widget controls ${JSON.stringify(automaticHeight)}`);
  await page.clock.install();
  await page.evaluate(async () => {
    window.backgroundRenewals = 0;
    window.menuRenewals = 0;
    window.menuRetries = 0;
    const card = document.createElement("yad-card");
    card.hass = {
      states: {},
      callWS: async () => {
        window.backgroundRenewals++;
        return { url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E", mime_type: "image/svg+xml" };
      },
    };
    card.setConfig({ type: "custom:yad-card", background: "media-source://renewal", widgets: [] });
    document.body.append(card);
    await card.updateComplete;
    await card.updateComplete;
    const menu = document.createElement("yad-widget-menu");
    menu.config = { type: "menu", items: [{ name: "Home", path: "/", background_media: { media_content_id: "media-source://menu-renewal" } }] };
    menu.hass = {
      states: {},
      callWS: async () => {
        window.menuRenewals++;
        return { url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E", mime_type: "image/svg+xml" };
      },
    };
    document.body.append(menu);
    await menu.updateComplete;
    await menu.updateComplete;
    const retryMenu = document.createElement("yad-widget-menu");
    retryMenu.id = "retry-menu";
    retryMenu.config = { type: "menu", items: [{ name: "Retry", path: "/retry", background_media: { media_content_id: "media-source://retry" } }] };
    retryMenu.hass = {
      states: {},
      callWS: async () => {
        window.menuRetries++;
        if (window.menuRetries === 1) throw new Error("Temporary media error");
        return { url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E", mime_type: "image/svg+xml" };
      },
    };
    document.body.append(retryMenu);
    await retryMenu.updateComplete;
    await retryMenu.updateComplete;
  });
  await page.clock.fastForward(60_100);
  assert.equal(await page.evaluate(() => window.menuRetries), 2, "Failed menu images must be retried");
  assert.equal(await page.evaluate(() => document.querySelector("#retry-menu").shadowRoot.querySelectorAll(".button-image").length), 1, "Menu image should render after retry succeeds");
  await page.evaluate(() => document.querySelector("#retry-menu").remove());
  await page.clock.fastForward(23 * 60 * 60 * 1000 + 100);
  assert.equal(await page.evaluate(() => window.backgroundRenewals), 2, "Signed background URLs must renew before expiry");
  assert.equal(await page.evaluate(() => window.menuRenewals), 2, "Signed menu image URLs must renew before expiry");
  await page.evaluate(() => { document.querySelector("yad-card").remove(); document.querySelector("yad-widget-menu").remove(); });
  await page.clock.fastForward(23 * 60 * 60 * 1000 + 100);
  assert.equal(await page.evaluate(() => window.backgroundRenewals), 2, "Disconnected cards must stop renewing backgrounds");
  assert.equal(await page.evaluate(() => window.menuRenewals), 2, "Disconnected menus must stop renewing images");
  console.log("PASS background and menu image renewal and timer cleanup");
  assert.deepEqual(errors, [], "The production bundle must not cause browser exceptions");
  console.log(`PASS ${manifest.filename}: cards, clock rendering, widgets, editor and card picker`);
} finally {
  if (browser) await browser.close();
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
}
