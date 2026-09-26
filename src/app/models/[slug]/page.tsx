import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPKR, getModel, models, notPublished, type SpecGroup } from "@/content/models";
import { site } from "@/content/site";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink, ArrowGlyph } from "@/components/ui/Button";
import { FigureTrio, LabelledRule, SectionHead, SpecRow } from "@/components/ui/Editorial";

/* --------------------------------------------------------------- routing */

export function generateStaticParams() {
  return models.map((m) => ({ slug: m.slug }));
}

export const dynamicParams = false;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const m = getModel(slug);
  if (!m) return { title: "Model not found" };

  const desc =
    m.tagline ||
    `${m.name} electric scooter in Pakistan — published price, range, battery and specifications.`;

  return {
    title: `${m.name}`,
    description: desc,
    alternates: { canonical: `/models/${m.slug}` },
    openGraph: {
      type: "website",
      url: `/models/${m.slug}`,
      title: `YADEA ${m.name} — Pakistan`,
      description: desc,
      images: [{ url: m.image, alt: m.imageAlt }],
    },
  };
}

/* ----------------------------------------------------------------- groups */

const groupMeta: Record<SpecGroup, { title: string; note: string }> = {
  performance: { title: "Performance", note: "As published on the product page." },
  battery: { title: "Battery", note: "Chemistry, capacity and published warranty." },
  charging: { title: "Charging", note: "Standard home socket." },
  comfort: { title: "Comfort & fit", note: "Dimensions for everyday riders." },
  technology: { title: "Technology", note: "Electronics and connected features." },
  safety: { title: "Safety", note: "Braking and stability systems." },
};

const groupOrder: SpecGroup[] = [
  "performance",
  "battery",
  "charging",
  "comfort",
  "technology",
  "safety",
];

/* ------------------------------------------------------------------ page */

