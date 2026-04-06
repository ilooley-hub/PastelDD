"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

const ease = [0.25, 0.1, 0.25, 1] as const

export function SocialProof() {
  return (
    <section className="relative bg-base py-28 noise">
      {/* Subtle background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(200,162,255,0.04)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="relative"
        >
          {/* Quote icon */}
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 mb-8">
            <Quote className="h-5 w-5 text-accent" />
          </div>

          {/* Quote */}
          <div className="border-l-2 border-accent/30 pl-8">
            <p className="font-heading text-[clamp(1.25rem,3vw,1.75rem)] leading-relaxed text-white/90 italic">
              &ldquo;Built by founders who scaled ClickCease to 5,000+
              customers and $3M+ ARR before acquisition by CHEQ. We&apos;ve
              been on both sides of the due diligence table.&rdquo;
            </p>
          </div>

          {/* Founders attribution */}
          <div className="mt-8 pl-8 flex items-center gap-4">
            <div className="flex -space-x-2">
              {["IM", "YH", "YA"].map((initials, i) => (
                <div
                  key={initials}
                  className="h-9 w-9 rounded-full border-2 border-surface bg-pastel-border flex items-center justify-center"
                  style={{ zIndex: 3 - i }}
                >
                  <span className="text-[10px] font-medium text-text-secondary">
                    {initials}
                  </span>
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm text-white font-medium">
                Ilan, Yuval &amp; Yoav
              </p>
              <p className="text-xs text-text-tertiary">Founders, Pastel</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
