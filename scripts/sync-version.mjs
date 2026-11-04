// Keeps src/version.ts and CHANGELOG.md in step with package.json.
// Runs automatically from `npm version <patch|minor|major>`; use `--check` in CI.
import { readFileSync, writeFileSync } from "node:fs";

const REPO = "https://github.com/therealcarnivor/HA-Dashboard";
const { version } = JSON.parse(readFileSync("package.json", "utf8"));
const check = process.argv.includes("--check");
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
let failed = false;

const versionFile = "src/version.ts";
const expected = `export const VERSION = "${version}";\n`;
if (readFileSync(versionFile, "utf8").replace(/\r\n/g, "\n") !== expected) {
  if (check) {
    console.error(`${versionFile} does not match package.json version ${version}. Run: node scripts/sync-version.mjs`);
    failed = true;
  } else {
    writeFileSync(versionFile, expected);
    console.log(`Updated ${versionFile} to ${version}`);
  }
}

const changelogFile = "CHANGELOG.md";
let changelog = readFileSync(changelogFile, "utf8").replace(/\r\n/g, "\n");
if (!new RegExp(`^## \\[${escape(version)}\\]`, "m").test(changelog)) {
  if (check) {
    console.error(`${changelogFile} has no "## [${version}]" section.`);
    failed = true;
  } else {
    const unreleased = changelog.match(/^## \[Unreleased\]\n([\s\S]*?)(?=^## \[|^\[Unreleased\]:)/m);
    if (!unreleased || !unreleased[1].trim()) {
      console.warn(`Warning: the Unreleased section of ${changelogFile} is empty, so the ${version} release notes will be blank.`);
    }
    const date = new Date().toISOString().slice(0, 10);
    changelog = changelog.replace(/^## \[Unreleased\]\n/m, `## [Unreleased]\n\n## [${version}] - ${date}\n`);

    // Point the compare links at the new version.
    const previous = changelog.match(/^\[Unreleased\]: .*\/compare\/(v\S+?)\.\.\.HEAD$/m)?.[1];
    changelog = changelog.replace(/^\[Unreleased\]: .*$/m, `[Unreleased]: ${REPO}/compare/v${version}...HEAD`);
    const link = previous ? `${REPO}/compare/${previous}...v${version}` : `${REPO}/releases/tag/v${version}`;
    changelog = changelog.replace(/^(\[Unreleased\]: .*)$/m, `$1\n[${version}]: ${link}`);

    writeFileSync(changelogFile, changelog);
    console.log(`Moved Unreleased changes in ${changelogFile} to ${version}`);
  }
}

if (failed) process.exit(1);
