import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { ArrowGlyph, ButtonLink } from "@/components/ui/Button";
import { SectionHead } from "@/components/ui/Editorial";

/* Official YADEA campaign photography, served from the brand's own site. */
const showcase = [
  {
    src: "/img/official-keeness.webp",
    alt: "YADEA Keeness electric motorcycle",
    label: "Keeness",
    note: "Mid-drive, 17-inch",
    href: "/models/keeness",
  },
  {
    src: "/img/official-velax.webp",
    alt: "YADEA Velax electric scooter",
    label: "Velax",
    note: "62 km/h, 66 km",
    href: "/models/velax",
  },
  {
    src: "/img/official-epoc.webp",
    alt: "YADEA EPOC-H electric scooter",
    label: "EPOC-H",
    note: "125 km range",
    href: "/models/epoc-h",
  },
  {
    src: "/img/official-t5l.webp",
    alt: "YADEA T5L family electric scooter",
    label: "T5L",
    note: "Seats three",
    href: "/models/t5l",
  },
  {
    src: "/img/official-ruibin.jpg",
    alt: "YADEA Ruibin electric scooter",
    label: "Ruibin S",
    note: "72V 25Ah graphene",
    href: "/models/ruibin-s",
  },
] as const;

export function ShowcaseBand() {
  return (
    <section className="section-y overflow-hidden field-paper-2-veil">
      <div className="container-x">
        <Reveal>
          <SectionHead
            eyebrow="Official photography"
            title="The range, as YADEA pictures it."
            lede="Campaign images published by the brand, linked to the model each one shows."
            action={
              <ButtonLink href="/models" variant="outline" trailing={<ArrowGlyph />}>
                Compare all models
              </ButtonLink>
            }
          />
        </Reveal>

        <Reveal stagger className="mt-14">
          <ul className="grid grid-cols-2 gap-3 lg:grid-cols-6">
            {showcase.map((s, i) => (
              <RevealItem
                as="li"
                key={s.src}
                className={
                  i === 0
                    ? "col-span-2 aspect-[4/3] lg:col-span-4"
                    : "col-span-1 aspect-[4/3] lg:col-span-2"
                }
              >
                <Link
                  href={s.href}
                  className="group relative block h-full w-full overflow-hidden rounded-card border border-line-2 bg-paper-3"
                >
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    loading="lazy"
                    sizes={
                      i === 0
                        ? "(min-width: 1024px) 60vw, 100vw"
                        : "(min-width: 1024px) 30vw, 50vw"
                    }
                    className="object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-scrim/90 via-scrim/10 to-transparent"
                  />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                    <span>
                      <span className="display-sm block text-[1.0625rem] text-white">
                        {s.label}
                      </span>
                      <span className="mt-1 block text-xs text-white/70">{s.note}</span>
                    </span>
                    <span className="shrink-0 text-cyan-soft transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>
                      →
                    </span>
                  </span>
                </Link>
              </RevealItem>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
