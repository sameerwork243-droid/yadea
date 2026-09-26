import { Hero } from "@/components/sections/Hero";
import { CostCalculator, MaintenanceTable } from "@/components/sections/CostCalculator";
import {
  FinancingDetail,
  InstallmentSelector,
  PavePriceTable,
  PaveSteps,
  PaveWarranty,
} from "@/components/sections/Financing";
import { DealerCoverage, DealerFinder } from "@/components/sections/DealerFinder";
import {
  ChargingSection,
  ContactSection,
  ImpactSection,
  JournalSection,
  ProofSection,
  ServiceSection,
  TtfarSection,
  WarrantySection,
} from "@/components/sections";
import { ShowcaseBand } from "@/components/sections/Showcase";
import { Gt70ChapterBand, Gt70FinalCta, Gt70Reveal } from "@/components/sections/Gt70Film";
import { LineupGrid, PriceLadder } from "@/components/models/VehicleCard";
import { Gt70ScrollBackdrop } from "@/components/video/Gt70ScrollBackdrop";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { ButtonLink, ArrowGlyph } from "@/components/ui/Button";
import { SectionHead } from "@/components/ui/Editorial";
import { brandPillars, faqs } from "@/content/site";
import { models } from "@/content/models";
import { gt70ClipOrder } from "@/content/gt70Videos";

/* The page-wide GT70 film. Held back until the hero has scrolled past, then
   scrubbed by total page progress to the footer. Unapproved clips are skipped
   by the component, so this list stays the master flow order. */
const gt70Film = gt70ClipOrder;

/* ------------------------------------------------------------------ schema */

function FaqSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.flatMap((g) =>
      g.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    ),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* -------------------------------------------------------------------- page */

