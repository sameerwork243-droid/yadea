"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { duration, ease, spring } from "@/lib/motion";

const links = [
  { label: "Models", href: "#lineup" },
  { label: "Technology", href: "#technology" },
  { label: "Running cost", href: "#running-cost" },
  { label: "Financing", href: "#financing" },
  { label: "Dealers", href: "#dealers" },
  { label: "Ownership", href: "#ownership" },
  { label: "Journal", href: "#journal" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the sheet so the background never scrolls away.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-electric focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-on-accent"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-[var(--ease-out-soft)] ${
          scrolled || open
            ? "glass-light border-b border-line-2"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between gap-6 md:h-20">
          {/* Official YADEA lockup. The site is warm-light throughout, so this is
              the dark-surface-ink variant — the reversed (white) lockup is
              invisible against the light header. */}
          <Link
            href="/"
            className="group relative z-10 flex items-center"
            aria-label="YADEA — home"
          >
            <Image
              src="/img/logo.svg"
              alt="YADEA"
              width={140}
              height={38}
              priority
              className="h-7 w-auto transition-opacity duration-200 group-hover:opacity-75 sm:h-8"
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group relative block px-3 py-2 text-[0.8125rem] font-medium text-ink-2 transition-colors duration-150 hover:text-ink"
                  >
                    {l.label}
                    <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-electric transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href="#dealers"
              className="hidden h-9 items-center rounded-full border border-line-3 bg-paper-2/70 px-4 text-[0.8125rem] font-medium text-ink transition-colors duration-150 hover:border-ink/25 hover:bg-paper-3 sm:inline-flex"
            >
              Find a dealer
            </a>
            <a
              href="#test-ride"
              className="group relative hidden h-9 items-center gap-1.5 overflow-hidden rounded-full bg-electric px-4 text-[0.8125rem] font-medium text-on-accent transition-colors duration-150 hover:bg-electric-600 sm:inline-flex"
            >
              <span className="relative z-10">Book a test ride</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5">
                <path d="M2 6h8M6.5 2.5 10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            {/* Trigger */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-10 grid size-10 place-items-center rounded-full border border-line-3 bg-paper-2/70 text-ink transition-colors hover:border-ink/25 xl:hidden"
            >
              <span className="relative block h-3 w-4">
                <motion.span
                  className="absolute inset-x-0 top-0 h-px bg-current"
                  animate={open ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                  transition={reduce ? { duration: 0 } : spring.default}
                />
                <motion.span
                  className="absolute inset-x-0 top-1.5 h-px bg-current"
                  animate={open ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }}
                  transition={reduce ? { duration: 0 } : { duration: duration.fast }}
                />
                <motion.span
                  className="absolute inset-x-0 top-3 h-px bg-current"
                  animate={open ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                  transition={reduce ? { duration: 0 } : spring.default}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet — full height, drag-free, escapable, focus-safe */}
      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              key="scrim"
              className="fixed inset-0 z-40 bg-scrim/70 backdrop-blur-[3px] xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : duration.base, ease: ease.out }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="sheet"
              id="mobile-nav"
              className="glass-light fixed inset-x-0 top-0 z-40 flex h-[100dvh] flex-col overflow-y-auto border-b border-line-2 pt-24 pb-10 xl:hidden"
              initial={reduce ? { opacity: 0 } : { y: "-100%" }}
              animate={reduce ? { opacity: 1 } : { y: 0 }}
              exit={reduce ? { opacity: 0 } : { y: "-100%" }}
              transition={reduce ? { duration: 0 } : { duration: duration.base, ease: ease.out }}
            >
              <nav aria-label="Mobile" className="container-x flex-1">
                <ul className="divide-y divide-line-2">
                  {links.map((l, i) => (
                    <motion.li
                      key={l.href}
                      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: reduce ? duration.fast : duration.base,
                        ease: ease.out,
                        delay: reduce ? 0 : 0.04 + i * 0.035,
                      }}
                    >
                      <a
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline justify-between gap-6 py-5 transition-colors hover:text-electric"
                      >
                        <span className="display-md text-[1.75rem]">{l.label}</span>
                        <span className="label-tech opacity-45">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-10 flex flex-col gap-3">
                  <a
                    href="#test-ride"
                    onClick={() => setOpen(false)}
                    className="flex h-13 items-center justify-center rounded-full bg-electric text-sm font-medium text-on-accent"
                  >
                    Book a test ride
                  </a>
                  <a
                    href="#dealers"
                    onClick={() => setOpen(false)}
                    className="flex h-13 items-center justify-center rounded-full border border-line-3 text-sm font-medium text-ink"
                  >
                    Find a dealer
                  </a>
                </div>
              </nav>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
