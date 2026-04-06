"use client"

import { motion } from "framer-motion"

/** Animated gradient orbs for section backgrounds */
export function GradientOrbs({
  variant = "default",
}: {
  variant?: "default" | "hero" | "cta" | "purple"
}) {
  const configs: Record<string, { className: string; style?: React.CSSProperties }[]> = {
    default: [
      {
        className:
          "absolute top-0 -right-1/4 w-[600px] h-[600px] bg-[radial-gradient(ellipse,rgba(200,162,255,0.08)_0%,transparent_70%)] animate-float-slow",
      },
      {
        className:
          "absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-[radial-gradient(ellipse,rgba(139,92,246,0.06)_0%,transparent_70%)] animate-float-slower",
      },
    ],
    hero: [
      {
        className:
          "absolute top-[-10%] right-[10%] w-[800px] h-[800px] bg-[radial-gradient(ellipse,rgba(200,162,255,0.1)_0%,rgba(139,92,246,0.03)_40%,transparent_70%)] animate-float-slow",
      },
      {
        className:
          "absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-[radial-gradient(ellipse,rgba(139,92,246,0.08)_0%,transparent_70%)] animate-float-slower",
      },
      {
        className:
          "absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-[radial-gradient(ellipse,rgba(200,162,255,0.05)_0%,transparent_70%)] animate-float-slow",
        style: { animationDelay: "-3s" },
      },
    ],
    cta: [
      {
        className:
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse,rgba(200,162,255,0.12)_0%,rgba(139,92,246,0.04)_40%,transparent_70%)] animate-pulse-glow",
      },
    ],
    purple: [
      {
        className:
          "absolute top-0 right-0 w-[700px] h-[700px] bg-[radial-gradient(ellipse,rgba(139,92,246,0.08)_0%,transparent_60%)] animate-float-slow",
      },
      {
        className:
          "absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse,rgba(200,162,255,0.06)_0%,transparent_60%)] animate-float-slower",
      },
    ],
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {configs[variant].map((orb, i) => (
        <div key={i} className={orb.className} style={orb.style} />
      ))}
    </div>
  )
}

/** Floating badge elements for visual interest */
export function FloatingBadge({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={`inline-flex items-center gap-2 rounded-full border border-pastel-border bg-surface/80 backdrop-blur-sm px-3 py-1.5 text-xs ${className}`}
    >
      {children}
    </motion.div>
  )
}

/** Animated line that draws itself */
export function AnimatedLine({
  className = "",
  direction = "horizontal",
}: {
  className?: string
  direction?: "horizontal" | "vertical"
}) {
  return (
    <motion.div
      initial={{
        scaleX: direction === "horizontal" ? 0 : 1,
        scaleY: direction === "vertical" ? 0 : 1,
      }}
      whileInView={{
        scaleX: 1,
        scaleY: 1,
      }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      className={`bg-gradient-to-r from-transparent via-accent/20 to-transparent ${
        direction === "horizontal" ? "h-px w-full" : "w-px h-full"
      } ${className}`}
      style={{ transformOrigin: direction === "horizontal" ? "left" : "top" }}
    />
  )
}

/** Glowing dot indicator */
export function GlowDot({
  color = "accent",
  size = "sm",
}: {
  color?: "accent" | "green" | "amber"
  size?: "sm" | "md"
}) {
  const colorMap = {
    accent: "bg-accent shadow-[0_0_8px_rgba(200,162,255,0.8)]",
    green: "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]",
    amber: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]",
  }
  const sizeMap = {
    sm: "h-1.5 w-1.5",
    md: "h-2 w-2",
  }
  return (
    <span className="relative flex">
      <span
        className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${colorMap[color]}`}
      />
      <span
        className={`relative inline-flex rounded-full ${sizeMap[size]} ${colorMap[color]}`}
      />
    </span>
  )
}

/** Gradient border wrapper for premium card effect */
export function GradientBorderCard({
  children,
  className = "",
  hoverGlow = true,
}: {
  children: React.ReactNode
  className?: string
  hoverGlow?: boolean
}) {
  return (
    <div
      className={`group relative rounded-2xl ${
        hoverGlow ? "glow-card shine-hover" : ""
      } ${className}`}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/10 via-transparent to-accent-deep/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative h-full rounded-2xl border border-pastel-border bg-surface p-8 transition-all duration-500 group-hover:border-pastel-border-hover group-hover:bg-surface-2">
        {children}
      </div>
    </div>
  )
}