export default function HomePage() {
  return (
    <main id="main">
      <Hero />

      {/* The site-wide GT70 film. Held back until the hero has scrolled past,
          then scrubbed by total page progress to the footer. */}
      <Gt70ScrollBackdrop clips={gt70Film} />

      {/* ============================================== film · 01 reveal */}
      <Gt70Reveal />

      {/* ===================================================== 01 brand */}
      <section id="brand" className="section-y">
        <div className="container-x">
          <Reveal>
            <SectionHead
              index="01"
              eyebrow="Who we are"
              title={
                <>
                  The world&rsquo;s No.1
                  <br />
                  electric two-wheeler brand.
                </>
              }
              lede="YADEA has been building electric two-wheelers at scale for over a decade. In Pakistan, the range is distributed by Eiffel Industries Ltd. and supported through a nationwide 3S network."
            />
          </Reveal>

          <Reveal stagger className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-3">
            {brandPillars.map((p) => (
              <RevealItem key={p.title}>
                <div className="border-t border-line-2 pt-6">
                  <p className="label-tech text-electric">{p.kicker}</p>
                  <h3 className="display-sm mt-4">{p.title}</h3>
                  <p className="body-md mt-3">{p.body}</p>
                </div>
              </RevealItem>
            ))}
          </Reveal>

          <div className="mt-20">
            <ImpactSection />
          </div>
        </div>
      </section>

      {/* =================================================== 02 lineup */}
      <section id="lineup" className="section-y field-paper-2-veil">
        <div className="container-x">
          <Reveal>
            <SectionHead
              index="02"
              eyebrow="The line-up"
              title="Thirteen models. One standard."
              lede="From a PKR 174,000 city commuter to a PKR 1.4 million electric motorcycle. Every figure below is the one YADEA publishes — where the source is silent, it says so."
              action={
                <ButtonLink href="/models" trailing={<ArrowGlyph />}>
                  Compare all models
                </ButtonLink>
              }
            />
          </Reveal>

          <div className="mt-16">
            <LineupGrid models={models} />
          </div>

          <div className="mt-20">
            <PriceLadder models={models} />
          </div>
        </div>
      </section>

      {/* ================================================= 03 flagship */}
      <section className="section-y">
        <div className="container-x">
          <Reveal>
            <SectionHead
              index="03"
              eyebrow="Flagship"
              title={
                <>
                  The EPOC-H.
                  <br />
                  125&nbsp;km, once a charge.
                </>
              }
              lede="YADEA's global flagship: a 72V 38Ah graphene battery, an 11kW-class platform and a published 125 km of range — the longest in the Pakistan line-up."
              action={
                <ButtonLink href="/models/epoc-h" trailing={<ArrowGlyph />}>
                  See the EPOC-H
                </ButtonLink>
              }
            />
          </Reveal>

          <Reveal delay={0.1} className="mt-14">
            <div className="field-ice relative overflow-hidden rounded-card border border-line-2">
              <div className="relative mx-auto max-w-4xl px-6 py-14 sm:py-20">
                {/* eslint-disable-next-line @next/next/no-img-element -- local asset, not in the image optimiser allowlist */}
                <img
                  src="/img/epoc-h.png"
                  alt="YADEA EPOC-H electric motorcycle in profile"
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="mx-auto w-full max-w-2xl drop-shadow-[0_24px_34px_rgba(0,0,0,0.6)]"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =============================================== 04 technology */}
      <section id="technology" className="section-y field-paper-2-veil">
        <div className="container-x">
          <Reveal>
            <SectionHead
              index="04"
              eyebrow="TTFAR technology"
              title="Four parts, one system."
              lede="TTFAR integrates the battery, the energy-retrieving controller, the motor and the wheel so each one is tuned against the other three. That is where the range and the durability come from."
            />
          </Reveal>

          <div className="mt-16">
            <TtfarSection />
          </div>
        </div>
      </section>

      {/* ========================================= film · 02 engineering */}
      <Gt70ChapterBand
        id="technology"
        index="02"
        eyebrow="Engineering"
        title="Everything the GT70 does, and where it does it."
        lede="Battery, controller, motor and wheel are tuned as one system rather than four parts bought in sequence. The camera moves across the bodywork while that system is described — no cutaway, no invented components, and no numbers on screen."
        cta={{ href: "#technology", label: "How TTFAR works" }}
        align="end"
      />

      {/* ================================================= 05 charging */}
      <section className="section-y">
        <div className="container-x">
          <Reveal>
            <SectionHead
              index="05"
              eyebrow="Charging"
              title="The socket is the station."
              lede="No fast-charger network to find, no queue, no fuel stop. Every YADEA sold in Pakistan charges from a standard home socket, overnight."
            />
          </Reveal>

          <div className="mt-16">
            <ChargingSection />
          </div>
        </div>
      </section>

      {/* ============================================= 06 running cost */}
      <section id="running-cost" className="section-y field-aurora-veil">
        <div className="container-x">
          <Reveal>
            <SectionHead
              index="06"
              eyebrow="Running cost"
              title="What it actually costs to run."
              lede="This is the number that decides it. Move the sliders to your own commute — every assumption is shown next to the figure it produces, and YADEA's published comparison sits right underneath."
              action={
                <ButtonLink href="#financing" variant="outline" trailing={<ArrowGlyph />}>
                  Ways to pay
                </ButtonLink>
              }
            />
          </Reveal>

          <div className="mt-16">
            <CostCalculator />
          </div>

          <div className="mt-20">
            <MaintenanceTable />
          </div>
        </div>
      </section>

      {/* ================================================ 07 financing */}
      <section id="financing" className="section-y">
        <div className="container-x">
          <Reveal>
            <SectionHead
              index="07"
              eyebrow="Financing"
              title="0% markup, no down payment."
              lede="Bank Alfalah's Step-By-Step plan spreads the cost of a YADEA over 3 to 36 months, with 0% markup on the 3- and 6-month tenures."
            />
          </Reveal>

          <div className="mt-14">
            <InstallmentSelector />
          </div>

          <div className="mt-20">
            <FinancingDetail />
          </div>
        </div>
      </section>

      {/* ===================================================== 08 PAVE */}
      <section id="pave" className="section-y field-paper-2-veil">
        <div className="container-x">
          <Reveal>
            <SectionHead
              index="08"
              eyebrow="PAVE government scheme"
              title="PKR 50,000 off, through the government."
              lede="The Pakistan Accelerated Vehicle Electrification scheme subsidises qualifying electric two-wheelers. YADEA is sold through it by Eiffel Industries Ltd."
            />
          </Reveal>

          <div className="mt-14">
            <PavePriceTable />
          </div>

          <div className="mt-16">
            <PaveSteps />
          </div>

          <div className="mt-16">
            <PaveWarranty />
          </div>
        </div>
      </section>

      {/* ============================================= film · 03 urban */}
      <Gt70ChapterBand
        id="urban"
        index="03"
        eyebrow="Urban mobility"
        title="The size that makes sense in a city."
        lede="Protective bars, a rear cargo rack and a seat built for two are the reason this class exists. Filmed on an ordinary street in daylight, because that is where it spends its life."
        cta={{ href: "#dealers", label: "Find a dealer" }}
      />

      {/* =================================================== 09 dealers */}
      <section id="dealers" className="section-y">
        <div className="container-x">
          <Reveal>
            <SectionHead
              index="09"
              eyebrow="Dealers & 3S"
              title="Every store, every region."
              lede="Authorised YADEA stores from the published service-centre guide, searchable by city, store name or street. Phone numbers are reproduced exactly as published."
            />
          </Reveal>

          <div className="mt-14">
            <DealerFinder />
          </div>

          <div className="mt-16">
            <DealerCoverage />
          </div>
        </div>
      </section>

      {/* ================================================== 10 service */}
      <section id="ownership" className="section-y field-ice-veil">
        <div className="container-x">
          <Reveal>
            <SectionHead
              index="10"
              eyebrow="Ownership"
              title="The dealer who sold it can service it."
              lede="Sales, service and spare parts under one roof, run by technicians who have completed YADEA's certified training programme."
            />
          </Reveal>

          <div className="mt-16">
            <ServiceSection />
          </div>

          <div id="warranty" className="mt-20">
            <WarrantySection />
          </div>
        </div>
      </section>

      {/* ===================================================== 11 proof */}
      <section className="section-y">
        <div className="container-x">
          <Reveal>
            <SectionHead
              index="11"
              eyebrow="Why YADEA"
              title="Six reasons this brand is different."
            />
          </Reveal>
          <div className="mt-16">
            <ProofSection />
          </div>
        </div>
      </section>

      <ShowcaseBand />

      {/* =================================================== 12 journal */}
      <section id="journal" className="section-y field-paper-2-veil">
        <div className="container-x">
          <Reveal>
            <SectionHead
              index="12"
              eyebrow="Journal"
              title="Reviews, guides and policy."
              lede="Buying advice, ownership explainers and scheme news — the useful reading, not the marketing."
              action={
                <ButtonLink href="/news-events" variant="outline" trailing={<ArrowGlyph />}>
                  All stories
                </ButtonLink>
              }
            />
          </Reveal>
          <div className="mt-16">
            <JournalSection />
          </div>
        </div>
      </section>

      {/* ====================================================== 13 faq */}
      <section id="faq" className="section-y">
        <div className="container-x">
          <Reveal>
            <SectionHead
              index="13"
              eyebrow="Questions"
              title="Answered from the source."
              lede="Range, charging, battery chemistry, maintenance, financing, warranty and the PAVE scheme — answered with the figures YADEA publishes."
            />
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-12">
            {faqs.map((group) => (
              <div key={group.group} className="lg:col-span-6">
                <p className="label-tech mb-5 text-electric">{group.group}</p>
                <Accordion items={group.items} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================== 14 contact */}
      <section id="test-ride" className="section-y field-paper-2-veil">
        <div className="container-x">
          <Reveal>
            <SectionHead
              index="14"
              eyebrow="Contact & test ride"
              title="Talk to someone who can help."
              lede="YADEA Pakistan publishes no support phone number or email address, so this page routes you only through channels the company has actually published."
            />
          </Reveal>
          <div className="mt-14">
            <ContactSection />
          </div>
        </div>
      </section>

      {/* ============================================ film · 04 finale */}
      <Gt70FinalCta />

      <FaqSchema />
    </main>
  );
}
