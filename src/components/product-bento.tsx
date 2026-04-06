"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Clock, FileSearch, MessageSquare, TrendingUp, TrendingDown } from "lucide-react"
import { GradientOrbs } from "./visual-effects"
import { DotGrid, SectionLabel } from "./decorations"
import { Sparkline, MetricCard } from "./charts"

const ease = [0.25, 0.1, 0.25, 1] as const

function TraceabilityVisual() {
  return (
    <div className="mt-6 space-y-3">
      <div className="rounded-xl border border-pastel-border/50 bg-base/50 p-3.5">
        <p className="text-[12px] text-text-secondary leading-relaxed">
          &ldquo;Revenue concentration exceeds 40% from top 3 customers,
          presenting moderate risk...&rdquo;
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-accent/10 px-2 py-1 text-[10px] text-accent border border-accent/20 transition-colors hover:bg-accent/20 cursor-pointer">
            <FileSearch className="h-2.5 w-2.5" />
            Financial_Statements.pdf, p.24
          </span>
        </div>
      </div>
      <div className="rounded-xl border border-accent/10 bg-accent/[0.03] p-3">
        <div className="flex items-center gap-2 text-[10px] text-accent/60 mb-2">
          <FileSearch className="h-3 w-3" />
          Source Document Preview
        </div>
        <p className="text-[11px] text-text-tertiary italic leading-relaxed">
          &ldquo;Top three customers accounted for 42.3% of total revenue in
          FY2024, up from 38.1%...&rdquo;
        </p>
      </div>
    </div>
  )
}

