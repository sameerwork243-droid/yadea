import type { MetadataRoute } from "next";
import { models } from "@/content/models";
import { storiesByDate } from "@/content/editorial";
import { site } from "@/content/site";

/**
 * Only routes that actually exist on this origin are listed. Each news
 * summary has a local page, and each of those links through to the full
 * article on the source site.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.channels.sourceSite.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/gt70", priority: 0.9, freq: "weekly" },
    { path: "/models", priority: 0.9, freq: "weekly" },
    { path: "/news-events", priority: 0.7, freq: "weekly" },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${base}${r.path}`,
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...models.map((m) => ({
      url: `${base}/models/${m.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...storiesByDate.map((s) => ({
      url: `${base}/news-events/${s.slug}`,
      lastModified: new Date(s.iso),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
