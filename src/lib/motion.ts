import type { Transition, Variants } from "motion/react";

/* =========================================================================
   MOTION TOKENS
   Single source of truth. No magic numbers anywhere in the codebase.
   ========================================================================= */

export const duration = {
  instant: 0.1,
  fast: 0.18,
  base: 0.3,
  slow: 0.55,
  deliberate: 0.8,
} as const;

export const ease = {
  /** Entrances — decelerate. The default. */
  out: [0.16, 1, 0.3, 1] as const,
  /** Moves within the screen. */
  inOut: [0.65, 0, 0.35, 1] as const,
  /** Exits — accelerate. */
  in: [0.7, 0, 0.84, 0] as const,
  /** Playful overshoot — only for user-triggered surfaces. */
  back: [0.34, 1.56, 0.64, 1] as const,
};

export const spring = {
  default: { type: "spring", stiffness: 300, damping: 30, mass: 0.9 } satisfies Transition,
  panel: { type: "spring", stiffness: 210, damping: 24 } satisfies Transition,
  press: { type: "spring", stiffness: 400, damping: 17 } satisfies Transition,
} as const;

/** Standard scroll-reveal. Fires once, transforms only, ≤24px. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: ease.out } },
};

export const revealStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } },
};

export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: duration.slow, ease: ease.out } },
};

/** Viewport config used by every reveal on the page. */
export const once = { once: true, margin: "-80px" } as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
