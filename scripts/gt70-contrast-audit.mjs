#!/usr/bin/env node
/**
 * GT70 design-system contrast audit.
 *
 * The palette is light-surfaced (see the header note in globals.css: white type
 * on a black ground is not an allowed visual language). After any token change
 * this proves the ink scale still clears WCAG 2.1 AA on the surfaces it is
 * actually used on, instead of trusting the hex values by eye.
 *
 *   node scripts/gt70-contrast-audit.mjs
 *
 * Exit code is 1 if any required pairing fails, so it can gate a build.
 */

/* Tokens mirrored from src/app/globals.css @theme. Kept literal rather than
   parsed so a mismatch here is a deliberate, reviewable signal. */
const tokens = {
  paper: "#faf7f2",
  "paper-2": "#f2ede5",
  "paper-3": "#e7e0d5",
  silver: "#d5ccbf",
  ice: "#e8f0f6",
  "ice-2": "#d6e5ef",
  ink: "#1c1714",
  "ink-2": "#4b423b",
  "ink-3": "#5f564e",
  "ink-4": "#756a61",
  electric: "#eb5f1b",
  "electric-700": "#b3420a",
  "on-accent": "#150f0b",
  navy: "#16324f",
  "navy-ink": "#ffffff",
  positive: "#0e7049",
  cyan: "#1d6fa3",
};

const srgb = (hex) => {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255);
};

const luminance = (hex) => lum(srgb(hex));

