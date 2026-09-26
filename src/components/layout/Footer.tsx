import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { storeCount } from "@/content/dealers";

/**
 * Site footer.
 *
 * This used to be the one deep-navy band on the site, with pale type on a
 * near-black gradient. That is exactly the black-background/white-text look the
 * brand rules forbid as a dominant surface, and at full width it dominated the
 * bottom of every page. It is now a warm-light band: a deeper ivory than the
 * sections above it, so the page still ends on a distinct plane, with dark ink
 * throughout. Navy is reserved for small sparing accents elsewhere.
 */
export function Footer() {
  const year = new Date().getFullYear();

  const columns = [
    {
      title: "Models",
      links: [
        { label: "All models", href: "#lineup" },
        { label: "Velax", href: "/models/velax" },
        { label: "M3H", href: "/models/m3h" },
        { label: "T5L", href: "/models/t5l" },
        { label: "GT70 Cyber", href: "/models/gt70-cyber" },
        { label: "EPOC-H", href: "/models/epoc-h" },
        { label: "Keeness", href: "/models/keeness" },
      ],
    },
    {
      title: "Own",
      links: [
        { label: "Running cost", href: "#running-cost" },
        { label: "Financing", href: "#financing" },
        { label: "PAVE scheme", href: "#pave" },
        { label: "Warranty", href: "#warranty" },
        { label: "Service & 3S", href: "#ownership" },
        { label: "Test ride", href: "#test-ride" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Our story", href: "#brand" },
        { label: "TTFAR technology", href: "#technology" },
        { label: "Find a dealer", href: "#dealers" },
        { label: "Journal", href: "#journal" },
        { label: "FAQs", href: "#faq" },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(170deg,#efe8dd_0%,#e7e0d5_52%,#e2dbd0_100%)] text-ink">
      {/* Warm bloom — a pale horizon glow, not an orange lamp on black */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[38rem] w-[80rem] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(235,95,27,0.10), rgba(255,138,61,0.06) 55%, transparent 78%)",
        }}
      />

      <div className="container-x relative">
        {/* Masthead */}
        <div className="grid gap-12 border-b border-line-2 py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-6">
            <p className="label-tech">Pakistan · since 2018</p>
            <p className="display-lg mt-6 max-w-[14ch] text-ink">
              Move on electricity.
            </p>
            <p className="body-md mt-6 max-w-[46ch] text-ink-2">
              YADEA electric two-wheelers are distributed in Pakistan by{" "}
              <span className="text-ink">{site.distributor}</span> and supported
              through a nationwide network of {storeCount} authorised 3S stores.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-6">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="label-tech">{col.title}</p>
                <ul className="mt-5 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="group inline-flex items-center gap-1.5 text-[0.875rem] text-ink-2 transition-colors duration-150 hover:text-ink"
                      >
                        {l.label}
                        <span className="translate-x-0 text-cyan opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden>
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Verified channels only — the source publishes no phone or email */}
        <div className="grid gap-8 border-b border-line-2 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Find a dealer", href: site.channels.dealerLocator, note: `${storeCount} stores listed` },
            { label: "Book a test ride", href: site.channels.testRide, note: "Ride before you buy" },
            { label: "Product support", href: site.channels.productSupport, note: "Reply within 48 business hours" },
            { label: "Become a dealer", href: site.channels.becomeDealer, note: "Join the network" },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-1.5 border-l border-line-2 pl-5 transition-colors duration-150 hover:border-cyan-soft"
            >
              <span className="flex items-center gap-1.5 text-[0.9375rem] font-medium text-ink">
                {c.label}
                <span className="text-cyan opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden>
                  ↗
                </span>
              </span>
              <span className="text-xs text-ink-3">{c.note}</span>
            </a>
          ))}
        </div>

        {/* Baseline */}
        <div className="flex flex-col gap-6 py-9 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3">
            <Image
              src="/img/logo.svg"
              alt="YADEA"
              width={140}
              height={38}
              className="h-8 w-auto"
            />
            <p className="text-xs text-ink-4">
              Distributed in Pakistan by {site.distributor}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href={site.channels.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.8125rem] text-ink-2 transition-colors hover:text-ink"
            >
              {site.channels.instagramHandle}
            </a>
            <Link href="#faq" className="text-[0.8125rem] text-ink-2 transition-colors hover:text-ink">
              FAQs
            </Link>
            <span className="text-[0.8125rem] text-ink-4">
              © {year} {site.legalName}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
