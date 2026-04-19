"use client"

import { motion } from "framer-motion"

const ease = [0.25, 0.1, 0.25, 1] as const

/* Dot grid pattern (light theme) */
export function DotGrid({
  className = "",
  size = 24,
  dotSize = 1,
  color = "rgba(20, 20, 28, 0.08)",
}: {
  className?: string
  size?: number
  dotSize?: number
  color?: string
}) {
  const id = `dot-${Math.random().toString(36).slice(2, 8)}`
  return (
    <svg className={`absolute inset-0 w-full h-full ${className}`}>
      <defs>
        <pattern
          id={id}
          x="0"
          y="0"
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
        >
          <circle cx={size / 2} cy={size / 2} r={dotSize} fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

/* Concentric ring decoration */
export function ConcentricRings({
  className = "",
  size = 400,
}: {
  className?: string
  size?: number
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
    >
      {[0.2, 0.35, 0.5, 0.65, 0.8, 0.95].map((scale, i) => (
        <motion.circle
          key={i}
          cx={size / 2}
          cy={size / 2}
          r={(size / 2) * scale}
          fill="none"
          stroke="rgba(124, 58, 237, 0.10)"
          strokeWidth="1"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: i * 0.08, ease }}
          style={{ transformOrigin: "center" }}
        />
      ))}
      <circle cx={size / 2} cy={size / 2} r="3" fill="#7C3AED" />
    </svg>
  )
}

/* Animated horizontal beam line */
export function FlowLine({
  className = "",
  vertical = false,
}: {
  className?: string
  vertical?: boolean
}) {
  return (
    <div
      className={`relative ${
        vertical ? "w-px h-full" : "h-px w-full"
      } bg-gradient-to-r from-transparent via-accent/35 to-transparent overflow-hidden ${className}`}
    >
      <motion.div
        className={`absolute ${
          vertical
            ? "w-px h-8 bg-gradient-to-b from-transparent via-accent to-transparent"
            : "h-px w-8 bg-gradient-to-r from-transparent via-accent to-transparent"
        }`}
        animate={{
          [vertical ? "y" : "x"]: vertical ? ["-100%", "100%"] : ["-100%", "100%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          boxShadow: "0 0 8px rgba(124, 58, 237, 0.7)",
        }}
      />
    </div>
  )
}

/* Section label with decorative side marks */
export function SectionLabel({
  children,
  color = "accent",
}: {
  children: React.ReactNode
  color?: "accent" | "deep" | "warm"
}) {
  const colorMap = {
    accent: "text-accent",
    deep: "text-accent-deep",
    warm: "text-warm-dark",
  }
  return (
    <div className="inline-flex items-center gap-3 mb-5">
      <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent/50" />
      <span
        className={`text-[10px] font-semibold uppercase tracking-[3px] ${colorMap[color]}`}
      >
        {children}
      </span>
      <span className="h-px w-8 bg-gradient-to-l from-transparent to-accent/50" />
    </div>
  )
}

/* Scan beam (light) */
export function ScanBeam({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] ${className}`}
    >
      <motion.div
        className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-accent/15 to-transparent"
        initial={{ left: "-20%" }}
        animate={{ left: "120%" }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 2,
        }}
      />
    </div>
  )
}

/* Crosshair / corner markers */
export function Crosshair({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      className={`text-accent/50 ${className}`}
      fill="none"
    >
      <path d="M7 0 L7 14 M0 7 L14 7" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  )
}

export function CornerMarkers({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      <Crosshair className="absolute -top-1.5 -left-1.5" />
      <Crosshair className="absolute -top-1.5 -right-1.5" />
      <Crosshair className="absolute -bottom-1.5 -left-1.5" />
      <Crosshair className="absolute -bottom-1.5 -right-1.5" />
    </div>
  )
}

/* Diagonal stripes (subtle light) */
export function DiagonalStripes({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(124,58,237,0.03) 8px, rgba(124,58,237,0.03) 9px)",
      }}
    />
  )
}

/* Scan lines (subtle) */
export function ScanLines({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(124, 58, 237, 1) 2px, rgba(124, 58, 237, 1) 3px)",
        }}
      />
    </div>
  )
}

/* Pastel signature mark - kept for compatibility (uses orb internally now) */
export function PastelMark({
  size = 32,
  className = "",
}: {
  size?: number
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      fill="none"
    >
      <defs>
        <radialGradient id="pmark-grad" cx="35%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#A7D8FF" />
          <stop offset="40%" stopColor="#C8A2FF" />
          <stop offset="75%" stopColor="#FFB8D9" />
          <stop offset="100%" stopColor="#FFCFA0" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="13" fill="url(#pmark-grad)" />
    </svg>
  )
}
