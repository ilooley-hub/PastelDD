"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { PastelLogo } from "./pastel-logo"
import { IconArrowRight } from "./icons"

const navItems = [{ label: "Governance", href: "/governance" }]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-base/75 backdrop-blur-xl border-b border-pastel-border/70"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo - wordmark hidden on narrow screens */}
          <Link href="/" className="group inline-flex items-center shrink-0">
            <PastelLogo size={36} className="hidden sm:inline-flex" />
            <PastelLogo size={36} showWordmark={false} className="sm:hidden" />
          </Link>

          {/* Right side: nav links + CTA */}
          <div className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative px-3 sm:px-4 py-2 text-sm text-text-secondary transition-colors duration-200 hover:text-text-primary group"
              >
                {item.label}
                <span className="absolute bottom-1 left-3 right-3 sm:left-4 sm:right-4 h-px bg-accent scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
              </Link>
            ))}
            <Link
              href="/#contact"
              className="group magnetic flex items-center gap-1.5 rounded-full bg-text-primary px-4 sm:px-5 py-2 sm:py-2.5 text-[13px] sm:text-sm font-medium text-white transition-all duration-300 hover:bg-accent hover:text-white hover:shadow-pastel sm:ml-2"
            >
              Request Demo
              <IconArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
