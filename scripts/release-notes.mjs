// Prints the CHANGELOG.md section for a version (used as GitHub release notes).
// Usage: node scripts/release-notes.mjs 1.2.3
import { readFileSync } from "node:fs";

const version = (process.argv[2] ?? JSON.parse(readFileSync("package.json", "utf8")).version).replace(/^v/, "");
const changelog = readFileSync("CHANGELOG.md", "utf8").replace(/\r\n/g, "\n");
const start = changelog.search(new RegExp(`^## \\[${version.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\]`, "m"));
if (start < 0) {
  console.log("See CHANGELOG.md for details.");
  process.exit(0);
}
const body = changelog.slice(start).split("\n").slice(1).join("\n");
const end = body.search(/^## \[|^\[Unreleased\]:/m);
console.log((end < 0 ? body : body.slice(0, end)).trim());
