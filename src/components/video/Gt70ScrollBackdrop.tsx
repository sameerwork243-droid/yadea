"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { clipIsPlayable, clipIsRenderable, type Gt70Clip } from "@/content/gt70Videos";
import {
  announcePlayback,
  MOBILE_VIDEO_QUERY,
  useMediaQuery,
} from "@/lib/video";

/** The pipeline normalises every clip to this rate, so seeks snap to it. */
const TARGET_FPS = 30;

/** Playback-bus identity for this layer, distinct from any clip id. */
const BACKDROP_PLAYER_ID = "gt70-scroll-backdrop";

/**
 * The site-wide GT70 backdrop.
 *
 * Once the hero has scrolled past, a single fixed layer behind the whole page
 * plays the approved GT70 footage, scrubbed by page scroll — so the bike is
 * continuously present and continuously changing from just under the hero to the
 * footer. The footage is a dark studio shot, so over the warm-light page it reads
 * as a clear ink ghost rather than a bright overlay. The centre-weighted paper
 * wash keeps the copy column legible while the outer thirds stay open for the
 * bike, and the section veils on top of it tint each band without going opaque.
 *
 * Speed: `repeats` is how many times the sequence plays across the scrollable
 * area below the hero. A single pass spread over a whole page advances so few
 * frames per pixel that the footage looks frozen, so it repeats several times
 * and keeps moving continuously to the footer, wrapping at the end of each pass.
 * Higher = faster. With multiple clips in `clips`, one pass covers all of them.
 *
 * `prefers-reduced-motion` must not be scrubbed. The frame falls back to the real
 * poster and holds.
 */

type Props = {
  /** Ordered flow. Unapproved entries are skipped; the first still is the fallback. */
  clips: Gt70Clip[];
  /** id of the hero section; the backdrop stays hidden until it is above this. */
  heroId?: string;
  /** Peak opacity of the footage layer. */
  intensity?: number;
  /**
   * How many times the clip sequence plays across the scrollable area below the
   * hero. One pass stretched over a whole page advances so few frames per pixel
   * that the footage reads as frozen, so the default repeats enough times that
   * the motion is always perceptible. Higher = faster.
   */
  repeats?: number;
};

