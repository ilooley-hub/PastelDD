"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import {
  FileText,
  FileSpreadsheet,
  FileBarChart,
  Cpu,
  Sparkles,
  CheckCircle2,
} from "lucide-react"
import { GradientOrbs, GlowDot } from "./visual-effects"
import { DotGrid, SectionLabel } from "./decorations"
import { AnimatedBeam } from "./ui/animated-beam"

const ease = [0.25, 0.1, 0.25, 1] as const

const documents = [
  { name: "FY24_Statements.pdf", icon: FileText, type: "Financial" },
  { name: "Operations_Q3.xlsx", icon: FileSpreadsheet, type: "Operations" },
  { name: "Cap_Table_v3.pdf", icon: FileText, type: "Legal" },
  { name: "Vendor_Report.xlsx", icon: FileSpreadsheet, type: "Operations" },
  { name: "Audit_2024.pdf", icon: FileBarChart, type: "Financial" },
]

const aiTasks = [
  "Parsing financials",
  "Cross-referencing sources",
  "Risk scoring",
  "Generating insights",
]

const outputs = [
  { label: "Revenue Quality", status: "good" },
  { label: "Vendor Concentration", status: "warning" },
  { label: "EBITDA Stability", status: "good" },
  { label: "Working Capital", status: "good" },
  { label: "Customer Risk", status: "warning" },
]

