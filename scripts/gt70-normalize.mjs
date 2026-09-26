#!/usr/bin/env node
/**
 * GT70 normalisation pipeline.
 *
 * Takes a raw Flow download and produces everything `public/` needs:
 *   - a true constant 30 fps H.264 master (+faststart)
 *   - a smaller mobile encode of the same clip
 *   - an optional WebM/VP9 sibling
 *   - a poster frame
 *
 * A clip that already conforms is copied rather than re-encoded, so generation
 * quality is never thrown away for nothing.
 *
 * Usage:
 *   node scripts/gt70-normalize.mjs <input.mp4> <clipId> [--webm] [--crf 20]
 */

import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const TARGET_FPS = 30;
const MOBILE_MAX_WIDTH = 960;
const WEBM_CRF = 32;

const args = process.argv.slice(2);
const positional = args.filter((a) => !a.startsWith("--"));
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};
const has = (name) => args.includes(`--${name}`);

const [input, clipId] = positional;
if (!input || !clipId) {
  console.error("usage: node scripts/gt70-normalize.mjs <input.mp4> <clipId> [--webm] [--crf 20]");
  process.exit(2);
}

const source = resolve(input);
if (!existsSync(source)) {
  console.error(`input not found: ${source}`);
  process.exit(2);
}

const crf = String(flag("crf", "20"));
/** Desktop delivery width. 2560x1440 masters are ~9.5 MB for a 10 s clip, which
 *  is far too heavy to hand a browser; 1920 matches essentially every display
 *  while cutting payload by roughly half. Pass 0 to keep the native size. */
const maxWidth = String(flag("max-width", "1920"));
const outDir = resolve("public/videos/gt70", clipId);
const rawDir = resolve("assets/gt70/flow/raw");
const posterDir = resolve("public/videos/gt70", clipId);

for (const dir of [outDir, rawDir, posterDir]) mkdirSync(dir, { recursive: true });

const desktop = join(outDir, `${clipId}-30fps.mp4`);
const mobile = join(outDir, `${clipId}-mobile-30fps.mp4`);
const webm = join(outDir, `${clipId}-30fps.webm`);
const poster = join(outDir, "poster.webp");

const ffmpeg = (args) => execFileSync("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", ...args], {
  stdio: ["ignore", "inherit", "inherit"],
});

const ffprobe = (file) => {
  const raw = execFileSync(
    "ffprobe",
    ["-v", "error", "-select_streams", "v:0", "-show_entries",
     "stream=codec_name,width,height,r_frame_rate,avg_frame_rate,pix_fmt,color_range", "-of", "json", file],
    { encoding: "utf8" },
  );
  const s = JSON.parse(raw).streams?.[0];
  if (!s) throw new Error("no video stream");
  const rate = (v) => {
    if (!v) return null;
    const [n, d] = v.split("/").map(Number);
    return d ? n / d : null;
  };
  return {
    codec: s.codec_name,
    width: s.width,
    height: s.height,
    pixFmt: s.pix_fmt,
    colorRange: s.color_range ?? null,
    rFps: rate(s.r_frame_rate),
    avgFps: rate(s.avg_frame_rate),
  };
}

const before = ffprobe(source);
console.log(`source : ${source}`);
console.log(
  `         ${before.width}x${before.height} ${before.codec} ${before.pixFmt} ` +
    `r=${before.rFps?.toFixed(3)} avg=${before.avgFps?.toFixed(3)}`,
);

const conformant =
  before.codec === "h264" &&
  before.pixFmt === "yuv420p" &&
  before.avgFps !== null &&
  Math.abs(before.avgFps - TARGET_FPS) < 0.02 &&
  before.rFps !== null &&
  Math.abs(before.rFps - before.avgFps) < 0.02;

if (conformant) {
  copyFileSync(source, desktop);
  console.log(`master : copied without re-encoding (already conformant)`);
} else {
  // Frame sequences assembled from JPEG land as yuvj420p, which is FULL range.
  // Writing that to a limited-range yuv420p file without remapping crushes
  // blacks and blows highlights, so convert the range explicitly.
  const fullRange =
    before.colorRange === "pc" || before.colorRange === "full" ||
    (before.pixFmt ?? "").startsWith("yuvj");
  if (fullRange) {
    console.log(`         source is full range (${before.pixFmt}) - remapping to limited range`);
  }

  // One scale filter does both jobs: cap delivery width and, when needed,
  // remap the range in the same pass.
  const doScale = maxWidth !== "0";
  const rangePart = fullRange ? "in_range=full:out_range=tv:" : "";
  const scaleFilter = doScale
    ? `,scale=w='min(${maxWidth},iw)':h=-2:${rangePart}flags=lanczos`
    : (fullRange ? `,scale=${rangePart.replace(/:$/, "")}` : "");
  if (doScale && Number(maxWidth) < before.width) {
    console.log(`         scaling delivery width ${before.width} -> ${maxWidth}`);
  }

  ffmpeg([
    "-i", source,
    "-vf", `fps=${TARGET_FPS}${scaleFilter}`,
    "-c:v", "libx264",
    "-preset", "slow",
    "-crf", crf,
    "-profile:v", "high",
    "-level", "4.1",
    "-pix_fmt", "yuv420p",
    "-color_range", "tv",
    "-movflags", "+faststart",
    "-an",
    desktop,
  ]);
  console.log(`master : re-encoded to constant ${TARGET_FPS} fps (crf ${crf})`);
}

ffmpeg([
  "-i", desktop,
  "-vf", `fps=${TARGET_FPS},scale='min(${MOBILE_MAX_WIDTH},iw)':-2:flags=lanczos`,
  "-c:v", "libx264",
  "-preset", "slow",
  "-crf", "26",
  "-profile:v", "main",
  "-pix_fmt", "yuv420p",
  "-movflags", "+faststart",
  "-an",
  mobile,
]);
console.log(`mobile : ${MOBILE_MAX_WIDTH}px wide encode`);

if (has("webm")) {
  ffmpeg([
    "-i", desktop,
    "-c:v", "libvpx-vp9",
    "-crf", String(WEBM_CRF),
    "-b:v", "0",
    "-row-mt", "1",
    "-pix_fmt", "yuv420p",
    "-an",
    webm,
  ]);
  console.log(`webm   : VP9 sibling written`);
}

ffmpeg([
  "-i", desktop,
  "-frames:v", "1",
  "-q:v", "3",
  "-vf", "scale=1920:-2:flags=lanczos",
  poster,
]);
console.log(`poster : ${poster}`);

for (const file of [desktop, mobile, ...(has("webm") ? [webm] : []), poster]) {
  console.log(`         ${(statSync(file).size / 1024 / 1024).toFixed(2)} MB  ${file}`);
}

console.log(`\nNow update status/sources/qc for "${clipId}" in src/content/gt70Videos.ts,`);
console.log("watch the clip against the QC gate, and only then mark it approved.\n");
