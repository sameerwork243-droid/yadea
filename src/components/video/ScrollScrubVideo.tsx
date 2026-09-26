"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  clipIsPlayable,
  clipIsRenderable,
  type Gt70Clip,
} from "@/content/gt70Videos";

import { MOBILE_VIDEO_QUERY, useMediaQuery } from "@/lib/video";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** The pipeline normalises every clip to this rate, so seeks snap to it. */
const TARGET_FPS = 30;

type ScrollScrubVideoProps = {
  clip: Gt70Clip;
  /** Height of the scroll runway, as a Tailwind height class. */
  runwayClassName?: string;
  className?: string;
  children?: React.ReactNode;
};

/**
 * Scroll-controlled playback: the clip's `currentTime` is driven by scroll
 * progress through the runway, so the shot advances only while the visitor
 * scrolls and freezes completely when they stop.
 *
 * Seeks are coalesced into one `requestAnimationFrame` write per frame and
 * snapped to the 30 fps grid, which stops a scrub from thrashing the decoder.
 * The ScrollTrigger instance and the pending frame are always released on
 * unmount.
 *
 * Without an approved render — or under `prefers-reduced-motion` — this shows
 * the poster still inside the same sticky frame, so the section keeps its
 * composition and nothing is scrubbed.
 */
export function ScrollScrubVideo({
  clip,
  runwayClassName = "h-[320vh]",
  className = "",
  children,
}: ScrollScrubVideoProps) {
  const reduce = useReducedMotion();
  const playable = clipIsPlayable(clip);
  const active = playable && !reduce;

  const runwayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pendingRef = useRef(0);
  const frameRef = useRef(0);

  const [duration, setDuration] = useState(0);

  const mobile = useMediaQuery(MOBILE_VIDEO_QUERY);

  useEffect(() => {
    if (!active || duration <= 0) return;
    const runway = runwayRef.current;
    if (!runway) return;

    const totalFrames = Math.max(1, Math.round(duration * TARGET_FPS));
    pendingRef.current = 0;

    const context = gsap.context(() => {
      const write = () => {
        frameRef.current = 0;
        const video = videoRef.current;
        if (!video) return;
        const frame = Math.min(totalFrames, Math.round(pendingRef.current * totalFrames));
        video.currentTime = frame / TARGET_FPS;
      };

      ScrollTrigger.create({
        trigger: runway,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          pendingRef.current = self.progress;
          if (!frameRef.current) frameRef.current = requestAnimationFrame(write);
        },
      });
    }, runway);

    ScrollTrigger.refresh();

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = 0;
      }
      context.revert();
    };
  }, [active, duration]);

  /* Reserved slot: no approved render and no real still, so there is nothing
     honest to show. After the hooks so hook order stays unconditional. */
  if (!clipIsRenderable(clip)) return null;

  return (
    <div ref={runwayRef} className={`relative ${runwayClassName}`}>
      <div className={`sticky top-0 h-dvh overflow-hidden ${className}`}>
        {active ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            poster={clip.poster}
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={(event) => {
              const video = event.currentTarget;
              setDuration(Number.isFinite(video.duration) ? video.duration : 0);
            }}
            aria-label={clip.posterAlt}
          >
            <source
              src={mobile ? clip.sources.mobileMp4 : clip.sources.desktopMp4}
              type="video/mp4"
            />
          </video>
        ) : (
          <Image
            src={clip.poster}
            alt={clip.posterAlt}
            fill
            /* See CinematicVideo: posters are 1920px native, so cap the slot
               there to avoid an upscaled 2560 candidate. quality must stay
               within next.config images.qualities. */
            sizes="(max-width: 1920px) 100vw, 1920px"
            quality={70}
            priority
            className="object-cover"
          />
        )}
        {children}
      </div>
    </div>
  );
}
