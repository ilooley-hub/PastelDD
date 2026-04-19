import Link from "next/link"
import { PastelLogo } from "./pastel-logo"
import { GlowDot } from "./visual-effects"

const productLinks = [
  { label: "Due Diligence", href: "/#dd" },
  { label: "Governance", href: "/governance" },
  { label: "Request Demo", href: "#contact" },
]

export function Footer() {
  return (
    <footer className="relative border-t border-pastel-border bg-base">
      {/* Soft top glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[260px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(200,162,255,0.22) 0%, rgba(255,184,217,0.10) 40%, transparent 75%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <PastelLogo size={36} />
            <p className="mt-5 text-sm text-text-secondary leading-relaxed max-w-sm">
              AI-powered financial and operational due diligence for private
              equity firms and family offices. Institutional-grade briefs in 48
              hours.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-pastel-border bg-surface px-3 py-1.5 text-[11px] text-text-secondary font-medium">
              <GlowDot color="green" size="sm" />
              SOC 2 Compliant
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[2.5px] text-text-tertiary mb-5">
              Product
            </h4>
            <ul className="space-y-3.5">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[2.5px] text-text-tertiary mb-5">
              Legal
            </h4>
            <ul className="space-y-3.5">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/security"
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-16 flex flex-col gap-4 border-t border-pastel-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs text-text-tertiary">
            &copy; 2026 Pastel AI Ltd.
          </span>
          <span className="text-xs text-text-tertiary">
            getpastel.ai
          </span>
        </div>
      </div>
    </footer>
  )
}
