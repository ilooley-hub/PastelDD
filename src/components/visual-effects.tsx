"use client"

import { motion } from "framer-motion"

/** Animated gradient orbs for section backgrounds — light theme */
export function GradientOrbs({
  variant = "default",
}: {
  variant?: "default" | "hero" | "cta" | "purple"
}) {
  const configs: Record<
    string,
    { className: string; style?: React.CSSProperties }[]
  > = {
    default: [
      {
        className:
          "absolute top-0 -right-1/4 w-[640px] h-[640px] rounded-full animate-float-slow",
        style: {
          background:
            "radial-gradient(circle, rgba(200,162,255,0.35) 0%, rgba(255,184,217,0.18) 40%, transparent 70%)",
          filter: "blur(60px)",
        },
      },
      {
        className:
          "absolute -bottom-1/4 -left-1/4 w-[540px] h-[540px] rounded-full animate-float-slower",
        style: {
          background:
            "radial-gradient(circle, rgba(141,208,255,0.30) 0%, rgba(200,162,255,0.18) 40%, transparent 70%)",
          filter: "blur(70px)",
        },
      },
    ],
    hero: [
      {
        className:
          "absolute top-[-10%] right-[10%] w-[820px] h-[820px] rounded-full animate-float-slow",
        style: {
          background:
            "radial-gradient(circle, rgba(200,162,255,0.45) 0%, rgba(255,184,217,0.28) 40%, transparent 75%)",
          filter: "blur(60px)",
        },
      },
      {
        className:
          "absolute bottom-[-20%] left-[-10%] w-[640px] h-[640px] rounded-full animate-float-slower",
        style: {
          background:
            "radial-gradient(circle, rgba(141,208,255,0.35) 0%, rgba(200,162,255,0.18) 40%, transparent 70%)",
          filter: "blur(70px)",
        },
      },
    ],
    cta: [
      {
        className:
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[680px] rounded-full animate-pulse-glow",
        style: {
          background:
            "radial-gradient(ellipse, rgba(200,162,255,0.45) 0%, rgba(255,184,217,0.30) 35%, rgba(255,207,160,0.18) 60%, transparent 80%)",
          filter: "blur(50px)",
        },
      },
    ],
    purple: [
      {
        className:
          "absolute top-0 right-0 w-[720px] h-[720px] rounded-full animate-float-slow",
        style: {
          background:
            "radial-gradient(circle, rgba(200,162,255,0.40) 0%, rgba(124,58,237,0.10) 50%, transparent 75%)",
          filter: "blur(70px)",
        },
      },
      {
        className:
          "absolute bottom-0 left-0 w-[540px] h-[540px] rounded-full animate-float-slower",
        style: {
          background:
            "radial-gradient(circle, rgba(255,184,217,0.32) 0%, rgba(255,207,160,0.18) 50%, transparent 75%)",
          filter: "blur(70px)",
        },
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

/** Floating badge — light theme */
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
      className={`inline-flex items-center gap-2 rounded-full border border-pastel-border bg-white/80 backdrop-blur-sm px-3 py-1.5 text-xs shadow-sm ${className}`}
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
      className={`bg-gradient-to-r from-transparent via-accent/30 to-transparent ${
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
    accent: "bg-accent shadow-[0_0_8px_rgba(124,58,237,0.7)]",
    green: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]",
    amber: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.7)]",
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
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/8 via-transparent to-accent-soft/12 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative h-full rounded-2xl border border-pastel-border bg-surface p-8 transition-all duration-500 group-hover:border-pastel-border-hover group-hover:shadow-pastel">
        {children}
      </div>
    </div>
  )
}
