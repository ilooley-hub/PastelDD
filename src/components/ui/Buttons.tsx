import Link from "next/link"
import type { ReactNode } from "react"

// Halo gradient — the brandiest CTA. Reserve for the hero / closing block.
export function HaloCta({
  href = "#contact",
  children,
}: {
  href?: string
  children: ReactNode
}) {
  return (
    <Link
      href={href}
      className="bg-halo-linear inline-flex items-center px-[18px] h-[44px] rounded-md text-[14px] font-semibold tracking-[-0.005em] transition-[filter] hover:[filter:saturate(1.15)_brightness(1.02)]"
      style={{
        color: "#1A1228",
        boxShadow:
          "0 1px 2px rgba(20,19,28,0.06), inset 0 1px 0 rgba(255,255,255,0.5)",
      }}
    >
      {children}
    </Link>
  )
}

// Primary — dark on light, classic.
export function PrimaryCta({
  href = "#contact",
  children,
}: {
  href?: string
  children: ReactNode
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center px-4 h-[38px] rounded-md text-[13px] font-semibold tracking-[-0.005em] transition-colors hover:bg-[#2A2734]"
      style={{
        backgroundColor: "#14131C",
        color: "#F8F7F4",
        boxShadow:
          "0 1px 2px rgba(20,19,28,0.06), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {children}
    </Link>
  )
}

// Secondary — surface card with border.
export function SecondaryCta({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center px-4 h-[38px] rounded-md border text-[13px] font-semibold tracking-[-0.005em] transition-colors hover:bg-[#F1EFE9] hover:border-[#C7C3B6]"
      style={{
        backgroundColor: "#FFFFFF",
        color: "#14131C",
        borderColor: "#DEDBD2",
      }}
    >
      {children}
    </Link>
  )
}

// Ghost — text-only link with arrow.
export function GhostCta({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center text-[13px] font-semibold text-fg-2 transition-colors hover:text-fg-1"
    >
      {children}
    </Link>
  )
}
