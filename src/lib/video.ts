/**
 * GT70 video runtime helpers.
 *
 * Client-only. Imported by the video components; never call at module scope
 * from a server component.
 */

import { useSyncExternalStore } from "react";

/** Width below which the mobile encode is served instead of the desktop one. */
export const MOBILE_VIDEO_QUERY = "(max-width: 767px)";

/** Start fetching a little before the frame is actually on screen. */
export const VIDEO_PRELOAD_MARGIN = "300px 0px";

/** How much of the frame must be visible before a background clip plays. */
export const VIDEO_PLAY_THRESHOLD = 0.35;

export type PlaybackMessage = {
  /** Clip id that wants to play. */
  id: string;
};

type Subscriber = (message: PlaybackMessage) => void;

const subscribers = new Set<Subscriber>();

/**
 * Tiny bus so background clips can yield to each other. Without it, several
 * `<video>` elements decode at once and the page drops frames on mobile.
 */
export function subscribePlayback(fn: Subscriber): () => void {
  subscribers.add(fn);
  return () => {
    subscribers.delete(fn);
  };
}

export function announcePlayback(id: string): void {
  subscribers.forEach((fn) => fn({ id }));
}

export function isMobileViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(MOBILE_VIDEO_QUERY).matches;
}

/**
 * Subscribes to a media query without a setState-in-effect cascade, so the
 * responsive source swap stays tear-free and server rendering is safe.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => undefined;
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onStoreChange);
      return () => mql.removeEventListener("change", onStoreChange);
    },
    () => (typeof window === "undefined" ? false : window.matchMedia(query).matches),
    () => false,
  );
}

/** Resolves the encode a given clip should serve for the current viewport. */
export function pickSource(
  clip: { id: string },
  sources: { desktopMp4: string; mobileMp4: string },
  mobile: boolean,
): string {
  return mobile ? sources.mobileMp4 : sources.desktopMp4;
}
