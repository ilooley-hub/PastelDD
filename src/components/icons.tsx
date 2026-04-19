/**
 * Pastel custom icon system.
 *
 * Design language: 1.5px stroke, rounded caps and joins, 24×24 viewBox,
 * and a small accent dot in lavender (#7C3AED) on most marks. Built to feel
 * like a coherent set rather than a Lucide grab-bag.
 */

import * as React from "react"

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number
}

function Base({
  size = 20,
  children,
  className = "",
  ...rest
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      {children}
    </svg>
  )
}

const ACCENT = "#7C3AED"

/* ─── Document / Brief ─── */
export function IconBrief(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5.5 3.5h9l4 4v13H5.5z" />
      <path d="M14.5 3.5v4h4" />
      <path d="M8.5 12h7" />
      <path d="M8.5 15.5h7" />
      <path d="M8.5 19h4" />
      <circle cx="17" cy="18.5" r="1.4" fill={ACCENT} stroke="none" />
    </Base>
  )
}

/* ─── Sparkles / AI ─── */
export function IconSpark(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3.5l1.6 4.4 4.4 1.6-4.4 1.6L12 15.5l-1.6-4.4L6 9.5l4.4-1.6z" />
      <path d="M19 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" />
      <circle cx="5" cy="18" r="1.2" fill={ACCENT} stroke="none" />
    </Base>
  )
}

/* ─── Bar / Financial ─── */
export function IconChart(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3.5 20.5h17" />
      <rect x="6" y="11" width="2.5" height="7" rx="0.6" />
      <rect x="10.75" y="6" width="2.5" height="12" rx="0.6" />
      <rect x="15.5" y="13.5" width="2.5" height="4.5" rx="0.6" />
      <circle cx="20.5" cy="5" r="1.4" fill={ACCENT} stroke="none" />
    </Base>
  )
}

/* ─── Operations / Cog ─── */
export function IconOps(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2" />
      <path d="M12 19v2" />
      <path d="M3 12h2" />
      <path d="M19 12h2" />
      <path d="M5.6 5.6l1.4 1.4" />
      <path d="M17 17l1.4 1.4" />
      <path d="M5.6 18.4L7 17" />
      <path d="M17 7l1.4-1.4" />
      <circle cx="12" cy="12" r="0.9" fill={ACCENT} stroke="none" />
    </Base>
  )
}

/* ─── Shield / Compliance ─── */
export function IconShield(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9 12.2l2.2 2.3L15.5 10" />
    </Base>
  )
}

/* ─── Source / Link ─── */
export function IconSource(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M9.5 14.5l5-5" />
      <path d="M11 7.5l1.5-1.5a3.5 3.5 0 015 5L16 12.5" />
      <path d="M13 16.5l-1.5 1.5a3.5 3.5 0 01-5-5L8 11.5" />
      <circle cx="19" cy="5" r="1.3" fill={ACCENT} stroke="none" />
    </Base>
  )
}

/* ─── Stack / Layers ─── */
export function IconStack(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3l9 4.5-9 4.5L3 7.5z" />
      <path d="M3 12l9 4.5 9-4.5" />
      <path d="M3 16.5L12 21l9-4.5" />
    </Base>
  )
}

/* ─── Search / Query ─── */
export function IconSearch(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4.3-4.3" />
      <circle cx="11" cy="11" r="1" fill={ACCENT} stroke="none" />
    </Base>
  )
}

/* ─── Upload / Inbox ─── */
export function IconUpload(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 14v4a2 2 0 002 2h12a2 2 0 002-2v-4" />
      <path d="M12 4v12" />
      <path d="M7 9l5-5 5 5" />
      <circle cx="12" cy="4" r="0.9" fill={ACCENT} stroke="none" />
    </Base>
  )
}

/* ─── Pulse / Live monitoring ─── */
export function IconPulse(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 12h4l2-6 4 12 2-6h6" />
      <circle cx="9" cy="6" r="1.1" fill={ACCENT} stroke="none" />
    </Base>
  )
}

/* ─── Lock ─── */
export function IconLock(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
      <path d="M8 10.5V8a4 4 0 018 0v2.5" />
      <circle cx="12" cy="15.5" r="1.2" fill={ACCENT} stroke="none" />
    </Base>
  )
}

/* ─── Building / PE firm ─── */
export function IconBuilding(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="4" y="3.5" width="16" height="17" rx="1.5" />
      <path d="M8 8.5h2M14 8.5h2M8 12.5h2M14 12.5h2M10 20.5v-3.5h4v3.5" />
      <circle cx="20" cy="3.5" r="1.1" fill={ACCENT} stroke="none" />
    </Base>
  )
}

/* ─── Arrow right ─── */
export function IconArrowRight(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </Base>
  )
}

/* ─── Plus / corner mark ─── */
export function IconPlus(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </Base>
  )
}

/* ─── Check ─── */
export function IconCheck(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </Base>
  )
}

/* ─── Flag (alert) ─── */
export function IconFlag(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 21V4" />
      <path d="M5 4h12l-2.5 4 2.5 4H5" />
      <circle cx="5" cy="21" r="1.1" fill={ACCENT} stroke="none" />
    </Base>
  )
}

/* ─── Clock ─── */
export function IconClock(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Base>
  )
}

/* ─── Chat / Message ─── */
export function IconChat(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 5.5h16v11H10l-5 4v-15z" />
      <circle cx="9" cy="11" r="0.9" fill={ACCENT} stroke="none" />
      <circle cx="13" cy="11" r="0.9" fill={ACCENT} stroke="none" />
      <circle cx="17" cy="11" r="0.9" fill={ACCENT} stroke="none" />
    </Base>
  )
}

/* ─── Menu / Close ─── */
export function IconMenu(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h10" />
    </Base>
  )
}

export function IconClose(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </Base>
  )
}

/* ─── Trend up / down ─── */
export function IconTrendUp(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M14 7h7v7" />
    </Base>
  )
}

export function IconTrendDown(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 7l6 6 4-4 8 8" />
      <path d="M14 17h7v-7" />
    </Base>
  )
}
