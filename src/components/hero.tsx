"use client"

import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { BriefMockup } from "./brief-mockup"
import { GradientOrbs, FloatingBadge, GlowDot } from "./visual-effects"
import { DotGrid, ConcentricRings } from "./decorations"

const ease = [0.25, 0.1, 0.25, 1] as const

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-base noise">
      {/* Animated gradient orbs */}
      <GradientOrbs variant="hero" />

      {/* Concentric rings background decoration */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50">
        <ConcentricRings size={1200} />
      </div>

      {/* Dot grid */}
      <DotGrid color="rgba(200, 162, 255, 0.06)" size={32} dotSize={1} />

      {/* Faint horizontal accent lines */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[28%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/[0.06] to-transparent" />
        <div className="absolute top-[72%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-deep/[0.05] to-transparent" />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-36 pb-24 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-12 items-center">
          {/* Left column */}
          <div className="flex flex-col gap-8">
            {/* Floating badges */}
            <div className="flex flex-wrap items-center gap-3">
              <FloatingBadge delay={0.4}>
                <GlowDot color="green" />
                <span className="text-green-400">SOC 2 Compliant</span>
              </FloatingBadge>
              <FloatingBadge delay={0.55}>
                <GlowDot color="accent" />
                <span className="text-accent">Live · 12 funds active</span>
              </FloatingBadge>
            </div>

            <div className="flex flex-col gap-6">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease }}
                className="font-heading text-[clamp(2.75rem,5.5vw,4.5rem)] leading-[1.02] tracking-heading-tight text-white"
              >
                Due diligence,{" "}
                <em className="gradient-text">reinvented.</em>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease }}
                className="max-w-lg text-[17px] leading-[1.7] text-text-secondary"
              >
                AI-powered financial and operational due diligence briefs in 48
                hours. Fully queryable, source-traceable, and built for how
                private equity actually works.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-medium text-[#08080C] transition-all duration-300 hover:bg-[#D4B3FF] hover:shadow-[0_0_40px_rgba(200,162,255,0.4)]"
              >
                Request a demo
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <button className="group inline-flex items-center justify-center gap-2 rounded-full border border-pastel-border px-8 py-4 text-base font-medium text-text-secondary transition-all duration-300 hover:border-accent/40 hover:text-white hover:bg-accent/[0.04]">
                <Play className="h-4 w-4" />
                View sample brief
              </button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5, ease }}
              className="flex items-center gap-8 pt-6"
            >
              {[
                { value: "48h", label: "Turnaround" },
                { value: "100%", label: "Source-Traced" },
                { value: "10x", label: "Faster" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-8">
                  {i > 0 && <div className="h-10 w-px bg-pastel-border" />}
                  <div className="flex flex-col">
                    <span className="font-heading text-2xl text-white">
                      {stat.value}
                    </span>
                    <span className="text-[10px] uppercase tracking-[1.5px] text-text-tertiary mt-1">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column - DD Brief Mockup */}
          <div className="relative lg:pl-4 hidden md:block">
            <BriefMockup />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-base to-transparent pointer-events-none" />
    </section>
  )
}
