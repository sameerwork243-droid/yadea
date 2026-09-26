import Image from "next/image";
import Link from "next/link";
import { notPublished, type Model } from "@/content/models";
import { formatPKR } from "@/content/models";
import { LabelledRule } from "@/components/ui/Editorial";

/**
 * Model card. Built on a hairline rule and a light field rather than a
 * boxed drop-shadow card, so a grid of thirteen still reads as one page.
 */
export function VehicleCard({ model, index }: { model: Model; index: number }) {
  return (
    <article className="group relative flex flex-col">
      <div className="relative overflow-hidden rounded-card border border-line-2 bg-paper-2">
        <Link
          href={`/models/${model.slug}`}
          className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric"
          tabIndex={-1}
          aria-hidden
        >
          <div className="relative aspect-[4/3.4] w-full">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(80% 70% at 50% 88%, rgba(235,95,27,0.10), transparent 68%)",
              }}
            />
            <Image
              src={model.image}
              alt={model.imageAlt}
              fill
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
              className="object-contain p-5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.045]"
            />
          </div>
        </Link>

        <div className="pointer-events-none absolute inset-x-4 top-4 flex items-start justify-between gap-3">
          <span className="label-tech rounded-full bg-navy/75 px-2.5 py-1 text-navy-ink backdrop-blur-sm">
            {model.category}
          </span>
          <span className="label-tech text-ink-4">{String(index + 1).padStart(2, "0")}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="display-sm">
            <Link
              href={`/models/${model.slug}`}
              className="transition-colors duration-150 hover:text-electric"
            >
              {model.name}
            </Link>
          </h3>
          <p className="shrink-0 text-[0.9375rem] font-medium tabular-nums text-ink">
            {model.price === null ? (
              <span className="text-ink-4">{notPublished}</span>
            ) : (
              `PKR ${formatPKR(model.price)}`
            )}
          </p>
        </div>

        {model.tagline ? (
          <p className="mt-2.5 line-clamp-2 text-[0.8125rem] leading-relaxed text-ink-2">
            {model.tagline}
          </p>
        ) : null}

        <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-line-2 pt-4">
          {[
            { k: "Range", v: model.headline.range },
            { k: "Battery", v: model.headline.battery },
            { k: "Speed", v: model.headline.speed },
          ].map((h) => (
            <div key={h.k}>
              <dt className="label-tech">{h.k}</dt>
              <dd className="mt-1.5 text-[0.8125rem] font-medium leading-tight tabular-nums text-ink">
                {h.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ index */

export function LineupGrid({ models }: { models: Model[] }) {
  return (
    <div>
      <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {models.map((m, i) => (
          <VehicleCard key={m.slug} model={m} index={i} />
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- compare */

/** Horizontal comparison of the models that publish a price. */
export function PriceLadder({ models }: { models: Model[] }) {
  const priced = models
    .filter((m) => m.price !== null)
    .sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
  const max = Math.max(...priced.map((m) => m.price ?? 0), 1);

  return (
    <div>
      <LabelledRule label="Price ladder · Pakistan" />
      <ul className="mt-7 space-y-1">
        {priced.map((m) => (
          <li key={m.slug}>
            <Link
              href={`/models/${m.slug}`}
              className="group grid grid-cols-12 items-center gap-4 py-3"
            >
              <span className="col-span-4 text-[0.875rem] font-medium text-ink transition-colors group-hover:text-electric sm:col-span-3">
                {m.name}
              </span>
              <span className="col-span-6 h-2 overflow-hidden rounded-full bg-ink/[0.05] sm:col-span-7">
                <span
                  className="block h-full rounded-full bg-gradient-to-r from-electric to-cyan transition-[width] duration-500 ease-[var(--ease-out-expo)]"
                  style={{ width: `${Math.max(((m.price ?? 0) / max) * 100, 4)}%` }}
                />
              </span>
              <span className="col-span-2 text-right text-[0.8125rem] tabular-nums text-ink-2 sm:col-span-2">
                PKR {formatPKR(m.price ?? 0)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-xs text-ink-4">
        {priced.length} of {models.length} models publish a price on yadea.com.pk.
        G5 is shown without one because the source publishes none.
      </p>
    </div>
  );
}
