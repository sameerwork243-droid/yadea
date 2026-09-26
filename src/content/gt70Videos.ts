/**
 * YADEA GT70 — cinematic video manifest.
 *
 * The data lives in `./gt70Videos.json` so that the exact same file can be
 * published to `public/videos/gt70/manifest.json` (see
 * `scripts/gt70-write-manifest.mjs`) and consumed by tooling. Types and
 * render helpers live here. Nothing may drift between the two.
 *
 * A clip is only ever handed to a `<video>` element when it is `approved` AND
 * has a complete `sources` object — see `clipIsPlayable()`. Everything else
 * falls back to its poster, and a reserved slot with no poster is never
 * rendered at all, so the site never shows a blank rectangle and never ships a
 * fabricated asset.
 *
 * Poster provenance is mixed and must not be overstated: the stills for the
 * pending chapters are real frames derived from the supplied GT70 photography
 * in `assets/gt70/references/`, while the hero poster is a frame extracted from
 * the assembled hero video.
 */

import manifest from "./gt70Videos.json";

export type Gt70ClipId =
  | "hero"
  | "orbit"
  | "design"
  | "side-profile"
  | "urban"
  | "technology"
  | "battery"
  | "smart"
  | "night"
  | "final";

/** How the clip is driven on the page. */
export type Gt70ClipRole =
  /** Muted, looping, ambient background behind the hero copy. */
  | "ambient"
  /** Playback is driven by scroll progress (GSAP ScrollTrigger scrubbing). */
  | "scrub"
  /** Autoplaying background for a content chapter. */
  | "background"
  /** Short loop that sits behind the closing call to action. */
  | "cta";

export type Gt70ClipStatus = "pending" | "approved" | "rejected";

export type Gt70ClipSources = {
  /** Desktop H.264, constant 30 fps. */
  desktopMp4: string;
  /** Mobile H.264, constant 30 fps, smaller encode of the same clip. */
  mobileMp4: string;
  /** Optional WebM/VP9 sibling. */
  webm?: string;
};

export type Gt70ClipQc = {
  sourceFps: number;
  outputFps: number;
  resolution: string;
  mobileResolution?: string;
  durationSec: number;
  frames?: number;
  codec: string;
  pixelFormat?: string;
  colourRange?: string;
  sizeBytes?: number;
  desktopBytes?: number;
  mobileBytes?: number;
  constantFrameRate: boolean;
  rangeConversionSsim?: number;
  verifiedAt: string;
};

export type Gt70Clip = {
  id: Gt70ClipId;
  /** Narrative position, matching the homepage chapter order. */
  order: number;
  /** Human label for the chapter this clip belongs to. */
  chapter: string;
  role: Gt70ClipRole;
  status: Gt70ClipStatus;
  /** Flow model and settings used for the generation. */
  model: string;
  ratio: "16:9" | "9:16";
  durationSec: number;
  /** Which supplied reference photo anchors vehicle identity. */
  reference: "front-45" | "side-180" | "none";
  /** Pointer into the generation prompts. */
  promptRef: string;
  /** Real still of the vehicle. Null for reserved slots awaiting frames. */
  poster: string | null;
  /** Describes the still, so the poster is meaningful before any video loads. */
  posterAlt: string | null;
  thumbnail?: string | null;
  sources?: Gt70ClipSources;
  qc?: Gt70ClipQc;
  /** Why a clip is pending or rejected. */
  note?: string;
};

/** A clip that is safe to render, with a real still behind it. */
export type RenderableGt70Clip = Gt70Clip & {
  poster: string;
  posterAlt: string;
};

export const gt70PublicRoot = manifest.publicRoot;

/**
 * Slots reserved by the master brief that have no supplied footage yet. They
 * are listed so the plan is explicit, but they never enter the render path.
 */
export const gt70ReservedIds: Gt70ClipId[] = ["side-profile", "smart"];

export const gt70Clips: Gt70Clip[] = manifest.clips as Gt70Clip[];

export const gt70ClipById: Record<Gt70ClipId, Gt70Clip> = gt70Clips.reduce(
  (acc, clip) => {
    acc[clip.id] = clip;
    return acc;
  },
  {} as Record<Gt70ClipId, Gt70Clip>,
);

/** Clips in narrative order. */
export const gt70ClipOrder: Gt70Clip[] = [...gt70Clips].sort((a, b) => a.order - b.order);

/** Clips that have a real still and may therefore be placed in the layout. */
export const renderableGt70Clips: RenderableGt70Clip[] = gt70Clips.filter(
  (c): c is RenderableGt70Clip => Boolean(c.poster && c.posterAlt),
);

/**
 * A clip may only be mounted as a `<video>` when it has been approved by QC and
 * every required source is present. Everything else falls back to the poster.
 */
export function clipIsPlayable(clip: Gt70Clip | undefined): clip is Gt70Clip & {
  sources: Gt70ClipSources;
} {
  if (!clip) return false;
  if (clip.status !== "approved") return false;
  const s = clip.sources;
  return Boolean(s && s.desktopMp4 && s.mobileMp4);
}

/** A clip can be laid out at all only if it has a still to fall back to. */
export function clipIsRenderable(clip: Gt70Clip | undefined): clip is RenderableGt70Clip {
  return Boolean(clip && clip.poster && clip.posterAlt);
}

/** True when at least one clip is ready, so video-specific chrome can be enabled. */
export const hasPlayableGt70Clips = gt70Clips.some((c) => clipIsPlayable(c));
