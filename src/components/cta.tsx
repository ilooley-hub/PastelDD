"use client"

import { ArrowRight, Shield, Lock, Building2 } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { GradientOrbs } from "./visual-effects"

const ease = [0.25, 0.1, 0.25, 1] as const

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-base py-36 noise">
      <GradientOrbs variant="cta" />

      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-20" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
        className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center"
      >
        <h2 className="font-heading text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.08] tracking-heading-tight text-white mb-6">
          See what <em className="gradient-text">48 hours</em> can do.
        </h2>
        <p className="text-lg text-text-secondary max-w-xl mx-auto mb-12 leading-relaxed">
          Request a walkthrough of the Pastel DD Brief. We&apos;ll show you
          exactly how it works with your documents and workflow.
        </p>

        {/* CTA button with glow ring */}
        <div className="relative inline-flex">
          {/* Animated glow ring */}
          <div className="absolute inset-0 rounded-full bg-accent/20 blur-xl scale-110 animate-pulse-glow" />
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-2 rounded-full bg-accent px-10 py-4 text-base font-medium text-[#08080C] transition-all duration-300 hover:bg-[#D4B3FF] hover:shadow-[0_0_50px_rgba(200,162,255,0.4)]"
          >
            Request a demo
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Trust badges */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-8 text-[13px] text-text-tertiary">
          <span className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-accent/50" />
            SOC 2 Compliant
          </span>
          <span className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-accent/50" />
            Bank-Grade Encryption
          </span>
          <span className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-accent/50" />
            Trusted by PE Firms
          </span>
        </div>
      </motion.div>
    </section>
  )
}
