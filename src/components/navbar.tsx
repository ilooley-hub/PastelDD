"use client"

import { useState, useEffect } from "react"
import { Menu, X, ArrowRight } from "lucide-react"
import Link from "next/link"

const navItems = [
  { label: "Due Diligence", href: "/due-diligence" },
  { label: "Governance", href: "/governance" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-base/80 backdrop-blur-xl border-b border-pastel-border/50"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-0.5 group">
              <span className="font-heading text-xl tracking-tight text-white">
                pastel
              </span>
              <span className="relative flex h-1.5 w-1.5 mb-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(200,162,255,0.8)]" />
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative px-4 py-2 text-sm text-text-secondary transition-colors duration-200 hover:text-white group"
                >
                  {item.label}
                  <span className="absolute bottom-1 left-4 right-4 h-px bg-accent scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
                </Link>
              ))}
            </div>

            {/* Right side CTA */}
            <div className="hidden md:flex md:items-center md:gap-4">
              <Link
                href="/contact"
                className="group flex items-center gap-1.5 rounded-full bg-accent px-5 py-2 text-sm font-medium text-base transition-all duration-300 hover:bg-[#D4B3FF] hover:shadow-[0_0_20px_rgba(200,162,255,0.3)]"
              >
                Request Demo
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg text-text-secondary transition-colors hover:text-white md:hidden"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-base/90 backdrop-blur-xl transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile menu panel */}
      <div
        className={`fixed top-0 right-0 z-40 h-full w-[280px] bg-surface border-l border-pastel-border/50 transition-transform duration-300 ease-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-20 px-6">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="group flex items-center justify-between py-3 text-lg text-text-secondary transition-colors hover:text-white border-b border-pastel-border/50"
              >
                {item.label}
                <ArrowRight className="h-4 w-4 text-text-tertiary transition-all duration-200 group-hover:text-accent group-hover:translate-x-1" />
              </Link>
            ))}
          </nav>

          <div className="mt-8">
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-medium text-[#08080C] transition-all duration-300 hover:bg-[#D4B3FF]"
            >
              Request Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-auto pb-8">
            <span className="font-heading text-sm text-text-tertiary">
              pastel
            </span>
            <p className="mt-2 text-xs text-text-tertiary">
              AI-powered due diligence for PE
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
