import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { storyBySlug, storiesByDate, type Story } from "@/content/editorial";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { site } from "@/content/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return storiesByDate.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = storyBySlug.get(slug);
  if (!story) return { title: "Story not found" };

  return {
    title: story.title,
    description: story.excerpt,
    alternates: { canonical: `/news-events/${story.slug}` },
    openGraph: {
      type: "article",
      title: story.title,
      description: story.excerpt,
      url: `/news-events/${story.slug}`,
      publishedTime: story.iso,
      images: [{ url: story.image, width: 700, height: 700 }],
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description: story.excerpt,
      images: [story.image],
    },
  };
}

function relatedTo(story: Story, count = 3): Story[] {
  const others = storiesByDate.filter((s) => s.slug !== story.slug);
  const sameCategory = others.filter((s) => s.category === story.category);
  const rest = others.filter((s) => s.category !== story.category);
  return [...sameCategory, ...rest].slice(0, count);
}

function ArticleSchema({ story }: { story: Story }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: story.title,
    description: story.excerpt,
    image: [story.image],
    datePublished: story.iso,
    articleSection: story.category,
    inLanguage: "en-PK",
    isBasedOn: story.url,
    publisher: { "@type": "Organization", name: site.legalName },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function StoryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const story = storyBySlug.get(slug);
  if (!story) notFound();

  const related = relatedTo(story);

  return (
    <main id="main" className="pt-28 sm:pt-32">
      <article>
        <header className="field-aurora pb-14">
          <div className="container-x">
            <nav aria-label="Breadcrumb" className="mb-8">
              <TextLink href="/news-events">All news &amp; events</TextLink>
            </nav>

            <p className="label-tech">
              {story.category}
              <span className="mx-2 opacity-45" aria-hidden>
                /
              </span>
              <time dateTime={story.iso}>{story.date}</time>
            </p>

            <h1 className="display-lg mt-6 max-w-[20ch]">{story.title}</h1>

            <p className="body-lg mt-7 max-w-[58ch]">{story.excerpt}</p>
          </div>
        </header>

        <div className="section-y bg-paper-2 pt-14">
          <div className="container-x">
            <figure className="mx-auto max-w-3xl overflow-hidden rounded-card border border-line-2 bg-paper-3">
              {/* eslint-disable-next-line @next/next/no-img-element -- remote editorial image from the source site */}
              <img
                src={story.image}
                alt=""
                width={700}
                height={700}
                className="h-auto w-full object-cover"
              />
            </figure>

            <div className="mx-auto mt-12 max-w-3xl">
              <div className="rounded-card border border-line-2 bg-paper-2/70 p-6 sm:p-8">
                <p className="label-tech">Read the full article</p>
                <p className="body-md mt-4">
                  This page carries the published summary, category and date. The article itself is
                  published on the brand&rsquo;s own site, where it is kept up to date — follow the
                  link below to read it in full.
                </p>
                <div className="mt-7">
                  <ButtonLink href={story.url} external size="md" trailing={<span aria-hidden>↗</span>}>
                    Read on yadea.com.pk
                  </ButtonLink>
                </div>
                <p className="mt-5 break-words text-xs text-ink-4">{story.url}</p>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 ? (
          <section className="section-y border-t border-line-2">
            <div className="container-x">
              <p className="label-tech">More from the journal</p>
              <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <li key={r.slug} className="h-full">
                    <a href={`/news-events/${r.slug}`} className="group flex h-full flex-col">
                      <p className="label-tech text-electric">{r.category}</p>
                      <h2 className="display-sm mt-3 transition-colors duration-150 group-hover:text-electric">
                        {r.title}
                      </h2>
                      <p className="body-md mt-3 flex-1">{r.excerpt}</p>
                      <p className="mt-4 text-[0.8125rem] text-ink-4">
                        <time dateTime={r.iso}>{r.date}</time>
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}
      </article>

      <ArticleSchema story={story} />
    </main>
  );
}
