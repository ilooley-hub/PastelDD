"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { BriefMockup } from "./brief-mockup"
import { PastelOrb } from "./pastel-logo"
import { IconArrowRight, IconShield, IconPulse } from "./icons"
import { Particles } from "./ui/particles"
import { OrbitingCircles } from "./ui/orbiting-circles"
import { ShimmerButton } from "./ui/shimmer-button"

const ease = [0.25, 0.1, 0.25, 1] as const

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-base grain pt-28">
      {/* Massive ambient orb behind the hero - the brand element */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-40 -left-40 w-[820px] h-[820px] animate-float-slower"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, rgba(141,208,255,0.55) 0%, rgba(200,162,255,0.45) 28%, rgba(255,184,217,0.35) 52%, rgba(255,207,160,0.22) 70%, transparent 85%)",
            filter: "blur(60px)",
            borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%",
          }}
        />
        <div
          className="absolute top-[10%] -right-60 w-[700px] h-[700px] animate-float-slow"
          style={{
            background:
              "radial-gradient(circle at 60% 40%, rgba(255,184,217,0.45) 0%, rgba(255,207,160,0.32) 35%, rgba(200,162,255,0.22) 65%, transparent 85%)",
            filter: "blur(70px)",
            borderRadius: "50% 50% 40% 60% / 60% 50% 50% 40%",
          }}
        />
      </div>

      {/* Subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(20,20,28,0.07) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* Pastel particles drifting */}
      <Particles
        className="absolute inset-0"
        quantity={70}
        ease={70}
        color="#7C3AED"
        size={0.6}
        staticity={40}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-28 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1.05fr_1.1fr] lg:gap-12 items-center">
          {/* Left column */}
          <div className="flex flex-col gap-8">
            {/* Eyebrow with badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="flex flex-wrap items-center gap-2.5"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-pastel-border bg-surface/80 backdrop-blur-sm px-3 py-1.5 text-[11px] font-medium text-text-secondary">
                <IconShield size={12} className="text-emerald-600" />
                SOC 2 Compliant
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.06] backdrop-blur-sm px-3 py-1.5 text-[11px] font-medium text-accent">
                <IconPulse size={12} />
                Now in early access
              </span>
            </motion.div>

            <div className="flex flex-col gap-7">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease }}
                className="font-heading text-[clamp(3rem,6.5vw,5.25rem)] leading-[0.95] tracking-heading-tight text-text-primary"
              >
                Due diligence,
                <br />
                <em className="gradient-text not-italic font-normal italic">
                  reinvented.
                </em>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease }}
                className="max-w-xl text-[19px] leading-[1.6] text-text-secondary"
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
              transition={{ duration: 0.9, delay: 0.2, ease }}
              className="flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link href="#contact" className="inline-flex">
                <ShimmerButton
                  background="#14141C"
                  shimmerColor="#C8A2FF"
                  shimmerDuration="2.5s"
                  className="magnetic px-8 py-4 text-base font-medium shadow-pastel"
                >
                  <span className="inline-flex items-center gap-2">
                    Request a demo
                    <IconArrowRight size={16} />
                  </span>
                </ShimmerButton>
              </Link>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5, ease }}
              className="flex items-center gap-4 sm:gap-6 pt-4"
            >
              {[
                { value: "48h", label: "Turnaround" },
                { value: "100%", label: "Source-Traced" },
                { value: "10x", label: "Faster" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-4 sm:gap-6">
                  {i > 0 && <div className="h-10 w-px bg-pastel-border" />}
                  <div className="flex flex-col">
                    <span className="font-heading text-2xl sm:text-3xl text-text-primary leading-none">
                      {stat.value}
                    </span>
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[1.5px] text-text-tertiary mt-2">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Mobile brief preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease }}
              className="lg:hidden mt-4"
            >
              <BriefMockup />
            </motion.div>
          </div>

          {/* Right column - DD Brief Mockup with orbiting orb cluster */}
          <div className="relative lg:pl-4 hidden lg:block">
            {/* Orbiting orb cluster - top-left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease }}
              className="pointer-events-none absolute -top-12 -left-16 z-0 h-[200px] w-[200px]"
            >
              <PastelOrb
                size={120}
                animated
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
              <OrbitingCircles radius={90} duration={22} iconSize={18} path={false}>
                <PastelOrb size={18} glow={false} />
                <PastelOrb size={14} glow={false} />
                <PastelOrb size={20} glow={false} />
              </OrbitingCircles>
              <OrbitingCircles
                radius={70}
                duration={16}
                iconSize={12}
                reverse
                path={false}
              >
                <div className="h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_rgba(124,58,237,0.8)]" />
                <div className="h-2 w-2 rounded-full bg-[#FFB8D9] shadow-[0_0_8px_rgba(255,184,217,0.8)]" />
                <div className="h-2 w-2 rounded-full bg-[#8DD0FF] shadow-[0_0_8px_rgba(141,208,255,0.8)]" />
                <div className="h-2 w-2 rounded-full bg-[#FFCFA0] shadow-[0_0_8px_rgba(255,207,160,0.8)]" />
              </OrbitingCircles>
            </motion.div>
            <BriefMockup />
            {/* Small orb bottom-right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8, ease }}
              className="absolute -bottom-8 -right-4 z-0"
            >
              <PastelOrb size={90} animated />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom soft fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-base to-transparent pointer-events-none" />
    </section>
  )
}