function QueryVisual() {
  return (
    <div className="mt-6">
      <div className="rounded-xl border border-pastel-border/50 bg-base/50 p-3">
        <div className="flex items-center gap-2 rounded-lg border border-pastel-border bg-surface px-3 py-2.5 mb-3">
          <MessageSquare className="h-3.5 w-3.5 text-accent/50" />
          <span className="text-[12px] text-text-tertiary">
            &ldquo;What&apos;s the EBITDA trend over 3 years?&rdquo;
          </span>
        </div>
        <div className="rounded-lg border border-accent/10 bg-accent/[0.02] p-3">
          <p className="text-[11px] text-text-secondary leading-relaxed">
            EBITDA has grown at 12.4% CAGR from FY2022-FY2024, improving from
            $41.2M to $53.3M. Margin expanded from 6.2% to 8.7%.
          </p>
          <div className="mt-2 flex gap-1.5">
            {["pg. 14", "pg. 22", "pg. 31"].map((pg) => (
              <span
                key={pg}
                className="rounded bg-accent/10 px-1.5 py-0.5 text-[9px] text-accent/70 border border-accent/10"
              >
                {pg}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProductBento() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="relative overflow-hidden bg-base py-32 noise">
      <GradientOrbs variant="purple" />
      <DotGrid color="rgba(200, 162, 255, 0.04)" size={36} dotSize={1} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mx-auto max-w-2xl text-center mb-16"
        >
          <SectionLabel>The Product</SectionLabel>
          <h2 className="font-heading text-[clamp(2rem,4vw,2.75rem)] leading-tight tracking-heading text-white text-balance">
            A brief that <em className="gradient-text">thinks</em> with you.
          </h2>
          <p className="mt-4 text-text-secondary text-base">
            Every feature designed for how investment professionals actually
            work.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div ref={ref} className="grid gap-4 lg:grid-cols-[1.3fr_1fr] lg:grid-rows-2">
          {/* Card 1: Speed (large, left, spans 2 rows) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
            className="group relative glow-card shine-hover rounded-2xl lg:row-span-2"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-warm-dark/5 via-transparent to-accent/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative h-full rounded-2xl border border-pastel-border bg-surface p-8 transition-all duration-500 group-hover:border-pastel-border-hover group-hover:bg-surface-2 flex flex-col">
              <div className="flex items-center gap-3 mb-1">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-warm-dark/10 border border-warm-dark/20">
                  <Clock className="h-4 w-4 text-warm-dark" />
                </div>
                <span className="text-[11px] font-medium uppercase tracking-[1.5px] text-warm-dark">
                  Speed
                </span>
              </div>
              <h3 className="mt-4 font-heading text-[22px] text-white">
                48-hour turnaround
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary max-w-md">
                What takes consultants three weeks takes Pastel two days. From
                data room access to a delivered, queryable brief covering
                financial and operational diligence.
              </p>

              {/* Timeline comparison */}
              <div className="mt-8 space-y-5 flex-1">
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-2">
                    <span className="text-text-tertiary">Traditional DD</span>
                    <span className="text-text-tertiary">3-4 weeks</span>
                  </div>
                  <div className="relative h-2.5 rounded-full bg-pastel-border/50 overflow-hidden">
                    <div className="h-full w-full rounded-full bg-gradient-to-r from-text-tertiary/20 to-text-tertiary/40" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-2">
                    <span className="text-accent">Pastel</span>
                    <span className="text-accent font-medium">48 hours</span>
                  </div>
                  <div className="relative h-2.5 rounded-full bg-pastel-border/50 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "14%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.5, ease }}
                      className="h-full rounded-full bg-gradient-to-r from-accent-deep to-accent shadow-[0_0_12px_rgba(200,162,255,0.5)]"
                    />
                  </div>
                </div>

                {/* Live brief metrics */}
                <div className="pt-4 mt-2 border-t border-pastel-border/40">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase tracking-wider text-text-tertiary">
                      Active brief generation
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] text-green-400">
                      <span className="h-1 w-1 rounded-full bg-green-400 animate-pulse" />
                      Live
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <MetricCard
                      label="Briefs (24h)"
                      value="14"
                      delta="+22%"
                      positive
                      sparkline={[8, 10, 9, 12, 11, 13, 14]}
                    />
                    <MetricCard
                      label="Avg time"
                      value="46.2h"
                      delta="-3%"
                      positive
                      sparkline={[52, 50, 48, 49, 47, 46, 46.2]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Traceability (right, top) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="group relative glow-card shine-hover rounded-2xl"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative h-full rounded-2xl border border-pastel-border bg-surface p-8 transition-all duration-500 group-hover:border-pastel-border-hover group-hover:bg-surface-2">
              <div className="flex items-center gap-3 mb-1">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 border border-accent/20">
                  <FileSearch className="h-4 w-4 text-accent" />
                </div>
                <span className="text-[11px] font-medium uppercase tracking-[1.5px] text-accent">
                  Traceability
                </span>
              </div>
              <h3 className="mt-4 font-heading text-[22px] text-white">
                Every claim has a source
              </h3>
              <p className="mt-3 text-[13px] leading-relaxed text-text-secondary">
                Click any finding to see the exact document, page, and paragraph
                it came from. No black boxes. Full audit trail for your IC.
              </p>
              <TraceabilityVisual />
            </div>
          </motion.div>

          {/* Card 3: Intelligence (right, bottom) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="group relative glow-card shine-hover rounded-2xl"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-deep/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative h-full rounded-2xl border border-pastel-border bg-surface p-8 transition-all duration-500 group-hover:border-pastel-border-hover group-hover:bg-surface-2">
              <div className="flex items-center gap-3 mb-1">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-deep/10 border border-accent-deep/20">
                  <MessageSquare className="h-4 w-4 text-accent-deep" />
                </div>
                <span className="text-[11px] font-medium uppercase tracking-[1.5px] text-accent-deep">
                  Intelligence
                </span>
              </div>
              <h3 className="mt-4 font-heading text-[22px] text-white">
                Queryable outputs
              </h3>
              <p className="mt-3 text-[13px] leading-relaxed text-text-secondary">
                Ask follow-up questions in plain language. The brief becomes a
                living, interactive document you interrogate, not just read.
              </p>
              <QueryVisual />
            </div>
          </motion.div>
        </div>

        {/* Full-width card: Beyond the deal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mt-4 group relative glow-card shine-hover rounded-2xl"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent/5 via-transparent to-accent-deep/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="relative rounded-2xl border border-pastel-border bg-surface p-8 lg:p-10 transition-all duration-500 group-hover:border-pastel-border-hover group-hover:bg-surface-2">
            <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-text-tertiary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[1.5px] text-text-tertiary border border-text-tertiary/20 mb-4">
                  Beyond the deal
                </span>
                <h3 className="font-heading text-[22px] text-white mb-3">
                  Ongoing financial governance
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary max-w-2xl">
                  After the DD is complete, Pastel keeps watching. Continuous
                  financial auditing, anomaly detection, and operational
                  monitoring across your portfolio companies. A CFO co-pilot
                  that never sleeps.
                </p>
              </div>
              {/* Real metric cards with sparklines */}
              <div className="hidden lg:flex gap-3">
                <div className="rounded-xl border border-pastel-border bg-base/50 px-4 py-3 min-w-[130px]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] uppercase tracking-wider text-text-tertiary">
                      Revenue
                    </span>
                    <TrendingUp className="h-3 w-3 text-green-400" />
                  </div>
                  <p className="font-heading text-lg text-green-400">+12.4%</p>
                  <div className="mt-1 -mx-1">
                    <Sparkline
                      data={[20, 22, 25, 24, 28, 32, 30, 35, 38]}
                      color="#4ADE80"
                      width={110}
                      height={24}
                      animate={false}
                    />
                  </div>
                </div>
                <div className="rounded-xl border border-pastel-border bg-base/50 px-4 py-3 min-w-[130px]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] uppercase tracking-wider text-text-tertiary">
                      Margin
                    </span>
                    <TrendingDown className="h-3 w-3 text-amber-400" />
                  </div>
                  <p className="font-heading text-lg text-amber-400">-0.3%</p>
                  <div className="mt-1 -mx-1">
                    <Sparkline
                      data={[8.7, 8.6, 8.5, 8.6, 8.4, 8.5, 8.4]}
                      color="#FBBF24"
                      width={110}
                      height={24}
                      animate={false}
                    />
                  </div>
                </div>
                <div className="rounded-xl border border-pastel-border bg-base/50 px-4 py-3 min-w-[130px]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] uppercase tracking-wider text-text-tertiary">
                      Cash
                    </span>
                    <TrendingUp className="h-3 w-3 text-green-400" />
                  </div>
                  <p className="font-heading text-lg text-green-400">+8.1%</p>
                  <div className="mt-1 -mx-1">
                    <Sparkline
                      data={[12, 14, 13, 15, 16, 18, 17, 19, 20]}
                      color="#4ADE80"
                      width={110}
                      height={24}
                      animate={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
