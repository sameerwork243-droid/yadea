import type { Metadata } from "next";
import { getModel, notPublished, formatPKR } from "@/content/models";
import { site } from "@/content/site";
import { stories } from "@/content/editorial";
import { gt70ClipById, clipIsPlayable } from "@/content/gt70Videos";
import { Reveal } from "@/components/motion/Reveal";
import { CinematicVideo } from "@/components/video/CinematicVideo";
import { ScrollScrubVideo } from "@/components/video/ScrollScrubVideo";
import { ButtonLink, ArrowGlyph, TextLink } from "@/components/ui/Button";
import { LabelledRule, NotPublished, SectionHead, SpecRow } from "@/components/ui/Editorial";

/**
 * /gt70 — the dedicated GT70 page.
 *
 * The page is deliberately cinematic rather than spec-sheet heavy, because
 * YADEA publishes very little about this model: the official product page and
 * the official complete review are the only two sources, and between them only
 * the price is a hard number. Everything the site does not have a published
 * figure for is shown as "Not published" rather than filled in from a sibling
 * model, a press rumour, or a plausible-sounding estimate.
 *
 * The film clips are gated by `clipIsPlayable`, so this page renders its real
 * stills until footage is approved and never shows a blank frame.
 */

const MODEL_SLUG = "gt70-cyber";

export const metadata: Metadata = {
  title: "GT70 Cyber",
  description:
    "The YADEA GT70 Cyber in Pakistan — published price, what YADEA officially specifies, and the official review. Figures YADEA has not published are marked as such.",
  alternates: { canonical: "/gt70" },
  openGraph: {
    type: "website",
    url: "/gt70",
    title: "YADEA GT70 Cyber — Pakistan",
    description:
      "Published price, official specifications and the complete YADEA review, with unpublished figures clearly marked.",
  },
};

