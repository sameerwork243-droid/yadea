"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { duration, ease, once, revealStagger, revealVariants } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  /** Seconds of extra delay — used to sequence sibling blocks. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "ul" | "ol" | "li" | "article" | "header" | "footer";
  /** Stagger direct children instead of revealing the block as one. */
  stagger?: boolean;
  /** Distance travelled. Capped at 24px by design. */
  distance?: number;
};

/**
 * The single entrance primitive. Everything that appears on scroll goes
 * through here so timing, easing and distance stay consistent.
 *
 * Under `prefers-reduced-motion` the transform is dropped entirely and the
 * block simply fades — feedback is preserved, movement is not.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  stagger = false,
  distance = 18,
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  const variants = stagger
    ? revealStagger
    : {
        hidden: reduce ? { opacity: 0 } : { opacity: 0, y: distance },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: reduce ? duration.fast : duration.slow, ease: ease.out, delay },
        },
      };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={once}
    >
      {children}
    </MotionTag>
  );
}

/**
 * A single child of a `stagger` Reveal. Kept separate so the stagger
 * container can walk its own direct children.
 */
export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "ul" | "ol" | "span" | "p" | "h2" | "h3";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag className={className} variants={revealVariants}>
      {children}
    </MotionTag>
  );
}
