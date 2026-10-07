import type { MetadataRoute } from "next"
import { listArticles } from "@/lib/hq-articles"

// Served at /blog/sitemap.xml and listed in robots.txt next to the main sitemap.
export const revalidate = 300

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await listArticles()
  return [
    { url: "https://getpastel.ai/blog", changeFrequency: "weekly", priority: 0.7 },
    ...articles.map((a) => ({
      url: `https://getpastel.ai/blog/${a.slug}`,
      lastModified: a.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]
}
