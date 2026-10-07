import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { formatDate, getArticle, REVALIDATE_SECONDS } from "@/lib/hq-articles"

export const revalidate = REVALIDATE_SECONDS
// Articles are built on first visit, then refreshed every 5 minutes.
export const dynamicParams = true
export function generateStaticParams() {
  return []
}

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = await getArticle(params.slug)
  if (!a) return { title: "Not found · Pastel" }
  const title = `${a.title} · Pastel`
  const description = a.description ?? undefined
  const url = `/blog/${a.slug}`
  return {
    title,
    description,
    keywords: a.keyword ? [a.keyword] : undefined,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: a.title,
      description,
      url,
      publishedTime: a.publishedAt ?? undefined,
      modifiedTime: a.updatedAt,
      images: ["/og-home.png"],
    },
    twitter: { card: "summary_large_image", title: a.title, description, images: ["/og-home.png"] },
  }
}

export default async function ArticlePage({ params }: Props) {
  const a = await getArticle(params.slug)
  if (!a) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.title,
    description: a.description ?? undefined,
    datePublished: a.publishedAt ?? undefined,
    dateModified: a.updatedAt,
    mainEntityOfPage: `https://getpastel.ai/blog/${a.slug}`,
    image: "https://getpastel.ai/og-home.png",
    author: { "@type": "Organization", name: "Pastel", url: "https://getpastel.ai" },
    publisher: { "@type": "Organization", name: "Pastel", logo: { "@type": "ImageObject", url: "https://getpastel.ai/pastel-orb.png" } },
  }

  return (
    <main className="pb-wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <header className="pb-article-head">
        <Link href="/blog" className="pb-back">
          ← All articles
        </Link>
        <h1 style={{ marginTop: 22 }}>{a.title}</h1>
        {a.description && <p className="pb-lede">{a.description}</p>}
        <p className="pb-meta" style={{ marginTop: 18 }}>
          {formatDate(a.publishedAt)} · {a.readingMinutes} min read
        </p>
      </header>

      {/* HQ turns Markdown into HTML after escaping everything, so this holds no raw HTML from a draft. */}
      <article className="pb-prose" dangerouslySetInnerHTML={{ __html: a.html }} />

      {a.sources.length > 0 && (
        <aside className="pb-sources">
          <h5>Sources</h5>
          <ul>
            {a.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener nofollow">
                  {s.title || s.url}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      )}

      <aside className="pb-cta">
        <div>
          <h3>See Pastel on your own numbers.</h3>
          <p>A short walkthrough of the agents doing the reporting, the close and the client questions.</p>
        </div>
        <Link className="pb-btn" href="/book-a-demo">
          Book a demo
        </Link>
      </aside>
    </main>
  )
}