export default async function ModelPage({ params }: Params) {
  const { slug } = await params;
  const model = getModel(slug);
  if (!model) notFound();

  const related = models
    .filter((m) => m.slug !== model.slug)
    .sort((a, b) => {
      const pa = a.price ?? Number.MAX_SAFE_INTEGER;
      const pb = b.price ?? Number.MAX_SAFE_INTEGER;
      return Math.abs(pa - (model.price ?? pa)) - Math.abs(pb - (model.price ?? pa));
    })
    .slice(0, 3);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `YADEA ${model.name}`,
    description: model.tagline || model.intro.slice(0, 300),
    image: `${site.channels.sourceSite.replace(/\/$/, "")}${model.image}`,
    category: "Electric scooter",
    brand: { "@type": "Brand", name: "YADEA" },
    ...(model.price !== null
      ? {
          offers: {
            "@type": "Offer",
            price: model.price,
            priceCurrency: "PKR",
            availability: "https://schema.org/InStock",
            url: `${site.channels.sourceSite.replace(/\/$/, "")}/models/${model.slug}`,
            seller: { "@type": "Organization", name: site.legalName },
          },
        }
      : {}),
  };

  return (
    <main id="main" className="pt-28 sm:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* ======================================================= masthead */}
      <section className="field-aurora">
        <div className="container-x">
          <nav aria-label="Breadcrumb" className="pt-2">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-ink-4">
              <li>
                <Link href="/" className="transition-colors hover:text-ink">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/models" className="transition-colors hover:text-ink">
                  Models
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-ink-2">{model.name}</li>
            </ol>
          </nav>

          <div className="grid items-center gap-10 py-14 lg:grid-cols-12 lg:py-20">
            <div className="lg:col-span-6">
              <p className="label-tech text-electric">{model.category}</p>
              <h1 className="display-xl mt-5 text-ink">{model.name}</h1>
              {model.tagline ? (
                <p className="body-lg mt-6 max-w-[44ch]">{model.tagline}</p>
              ) : (
                <p className="body-lg mt-6 max-w-[44ch]">{model.intro}</p>
              )}

              <div className="mt-9 flex flex-wrap items-end gap-x-10 gap-y-5">
                <div>
                  <p className="label-tech">Price</p>
                  <p className="num-hero mt-2.5 text-[2rem] leading-none text-ink">
                    {model.price === null ? (
                      <span className="text-ink-4">{notPublished}</span>
                    ) : (
                      <>
                        PKR {formatPKR(model.price)}
                      </>
                    )}
                  </p>
                  {model.priceNote ? (
                    <p className="mt-2 text-xs text-ink-4">{model.priceNote}</p>
                  ) : null}
                </div>
                <FigureTrio
                  items={[
                    { label: "Range", value: model.headline.range },
                    { label: "Battery", value: model.headline.battery },
                    { label: "Top speed", value: model.headline.speed },
                  ]}
                />
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href={site.channels.testRide} external size="lg" trailing={<ArrowGlyph />}>
                  Book a test ride
                </ButtonLink>
                <ButtonLink href={site.channels.dealerLocator} external variant="outline" size="lg">
                  Find a dealer
                </ButtonLink>
              </div>
            </div>

            <div className="relative lg:col-span-6">
              <div
                aria-hidden
                className="absolute inset-x-[14%] bottom-[8%] h-12 rounded-[50%] blur-2xl"
                style={{ background: "rgba(0,0,0,0.55)" }}
              />
              <Image
                src={model.image}
                alt={model.imageAlt}
                width={1024}
                height={1024}
                priority
                className="relative w-full drop-shadow-[0_26px_36px_rgba(0,0,0,0.6)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================== intro */}
      {model.intro ? (
        <section className="section-y border-t border-line-2">
          <div className="container-x grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <LabelledRule label="Overview" />
            </div>
            <div className="lg:col-span-8">
              <p className="text-[1.0625rem] leading-relaxed text-ink-2 sm:text-[1.125rem]">
                {model.intro}
              </p>
              {model.battery.notes.length > 0 ? (
                <ul className="mt-7 space-y-2.5">
                  {model.battery.notes.map((n) => (
                    <li key={n} className="flex gap-3 text-[0.875rem] leading-relaxed text-ink-2">
                      <span className="mt-[0.5rem] size-1 shrink-0 rounded-full bg-electric/50" aria-hidden />
                      {n}
                    </li>
                  ))}
                </ul>
              ) : null}

              {model.motor.notes && model.motor.notes.length > 0 ? (
                <ul className="mt-4 space-y-2.5">
                  {model.motor.notes.map((n) => (
                    <li key={n} className="flex gap-3 text-[0.875rem] leading-relaxed text-ink-2">
                      <span className="mt-[0.5rem] size-1 shrink-0 rounded-full bg-cyan/50" aria-hidden />
                      {n}
                    </li>
                  ))}
                </ul>
              ) : null}

              <p className="mt-9 border-t border-line-2 pt-5 text-[0.8125rem] leading-relaxed text-ink-4">
                Every figure on this page is taken from the manufacturer&rsquo;s own listing.{" "}
                <a
                  href={model.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-ink-2 underline decoration-electric/60 underline-offset-4 transition-colors hover:text-electric"
                >
                  View the {model.name} product page on yadea.com.pk
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            </div>
          </div>
        </section>
      ) : null}

      {/* ======================================================= features */}
      {model.features.length > 0 ? (
        <section className="section-y bg-paper-2">
          <div className="container-x">
            <Reveal>
              <SectionHead
                eyebrow="Features"
                title={`What the ${model.name} does.`}
                lede="As described on the product page."
              />
            </Reveal>
            <Reveal stagger className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {model.features.map((f) => (
                <RevealItem key={f.title}>
                  <div className="border-t border-line-2 pt-6">
                    <h3 className="display-sm">{f.title}</h3>
                    <p className="body-md mt-3">{f.body}</p>
                  </div>
                </RevealItem>
              ))}
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* =========================================================== specs */}
      <section className="section-y">
        <div className="container-x">
          <Reveal>
            <SectionHead
              eyebrow="Specifications"
              title="Everything published."
              lede="Grouped as YADEA presents it. Anything the source does not publish is marked as such rather than estimated."
            />
          </Reveal>

          <div className="mt-14 grid gap-x-16 gap-y-12 lg:grid-cols-2">
            {groupOrder.map((g) => {
              const specs = model.specs[g];
              if (!specs || specs.length === 0) return null;
              const meta = groupMeta[g];
              return (
                <Reveal key={g} className="break-inside-avoid">
                  <div>
                    <div className="flex items-baseline justify-between gap-4">
                      <h2 className="display-sm">{meta.title}</h2>
                      <p className="text-xs text-ink-4">{meta.note}</p>
                    </div>
                    <dl className="mt-5 border-t border-line-2">
                      {specs.map((s) => (
                        <SpecRow key={s.label} label={s.label} value={s.value} />
                      ))}
                    </dl>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {model.dimensions.length > 0 ? (
            <div className="mt-14">
              <LabelledRule label="Dimensions" />
              <dl className="mt-5 grid gap-x-16 sm:grid-cols-2 lg:grid-cols-3">
                {model.dimensions.map((d) => (
                  <SpecRow key={d.label} label={d.label} value={d.value} />
                ))}
              </dl>
            </div>
          ) : null}

          {model.colors && model.colors.length > 0 ? (
            <div className="mt-14">
              <LabelledRule label="Colours" />
              <ul className="mt-5 flex flex-wrap gap-2">
                {model.colors.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-line-2 bg-paper-2/70 px-3.5 py-1.5 text-[0.8125rem] text-ink-2"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      {/* ====================================================== lifestyle */}
      {model.lifestyle.length > 0 ? (
        <section className="section-y bg-paper-2">
          <div className="container-x">
            <Reveal>
              <SectionHead eyebrow="On the road" title={`${model.name}, in use.`} />
            </Reveal>
            <Reveal stagger className="mt-12 grid gap-4 sm:grid-cols-2">
              {model.lifestyle.map((l) => (
                <RevealItem key={l.src}>
                  <figure className="relative overflow-hidden rounded-card border border-line-2 bg-paper-2">
                    <Image
                      src={l.src}
                      alt={l.alt}
                      width={1200}
                      height={800}
                      sizes="(max-width: 640px) 92vw, 46vw"
                      className="w-full object-cover"
                    />
                    {l.caption ? (
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-scrim/85 to-transparent px-5 pb-4 pt-10 text-[0.8125rem] font-medium text-navy-ink">
                        {l.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                </RevealItem>
              ))}
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* ========================================================== close */}
      <section className="section-y field-ice">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="label-tech text-electric">Next step</p>
                <p className="display-md mt-4 max-w-[20ch]">Ride one before you decide.</p>
                <p className="body-md mt-4 max-w-[46ch]">
                  Every YADEA is available to test ride at an authorised 3S store, and
                  financing is available from Bank Alfalah with 0% markup on the 3- and
                  6-month tenures.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={site.channels.testRide} external size="lg" trailing={<ArrowGlyph />}>
                  Book a test ride
                </ButtonLink>
                <ButtonLink href="/#financing" variant="outline" size="lg">
                  See financing
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================= related */}
      {related.length > 0 ? (
        <section className="section-y border-t border-line-2">
          <div className="container-x">
            <Reveal>
              <SectionHead
                eyebrow="Compare"
                title="Models near this price."
                action={
                  <ButtonLink href="/models" variant="outline" trailing={<ArrowGlyph />}>
                    All models
                  </ButtonLink>
                }
              />
            </Reveal>
            <Reveal stagger className="mt-12 grid gap-6 sm:grid-cols-3">
              {related.map((r) => (
                <RevealItem key={r.slug}>
                  <Link
                    href={`/models/${r.slug}`}
                    className="group flex h-full flex-col rounded-card border border-line-2 bg-paper-2/70 p-5 transition-colors hover:border-ink/15"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={r.image}
                        alt={r.imageAlt}
                        fill
                        sizes="(max-width: 640px) 92vw, 30vw"
                        className="object-contain p-3 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                      />
                    </div>
                    <h3 className="display-sm mt-4 transition-colors group-hover:text-electric">
                      {r.name}
                    </h3>
                    <p className="mt-1.5 text-[0.8125rem] tabular-nums text-ink-3">
                      {r.price === null ? notPublished : `PKR ${formatPKR(r.price)}`}
                    </p>
                    <p className="mt-3 text-xs text-ink-4">{r.headline.range} range</p>
                  </Link>
                </RevealItem>
              ))}
            </Reveal>
          </div>
        </section>
      ) : null}
    </main>
  );
}
