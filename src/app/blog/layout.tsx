import type { Metadata } from "next"
import Link from "next/link"
import { Schibsted_Grotesk } from "next/font/google"
import "./blog.css"

// The blog uses the same look as the static marketing pages (public/*.html):
// Schibsted Grotesk, paper background, the same nav and footer.
const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--pb-font",
  display: "swap",
})

export const metadata: Metadata = {
  icons: { icon: "/pastel-orb.png", apple: "/pastel-orb.png" },
}

const LINKS = [
  { href: "/platform", label: "Platform" },
  { href: "/firms", label: "For accounting firms" },
  { href: "/security", label: "Security" },
  { href: "/blog", label: "Blog" },
]

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`pb ${schibsted.variable}`}>
      <nav className="pb-nav">
        <div className="pb-wrap pb-nav-inner">
          <Link className="pb-lockup" href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/pastel-orb.png" alt="" width={38} height={38} />
            <span className="pb-wordmark">Pastel</span>
          </Link>
          <div className="pb-links">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>
          <a className="pb-login" href="https://app.getpastel.ai">
            Log in
          </a>
          <Link className="pb-btn" href="/book-a-demo">
            Book a demo
          </Link>
          <details className="pb-menu">
            <summary aria-label="Menu">
              <span />
              <span />
              <span />
            </summary>
            <div className="pb-menu-panel">
              {LINKS.map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
              <a href="https://app.getpastel.ai">Log in</a>
            </div>
          </details>
        </div>
      </nav>

      {children}

      <footer className="pb-footer">
        <div className="pb-wrap">
          <div className="pb-f-grid">
            <div>
              <Link className="pb-lockup" href="/">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/pastel-orb.png" alt="" width={34} height={34} />
                <span className="pb-wordmark" style={{ fontSize: 20 }}>
                  Pastel
                </span>
              </Link>
              <p className="pb-f-tag">Pastel. The autonomous finance department.</p>
            </div>
            <div>
              <h5>Product</h5>
              <Link href="/platform">Platform</Link>
              <Link href="/firms">For accounting firms</Link>
              <Link href="/security">Security</Link>
              <Link href="/due-diligence">Due diligence</Link>
              <Link href="/book-a-demo">Book a demo</Link>
            </div>
            <div>
              <h5>Company</h5>
              <Link href="/blog">Blog</Link>
              <Link href="/book-a-demo">Contact</Link>
            </div>
            <div>
              <h5>Legal</h5>
              <Link href="/privacy">Privacy policy</Link>
              <Link href="/terms">Terms of service</Link>
            </div>
          </div>
          <div className="pb-fine">© {new Date().getFullYear()} Pastel. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
