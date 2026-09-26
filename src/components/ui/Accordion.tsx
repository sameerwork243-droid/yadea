"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import { duration, ease, spring } from "@/lib/motion";

export type AccordionItem = {
  q: string;
  a: string;
  /** Optional meta line rendered above the answer. */
  meta?: string;
};

/**
 * Accessible disclosure list. Real buttons, real aria-expanded, real
 * keyboard behaviour. Height is measured by Framer Motion rather than
 * animated with a magic number, and reduced motion collapses it to a fade.
 */
export function Accordion({
  items,
  defaultOpen = -1,
  tone = "light",
  className = "",
}: {
  items: readonly AccordionItem[];
  defaultOpen?: number;
  tone?: "light" | "dark";
  className?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");

  const isDark = tone === "dark";
  const panelTone = isDark ? "text-navy-ink/70" : "text-ink-2";
  const hairline = isDark ? "border-white/12" : "border-line-2";
  const hoverTone = isDark ? "hover:text-navy-ink" : "hover:text-electric";

  return (
    <div className={`divide-y ${hairline} ${className}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                id={`${uid}-btn-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${uid}-panel-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className={`group flex w-full items-start justify-between gap-6 py-6 text-left transition-colors duration-150 ${hoverTone}`}
              >
                <span className="flex flex-col gap-2">
                  <span className="display-sm text-[1.0625rem] sm:text-[1.1875rem]">{item.q}</span>
                  {item.meta ? <span className="label-tech opacity-60">{item.meta}</span> : null}
                </span>

                {/* Plus that rotates into a minus — transform only */}
                <span
                  aria-hidden
                  className={`relative mt-1.5 grid size-7 shrink-0 place-items-center rounded-full border transition-colors duration-200 ${
                    isDark
                      ? isOpen
                        ? "border-white/40 bg-white/10"
                        : "border-white/20"
                      : isOpen
                        ? "border-electric/40 bg-electric/10"
                        : "border-line-3 group-hover:border-ink/30"
                  }`}
                >
                  <span className="absolute h-px w-2.5 bg-current" />
                  <motion.span
                    className="absolute h-2.5 w-px bg-current"
                    animate={{ scaleY: isOpen ? 0 : 1, rotate: isOpen ? 90 : 0 }}
                    transition={reduce ? { duration: 0 } : spring.default}
                  />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="panel"
                  id={`${uid}-panel-${i}`}
                  role="region"
                  aria-labelledby={`${uid}-btn-${i}`}
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={
                    reduce
                      ? { duration: duration.fast }
                      : {
                          height: { duration: duration.base, ease: ease.inOut },
                          opacity: { duration: duration.fast, ease: ease.out },
                        }
                  }
                  className="overflow-hidden"
                >
                  <p className={`body-md max-w-[68ch] pb-7 pr-10 ${panelTone}`}>{item.a}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
