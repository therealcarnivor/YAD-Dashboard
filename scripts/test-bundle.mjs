import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { chromium } from "playwright";

const manifest = JSON.parse(await readFile(new URL("../hacs.json", import.meta.url), "utf8"));
const bundle = await readFile(new URL(`../dist/${manifest.filename}`, import.meta.url));
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
    const widgets = ["clock", "weather", "calendar", "energy", "climate", "toggles", "sensors", "media", "people", "card", "car", "spacer"];
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
    check(calendar.shadowRoot.querySelector(".bar.badge").textContent.trim() === "F" && calendar.shadowRoot.querySelector(".bar").title === "Family", "Calendar initial and accessible name are missing");
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
    return ["background controls and failures", "quarter-row geometry", "vehicle data and actions", "calendar weekends and badges", "editor media/upload and collapsed palettes"];
  });
  console.log(`PASS features: ${features.join("; ")}`);
  await page.clock.install();
  await page.evaluate(async () => {
    window.backgroundRenewals = 0;
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
  });
  await page.clock.fastForward(23 * 60 * 60 * 1000 + 100);
  assert.equal(await page.evaluate(() => window.backgroundRenewals), 2, "Signed background URLs must renew before expiry");
  await page.evaluate(() => document.querySelector("yad-card").remove());
  await page.clock.fastForward(23 * 60 * 60 * 1000 + 100);
  assert.equal(await page.evaluate(() => window.backgroundRenewals), 2, "Disconnected cards must stop renewing backgrounds");
  console.log("PASS background media renewal and timer cleanup");
  assert.deepEqual(errors, [], "The production bundle must not cause browser exceptions");
  console.log(`PASS ${manifest.filename}: cards, clock rendering, widgets, editor and card picker`);
} finally {
  if (browser) await browser.close();
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
}
