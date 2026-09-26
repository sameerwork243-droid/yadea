"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { directionsUrl, regions, searchDealers, storeCount, type Dealer } from "@/content/dealers";
import { site } from "@/content/site";
import { duration, ease } from "@/lib/motion";
import { ButtonLink } from "@/components/ui/Button";
import { LabelledRule } from "@/components/ui/Editorial";

type Row = Dealer & { regionId: string; regionName: string };

export function DealerFinder() {
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<string | null>(null);

  const results = useMemo(() => searchDealers(query, region), [query, region]);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const r of regions) {
      map[r.id] = searchDealers("", r.id).length;
    }
    return map;
  }, []);

  return (
    <div>
      {/* ---------------------------------------------------------- filters */}
      <div className="grid gap-5 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <label className="relative block">
            <span className="sr-only">Search dealers by name, city or address</span>
            <svg
              aria-hidden
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-4"
            >
              <circle cx="7" cy="7" r="4.75" stroke="currentColor" strokeWidth="1.5" />
              <path d="m10.5 10.5 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a city, store or street"
              className="h-12 w-full rounded-full border border-line-2 bg-paper-2/80 pl-11 pr-4 text-[0.9375rem] text-ink placeholder:text-ink-4 transition-colors focus:border-electric/50 focus:outline-none"
            />
          </label>
        </div>

        <div className="lg:col-span-7">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by region">
            <FilterChip active={region === null} onClick={() => setRegion(null)}>
              All regions
              <span className="ml-2 tabular-nums opacity-60">{storeCount}</span>
            </FilterChip>
            {regions.map((r) => (
              <FilterChip key={r.id} active={region === r.id} onClick={() => setRegion(r.id)}>
                {r.name}
                <span className="ml-2 tabular-nums opacity-60">{counts[r.id]}</span>
              </FilterChip>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------- results */}
      <div className="mt-8">
        <div className="flex items-baseline justify-between gap-4 border-b border-line-2 pb-4">
          <p className="text-[0.8125rem] text-ink-3" aria-live="polite">
            <span className="font-semibold text-ink tabular-nums">{results.length}</span>{" "}
            {results.length === 1 ? "store" : "stores"}
            {region ? ` in ${regions.find((r) => r.id === region)?.name}` : " across Pakistan"}
          </p>
          <ButtonLink href={site.channels.dealerLocator} external variant="ghost" size="sm" className="-mr-3">
            Full locator
          </ButtonLink>
        </div>

        <AnimatePresence mode="popLayout" initial={false}>
          {results.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 text-center text-[0.9375rem] text-ink-3"
            >
              No store matches that search in this region. Try a different city, or{" "}
              <a
                href={site.channels.dealerLocator}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-electric underline underline-offset-4"
              >
                open the full locator
              </a>
              .
            </motion.p>
          ) : (
            <motion.ul key="list" className="divide-y divide-line-2">
              {results.map((d, i) => (
                <DealerRow key={`${d.regionId}-${d.name}-${i}`} dealer={d} reduce={!!reduce} />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ chip */

function FilterChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`h-9 rounded-full border px-3.5 text-[0.8125rem] font-medium transition-colors duration-150 ${
        active
          ? "border-electric/40 bg-electric text-on-accent"
          : "border-line-2 bg-paper-2/60 text-ink-2 hover:border-ink/20 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------- row */

function DealerRow({ dealer: d, reduce }: { dealer: Row; reduce: boolean }) {
  const maps = directionsUrl(d);

  return (
    <motion.li
      layout={!reduce}
      initial={{ opacity: 0, y: reduce ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? duration.fast : duration.base, ease: ease.out }}
    >
      <div className="grid gap-3 py-5 sm:grid-cols-12 sm:items-baseline sm:gap-6">
        <div className="sm:col-span-4">
          <p className="text-[0.9375rem] font-medium text-ink">{d.name}</p>
          <p className="label-tech mt-1.5 text-ink-4">{d.city}</p>
        </div>

        <p className="text-[0.8125rem] leading-relaxed text-ink-2 sm:col-span-5">{d.address}</p>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 sm:col-span-3 sm:justify-end">
          {d.phones.map((p) => (
            <a
              key={p}
              href={`tel:${p.replace(/[^0-9+]/g, "")}`}
              className="text-[0.8125rem] font-medium tabular-nums text-ink transition-colors hover:text-electric"
            >
              {p}
            </a>
          ))}
          <a
            href={maps}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.8125rem] font-medium text-ink transition-colors hover:text-electric"
          >
            Directions ↗
          </a>
        </div>
      </div>
    </motion.li>
  );
}

/* -------------------------------------------------------------- coverage */

export function DealerCoverage() {
  return (
    <div>
      <LabelledRule label="Coverage by region" />
      <dl className="mt-7 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
        {regions.map((r) => (
          <div key={r.id} className="flex flex-col gap-1.5">
            <dt className="text-[0.8125rem] font-medium text-ink-2">{r.name}</dt>
            <dd className="num-hero text-[1.75rem] leading-none text-ink">
              {r.dealers.length}
              <span className="ml-1 text-[0.75rem] font-normal text-ink-4">stores</span>
            </dd>
          </div>
        ))}
      </dl>
      <p className="body-md mt-7 max-w-[64ch]">
        Every store on this page is a confirmed authorised YADEA 3S location from
        YADEA&rsquo;s published service-centre guide. Phone numbers are reproduced as
        published. The live locator below carries the same network and is worth
        checking before a long journey.
      </p>
    </div>
  );
}
