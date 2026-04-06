import Link from "next/link"
import { GlowDot } from "./visual-effects"

const productLinks = [
  { label: "Due Diligence", href: "/due-diligence" },
  { label: "Governance", href: "/governance" },
  { label: "Request Demo", href: "/contact" },
]

const companyLinks = [
  { label: "Contact", href: "/contact" },
]

export function Footer() {
  return (
    <footer className="relative border-t border-pastel-border/50 bg-base noise">
      {/* Subtle top glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[radial-gradient(ellipse,rgba(200,162,255,0.03)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Column 1: Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-0.5">
              <span className="font-heading text-xl tracking-tight text-white">
                pastel
              </span>
              <span className="relative flex h-1.5 w-1.5 mb-3">
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(200,162,255,0.8)]" />
              </span>
            </Link>
            <p className="mt-4 text-sm text-text-secondary leading-relaxed max-w-sm">
              AI-powered financial and operational due diligence for private
              equity firms and family offices. Institutional-grade briefs in 48
              hours.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-pastel-border bg-surface/50 px-3 py-1.5 text-[11px] text-text-tertiary">
              <GlowDot color="green" size="sm" />
              SOC 2 Compliant
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h4 className="text-[10px] font-medium uppercase tracking-[2.5px] text-text-tertiary mb-5">
              Product
            </h4>
            <ul className="space-y-3.5">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-[10px] font-medium uppercase tracking-[2.5px] text-text-tertiary mb-5">
              Company
            </h4>
            <ul className="space-y-3.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-16 flex flex-col gap-4 border-t border-pastel-border/40 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs text-text-tertiary/70">
            &copy; 2025 Pastel AI Ltd.
          </span>
          <div className="flex gap-6 text-xs text-text-tertiary/70">
            <Link
              href="#"
              className="transition-colors hover:text-text-secondary"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="transition-colors hover:text-text-secondary"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="transition-colors hover:text-text-secondary"
            >
              Security
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-text-secondary"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
