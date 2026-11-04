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
    const widgets = ["clock", "weather", "calendar", "energy", "climate", "toggles", "sensors", "media", "people", "card"];
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
  assert.deepEqual(errors, [], "The production bundle must not cause browser exceptions");
  console.log(`PASS ${manifest.filename}: cards, clock rendering, widgets, editor and card picker`);
} finally {
  if (browser) await browser.close();
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
}
