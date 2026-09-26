import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink, ArrowGlyph } from "@/components/ui/Button";
import { LabelledRule } from "@/components/ui/Editorial";

/**
 * GT70 film chapters.
 *
 * These sections deliberately own no video of their own. The single page-wide
 * backdrop in `Gt70ScrollBackdrop` carries the GT70 footage from just under the
 * hero to the footer, scrubbed by page progress, so the bike is continuously
 * present behind the whole narrative. Giving a chapter its own clip as well
 * would put a second decoder on screen and break that continuity, so the
 * chapters are content surfaces laid over the shared film instead.
 *
 * Copy sits on the wash the backdrop already provides, which is why these
 * sections do not need a background of their own.
 */

/* ------------------------------------------------------------- 01 reveal */

export function Gt70Reveal() {
  return (
    <section
      id="gt70"
      aria-labelledby="gt70-reveal-title"
      className="relative section-y"
    >
      <div className="container-x">
        <Reveal>
          <p className="label-tech text-electric">The GT70</p>
          <h2 id="gt70-reveal-title" className="display-lg mt-5 max-w-[16ch] text-ink">
            Built to be looked at.
          </h2>
          <p className="body-lg mt-6 max-w-[46ch] text-ink-2">
            Starry Black, with the orange graphics that make it recognisable from across a
            car park. The film behind this page moves as you scroll.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/gt70" trailing={<ArrowGlyph />}>
              Explore the GT70
            </ButtonLink>
            <ButtonLink href="#test-ride" variant="outline">
              Book a test ride
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- 02 band */

type ChapterBandProps = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  lede: string;
  cta?: { href: string; label: string };
  /** Where the copy sits in the frame. */
  align?: "start" | "end";
};

export function Gt70ChapterBand({
  id,
  index,
  eyebrow,
  title,
  lede,
  cta,
  align = "start",
}: ChapterBandProps) {
  return (
    <section aria-labelledby={`${id}-title`} className="relative section-y">
      <div className="container-x">
        <Reveal className={align === "end" ? "ml-auto max-w-[46rem] text-right" : "max-w-[46rem]"}>
          <div className={align === "end" ? "flex justify-end" : undefined}>
            <LabelledRule label={`${index} · ${eyebrow}`} />
          </div>
          <h2 id={`${id}-title`} className="display-md mt-6 text-ink">
            {title}
          </h2>
          <p className="body-lg mt-5 text-ink-2">{lede}</p>
          {cta ? (
            <div className={`mt-8 flex flex-wrap gap-3 ${align === "end" ? "justify-end" : ""}`}>
              <ButtonLink href={cta.href} trailing={<ArrowGlyph />}>
                {cta.label}
              </ButtonLink>
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- 03 final cta */

export function Gt70FinalCta() {
  return (
    <section aria-labelledby="gt70-final-title" className="relative section-y">
      <div className="container-x text-center">
        <Reveal>
          <p className="label-tech text-electric">YADEA GT70</p>
          <h2 id="gt70-final-title" className="display-lg mx-auto mt-6 max-w-[18ch] text-ink">
            Ride it before you buy it.
          </h2>
          <p className="body-lg mx-auto mt-6 max-w-[44ch] text-ink-2">
            The only way to judge a scooter this size is to sit on it. YADEA Pakistan publishes no
            support phone number, so test rides run through the channels the company has actually
            published.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink href="#test-ride" size="lg" trailing={<ArrowGlyph />}>
              Book a test ride
            </ButtonLink>
            <ButtonLink href="/gt70" variant="outline" size="lg">
              See the GT70
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
