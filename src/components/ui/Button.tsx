"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { ComponentProps, ReactNode } from "react";
import { duration, ease, spring } from "@/lib/motion";

type Variant = "primary" | "outline" | "ghost" | "onDark" | "onDarkOutline";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 font-medium " +
  "rounded-full whitespace-nowrap select-none " +
  "transition-colors duration-150 ease-[var(--ease-out-soft)] " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-electric";

const variants: Record<Variant, string> = {
  primary:
    "bg-electric text-on-accent shadow-[0_1px_2px_rgba(235,95,27,0.28),0_8px_24px_-12px_rgba(235,95,27,0.55)] " +
    "hover:bg-electric-600 hover:shadow-[0_1px_2px_rgba(235,95,27,0.34),0_14px_32px_-14px_rgba(235,95,27,0.65)]",
  outline:
    "border border-line-3 bg-paper-2/60 text-ink hover:border-ink/25 hover:bg-paper-3 " +
    "backdrop-blur-[2px]",
  ghost: "text-ink-2 hover:text-ink hover:bg-ink/[0.045]",
  onDark:
    "bg-white text-navy shadow-[0_1px_2px_rgba(0,0,0,0.12),0_10px_30px_-14px_rgba(0,0,0,0.5)] hover:bg-electric hover:text-on-accent",
  onDarkOutline:
    "border border-white/25 text-navy-ink hover:border-white/55 hover:bg-white/[0.07]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-5 text-[0.875rem]",
  lg: "h-14 px-7 text-[0.9375rem]",
};

const MotionLink = motion.create(Link);

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Optional trailing glyph — animates with the button, never on its own. */
  trailing?: ReactNode;
};

function content(children: ReactNode, trailing?: ReactNode) {
  return (
    <>
      <span className="relative z-10">{children}</span>
      {trailing ? (
        <span className="relative z-10 transition-transform duration-200 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-0.5">
          {trailing}
        </span>
      ) : null}
    </>
  );
}

const press = {
  whileHover: { y: -1 },
  whileTap: { scale: 0.975, y: 0 },
  transition: spring.press,
};

/* ------------------------------------------------------------------ link */

export function ButtonLink({
  children,
  variant = "primary",
  size = "md",
  className = "",
  trailing,
  href,
  external,
  ...rest
}: CommonProps & { href: string; external?: boolean } & Omit<ComponentProps<"a">, "href" | "className">) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (external) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...press}
        {...(rest as ComponentProps<typeof motion.a>)}
      >
        {content(children, trailing)}
      </motion.a>
    );
  }

  return (
    <MotionLink href={href} className={classes} {...press}>
      {content(children, trailing)}
    </MotionLink>
  );
}

/* ---------------------------------------------------------------- button */

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  trailing,
  type = "button",
  ...rest
}: CommonProps & { type?: "button" | "submit" } & Omit<ComponentProps<"button">, "className" | "type">) {
  return (
    <motion.button
      type={type}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...press}
      {...(rest as ComponentProps<typeof motion.button>)}
    >
      {content(children, trailing)}
    </motion.button>
  );
}

/* ------------------------------------------------------------------ link */
/** Quiet text link with an underline that draws in from the left. */
export function TextLink({
  children,
  href,
  external,
  className = "",
}: {
  children: ReactNode;
  href: string;
  external?: boolean;
  className?: string;
}) {
  const cls =
    "group/tl relative inline-flex items-center gap-1.5 text-ink font-medium " +
    "transition-colors duration-150 hover:text-electric " +
    `after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left ` +
    `after:scale-x-0 after:bg-electric after:transition-transform after:duration-300 ` +
    `after:ease-[var(--ease-out-expo)] hover:after:scale-x-100 ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
        <span className="transition-transform duration-200 group-hover/tl:translate-x-0.5" aria-hidden>
          ↗
        </span>
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
      <span className="transition-transform duration-200 group-hover/tl:translate-x-0.5" aria-hidden>
        →
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ misc */

/** Small circular arrow used beside editorial links. */
export function ArrowGlyph({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block transition-transform duration-200 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-0.5 ${className}`}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 7h9.5M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export const buttonMotion = { duration: duration.fast, ease: ease.out };