export default function Gt70Page() {
  const model = getModel(MODEL_SLUG);
  if (!model) throw new Error("gt70-cyber missing from the model data");

  const review = stories.find((s) => s.slug === "gt70-cyber-review");

  /* Only claim a film chapter when a clip is genuinely mountable. */
  const heroPlayable = clipIsPlayable(gt70ClipById.hero);

  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className="field-aurora relative isolate overflow-hidden pb-14 pt-28 sm:pt-32 lg:pb-20 lg:pt-36">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
          {heroPlayable ? (
            <CinematicVideo
              clip={gt70ClipById.hero}
              priority
              decorative
              position="absolute"
              placeholderClassName="bg-transparent"
              className="inset-0 h-full w-full opacity-[0.26] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]"
            />
          ) : null}
        </div>

        <div className="container-x relative">
          <Reveal>
            <p className="label-tech text-electric-700">YADEA · {site.distributor}</p>
            <h1 className="display-xl mt-6 max-w-[14ch] text-ink">GT70 Cyber</h1>
            <p className="body-lg mt-6 max-w-[52ch] text-ink-2">
              A 2026 addition to the Pakistan line-up, finished in Starry Black with orange
              graphics. YADEA publishes a price and a complete review for this model — this page
              carries both, and marks everything else as not published rather than guessing.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href="#published" size="lg" trailing={<ArrowGlyph />}>
                What YADEA publishes
              </ButtonLink>
              <ButtonLink href="/models/gt70-cyber" variant="outline" size="lg">
                Model data sheet
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal className="mt-14">
            <dl className="grid gap-x-8 gap-y-6 border-t border-line-2 pt-8 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <dt className="label-tech">Published price</dt>
                <dd className="num-hero mt-2 text-[1.75rem] leading-none text-electric-700">
                  {model.price ? formatPKR(model.price) : notPublished}
                </dd>
              </div>
              <div>
                <dt className="label-tech">Range</dt>
                <dd className="num-hero mt-2 text-[1.75rem] leading-none text-ink">
                  {model.headline.range}
                </dd>
              </div>
              <div>
                <dt className="label-tech">Top speed</dt>
                <dd className="num-hero mt-2 text-[1.75rem] leading-none text-ink">
                  {model.headline.speed}
                </dd>
              </div>
              <div>
                <dt className="label-tech">Battery</dt>
                <dd className="num-hero mt-2 text-[1.75rem] leading-none text-ink">
                  {model.headline.battery}
                </dd>
              </div>
            </dl>
            <p className="mt-5 max-w-[68ch] text-xs leading-relaxed text-ink-4">
              Every figure above is published by YADEA Pakistan across the product page and
              the complete review. The product page carries no price and the review notes it
              may vary, so confirm current pricing with an authorised dealer.
            </p>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------- scrub reveal */}
      <section aria-labelledby="gt70-look-title" className="relative bg-paper">
        <ScrollScrubVideo clip={gt70ClipById.orbit} runwayClassName="h-[300vh]">
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
            <div aria-hidden className="h-32 bg-gradient-to-b from-paper to-transparent" />
            <div className="bg-gradient-to-t from-paper via-paper/88 to-transparent pb-14 pt-28 sm:pb-20">
              <div className="container-x">
                <Reveal>
                  <LabelledRule label="01 · The look" />
                  <h2 id="gt70-look-title" className="display-lg mt-5 max-w-[18ch] text-ink">
                    Starry Black or Turbo Orange.
                  </h2>
                  <p className="body-lg mt-5 max-w-[48ch] text-ink-2">
                    YADEA publishes two colours for the GT70 Cyber: Starry Black and Turbo
                    Orange. The scooter shown here is the Starry Black variant. Scroll to
                    walk around it.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </ScrollScrubVideo>
      </section>

      {/* --------------------------------------------------------- design */}
      <section
        aria-labelledby="gt70-design-title"
        className="relative isolate overflow-hidden bg-paper-2"
      >
        <CinematicVideo
          clip={gt70ClipById.design}
          decorative
          position="absolute"
          placeholderClassName="bg-paper-2"
          className="-z-10 inset-0 h-full w-full"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-t from-paper-2 via-paper-2/88 to-paper-2/45"
        />
        <div className="container-x section-y">
          <Reveal>
            <LabelledRule label="02 · Bodywork" />
            <h2 id="gt70-design-title" className="display-md mt-5 max-w-[20ch] text-ink">
              Angular bodywork, upright riding position.
            </h2>
            <p className="body-lg mt-5 max-w-[52ch] text-ink-2">
              YADEA describes the GT70 Cyber as a cyber-punk-styled premium electric scooter
              with an exoskeleton frame and an ergonomic dual-texture seat. It publishes the
              panel as a high-resolution display — the same page calls it LED in one heading
              and TFT in its body copy — so no panel type, size or seat height is asserted here.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------- published */}
      <section id="published" aria-labelledby="gt70-published-title" className="bg-paper">
        <div className="container-x section-y">
          <Reveal>
            <SectionHead
              index="03"
              eyebrow="Verified facts"
              title="Everything YADEA publishes — and everything it does not"
              lede="Two official YADEA sources cover this model: the product page and a complete review. Between them they publish a full specification set. Anything they leave out is marked explicitly rather than filled in from a similar model."
            />
          </Reveal>

          <div className="mt-12 grid gap-x-16 gap-y-10 lg:grid-cols-2">
            <Reveal>
              <h3 className="display-sm mb-4 text-ink">Published</h3>
              <dl>
                <SpecRow label="Price" value={model.price ? formatPKR(model.price) : <NotPublished />} />
                <SpecRow label="Top speed" value={model.topSpeed ? `${model.topSpeed} km/h` : <NotPublished />} />
                <SpecRow
                  label="Range"
                  value={model.range ? model.range.note ?? `${model.range.value} ${model.range.unit}` : <NotPublished />}
                />
                <SpecRow
                  label="Battery"
                  value={
                    model.battery.capacity
                      ? `${model.battery.capacity} ${model.battery.chemistry ?? ""}`.trim()
                      : <NotPublished />
                  }
                />
                <SpecRow
                  label="Motor"
                  value={
                    model.motor.ratedPower
                      ? `${model.motor.ratedPower} rated, ${model.motor.torque ?? "torque not published"}`
                      : <NotPublished />
                  }
                />
                <SpecRow label="Charging time" value={model.battery.chargingTime ?? <NotPublished />} />
                <SpecRow
                  label="Colours"
                  value={model.colors?.length ? model.colors.join(" · ") : <NotPublished />}
                />
                <SpecRow
                  label="Dimensions"
                  value={
                    model.dimensions.find((d) => /length/i.test(d.label))?.value ?? <NotPublished />
                  }
                />
                <SpecRow
                  label="Ground clearance"
                  value={model.dimensions.find((d) => /clearance/i.test(d.label))?.value ?? <NotPublished />}
                />
                <SpecRow
                  label="Weight (empty)"
                  value={model.dimensions.find((d) => /weight/i.test(d.label))?.value ?? <NotPublished />}
                />
                <SpecRow
                  label="Published review"
                  value={review ? <span className="text-electric-700">Yes — 15 Sep 2026</span> : <NotPublished />}
                />
              </dl>
            </Reveal>

            <Reveal>
              <h3 className="display-sm mb-4 text-ink">Not published by YADEA</h3>
              <dl>
                <SpecRow label="Battery warranty" value={<NotPublished />} />
                <SpecRow label="Instrument panel type" value={<NotPublished />} />
                <SpecRow label="Display size" value={<NotPublished />} />
                <SpecRow label="Seat height" value={<NotPublished />} />
                <SpecRow label="0–xx km/h acceleration" value={<NotPublished />} />
                <SpecRow label="IP / water-resistance rating" value={<NotPublished />} />
                <SpecRow label="Stock and delivery timeline" value={<NotPublished />} />
              </dl>
            </Reveal>
          </div>

          <Reveal className="mt-8">
            <p className="body-md max-[62ch] text-ink-3">
              One conflict is recorded rather than resolved: the product page heads its
              display section “high-resolution LED” while the body copy on the same page
              describes a high-resolution TFT screen, so the panel type is left unstated
              here. The product page also publishes no price — the PKR figure comes from
              the review, which notes it may vary.
            </p>
          </Reveal>

          <Reveal className="mt-12">
            <div className="rounded-card border border-line-2 bg-paper-2 p-6 sm:p-8">
              <h3 className="display-sm text-ink">Read the official sources</h3>
              <p className="body-lg mt-3 max-w-[56ch] text-ink-2">
                YADEA publishes the full specification set for the GT70 Cyber inside its complete
                review rather than on a product page. Both are linked here so every figure on this
                page can be checked at source.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                <TextLink href={model.sourceUrl} external>
                  Official product page
                </TextLink>
                {review ? (
                  <TextLink href={review.url} external>
                    Official complete review
                  </TextLink>
                ) : null}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- cta */}
      <section aria-labelledby="gt70-test-title" className="relative bg-paper-2">
        <div className="container-x section-y text-center">
          <Reveal>
            <p className="label-tech text-electric-700">YADEA GT70</p>
            <h2 id="gt70-test-title" className="display-lg mx-auto mt-5 max-w-[20ch] text-ink">
              Sit on it before you buy it.
            </h2>
            <p className="body-lg mx-auto mt-5 max-w-[50ch] text-ink-2">
              The only way to judge a scooter this size is to ride it. YADEA Pakistan publishes no
              support phone number, so test rides run through the channels the company has actually
              published.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/#test-ride" size="lg" trailing={<ArrowGlyph />}>
                Book a test ride
              </ButtonLink>
              <ButtonLink href="/models" variant="outline" size="lg">
                See the full range
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