export function Gt70ScrollBackdrop({
  clips,
  heroId = "top",
  intensity = 0.85,
  repeats = 6,
}: Props) {
  const reduce = useReducedMotion();
  const mobile = useMediaQuery(MOBILE_VIDEO_QUERY);

  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef(0);
  const indexRef = useRef(0);
  const lastTimeRef = useRef(-1);
  const appliedSourceRef = useRef<string | null>(null);

  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);
  const [seekable, setSeekable] = useState(false);

  const still = useMemo(() => clips.find((c) => clipIsRenderable(c)), [clips]);

  const sequence = useMemo(
    () =>
      reduce ? [] : clips.filter((c) => clipIsPlayable(c) && clipIsRenderable(c)),
    [clips, reduce],
  );

  const clip = sequence[Math.min(index, Math.max(0, sequence.length - 1))] ?? null;
  const source = clip
    ? mobile
      ? clip.sources.mobileMp4
      : clip.sources.desktopMp4
    : null;

  const seek = useCallback(
    (progress: number) => {
      const video = videoRef.current;
      if (!video || !active || sequence.length === 0) return;
      if (document.hidden) return;

      const total = sequence.length;
      /* One full pass of the sequence per `repeats`, so the footage keeps
         advancing all the way down the page and loops instead of stretching a
         single pass so thin that it looks stuck. */
      const passes = Math.max(1, Math.round(repeats)) * total;
      const scaled = Math.min(0.999999, Math.max(0, progress)) * passes;
      const pass = Math.min(passes - 1, Math.floor(scaled));

      /* Which clip within the sequence. This is deliberately the clip index and
         not the pass number: wrapping from the last pass back to the first must
         not count as a clip change, or the source would reload on every loop. */
      const next = pass % total;

      if (next !== indexRef.current) {
        indexRef.current = next;
        setIndex(next);
      }

      if (video.readyState < 1) return;
      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;

      /* Ping-pong the clip: forward through every frame, then back again.
         A plain forward loop cuts hard from the last frame to the first, and on
         this footage those two frames are barely alike (SSIM 0.46), so the cut
         is visible several times per page. Mirroring the timeline returns to
         frame 0 from frame 1 instead, which is seamless and needs no re-encode.
         The bike simply rocks through its turn and back. */
      const frames = Math.max(2, Math.round(duration * TARGET_FPS));
      const cycle = frames * 2 - 2;
      const local = (scaled - pass) * cycle;
      const pos = local % cycle;
      const frame = pos < frames ? pos : cycle - pos;

      // Hold just inside the tail so the last frame is never a black flash.
      const value = Math.min(frame / TARGET_FPS, Math.max(0, duration - 0.05));

      // Seeking on every frame makes the decoder thrash; a small dead zone is
      // invisible in motion and far cheaper. Kept tight so a fast scroll still
      // lands close to the requested frame.
      if (Math.abs(value - lastTimeRef.current) < 0.004) return;
      lastTimeRef.current = value;

      try {
        video.currentTime = value;
      } catch {
        /* seeking before the media is seekable is recoverable; the next scroll retries */
      }
    },
    [active, sequence.length, repeats],
  );

  /* --------------------------------------------------------- scroll drive */
  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;

      const vh = window.innerHeight;
      const hero = heroId ? document.getElementById(heroId) : null;

      /* The backdrop owns everything *below* the hero, so the timeline starts
         only once the hero's last pixel has cleared the top of the viewport. */
      const start = hero ? hero.offsetTop + hero.offsetHeight : vh;
      const end = Math.max(start + 1, document.documentElement.scrollHeight - vh);

      const y = window.scrollY;
      const p = Math.min(1, Math.max(0, (y - start) / (end - start)));
      progressRef.current = p;

      setActive(y > start);
      seek(p);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    /* Late-loading imagery and reveal animations change the document height, so
       the end of the timeline has to be re-measured without a scroll. The root
       element's own box is viewport-sized and would never report this, so the
       body's content box is the thing to watch. */
    const observer = new ResizeObserver(onScroll);
    if (document.body) observer.observe(document.body);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
    };
  }, [heroId, seek, repeats, sequence.length]);

  /* ---------------------------------------------------- source application */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !source) return;

    if (appliedSourceRef.current === source) return;
    appliedSourceRef.current = source;
    lastTimeRef.current = -1;
    setSeekable(false);

    video.load();
  }, [source]);

  /* ------------------------------------------- one decoder, page-wide only */
  useEffect(() => {
    if (!active) return;
    /* Deliberately not the clip id: the hero owns the same footage, and the bus
       skips a subscriber whose id matches its own. Announcing the clip id would
       make the hero treat this as itself and keep decoding, so the backdrop
       claims its own identity to force the hero to yield. */
    announcePlayback(BACKDROP_PLAYER_ID);
  }, [active]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !source) return;

    if (!active) {
      // Nothing on screen owns the decoder while the hero is still visible.
      video.pause();
      return;
    }

    seek(progressRef.current);
  }, [active, seek, source, seekable]);

  /* ------------------------------------------------------------ visibility */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !source) return;

    const onVisibility = () => {
      if (document.hidden) video.pause();
      else seek(progressRef.current);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [source, seek]);

  /* Nothing approved and renderable means there is nothing honest to put in
     this frame. Placed after the hooks so hook order stays unconditional. */
  if (!still) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        opacity: active ? intensity : 0,
        transition: "opacity 700ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {source && clip ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          poster={clip.poster ?? undefined}
          muted
          playsInline
          /* Nothing is fetched while the hero still owns the screen. Once the
             backdrop is live the browser is explicitly allowed to buffer, which
             also guarantees `loadedmetadata` fires so the first seek can land. */
          preload={active ? "auto" : "none"}
          /* A scrubbed clip is never "played" — this stops the browser adding
             its own playback layer or refusing to seek a paused element. */
          disablePictureInPicture
          onLoadedMetadata={() => setSeekable(true)}
          onError={() => setSeekable(false)}
        >
          <source src={source} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={still.poster as string}
          alt=""
          fill
          /* Decorative backdrop layer, not in the image optimiser allowlist. */
          sizes="100vw"
          quality={70}
          className="object-cover"
        />
      )}

      {/* Legibility guarantee: the copy column is washed back toward clean paper
          while the outer thirds stay open so the bike reads clearly. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg," +
            "color-mix(in oklab, var(--color-paper) 18%, transparent) 0%," +
            "color-mix(in oklab, var(--color-paper) 55%, transparent) 22%," +
            "color-mix(in oklab, var(--color-paper) 82%, transparent) 42%," +
            "color-mix(in oklab, var(--color-paper) 88%, transparent) 50%," +
            "color-mix(in oklab, var(--color-paper) 82%, transparent) 58%," +
            "color-mix(in oklab, var(--color-paper) 55%, transparent) 78%," +
            "color-mix(in oklab, var(--color-paper) 18%, transparent) 100%)",
        }}
      />
    </div>
  );
}
