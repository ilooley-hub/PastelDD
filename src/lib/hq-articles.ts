// Blog articles live in Pastel HQ (written there, published with one click).
// The site reads them from HQ's public feed, which only ever returns published
// articles. Pages re-check every 5 minutes, so publishing or unpublishing in
// HQ shows up here without a redeploy.

const HQ_URL = (process.env.PASTEL_HQ_URL ?? "https://sdr.pastelai.tech").replace(/\/+$/, "")
export const REVALIDATE_SECONDS = 300

export type ArticleSummary = {
  slug: string
  title: string
  description: string | null
  keyword: string | null
  readingMinutes: number
  publishedAt: string | null
  updatedAt: string
}

export type Article = ArticleSummary & {
  /** Rendered by HQ from Markdown; HQ escapes everything first, so it holds no raw HTML from a draft. */
  html: string
  sources: { url: string; title?: string | null }[]
}

async function getJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${HQ_URL}${path}`, { next: { revalidate: REVALIDATE_SECONDS } })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    // HQ unreachable: show the empty state rather than breaking the site.
    return null
  }
}

export async function listArticles(): Promise<ArticleSummary[]> {
  const data = await getJson<{ articles?: ArticleSummary[] }>("/api/public/articles")
  return Array.isArray(data?.articles) ? data.articles : []
}

export async function getArticle(slug: string): Promise<Article | null> {
  if (!/^[a-z0-9-]{1,120}$/.test(slug)) return null
  return getJson<Article>(`/api/public/articles/${slug}`)
}

export function formatDate(iso: string | null) {
  if (!iso) return ""
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })
}
