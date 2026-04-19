"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Check, X, Clock, DollarSign, FileSearch, Users } from "lucide-react"
import { GradientOrbs } from "./visual-effects"
import { DotGrid, SectionLabel } from "./decorations"

const ease = [0.25, 0.1, 0.25, 1] as const

const rows: {
  label: string
  icon: React.ElementType
  traditional: string
  pastel: string
  highlight?: boolean
}[] = [
  {
    label: "Turnaround time",
    icon: Clock,
    traditional: "3-4 weeks",
    pastel: "48 hours",
    highlight: true,
  },
  {
    label: "Cost per engagement",
    icon: DollarSign,
    traditional: "$50K-$150K",
    pastel: "Fraction of the cost",
  },
  {
    label: "Source traceability",
    icon: FileSearch,
    traditional: "Manual footnotes",
    pastel: "Every claim linked to source",
    highlight: true,
  },
  {
    label: "Queryable output",
    icon: Users,
    traditional: "Static PDF report",
    pastel: "Interactive, ask follow-ups",
  },
  {
    label: "Coverage consistency",
    icon: Check,
    traditional: "Analyst-dependent",
    pastel: "Systematic, repeatable",
  },
  {
    label: "Scalability",
    icon: Users,
    traditional: "Limited by headcount",
    pastel: "Parallel processing",
  },
]

export function Comparison() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="relative overflow-hidden bg-base py-32 grain">
      <GradientOrbs variant="purple" />
      <DotGrid color="rgba(200, 162, 255, 0.03)" size={36} dotSize={1} />

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mx-auto max-w-2xl text-center mb-16"
        >
          <SectionLabel>Why Pastel</SectionLabel>
          <h2 className="font-heading text-[clamp(2rem,4vw,2.75rem)] leading-tight tracking-heading text-text-primary text-balance">
            Traditional DD vs.{" "}
            <em className="gradient-text not-italic font-normal italic">
              Pastel
            </em>
          </h2>
          <p className="mt-4 text-text-secondary text-base">
            See how AI-powered diligence transforms the process your team relies
            on.
          </p>
        </motion.div>

        {/* Comparison table */}
        <div ref={ref} className="overflow-hidden rounded-2xl border border-pastel-border bg-surface shadow-pastel">
          {/* Header row */}
          <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-pastel-border bg-surface-2/50">
            <div className="p-4 sm:p-5" />
            <div className="p-4 sm:p-5 text-center border-l border-pastel-border">
              <span className="text-[10px] font-semibold uppercase tracking-[2px] text-text-tertiary">
                Traditional
              </span>
            </div>
            <div className="p-4 sm:p-5 text-center border-l border-accent/20 bg-accent/[0.04]">
              <span className="text-[10px] font-semibold uppercase tracking-[2px] text-accent">
                Pastel
              </span>
            </div>
          </div>

          {/* Data rows */}
          {rows.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              className={`grid grid-cols-[1fr_1fr_1fr] ${
                i < rows.length - 1 ? "border-b border-pastel-border/60" : ""
              }`}
            >
              {/* Feature label */}
              <div className="flex items-center gap-3 p-4 sm:p-5">
                <row.icon className="h-4 w-4 text-text-tertiary shrink-0 hidden sm:block" />
                <span className="text-sm text-text-primary font-medium">
                  {row.label}
                </span>
              </div>

              {/* Traditional */}
              <div className="flex items-center justify-center p-4 sm:p-5 border-l border-pastel-border text-center">
                <span className="text-sm text-text-tertiary">{row.traditional}</span>
              </div>

              {/* Pastel */}
              <div className="flex items-center justify-center gap-2 p-4 sm:p-5 border-l border-accent/20 bg-accent/[0.02] text-center">
                {row.highlight && (
                  <Check className="h-4 w-4 text-accent shrink-0" />
                )}
                <span className={`text-sm font-medium ${row.highlight ? "text-accent" : "text-text-primary"}`}>
                  {row.pastel}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
          className="mt-8 text-center text-sm text-text-tertiary"
        >
          Built to augment your deal team, not replace it.
        </motion.p>
      </div>
    </section>
  )
}
