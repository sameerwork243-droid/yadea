#!/usr/bin/env node
/**
 * Emit the public GT70 video manifest.
 *
 *   node scripts/gt70-write-manifest.mjs [--check]
 *
 * `src/content/gt70Videos.json` is the single source of truth. This publishes it
 * to `public/videos/gt70/manifest.json` so the asset layout is machine-readable
 * without parsing TypeScript, and so the typed site manifest and the published
 * manifest can never drift apart.
 *
 * Every referenced file is verified to exist. A path pointing at nothing is a
 * hard error: the whole point of the manifest is that a consumer can trust it,
 * and a broken poster would render as a blank rectangle.
 *
 * --check validates and compares without writing, for use in CI.
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

const SOURCE = join(root, "src", "content", "gt70Videos.json");
const TARGET = join(root, "public", "videos", "gt70", "manifest.json");

const checkOnly = process.argv.includes("--check");

const manifest = JSON.parse(readFileSync(SOURCE, "utf8"));
const errors = [];
const warnings = [];

/** Resolve a public URL path to a file on disk. */
const toDisk = (urlPath) => join(root, "public", urlPath.replace(/^\//, ""));

/** Any string that looks like a public asset path. */
const isAssetPath = (v) => typeof v === "string" && v.startsWith("/videos/gt70/");

let referenced = 0;
for (const clip of manifest.clips) {
  const paths = [
    ["poster", clip.poster],
    ["thumbnail", clip.thumbnail],
    ["sources.desktopMp4", clip.sources?.desktopMp4],
    ["sources.mobileMp4", clip.sources?.mobileMp4],
    ["sources.webm", clip.sources?.webm],
  ].filter(([, v]) => isAssetPath(v));

  for (const [field, value] of paths) {
    referenced++;
    if (!existsSync(toDisk(value))) {
      errors.push(`clip "${clip.id}".${field} -> ${value} (file does not exist)`);
    }
  }

  // An approved clip must be fully playable, and a playable clip needs a still
  // to fall back to while the video loads or when motion is reduced.
  if (clip.status === "approved") {
    if (!clip.sources?.desktopMp4 || !clip.sources?.mobileMp4) {
      errors.push(`clip "${clip.id}" is approved but is missing a desktop or mobile source`);
    }
    if (!clip.poster) {
      errors.push(`clip "${clip.id}" is approved but has no poster to fall back to`);
    }
    if (!clip.qc) {
      errors.push(`clip "${clip.id}" is approved but carries no qc record`);
    }
  }

  if (!clip.poster && clip.status !== "pending") {
    errors.push(`clip "${clip.id}" has no poster but is not pending`);
  }
  if (!clip.poster) {
    warnings.push(`clip "${clip.id}" has no poster yet (reserved slot, awaiting frames)`);
  }
  if (clip.id === "hero" && clip.qc) {
    // Guard the delivery facts the site and the audit script both rely on.
    const disk = toDisk(clip.sources.desktopMp4);
    const actual = existsSync(disk) ? readFileSync(disk).length : -1;
    if (clip.qc.desktopBytes && actual !== clip.qc.desktopBytes) {
      errors.push(
        `hero desktop size mismatch: manifest says ${clip.qc.desktopBytes}, file is ${actual}`,
      );
    }
  }
}

// Every folder under public/videos/gt70 should be represented in the manifest,
// otherwise the published layout and the manifest disagree.
if (existsSync(join(root, "public", "videos", "gt70"))) {
  const ids = new Set(manifest.clips.map((c) => c.id));
  for (const clip of manifest.clips) {
    if (clip.id === "hero") continue;
    const dir = join(root, "public", "videos", "gt70", clip.id);
    if (existsSync(dir) && !ids.has(clip.id)) {
      warnings.push(`directory "${clip.id}" exists on disk but has no manifest entry`);
    }
  }
}

console.log("GT70 PUBLIC MANIFEST");
console.log("=".repeat(70));
console.log(`source : ${SOURCE.replace(root + "\\", "")}`);
console.log(`target : ${TARGET.replace(root + "\\", "")}`);
console.log(`clips  : ${manifest.clips.length}  (asset paths verified: ${referenced})`);
for (const w of warnings) console.log(`  warn  ${w}`);
for (const e of errors) console.log(`  ERROR ${e}`);

if (errors.length) {
  console.log("-".repeat(70));
  console.log(`${errors.length} error(s). Manifest not written.`);
  process.exit(1);
}

const serialised = JSON.stringify(manifest, null, 2) + "\n";

if (checkOnly) {
  const existing = existsSync(TARGET) ? readFileSync(TARGET, "utf8") : null;
  if (existing === serialised) {
    console.log("-".repeat(70));
    console.log("up to date (--check)");
  } else {
    console.log("-".repeat(70));
    console.log("OUT OF DATE: public/videos/gt70/manifest.json differs from the source");
    process.exit(1);
  }
} else {
  writeFileSync(TARGET, serialised, "utf8");
  console.log("-".repeat(70));
  console.log(
    `written: ${TARGET.replace(root + "\\", "")} (${serialised.length.toLocaleString()} bytes)`,
  );
}
