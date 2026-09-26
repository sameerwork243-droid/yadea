"use client";

import { useMemo, useState } from "react";
import type { Story } from "@/content/editorial";
import { storyCategories } from "@/content/editorial";

/**
 * The editorial index. Filtering happens client-side over the full set that
 * is already in the HTML, so every story stays crawlable and there is no
 * second request.
 */
export function NewsIndex({ stories }: { stories: Story[] }) {
  const [active, setActive] = useState<string>("All");

  const shown = useMemo(
    () => (active === "All" ? stories : stories.filter((s) => s.category === active)),
    [active, stories],
  );

  const filters = ["All", ...storyCategories];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter stories by category">
        {filters.map((c) => {
          const on = c === active;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              aria-pressed={on}
              className={
                on
                  ? "rounded-full border border-electric/40 bg-electric px-3.5 py-1.5 text-[0.8125rem] font-medium text-on-accent transition-colors"
                  : "rounded-full border border-line-2 bg-paper-2/60 px-3.5 py-1.5 text-[0.8125rem] text-ink-2 transition-colors duration-150 hover:border-ink/20 hover:text-ink"
              }
            >
              {c}
            </button>
          );
        })}
        <span className="label-tech ml-auto" aria-live="polite">
          {shown.length} {shown.length === 1 ? "story" : "stories"}
        </span>
      </div>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((s) => (
          <li key={s.slug} className="h-full">
            <a href={`/news-events/${s.slug}`} className="group flex h-full flex-col">
              <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-line-2 bg-paper-2">
                {/* eslint-disable-next-line @next/next/no-img-element -- remote editorial thumbnail from the source site */}
                <img
                  src={s.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                />
              </div>
              <p className="label-tech mt-5 text-electric">{s.category}</p>
              <h2 className="display-sm mt-3 transition-colors duration-150 group-hover:text-electric">
                {s.title}
              </h2>
              <p className="body-md mt-3 flex-1">{s.excerpt}</p>
              <p className="mt-4 flex items-center gap-2 text-[0.8125rem] text-ink-4">
                <time dateTime={s.iso}>{s.date}</time>
                <span aria-hidden>·</span>
                <span className="font-medium text-ink transition-colors group-hover:text-electric">
                  Read more
                  <span className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>
                    →
                  </span>
                </span>
              </p>
            </a>
          </li>
        ))}
      </ul>

      {shown.length === 0 ? (
        <p className="body-md mt-12">No stories in this category yet.</p>
      ) : null}
    </div>
  );
}
