import type { Metadata } from "next";
import { storiesByDate } from "@/content/editorial";
import { NewsIndex } from "@/components/news/NewsIndex";
import { SectionHead } from "@/components/ui/Editorial";
import { ButtonLink, ArrowGlyph } from "@/components/ui/Button";
import { site } from "@/content/site";

const title = "News & Events";
const description =
  "Reviews, buying guides, ownership explainers and policy coverage from the YADEA Pakistan " +
  "editorial feed — every entry links to the original article published on yadea.com.pk.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/news-events" },
  openGraph: {
    title: `${title} · YADEA Pakistan`,
    description,
    url: "/news-events",
    images: [{ url: "/img/official-hero.jpg", width: 1920, height: 1000 }],
  },
};

export default function NewsEventsPage() {
  return (
    <main id="main" className="pt-28 sm:pt-32">
      <section className="field-aurora pb-16">
        <div className="container-x">
          <SectionHead
            eyebrow={`${storiesByDate.length} stories`}
            title="News, guides and policy."
            lede="Buying advice, ownership explainers and scheme coverage from the YADEA Pakistan feed. Each summary links through to the full article on the brand's own site."
            action={
              <ButtonLink href="/models" variant="outline" trailing={<ArrowGlyph />}>
                Compare all models
              </ButtonLink>
            }
          />
        </div>
      </section>

      <section className="section-y bg-paper-2 pt-14">
        <div className="container-x">
          <NewsIndex stories={storiesByDate} />
        </div>
      </section>

      <section className="section-y border-t border-line-2">
        <div className="container-x">
          <p className="body-md max-w-[62ch]">
            Summaries and dates on this page are taken from the published listing. The full text of
            each article lives on the brand&rsquo;s site — follow the link on any story to read it
            there. For anything else,{" "}
            <a
              href={site.channels.productSupport}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink underline decoration-electric underline-offset-4 transition-colors hover:text-electric"
            >
              YADEA product support
            </a>{" "}
            replies within 48 business hours.
          </p>
        </div>
      </section>
    </main>
  );
}
