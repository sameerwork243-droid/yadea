import Image from "next/image";
import { impactItems, ttfarMetrics, ttfarStages } from "@/content/site";
import { chargeTimes } from "@/content/models";
import { threeS, warrantyTiers, warrantyNote, proofPoints } from "@/content/ownership";
import { site } from "@/content/site";
import { featuredStory, secondaryStories } from "@/content/editorial";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { ArrowGlyph, ButtonLink, TextLink } from "@/components/ui/Button";
import { LabelledRule, Stat } from "@/components/ui/Editorial";

/* =========================================================== technology */

export function TtfarSection() {
  return (
    <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
      {/* metrics */}
      <Reveal className="lg:col-span-4" stagger>
        <div className="grid grid-cols-2 gap-x-8 gap-y-10">
          {ttfarMetrics.map((m) => (
            <RevealItem key={m.label}>
              <Stat value={m.value} label={m.label} note={m.detail} size="sm" />
            </RevealItem>
          ))}
        </div>
        <p className="mt-10 text-xs leading-relaxed text-ink-4">
          Figures as published by YADEA on yadea.com.pk. Performance varies by model, load,
          terrain and riding mode.
        </p>
      </Reveal>

      {/* stages */}
      <Reveal as="ol" stagger className="border-t border-line-2 lg:col-span-8">
        {ttfarStages.map((s) => (
          <RevealItem as="li" key={s.id} className="group grid gap-5 border-b border-line-2 py-8 sm:grid-cols-12 sm:gap-8">
            <div className="sm:col-span-3">
              <p className="label-tech text-electric">{s.index}</p>
              <h3 className="display-sm mt-3">{s.name}</h3>
              <p className="mt-1.5 text-xs text-ink-4">{s.role}</p>
            </div>
            <div className="sm:col-span-6">
              <p className="text-[0.9375rem] leading-relaxed text-ink-2">{s.detail}</p>
            </div>
            <div className="sm:col-span-3">
              <ul className="flex flex-wrap gap-1.5">
                {s.figures.map((f) => (
                  <li
                    key={f}
                    className="rounded-full border border-line-2 bg-paper-2/70 px-2.5 py-1 text-[0.6875rem] tabular-nums text-ink-2"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
        ))}
      </Reveal>
    </div>
  );
}

/* ============================================================= charging */

export function ChargingSection() {
  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <Reveal className="lg:col-span-5">
        <div className="relative overflow-hidden rounded-card">
          <Image
            src="/img/life/rider.jpg"
            alt="YADEA electric scooter rider in motion on a city road"
            width={1200}
            height={800}
            sizes="(max-width: 1024px) 92vw, 42vw"
            className="h-full w-full object-cover"
          />
        </div>
      </Reveal>

      <Reveal className="lg:col-span-7" delay={0.08}>
        <p className="body-lg max-w-[48ch]">
          Every YADEA in Pakistan charges from a standard home socket. No fast-charger
          network, no queue at a fuel station, no dedicated parking bay — the outlet you
          already have is the station.
        </p>

        <div className="mt-10">
          <LabelledRule label="Published charge times" />
          <ul className="mt-6 divide-y divide-line-2">
            {chargeTimes.map((c) => (
              <li key={c.slug} className="flex items-baseline justify-between gap-6 py-3">
                <span className="text-[0.875rem] text-ink-2">
                  {c.name}
                  <span className="ml-2 text-xs text-ink-4">{c.battery}</span>
                </span>
                <span className="num-hero shrink-0 text-[0.9375rem] text-ink">{c.time}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs leading-relaxed text-ink-4">
            T5, M3, Ruibin, GT70 Cyber, Ruibin L and G5 do not appear because yadea.com.pk
            publishes no charge time for them.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="#running-cost" size="md" trailing={<ArrowGlyph />}>
            Work out your own cost
          </ButtonLink>
          <ButtonLink href="/news-events/charging-time-explained" variant="outline" size="md">
            Read the charging guide
          </ButtonLink>
        </div>
      </Reveal>
    </div>
  );
}

/* =============================================================== impact */

export function ImpactSection() {
  return (
    <Reveal stagger className="grid gap-8 md:grid-cols-3">
      {impactItems.map((item) => (
        <RevealItem key={item.title}>
          <div className="border-t border-line-2 pt-6">
            <h3 className="display-sm">{item.title}</h3>
            <p className="body-md mt-3">{item.body}</p>
          </div>
        </RevealItem>
      ))}
    </Reveal>
  );
}

/* ============================================================== 3S / care */

export function ServiceSection() {
  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <Reveal className="lg:col-span-5">
        <p className="display-md">{threeS.title}</p>
        <p className="body-lg mt-6 max-w-[44ch]">{threeS.body}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={site.channels.dealerLocator} external size="md" trailing={<ArrowGlyph />}>
            Find a 3S store
          </ButtonLink>
          <ButtonLink href={site.channels.productSupport} external variant="outline" size="md">
            Product support
          </ButtonLink>
        </div>
      </Reveal>

      <Reveal
        as="ol"
        stagger
        className="grid gap-px overflow-hidden rounded-card border border-line-2 bg-line-2 sm:grid-cols-3 lg:col-span-7"
        delay={0.08}
      >
        {threeS.pillars.map((p) => (
          <RevealItem as="li" key={p.code + p.title} className="flex h-full flex-col bg-paper-2/80 p-6">
            <span className="grid size-9 place-items-center rounded-[0.7rem] bg-electric/10 num-hero text-[0.9375rem] text-electric">
              {p.code}
            </span>
            <h3 className="display-sm mt-5 text-[1.125rem]">{p.title}</h3>
            <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-2">{p.body}</p>
          </RevealItem>
        ))}
      </Reveal>
      <p className="mt-5 text-xs text-ink-4 lg:col-span-7 lg:col-start-6">
        {threeS.support.productSupport}
      </p>
    </div>
  );
}

/* ============================================================== warranty */

export function WarrantySection() {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-3">
        {warrantyTiers.map((w) => (
          <div
            key={w.scope + w.title}
            className={`rounded-card border p-6 sm:p-7 ${
              w.emphasis ? "border-electric/25 bg-ice/50" : "border-line-2 bg-paper-2/60"
            }`}
          >
            <p className={`num-hero text-[1.5rem] leading-none ${w.emphasis ? "text-electric" : "text-ink"}`}>
              {w.scope}
            </p>
            <p className="mt-3 text-[0.9375rem] font-medium text-ink">{w.title}</p>
            <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-ink-2">{w.body}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {w.models.map((m) => (
                <li
                  key={m}
                  className="rounded-full border border-line-2 bg-paper-2/70 px-2.5 py-1 text-[0.6875rem] text-ink-2"
                >
                  {m}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-6 max-w-[70ch] text-xs leading-relaxed text-ink-4">{warrantyNote}</p>
    </div>
  );
}

/* ================================================================ proof */

export function ProofSection() {
  return (
    <Reveal stagger className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {proofPoints.map((p) => (
        <RevealItem key={p.title}>
          <div className="border-t border-line-2 pt-6">
            <h3 className="display-sm">{p.title}</h3>
            <p className="body-md mt-3">{p.body}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {p.figures.map((f) => (
                <li key={f} className="label-tech text-electric">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </RevealItem>
      ))}
    </Reveal>
  );
}

/* ============================================================== journal */

export function JournalSection() {
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      {/* featured */}
      <Reveal className="lg:col-span-5">
        <a
          href={`/news-events/${featuredStory.slug}`}
          className="group block"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-line-2 bg-paper-2">
            {/* eslint-disable-next-line @next/next/no-img-element -- remote editorial thumbnail */}
            <img
              src={featuredStory.image}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
            />
          </div>
          <p className="label-tech mt-5 text-electric">{featuredStory.category}</p>
          <h3 className="display-sm mt-3 transition-colors duration-150 group-hover:text-electric">
            {featuredStory.title}
          </h3>
          <p className="body-md mt-3">{featuredStory.excerpt}</p>
          <p className="mt-4 flex items-center gap-2 text-[0.8125rem] text-ink-4">
            <time dateTime={featuredStory.iso}>{featuredStory.date}</time>
            <span aria-hidden>·</span>
            <span className="font-medium text-ink transition-colors group-hover:text-electric">
              Read the review <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </span>
          </p>
        </a>
      </Reveal>

      {/* list */}
      <Reveal as="ul" stagger className="divide-y divide-line-2 border-t border-line-2 lg:col-span-7" delay={0.06}>
        {secondaryStories.slice(0, 6).map((s) => (
          <RevealItem as="li" key={s.slug}>
            <a
              href={`/news-events/${s.slug}`}
              className="group grid gap-2 py-5 sm:grid-cols-12 sm:items-baseline sm:gap-6"
            >
              <span className="label-tech sm:col-span-2">{s.category}</span>
              <span className="sm:col-span-8">
                <span className="block text-[0.9375rem] font-medium leading-snug text-ink transition-colors duration-150 group-hover:text-electric">
                  {s.title}
                </span>
                <span className="mt-1.5 block text-[0.8125rem] leading-relaxed text-ink-3">
                  {s.excerpt}
                </span>
              </span>
              <time
                dateTime={s.iso}
                className="text-xs tabular-nums text-ink-4 sm:col-span-2 sm:text-right"
              >
                {s.date}
              </time>
            </a>
          </RevealItem>
        ))}
      </Reveal>
      <div className="lg:col-span-7">
        <ButtonLink href="/news-events" variant="outline" size="md" trailing={<ArrowGlyph />} className="mt-8">
          All news &amp; events
        </ButtonLink>
      </div>
    </div>
  );
}

/* ============================================================== contact */

export function ContactSection() {
  const channels = [
    {
      title: "Find a dealer",
      body: "The fastest route to a test ride, a price check or a service booking. Every confirmed 3S store is listed with its published phone number.",
      href: site.channels.dealerLocator,
      cta: "Open the locator",
    },
    {
      title: "Book a test ride",
      body: "Sit on the scooter before you commit. YADEA's test ride form routes you to the nearest participating store.",
      href: site.channels.testRide,
      cta: "Request a ride",
    },
    {
      title: "Service & warranty",
      body: "Support for an existing YADEA, including warranty assistance and product queries answered within a maximum of 48 business hours.",
      href: site.channels.serviceSupport,
      cta: "Get support",
    },
    {
      title: "Become a dealer",
      body: "YADEA is expanding its 3S network in Pakistan. Retail partners can download the dealership form and apply directly.",
      href: site.channels.becomeDealer,
      cta: "Apply to join",
    },
  ];

  return (
    <div>
      <div className="grid gap-px overflow-hidden rounded-card border border-line-2 bg-line-2 sm:grid-cols-2">
        {channels.map((c) => (
          <a
            key={c.title}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col bg-paper-2/80 p-6 transition-colors duration-200 hover:bg-paper-3 sm:p-8"
          >
            <h3 className="display-sm transition-colors duration-150 group-hover:text-electric">
              {c.title}
            </h3>
            <p className="body-md mt-3 flex-1">{c.body}</p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink">
              {c.cta}
              <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>
                ↗
              </span>
            </span>
          </a>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-5 border-t border-line-2 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="label-tech">Social</p>
          <TextLink href={site.channels.instagram} external className="mt-2.5 block">
            {site.channels.instagramHandle}
          </TextLink>
        </div>
        <p className="max-w-[46ch] text-xs leading-relaxed text-ink-4">
          YADEA Pakistan does not publish a support phone number, email address or office
          address on its website, so none is shown here. The channels above are the
          published, verified ways to reach the company.
        </p>
      </div>
    </div>
  );
}
