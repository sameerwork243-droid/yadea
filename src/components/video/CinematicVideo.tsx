"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import {
  clipIsPlayable,
  clipIsRenderable,
  type Gt70Clip,
} from "@/content/gt70Videos";
import {
  announcePlayback,
  MOBILE_VIDEO_QUERY,
  subscribePlayback,
  useMediaQuery,
  VIDEO_PLAY_THRESHOLD,
  VIDEO_PRELOAD_MARGIN,
} from "@/lib/video";

type CinematicVideoProps = {
  clip: Gt70Clip;
  /** Eagerly fetch the file. Reserve for the hero — everything else waits. */
  priority?: boolean;
  /** When true the video is decorative and the poster carries no alt text. */
  decorative?: boolean;
  className?: string;
  /** Layout position of the frame itself. */
  position?: "relative" | "absolute" | "static";
  /** Colour shown while the frame is empty. */
  placeholderClassName?: string;
  /** Overlay content rendered above the frame. */
  children?: React.ReactNode;
};

/**
 * A background/ambient clip with a guaranteed still behind it.
 *
 * The `<video>` element is only mounted once the clip is QC-approved *and* the
 * frame is close to the viewport, so nothing is fetched up front and no clip
 * starts decoding before it is on screen. Under `prefers-reduced-motion`, on a
 * load error, or when no approved render exists, the real poster still is shown
 * instead — the page never shows a blank rectangle.
 */
export function CinematicVideo({
  clip,
  priority = false,
  decorative = false,
  className = "",
  position = "relative",
  placeholderClassName = "bg-paper-3",
  children,
}: CinematicVideoProps) {
  const reduce = useReducedMotion();
  const playable = clipIsPlayable(clip);

  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [nearViewport, setNearViewport] = useState(priority);
  const [inView, setInView] = useState(false);
  const [failed, setFailed] = useState(false);

  const mobile = useMediaQuery(MOBILE_VIDEO_QUERY);

  /**
   * Which encode the current viewport should stream. The paths come from the
   * clip's own recorded sources rather than a naming convention, so a clip can
   * never be pointed at a file that does not exist. The media query can only be
   * evaluated in the browser, so this resolves to the desktop encode during SSR
   * and may swap to the mobile one immediately after hydration.
   */
  const activeSource = !playable
    ? ""
    : mobile
      ? clip.sources.mobileMp4
      : clip.sources.desktopMp4;

  /**
   * The encode most recently handed to the media element. Changing a
   * `<source>`'s `src` does not re-run the resource selection algorithm, so
   * without an explicit `load()` a phone would silently keep pulling the
   * desktop encode. Tracking the last-applied source keeps `load()` off the
   * scroll in/out path, where it would restart the clip.
   */
  const appliedSourceRef = useRef<string | null>(null);

  const showVideo = playable && !reduce && !failed && nearViewport;
  const shouldPlay = showVideo && inView && clip.role !== "scrub";

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        setNearViewport(entry.isIntersecting);
        setInView(entry.intersectionRatio >= VIDEO_PLAY_THRESHOLD);
      },
      { rootMargin: VIDEO_PRELOAD_MARGIN, threshold: [0, VIDEO_PLAY_THRESHOLD] },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Yield to other clips so only one background video decodes at a time.
  useEffect(() => {
    if (!shouldPlay) return;
    announcePlayback(clip.id);
    return subscribePlayback(({ id }) => {
      if (id === clip.id) return;
      videoRef.current?.pause();
    });
  }, [shouldPlay, clip.id]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !showVideo) return;

    if (appliedSourceRef.current === activeSource) return;
    appliedSourceRef.current = activeSource;

    video.load();

    if (shouldPlay) {
      const attempt = video.play();
      if (attempt) attempt.catch(() => undefined);
    }
  }, [activeSource, showVideo, shouldPlay]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !showVideo) return;

    if (shouldPlay) {
      const attempt = video.play();
      if (attempt) attempt.catch(() => undefined);
    } else {
      video.pause();
    }
  }, [shouldPlay, showVideo]);

  /* A reserved slot has no real still and no approved render, so there is
     nothing honest to put in this frame. Rendering nothing keeps the promise
     that the site never shows a blank rectangle or a fabricated asset. Placed
     after the hooks so hook order stays unconditional. */
  if (!clipIsRenderable(clip)) return null;

  const alt = decorative ? "" : clip.posterAlt;
  const fill = showVideo ? undefined : clip.poster;

  return (
    <div
      ref={frameRef}
      className={`${position} overflow-hidden ${placeholderClassName} ${className}`}
    >
      {showVideo ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          poster={clip.poster}
          muted
          playsInline
          loop={clip.role !== "scrub"}
          preload={priority ? "auto" : "metadata"}
          onError={() => setFailed(true)}
          aria-hidden={decorative ? true : undefined}
        >
          {clip.sources.webm ? <source src={clip.sources.webm} type="video/webm" /> : null}
          <source src={activeSource} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={fill as string}
          alt={alt}
          fill
          /* Posters are authored at 1920x1080. Capping the slot at 1920 stops
             next/image requesting the 2560 device size, which would upscale
             past the source and cost bytes for no extra detail.
             quality must stay within next.config images.qualities. */
          sizes="(max-width: 1920px) 100vw, 1920px"
          quality={70}
          priority={priority}
          className="object-cover"
        />
      )}
      {children}
    </div>
  );
}
