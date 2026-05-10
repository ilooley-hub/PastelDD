import Link from "next/link"
import { HaloCta } from "@/components/ui/Buttons"

const PASTEL_FOR = [
  { label: "Due diligence", href: "/due-diligence" },
  { label: "Fractional CFOs", href: "/fractional-cfo" },
  { label: "Governance", href: "/governance" },
  { label: "Audit & compliance", href: "/governance" },
  { label: "M&A buyers", href: "/due-diligence" },
]

const COMPANY = [
  { label: "Contact", href: "#contact" },
  { label: "Security", href: "/security" },
  { label: "hello@getpastel.ai", href: "mailto:hello@getpastel.ai" },
]

const LEGAL = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
]

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div>
      <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-fg-3">
        {title}
      </div>
      <ul className="flex flex-col gap-2.5">
        {links.map((l) => {
          const external = l.href.startsWith("mailto:")
          return (
            <li key={l.label}>
              {external ? (
                <a
                  href={l.href}
                  className="text-[14px] text-fg-2 transition-colors hover:text-fg-1"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  href={l.href}
                  className="text-[14px] text-fg-2 transition-colors hover:text-fg-1"
                >
                  {l.label}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer
      className="border-t"
      style={{ backgroundColor: "#FBFAF6", borderColor: "#ECEAE3" }}
    >
      {/* Hairline halo gradient at top edge */}
      <div
        aria-hidden
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, rgba(123,91,214,0.35) 30%, rgba(80,199,250,0.35) 50%, rgba(255,211,176,0.35) 70%, transparent 100%)",
        }}
      />

      <div className="px-12 pb-10 pt-14">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-10">
          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <Link href="/" aria-label="Pastel" className="inline-flex">
              <img
                src="/Pastel_Logo.svg"
                alt="Pastel"
                style={{ height: "5rem", width: "auto", display: "block" }}
              />
            </Link>
            <p
              className="max-w-[320px] text-[15px] leading-[1.55] text-fg-2"
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontWeight: 500,
              }}
            >
              The truth layer for finance. Every figure traceable to its
              source.
            </p>
            <div className="inline-flex w-fit">
              <HaloCta href="#contact">Request access</HaloCta>
            </div>
          </div>

          <FooterColumn title="Pastel for" links={PASTEL_FOR} />
          <FooterColumn title="Company" links={COMPANY} />
          <FooterColumn title="Legal" links={LEGAL} />
        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 flex flex-col items-start gap-3 border-t pt-6 md:flex-row md:items-center md:justify-between"
          style={{ borderColor: "#ECEAE3" }}
        >
          <div className="text-[12px] text-fg-3">
            © {new Date().getFullYear()} Pastel. All rights reserved.
          </div>
          <div className="text-[12px] text-fg-3">
            Built for finance teams who don&apos;t accept guesses.
          </div>
        </div>
      </div>
    </footer>
  )
}
