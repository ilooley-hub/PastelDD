import type { Metadata } from "next"
import Link from "next/link"
import { formatDate, listArticles } from "@/lib/hq-articles"

// Re-checks HQ every minute (keep in step with REVALIDATE_SECONDS in lib/hq-articles).
export const revalidate = 60

const TITLE = "Blog · Pastel"
const DESCRIPTION =
  "Practical writing for finance teams and accounting firms: reporting, the close, client advisory, and where AI genuinely saves time."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: { type: "website", title: TITLE, description: DESCRIPTION, url: "/blog", images: ["/og-home.png"] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og-home.png"] },
}

export default async function BlogIndex() {
  const articles = await listArticles()
  return (
    <main>
      <header className="pb-wrap pb-hero">
        <span className="pb-eyebrow">Blog</span>
        <h1>Notes on running finance.</h1>
        <p className="pb-lede">{DESCRIPTION}</p>
      </header>

      <section className="pb-wrap">
        {articles.length === 0 ? (
          <div className="pb-empty">The first articles are on their way. Check back soon.</div>
        ) : (
          <div className="pb-list">
            {articles.map((a, i) => (
              <Link key={a.slug} href={`/blog/${a.slug}`} className={i === 0 ? "pb-card pb-featured" : "pb-card"}>
                {/* The picked image, or HQ's branded title card when none is picked. */}
                {a.coverUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="pb-card-img" src={a.coverUrl} alt="" loading={i === 0 ? "eager" : "lazy"} />
                )}
                <span className="pb-meta">
                  {formatDate(a.publishedAt)} · {a.readingMinutes} min read
                </span>
                <h2>{a.title}</h2>
                {a.description && <p>{a.description}</p>}
                <span className="pb-read">Read →</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
