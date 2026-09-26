import type { Metadata } from "next";
import Image from "next/image";
import { notPublished } from "@/content/models";
import { models, formatPKR } from "@/content/models";
import { site } from "@/content/site";
import { LineupGrid, PriceLadder } from "@/components/models/VehicleCard";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink, ArrowGlyph } from "@/components/ui/Button";
import { SectionHead } from "@/components/ui/Editorial";

export const metadata: Metadata = {
  title: "All models",
  description:
    "Every YADEA electric two-wheeler available in Pakistan with published prices, range, battery and top speed. 13 models, from PKR 174,000 to PKR 1,400,000.",
  alternates: { canonical: "/models" },
};

export default function ModelsIndexPage() {
  return (
    <main id="main" className="pt-28 sm:pt-32">
      <div className="container-x">
        <Reveal>
          <SectionHead
            eyebrow="The line-up"
            title="Every YADEA sold in Pakistan."
            lede="Thirteen models. Each figure on this page is published by YADEA — and where the source publishes nothing, this page says so rather than filling the gap."
          />
        </Reveal>

        <div className="mt-16">
          <LineupGrid models={models} />
        </div>

        <div className="mt-20">
          <PriceLadder models={models} />
        </div>

        <Reveal className="mt-20">
          <div className="flex flex-col items-start gap-4 border-t border-line-2 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[46ch] text-sm text-ink-2">
              Want to sit on one before you decide? Every model is available to test ride
              at an authorised 3S store.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={site.channels.testRide} external trailing={<ArrowGlyph />}>
                Book a test ride
              </ButtonLink>
              <ButtonLink href={site.channels.dealerLocator} external variant="outline">
                Find a dealer
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Quick-reference table */}
      <div className="section-y mt-16 bg-paper-2">
        <div className="container-x">
          <Reveal>
            <SectionHead
              eyebrow="At a glance"
              title="The specification table."
              lede="One row per model. This is the table to screenshot before you walk into a showroom."
            />
          </Reveal>

          <Reveal delay={0.08} className="mt-12">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[52rem] border-collapse text-left">
                <caption className="sr-only">
                  All YADEA models available in Pakistan with published price, range, battery,
                  charging time, top speed and warranty
                </caption>
                <thead>
                  <tr className="border-b border-line-2">
                    {["Model", "Price", "Range", "Battery", "Charge", "Top speed", "Warranty"].map(
                      (h) => (
                        <th key={h} scope="col" className="label-tech px-3 py-3.5 font-medium first:pl-0 last:pr-0">
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {models.map((m) => (
                    <tr key={m.slug} className="border-b border-line-2 last:border-b-0">
                      <th scope="row" className="py-4 pl-0 pr-3 font-medium">
                        <a
                          href={`/models/${m.slug}`}
                          className="text-[0.9375rem] transition-colors hover:text-electric"
                        >
                          {m.name}
                        </a>
                      </th>
                      <td className="px-3 py-4 text-[0.8125rem] tabular-nums text-ink-2">
                        {m.price === null ? (
                          <span className="text-ink-4">{notPublished}</span>
                        ) : (
                          `PKR ${formatPKR(m.price)}`
                        )}
                      </td>
                      <td className="px-3 py-4 text-[0.8125rem] tabular-nums text-ink-2">
                        {m.headline.range}
                      </td>
                      <td className="px-3 py-4 text-[0.8125rem] text-ink-2">{m.headline.battery}</td>
                      <td className="px-3 py-4 text-[0.8125rem] tabular-nums text-ink-2">
                        {m.battery.chargingTime ?? <span className="text-ink-4">{notPublished}</span>}
                      </td>
                      <td className="px-3 py-4 text-[0.8125rem] tabular-nums text-ink-2">
                        {m.headline.speed}
                      </td>
                      <td className="px-3 py-4 pr-0 text-[0.8125rem] text-ink-2">
                        {m.battery.warranty ?? <span className="text-ink-4">{notPublished}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Image strip */}
      <div className="section-y">
        <div className="container-x">
          <Reveal>
            <SectionHead eyebrow="In person" title="See the range." />
          </Reveal>
          <Reveal stagger className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {models.map((m) => (
              <RevealItem key={m.slug}>
                <div className="relative aspect-square overflow-hidden rounded-card border border-line-2 bg-paper-2">
                  <Image
                    src={m.image}
                    alt={m.imageAlt}
                    fill
                    sizes="(max-width: 640px) 46vw, 24vw"
                    className="object-contain p-4"
                  />
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </main>
  );
}