const lum = (rgb) => {
  const [r, g, b] = rgb.map((c) =>
    c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4),
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/** Channel-wise `top` over `bottom` at `alpha`, returned as 0-255 sRGB. */
const mix = (top, bottom, alpha) =>
  srgb(top).map((c, i) => Math.round(255 * (c * alpha + srgb(bottom)[i] * (1 - alpha))));

const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

/** [foreground, background, minimum, note] — minimum 3 is "large text only". */
const pairs = [
  ["ink", "paper", 4.5, "body + headings on the main field"],
  ["ink-2", "paper", 4.5, "body-lg / body-md"],
  ["ink-3", "paper", 4.5, "label-tech micro labels"],
  ["ink-4", "paper", 4.5, "de-emphasised meta text"],
  ["ink", "paper-2", 4.5, "chapter band heading"],
  ["ink-2", "paper-2", 4.5, "chapter band lede"],
  ["ink-3", "paper-2", 4.5, "chapter band label"],
  ["ink-2", "paper-3", 4.5, "raised card body"],
  ["ink-3", "paper-3", 4.5, "raised card label"],
  ["ink", "ice", 4.5, "ice-tinted surface"],
  ["ink-2", "ice", 4.5, "ice-tinted surface body"],
  ["ink-2", "ice-2", 4.5, "deeper ice surface"],
  ["ink", "silver", 4.5, "silver-tinted surface"],
  ["on-accent", "electric", 4.5, "type on a solid orange fill (button, active pill)"],
  ["electric-700", "paper", 4.5, "orange label + link text on light"],
  ["cyan", "paper", 4.5, "secondary accent text"],
  ["positive", "paper", 4.5, "confirmation text"],
  ["navy-ink", "navy", 4.5, "sparing navy band (footer rule, spec badge)"],
  ["electric", "paper", 3, "large display numerals only"],
];

let failed = 0;
console.log("GT70 CONTRAST AUDIT — light-surfaced design system");
console.log("=".repeat(78));
console.log(
  "PAIR".padEnd(24) + "RATIO".padStart(7) + "MIN".padStart(6) + "  RESULT  NOTE",
);
console.log("-".repeat(78));

for (const [fg, bg, min, note] of pairs) {
  const r = ratio(tokens[fg], tokens[bg]);
  const ok = r >= min;
  if (!ok) failed++;
  const mark = ok ? "PASS" : "FAIL";
  console.log(
    `${fg} on ${bg}`.padEnd(24) +
      `${r.toFixed(2)}:1`.padStart(7) +
      `${min.toFixed(1)}`.padStart(6) +
      `  ${mark}    ${note}`,
  );
}

console.log("-".repeat(78));
if (failed) {
  console.log(`${failed} pairing(s) below the required ratio.`);
  process.exit(1);
}
console.log(`All ${pairs.length} pairings clear WCAG AA.`);

/* ------------------------------------------------------------------ backdrop
 * The GT70 backdrop is a dark studio shot scrubbed behind the entire page, so
 * the surface under body text is no longer a flat token. These constants mirror
 * Gt70ScrollBackdrop.tsx and the field-*-veil utilities in globals.css, and the
 * two video levels are the measured tile luma range of the approved hero encode
 * (studio surround ~20/255, lit bodywork ~89/255) rather than a guess.
 *
 * Composite order matches the DOM: html canvas, then the video at `intensity`,
 * then the centre-weighted paper wash, then the section veil on top.
 */
const BACKDROP_INTENSITY = 0.85;
const WASH = { edge: 0.18, mid: 0.55, centre: 0.88 };
const VEIL = { top: 0.14, bottom: 0.08 };
const VIDEO = { surround: 20, bodywork: 89 };
/** Below this the "ghost" is not perceptible and the effect is silently dead. */
const GHOST_FLOOR = 6;

const hex = (rgb) =>
  "#" + rgb.map((c) => c.toString(16).padStart(2, "0")).join("");

/** video -> wash -> optional section veil, in DOM order. */
const composite = (videoLevel, wash, veilTint, veilAlpha) => {
  const grey = (l) => hex([l, l, l].map((c) => Math.round(c * 2.55)));
  let rgb = mix(grey(videoLevel), tokens.paper, BACKDROP_INTENSITY);
  rgb = mix(tokens.paper, hex(rgb), wash);
  if (veilAlpha !== null) rgb = mix(veilTint, hex(rgb), veilAlpha);
  return hex(rgb);
};

const scenarios = [
  ["edge wash, no section veil", WASH.edge, null, null],
  ["edge wash + thinnest veil", WASH.edge, tokens["paper-2"], VEIL.bottom],
  ["centre wash, no section veil", WASH.centre, null, null],
  ["centre wash + thinnest veil", WASH.centre, tokens["paper-2"], VEIL.bottom],
];

console.log("\nBACKDROP COMPOSITE — text over the scrubbed GT70 layer");
console.log("=".repeat(78));
console.log(
  "SCENARIO".padEnd(34) +
    "SURROUND".padStart(10) +
    "BODYWORK".padStart(10) +
    "GHOST".padStart(7) +
    "  WORST  RESULT",
);
console.log("-".repeat(78));

let compositeFailed = 0;
for (const [note, wash, tint, alpha] of scenarios) {
  const bgDark = composite(VIDEO.surround, wash, tint, alpha);
  const bgBike = composite(VIDEO.bodywork, wash, tint, alpha);

  /* The brightest composite is the worst case for dark text. */
  const worstBg = luminance(bgBike) > luminance(bgDark) ? bgBike : bgDark;
  let worst = Infinity;
  let worstInk = "";
  for (const ink of ["ink", "ink-2", "ink-3"]) {
    const r = ratio(tokens[ink], worstBg);
    if (r < worst) {
      worst = r;
      worstInk = ink;
    }
  }
  const ok = worst >= 4.5;
  if (!ok) compositeFailed++;

  const amp = Math.abs(srgb(bgBike)[0] - srgb(bgDark)[0]) * 255;
  if (amp < GHOST_FLOOR) compositeFailed++;
  const ampNote = amp < GHOST_FLOOR ? " flat!" : "";

  console.log(
    note.padEnd(34) +
      bgDark.padStart(10) +
      bgBike.padStart(10) +
      `${amp.toFixed(0)} lv`.padStart(7) +
      `  ${worst.toFixed(2)}:1  ${ok ? "PASS" : "FAIL"} (${worstInk})${ampNote}`,
  );
}

console.log("-".repeat(78));
if (compositeFailed) {
  console.log(
    `${compositeFailed} backdrop check(s) failed — text contrast or ghost visibility.`,
  );
  process.exit(1);
}
console.log(
  `All ${scenarios.length} backdrop scenarios clear WCAG AA and stay above the ${GHOST_FLOOR}-level ghost floor.`,
);

/* Guard the cultural rule itself: the light surfaces must stay light. If someone
   re-introduces a near-black --color-paper this fails loudly. */
const paperL = luminance(tokens.paper);
if (paperL < 0.6) {
  console.error(
    `\nCULTURAL RULE VIOLATION: --color-paper luminance ${paperL.toFixed(3)} is too dark.`,
  );
  console.error("The UI must stay warm-light; white-on-black is not permitted.");
  process.exit(1);
}
const paperHex = tokens.paper;
console.log(`\n--color-paper ${paperHex} luminance ${paperL.toFixed(3)} — light surface confirmed.`);
