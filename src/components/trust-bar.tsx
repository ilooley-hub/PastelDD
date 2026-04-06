"use client"

import { motion } from "framer-motion"

const ease = [0.25, 0.1, 0.25, 1] as const

export function TrustBar() {
  const categories = [
    "Mid-Market PE",
    "Family Offices",
    "Growth Equity",
    "Venture Debt",
  ]

  return (
    <section className="relative bg-base py-12">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2"
        >
          <span className="text-text-tertiary/50 uppercase text-[10px] tracking-[2.5px] font-medium mr-3">
            Trusted by
          </span>
          {categories.map((cat, i) => (
            <span key={cat} className="flex items-center gap-2.5">
              {i > 0 && (
                <span className="h-1 w-1 rounded-full bg-accent/20" />
              )}
              <span className="text-sm text-text-tertiary transition-colors hover:text-text-secondary">
                {cat}
              </span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