export function DataFlow() {
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLDivElement>(null)
  const aiRef = useRef<HTMLDivElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  // Per-document refs for beams
  const docRefs = useRef<(HTMLDivElement | null)[]>([])
  const outputRefs = useRef<(HTMLDivElement | null)[]>([])

  return (
    <section className="relative overflow-hidden bg-base py-32 grain">
      <GradientOrbs variant="default" />
      <DotGrid color="rgba(124, 58, 237, 0.06)" size={40} dotSize={1} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mx-auto max-w-2xl text-center mb-20"
        >
          <SectionLabel>Data Pipeline</SectionLabel>
          <h2 className="font-heading text-[clamp(2.25rem,4.5vw,3.25rem)] leading-[0.98] tracking-heading-tight text-text-primary text-balance">
            From data room to{" "}
            <em className="gradient-text not-italic font-normal italic">
              decision-ready.
            </em>
          </h2>
          <p className="mt-6 text-text-secondary text-lg">
            Watch your documents become actionable intelligence in real time.
          </p>
        </motion.div>

        {/* Three-column flow with animated beams */}
        <div
          ref={containerRef}
          className="relative grid lg:grid-cols-[1fr_1.1fr_1fr] gap-10 lg:gap-16 items-stretch"
        >
          {/* Column 1: Input Documents */}
          <motion.div
            ref={inputRef}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="relative z-10 rounded-3xl border border-pastel-border bg-white p-6 shadow-pastel"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase tracking-[1.5px] text-text-tertiary font-semibold">
                Input
              </span>
              <span className="rounded-full bg-base px-2.5 py-0.5 text-[9px] text-text-tertiary border border-pastel-border font-medium">
                {documents.length} docs
              </span>
            </div>
            <h3 className="font-heading text-lg text-text-primary mb-4">
              Data Room
            </h3>
            <div className="space-y-2">
              {documents.map((doc, i) => (
                <motion.div
                  key={doc.name}
                  ref={(el) => {
                    docRefs.current[i] = el
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08, ease }}
                  className="flex items-center gap-2.5 rounded-xl border border-pastel-border bg-base px-3 py-2 group hover:border-accent/30 hover:bg-white transition-colors"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/10 border border-accent/20 shrink-0">
                    <doc.icon className="h-3 w-3 text-accent" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] text-text-primary truncate font-medium">
                      {doc.name}
                    </p>
                    <p className="text-[9px] text-text-tertiary uppercase tracking-wider">
                      {doc.type}
                    </p>
                  </div>
                  <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Column 2: AI Brain */}
          <motion.div
            ref={aiRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="relative z-10 rounded-3xl border border-accent/20 bg-white p-6 shadow-pastel-lg overflow-hidden"
          >
            {/* Inner gradient glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/[0.06] via-transparent to-[#FFB8D9]/[0.08] animate-pulse-glow" />

            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-[1.5px] text-accent font-semibold">
                  Processing
                </span>
                <GlowDot color="accent" size="sm" />
              </div>

              {/* Brain core with rotating rings */}
              <div className="flex flex-col items-center my-6">
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 rounded-full border border-dashed border-accent/30"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -inset-3 rounded-full border border-dashed border-accent/20"
                  />
                  {/* Core */}
                  <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-[#C8A2FF] via-[#7C3AED] to-[#5B21B6] flex items-center justify-center shadow-[0_0_50px_rgba(124,58,237,0.45)]">
                    <Cpu className="h-9 w-9 text-white" />
                  </div>
                </div>
                <h3 className="font-heading text-lg text-text-primary mt-5">
                  Multi-Agent AI
                </h3>
                <p className="text-[11px] text-text-tertiary mt-1">
                  4 agents working in parallel
                </p>
              </div>

              {/* Active tasks */}
              <div className="space-y-1.5">
                {aiTasks.map((task, i) => (
                  <motion.div
                    key={task}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-2 rounded-md bg-base/60 px-2.5 py-1.5 border border-pastel-border"
                  >
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                      className="h-1 w-1 rounded-full bg-accent shrink-0"
                    />
                    <span className="text-[10px] text-text-secondary">
                      {task}
                    </span>
                    <span className="ml-auto text-[9px] text-accent">●●●</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Column 3: Output Brief */}
          <motion.div
            ref={outputRef}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            className="relative z-10 rounded-3xl border border-pastel-border bg-white p-6 shadow-pastel"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase tracking-[1.5px] text-accent font-semibold">
                Output
              </span>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[9px] text-emerald-700 border border-emerald-200 font-medium">
                Ready
              </span>
            </div>
            <h3 className="font-heading text-lg text-text-primary mb-1">
              DD Brief
            </h3>
            <p className="text-[10px] text-text-tertiary mb-4">
              Acme Corp · 47 pages
            </p>

            {/* Score */}
            <div className="rounded-xl border border-accent/20 bg-accent/[0.04] p-3 mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] uppercase tracking-wider text-text-tertiary font-semibold">
                  Overall Risk
                </span>
                <span className="text-[10px] text-amber-600 font-semibold">
                  Medium
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-pastel-border overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "42%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.8, ease }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500"
                />
              </div>
            </div>

            {/* Findings list */}
            <div className="space-y-1.5">
              {outputs.map((out, i) => (
                <motion.div
                  key={out.label}
                  ref={(el) => {
                    outputRefs.current[i] = el
                  }}
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                  className="flex items-center gap-2 rounded-xl border border-pastel-border bg-base px-2.5 py-1.5"
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      out.status === "good"
                        ? "bg-emerald-500"
                        : "bg-amber-500"
                    }`}
                  />
                  <span className="text-[10px] text-text-secondary flex-1">
                    {out.label}
                  </span>
                  <Sparkles className="h-2.5 w-2.5 text-accent/70" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Animated beams: documents → AI brain → outputs */}
          {documents.map((_, i) => (
            <AnimatedBeam
              key={`in-${i}`}
              containerRef={containerRef}
              fromRef={{ current: docRefs.current[i] }}
              toRef={aiRef}
              curvature={-30 + i * 10}
              gradientStartColor="#8DD0FF"
              gradientStopColor="#C8A2FF"
              pathColor="#C8A2FF"
              pathOpacity={0.15}
              duration={4}
              delay={i * 0.4}
            />
          ))}
          {outputs.map((_, i) => (
            <AnimatedBeam
              key={`out-${i}`}
              containerRef={containerRef}
              fromRef={aiRef}
              toRef={{ current: outputRefs.current[i] }}
              curvature={-20 + i * 8}
              gradientStartColor="#C8A2FF"
              gradientStopColor="#FFB8D9"
              pathColor="#FFB8D9"
              pathOpacity={0.15}
              duration={4}
              delay={2 + i * 0.4}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
