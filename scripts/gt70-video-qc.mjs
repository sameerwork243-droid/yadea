#!/usr/bin/env node
/**
 * GT70 video QC.
 *
 * Verifies the technical half of the QC gate for every clip in a directory:
 * true constant frame rate, 30 fps, codec, resolution, duration and file size.
 *
 * This cannot judge whether the vehicle survived generation — the visual checks
 * in `assets/gt70/flow/prompts.md` need a human watch-through. Anything this
 * script passes is a *candidate*, not an approval.
 *
 * Usage:
 *   node scripts/gt70-video-qc.mjs [dir ...]
 *
 * Defaults to `assets/gt70/processed/30fps`.
 */

import { execFileSync } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
import { basename, extname, join, resolve } from "node:path";

const TARGET_FPS = 30;
const EPSILON = 0.02;

const dirs = process.argv.slice(2);
const targets = (dirs.length ? dirs : ["assets/gt70/processed/30fps"]).map((d) => resolve(d));

function probe(file) {
  const raw = execFileSync(
    "ffprobe",
    [
      "-v", "error",
      "-select_streams", "v:0",
      "-show_entries",
      "stream=codec_name,width,height,r_frame_rate,avg_frame_rate,nb_frames,duration,pix_fmt",
      "-show_entries", "format=duration,size",
      "-of", "json",
      file,
    ],
    { encoding: "utf8", maxBuffer: 1 << 24 },
  );

  const data = JSON.parse(raw);
  const s = data.streams?.[0];
  if (!s) throw new Error("no video stream");

  const rate = (value) => {
    if (!value) return null;
    const [num, den] = value.split("/").map(Number);
    if (!den) return null;
    return num / den;
  };

  return {
    codec: s.codec_name,
    pixFmt: s.pix_fmt,
    width: s.width,
    height: s.height,
    rFps: rate(s.r_frame_rate),
    avgFps: rate(s.avg_frame_rate),
    frames: s.nb_frames ? Number(s.nb_frames) : null,
    duration: Number(data.format?.duration ?? s.duration ?? 0),
    sizeBytes: Number(data.format?.size ?? statSync(file).size),
  };
}

function findVideos(dir) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return null;
  }
  return entries
    .filter((e) => e.isFile() && extname(e.name).toLowerCase() === ".mp4")
    .map((e) => join(dir, e.name));
}

const rows = [];

for (const dir of targets) {
  const files = findVideos(dir);
  if (!files) {
    console.log(`\n[skip] ${dir} — directory not found`);
    continue;
  }
  if (files.length === 0) {
    console.log(`\n[empty] ${dir} — no .mp4 files yet`);
    continue;
  }

  for (const file of files) {
    let info;
    try {
      info = probe(file);
    } catch (error) {
      rows.push({ name: basename(file), dir, error: String(error.message ?? error) });
      continue;
    }

    const fps = info.avgFps ?? info.rFps;
    const cfr =
      info.rFps !== null &&
      info.avgFps !== null &&
      Math.abs(info.rFps - info.avgFps) < EPSILON;

    const problems = [];
    if (fps === null) problems.push("fps unknown");
    else if (Math.abs(fps - TARGET_FPS) > EPSILON) problems.push(`fps ${fps.toFixed(3)}`);
    if (!cfr) problems.push("variable frame rate");
    if (info.codec !== "h264") problems.push(`codec ${info.codec}`);
    if (info.pixFmt !== "yuv420p") problems.push(`pix_fmt ${info.pixFmt}`);

    rows.push({
      name: basename(file),
      dir,
      sourceFps: info.rFps,
      avgFps: info.avgFps,
      fps,
      cfr,
      resolution: `${info.width}x${info.height}`,
      duration: info.duration,
      codec: info.codec,
      pixFmt: info.pixFmt,
      frames: info.frames,
      sizeBytes: info.sizeBytes,
      problems,
    });
  }
}

const mb = (bytes) => (bytes / 1024 / 1024).toFixed(2);
const pad = (value, width) => String(value).padEnd(width);

console.log("\nGT70 VIDEO QC");
console.log("-".repeat(104));
console.log(
  [
    pad("VIDEO", 30),
    pad("SOURCE FPS", 12),
    pad("OUT FPS", 10),
    pad("RESOLUTION", 12),
    pad("DURATION", 10),
    pad("CODEC", 8),
    pad("SIZE", 9),
    "STATUS",
  ].join(""),
);
console.log("-".repeat(104));

if (rows.length === 0) {
  console.log("no clips found — nothing to verify");
}

for (const row of rows) {
  if (row.error) {
    console.log(`${pad(row.name, 30)}${pad("-", 12)}${pad("-", 10)}${pad("-", 12)}${pad("-", 10)}${pad("-", 8)}${pad("-", 9)}ERROR ${row.error}`);
    continue;
  }
  const status = row.problems.length ? `FAIL: ${row.problems.join(", ")}` : "PASS";
  console.log(
    [
      pad(row.name, 30),
      pad(row.sourceFps === null ? "-" : row.sourceFps.toFixed(3), 12),
      pad(row.fps === null ? "-" : row.fps.toFixed(3), 10),
      pad(row.resolution, 12),
      pad(`${row.duration.toFixed(2)}s`, 10),
      pad(row.codec, 8),
      pad(`${mb(row.sizeBytes)}MB`, 9),
      status,
    ].join(""),
  );
}

console.log("-".repeat(104));

const failed = rows.filter((r) => r.error || (r.problems && r.problems.length));
console.log(
  failed.length
    ? `${failed.length} of ${rows.length} clips need re-encoding.`
    : `${rows.length} clip(s) conformant at constant ${TARGET_FPS} fps.`,
);
console.log(
  "\nReminder: technical conformance is not visual approval. Watch each clip against\nthe QC gate in assets/gt70/flow/prompts.md before marking it approved.\n",
);

process.exit(failed.length ? 1 : 0);
