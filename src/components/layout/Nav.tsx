"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { SOLUTION_LINKS } from "@/lib/fixtures"
import { HaloCta } from "@/components/ui/Buttons"

const TOP_LINKS = [
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-[100] border-b transition-shadow ${
        scrolled ? "shadow-[0_1px_0_rgba(20,19,28,0.04)]" : ""
      }`}
      style={{
        backgroundColor: "rgba(248,247,244,0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderColor: "#ECEAE3",
      }}
    >
      <div className="flex items-center justify-between px-12 h-[96px]">
        <Link href="/" className="inline-flex items-center leading-none" aria-label="Pastel">
          <img
            src="/Pastel_Logo.svg"
            alt="Pastel"
            style={{ height: "5rem", width: "auto", display: "block" }}
          />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <div
            className="relative"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button
              className="px-3 py-2 rounded-[6px] text-[15px] font-medium text-fg-2 transition-colors hover:text-fg-1 hover:bg-surface-3"
              onClick={() => setSolutionsOpen((v) => !v)}
            >
              Built for
            </button>
            {solutionsOpen && (
              <div
                className="absolute left-1/2 top-full -translate-x-1/2 pt-2"
                style={{ minWidth: 220 }}
              >
                <div
                  className="overflow-hidden rounded-[10px] border"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#DEDBD2",
                    boxShadow: "0 8px 24px rgba(20,19,28,0.08)",
                  }}
                >
                  {SOLUTION_LINKS.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="block px-4 py-2.5 text-[14px] text-fg-2 transition-colors hover:bg-surface-3 hover:text-fg-1"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {[
            { label: "About", href: "#about" },
            { label: "Contact", href: "#contact" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-2 rounded-[6px] text-[15px] font-medium text-fg-2 transition-colors hover:text-fg-1 hover:bg-surface-3"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:inline-flex">
          <HaloCta href="#contact">Request access</HaloCta>
        </div>

        <button
          className="md:hidden text-fg-2 text-[12px] uppercase tracking-[0.12em]"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t md:hidden" style={{ borderColor: "#ECEAE3" }}>
          <div className="flex flex-col gap-1 px-12 py-4">
            {TOP_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="py-2 text-[15px] text-fg-2"
              >
                {l.label}
              </Link>
            ))}
            <div
              className="mt-2 pt-2 border-t"
              style={{ borderColor: "#ECEAE3" }}
            >
              <div className="text-[10px] uppercase tracking-[0.14em] text-fg-3 mb-2 font-semibold">
                Built for
              </div>
              {SOLUTION_LINKS.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-1.5 text-[15px] text-fg-2"
                >
                  {s.label}
                </Link>
              ))}
            </div>
            <div
              className="mt-3 inline-flex self-start"
              onClick={() => setMobileOpen(false)}
            >
              <HaloCta href="#contact">Request access</HaloCta>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
