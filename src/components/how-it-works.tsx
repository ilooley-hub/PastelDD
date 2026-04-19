"use client"

import { Upload, Brain, Search } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { GradientOrbs } from "./visual-effects"
import { DotGrid, SectionLabel } from "./decorations"
import { AuroraText } from "./ui/aurora-text"

const ease = [0.25, 0.1, 0.25, 1] as const

const steps: {
  number: string
  title: string
  description: string
  icon: LucideIcon
  visual: React.ReactNode
}[] = [
  {
    number: "01",
    title: "Upload your data room",
    description:
      "Connect your virtual data room or upload documents directly. Pastel ingests financial statements, operational reports, contracts, and compliance documentation.",
    icon: Upload,
    visual: <UploadVisual />,
  },
  {
    number: "02",
    title: "AI builds your brief",
    description:
      "Multi-agent AI reads every document, cross-references data points across sources, scores financial and operational risks, and produces a structured DD brief to institutional standards.",
    icon: Brain,
    visual: <ProcessingVisual />,
  },
  {
    number: "03",
    title: "Query and decide",
    description:
      "Every finding links back to its source document and page. Ask follow-up questions in plain language. Drill into any section. Present to your IC with confidence.",
    icon: Search,
    visual: <QueryVisual />,
  },
]

function UploadVisual() {
  return (
    <div className="mt-6 space-y-2">
      {["Financial_Statements_FY24.pdf", "Operational_Report.xlsx", "Cap_Table_v3.pdf"].map(
        (file, i) => (
          <div
            key={file}
            className="flex items-center gap-3 rounded-lg border border-pastel-border/50 bg-base/50 px-3 py-2 text-[11px]"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="h-6 w-6 rounded bg-accent/10 flex items-center justify-center shrink-0">
              <Upload className="h-3 w-3 text-accent" />
            </div>
            <span className="text-text-secondary truncate">{file}</span>
            <span className="ml-auto text-emerald-600/80 text-[10px]">Done</span>
          </div>
        )
      )}
    </div>
  )
}

function ProcessingVisual() {
  return (
    <div className="mt-6 space-y-3">
      {[
        { label: "Financial analysis", progress: 100 },
        { label: "Operational review", progress: 87 },
        { label: "Risk scoring", progress: 64 },
      ].map((item) => (
        <div key={item.label}>
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="text-text-secondary">{item.label}</span>
            <span className="text-accent text-[10px]">{item.progress}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-pastel-border/50 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent-deep to-accent transition-all duration-1000"
              style={{ width: `${item.progress}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function QueryVisual() {
  return (
    <div className="mt-6 space-y-2.5">
      {/* User question */}
      <div className="flex justify-end">
        <div className="rounded-xl rounded-br-sm bg-accent/15 border border-accent/20 px-3 py-2 max-w-[85%]">
          <p className="text-[11px] text-accent">What are the key revenue risks?</p>
        </div>
      </div>
      {/* AI response */}
      <div className="flex justify-start">
        <div className="rounded-xl rounded-bl-sm border border-pastel-border bg-base/50 px-3 py-2.5 max-w-[90%]">
          <p className="text-[11px] text-text-secondary leading-relaxed">
            3 risks identified: customer concentration at 42%, pending contract
            renewals in Q3, and margin compression...
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-[10px] text-accent/70">
            <span className="inline-flex items-center gap-1 rounded bg-accent/10 px-1.5 py-0.5 border border-accent/10">
              pg. 12
            </span>
            <span className="inline-flex items-center gap-1 rounded bg-accent/10 px-1.5 py-0.5 border border-accent/10">
              pg. 34
            </span>
            <span className="inline-flex items-center gap-1 rounded bg-accent/10 px-1.5 py-0.5 border border-accent/10">
              pg. 67
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative overflow-hidden bg-base py-32 grain">
      <GradientOrbs variant="default" />
      <DotGrid color="rgba(200, 162, 255, 0.04)" size={36} dotSize={1} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mx-auto max-w-2xl text-center mb-20"
        >
          <SectionLabel>How it works</SectionLabel>
          <h2 className="font-heading text-[clamp(2.25rem,4.5vw,3.25rem)] leading-[0.98] tracking-heading-tight text-text-primary text-balance">
            Three steps to a{" "}
            <em className="not-italic font-normal italic">
              <AuroraText
                colors={["#8DD0FF", "#C8A2FF", "#FFB8D9", "#FFCFA0", "#8DD0FF"]}
                speed={1.2}
              >
                complete brief.
              </AuroraText>
            </em>
          </h2>
          <p className="mt-4 text-text-secondary text-base">
            From data room to decision-ready in 48 hours.
          </p>
        </motion.div>

        {/* Cards */}
        <div ref={ref} className="grid gap-6 lg:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease }}
              className="group relative glow-card shine-hover rounded-2xl"
            >
              {/* Gradient border on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/10 via-transparent to-accent-deep/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative h-full rounded-2xl border border-pastel-border bg-surface p-7 transition-all duration-500 group-hover:border-pastel-border-hover group-hover:bg-surface-2">
                {/* Large faded number */}
                <span className="pointer-events-none absolute right-4 top-4 font-heading text-[110px] leading-none text-accent/[0.07] select-none">
                  {step.number}
                </span>

                <div className="relative z-10 flex flex-col">
                  {/* Step number + icon row */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 transition-all duration-500 group-hover:bg-accent/15 group-hover:border-accent/30">
                      <step.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-pastel-border to-transparent" />
                    <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">
                      Step {step.number}
                    </span>
                  </div>

                  {/* Text */}
                  <h3 className="font-heading text-xl text-text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-text-secondary">
                    {step.description}
                  </p>

                  {/* Card visual */}
                  {step.visual}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Connecting arrows between cards (desktop) */}
        <div className="hidden lg:flex justify-center gap-4 mt-[-1px] relative z-10">
          <div className="flex-1 flex justify-center">
            <div className="h-px w-3/4 bg-gradient-to-r from-transparent via-accent/15 to-transparent" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="h-px w-3/4 bg-gradient-to-r from-transparent via-accent/15 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
