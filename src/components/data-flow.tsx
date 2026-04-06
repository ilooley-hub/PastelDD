"use client"

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
import { DotGrid, SectionLabel, FlowLine } from "./decorations"

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
  return (
    <section className="relative overflow-hidden bg-base py-32 noise">
      <GradientOrbs variant="default" />
      <DotGrid color="rgba(200, 162, 255, 0.04)" size={40} dotSize={1} />

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
          <h2 className="font-heading text-[clamp(2rem,4vw,2.75rem)] leading-tight tracking-heading text-white text-balance">
            From data room to{" "}
            <em className="gradient-text">decision-ready.</em>
          </h2>
          <p className="mt-4 text-text-secondary text-base">
            Watch your documents become actionable intelligence in real time.
          </p>
        </motion.div>

        {/* Three-column flow */}
        <div className="grid lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-6 items-stretch">
          {/* Column 1: Input Documents */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="relative rounded-2xl border border-pastel-border bg-surface p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase tracking-[1.5px] text-text-tertiary">
                Input
              </span>
              <span className="rounded-full bg-pastel-border/50 px-2 py-0.5 text-[9px] text-text-tertiary">
                {documents.length} docs
              </span>
            </div>
            <h3 className="font-heading text-base text-white mb-4">
              Data Room
            </h3>
            <div className="space-y-2">
              {documents.map((doc, i) => (
                <motion.div
                  key={doc.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08, ease }}
                  className="flex items-center gap-2.5 rounded-lg border border-pastel-border/50 bg-base/50 px-3 py-2 group hover:border-accent/20 transition-colors"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/10 border border-accent/20 shrink-0">
                    <doc.icon className="h-3 w-3 text-accent" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] text-white truncate">
                      {doc.name}
                    </p>
                    <p className="text-[9px] text-text-tertiary uppercase tracking-wider">
                      {doc.type}
                    </p>
                  </div>
                  <CheckCircle2 className="h-3 w-3 text-green-400 shrink-0" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Connector 1 */}
          <div className="hidden lg:flex flex-col items-center justify-center w-16">
            <FlowLine />
          </div>

          {/* Column 2: AI Processing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="relative rounded-2xl border border-accent/20 bg-surface p-6 shadow-[0_0_60px_rgba(200,162,255,0.1)]"
          >
            {/* Pulsing glow background */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-accent-deep/5 animate-pulse-glow" />

            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-[1.5px] text-accent">
                  Processing
                </span>
                <GlowDot color="accent" size="sm" />
              </div>

              {/* Center: Brain icon with rotating ring */}
              <div className="flex flex-col items-center my-6">
                <div className="relative">
                  {/* Rotating ring */}
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
                    className="absolute -inset-3 rounded-full border border-dashed border-accent-deep/20"
                  />
                  {/* Core */}
                  <div className="relative h-16 w-16 rounded-full bg-gradient-to-br from-accent to-accent-deep flex items-center justify-center shadow-[0_0_40px_rgba(200,162,255,0.4)]">
                    <Cpu className="h-7 w-7 text-white" />
                  </div>
                </div>
                <h3 className="font-heading text-base text-white mt-4">
                  Multi-Agent AI
                </h3>
                <p className="text-[10px] text-text-tertiary mt-1">
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
                    className="flex items-center gap-2 rounded-md bg-base/40 px-2.5 py-1.5"
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

          {/* Connector 2 */}
          <div className="hidden lg:flex flex-col items-center justify-center w-16">
            <FlowLine />
          </div>

          {/* Column 3: Output Brief */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            className="relative rounded-2xl border border-pastel-border bg-surface p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase tracking-[1.5px] text-accent">
                Output
              </span>
              <span className="rounded-full bg-green-400/10 px-2 py-0.5 text-[9px] text-green-400 border border-green-400/20">
                Ready
              </span>
            </div>
            <h3 className="font-heading text-base text-white mb-1">
              DD Brief
            </h3>
            <p className="text-[10px] text-text-tertiary mb-4">
              Acme Corp · 47 pages
            </p>

            {/* Score */}
            <div className="rounded-lg border border-accent/20 bg-accent/5 p-3 mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] uppercase tracking-wider text-text-tertiary">
                  Overall Risk
                </span>
                <span className="text-[10px] text-amber-400 font-medium">
                  Medium
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-pastel-border overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "42%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.8, ease }}
                  className="h-full rounded-full bg-gradient-to-r from-green-400 via-amber-400 to-red-400"
                />
              </div>
            </div>

            {/* Findings list */}
            <div className="space-y-1.5">
              {outputs.map((out, i) => (
                <motion.div
                  key={out.label}
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                  className="flex items-center gap-2 rounded-lg border border-pastel-border/50 bg-base/50 px-2.5 py-1.5"
                >
                  <span
                    className={`h-1 w-1 rounded-full ${
                      out.status === "good" ? "bg-green-400" : "bg-amber-400"
                    }`}
                  />
                  <span className="text-[10px] text-text-secondary flex-1">
                    {out.label}
                  </span>
                  <Sparkles className="h-2.5 w-2.5 text-accent/60" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
