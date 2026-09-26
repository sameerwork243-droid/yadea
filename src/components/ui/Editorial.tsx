import type { ReactNode } from "react";
import { notPublished } from "@/content/models";

/* ------------------------------------------------------------- eyebrows */

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`label-tech ${className}`}>{children}</p>;
}

/**
 * Section header. The index number is the page's spine — it gives the
 * homepage the feel of a designed document rather than a stack of blocks.
 */
export function SectionHead({
  index,
  eyebrow,
  title,
  lede,
  action,
  className = "",
  tone = "light",
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  action?: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";
  return (
    <div className={`grid gap-8 lg:grid-cols-12 lg:gap-12 ${className}`}>
      <div className="lg:col-span-7">
        <div className="flex items-center gap-3">
          {index ? (
            <span
              className={`label-tech ${isDark ? "text-navy-ink/45" : "text-ink-4"}`}
              aria-hidden
            >
              {index}
            </span>
          ) : null}
          <span
            className={`h-px w-6 ${isDark ? "bg-white/25" : "bg-ink/20"}`}
            aria-hidden
          />
          <span className={isDark ? "label-tech-light" : "label-tech"}>{eyebrow}</span>
        </div>
        <h2
          className={`display-lg mt-6 ${isDark ? "text-navy-ink" : "text-ink"}`}
        >
          {title}
        </h2>
      </div>
      {(lede || action) && (
        <div className="flex flex-col justify-end gap-6 lg:col-span-5">
          {lede ? (
            <p className={`body-lg max-w-[46ch] ${isDark ? "text-navy-ink/75" : ""}`}>
              {lede}
            </p>
          ) : null}
          {action}
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------- stats */

/** A single figure with its label. Tabular numerals, no decoration. */
export function Stat({
  value,
  suffix,
  label,
  note,
  tone = "light",
  size = "md",
}: {
  value: string | number;
  suffix?: string;
  label: string;
  note?: string;
  tone?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}) {
  const isDark = tone === "dark";
  const sizes = {
    sm: "text-[1.75rem] leading-none",
    md: "text-[2.5rem] md:text-[3.25rem] leading-[0.9]",
    lg: "text-[3.25rem] md:text-[5rem] leading-[0.85]",
  } as const;

  return (
    <div className="flex flex-col gap-2">
      <p
        className={`num-hero ${sizes[size]} ${isDark ? "text-navy-ink" : "text-ink"}`}
      >
        {value}
        {suffix ? <span className="text-electric">{suffix}</span> : null}
      </p>
      <p
        className={`text-[0.8125rem] font-medium leading-snug ${isDark ? "text-navy-ink/80" : "text-ink-2"}`}
      >
        {label}
      </p>
      {note ? (
        <p className={`text-xs leading-relaxed ${isDark ? "text-navy-ink/50" : "text-ink-4"}`}>
          {note}
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------- spec primitives */

/** Label + value row. The dashboard voice of the site. */
export function SpecRow({
  label,
  value,
  tone = "light",
  className = "",
}: {
  label: string;
  value: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const isDark = tone === "dark";
  return (
    <div
      className={`flex items-baseline justify-between gap-6 border-b py-3.5 last:border-b-0 ${
        isDark ? "border-white/12" : "border-line-2"
      } ${className}`}
    >
      <dt className={`label-tech shrink-0 ${isDark ? "text-navy-ink/50" : ""}`}>{label}</dt>
      <dd
        className={`text-right text-[0.9375rem] font-medium tabular-nums ${
          isDark ? "text-navy-ink" : "text-ink"
        }`}
      >
        {value ?? notPublished}
      </dd>
    </div>
  );
}

/** Three-up headline figure row used on every vehicle. */
export function FigureTrio({
  items,
  tone = "light",
}: {
  items: { label: string; value: string }[];
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";
  return (
    <dl
      className={`grid grid-cols-3 divide-x ${isDark ? "divide-white/12" : "divide-line-2"}`}
    >
      {items.map((it) => (
        <div key={it.label} className="px-4 first:pl-0 last:pr-0 sm:px-6">
          <dt className={`label-tech ${isDark ? "text-navy-ink/50" : ""}`}>{it.label}</dt>
          <dd
            className={`num-hero mt-2.5 text-[1.375rem] leading-none sm:text-[1.75rem] ${
              isDark ? "text-navy-ink" : "text-ink"
            }`}
          >
            {it.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* --------------------------------------------------------------- badges */

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "outline";
}) {
  const tones = {
    neutral: "bg-ink/[0.05] text-ink-2",
    accent: "bg-electric/10 text-electric",
    outline: "border border-line-3 text-ink-3",
  } as const;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 label-tech ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

/* ----------------------------------------------------------------- misc */

export function NotPublished({ className = "" }: { className?: string }) {
  return (
    <span className={`text-ink-4 italic ${className}`} style={{ fontStyle: "normal" }}>
      {notPublished}
    </span>
  );
}

/** Thin rule with an optional inline label — used instead of boxed cards. */
export function LabelledRule({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="label-tech shrink-0">{label}</span>
      <span className="h-px flex-1 bg-line-2" aria-hidden />
    </div>
  );
}

export function formatPrice(value: number | null): string {
  if (value === null) return notPublished;
  return `PKR ${new Intl.NumberFormat("en-PK").format(value)}`;
}
