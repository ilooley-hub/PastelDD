"use client"

import { motion } from "framer-motion"
import { NumberTicker } from "./ui/number-ticker"

export function StatsRow() {
  const stats: { number: number; suffix: string; label: string }[] = [
    { number: 48, suffix: "h", label: "Average brief turnaround" },
    { number: 10, suffix: "x", label: "Faster than traditional DD" },
    { number: 100, suffix: "%", label: "Source-traceable findings" },
  ]

  return (
    <section className="relative bg-base py-28 grain overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(200,162,255,0.32) 0%, rgba(255,184,217,0.18) 40%, transparent 75%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative">
                <div className="absolute inset-0 blur-2xl bg-accent/15 scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <span className="relative font-heading text-[72px] leading-none tracking-heading-tight inline-flex items-baseline">
                  <NumberTicker
                    value={stat.number}
                    className="gradient-text font-heading"
                  />
                  <span className="gradient-text">{stat.suffix}</span>
                </span>
              </div>
              <span className="mt-4 text-sm text-text-secondary">
                {stat.label}
              </span>
              <div className="mt-4 h-px w-16 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
