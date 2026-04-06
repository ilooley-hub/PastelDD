"use client"

import { motion } from "framer-motion"
import {
  Search,
  FileText,
  TrendingUp,
  AlertTriangle,
  Shield,
  ChevronRight,
  Sparkles,
} from "lucide-react"
import { Sparkline, Donut } from "./charts"
import { ScanBeam, CornerMarkers } from "./decorations"

const ease = [0.25, 0.1, 0.25, 1] as const

/**
 * The signature DD Brief dashboard mockup.
 * A realistic-looking application interface that demonstrates Pastel.
 */
export function BriefMockup() {
  return (
    <div className="relative">
      {/* Outer glow */}
      <div className="absolute -inset-8 bg-[radial-gradient(ellipse_at_center,rgba(200,162,255,0.15)_0%,transparent_60%)] blur-2xl" />

      {/* Floating accent badges around the mockup */}
      <motion.div
        initial={{ opacity: 0, y: 20, x: -20 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.8, delay: 1, ease }}
        className="absolute -top-4 -left-8 z-20 flex items-center gap-2 rounded-full border border-green-400/30 bg-surface/90 backdrop-blur-md px-3 py-1.5 shadow-2xl"
      >
        <Shield className="h-3 w-3 text-green-400" />
        <span className="text-[11px] text-green-400">Verified</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20, x: 20 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease }}
        className="absolute -top-2 -right-6 z-20 flex items-center gap-2 rounded-full border border-accent/30 bg-surface/90 backdrop-blur-md px-3 py-1.5 shadow-2xl"
      >
        <Sparkles className="h-3 w-3 text-accent" />
        <span className="text-[11px] text-accent">AI Generated</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20, x: 20 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.8, delay: 1.4, ease }}
        className="absolute -bottom-3 -right-4 z-20 flex items-center gap-2 rounded-full border border-amber-400/30 bg-surface/90 backdrop-blur-md px-3 py-1.5 shadow-2xl"
      >
        <AlertTriangle className="h-3 w-3 text-amber-400" />
        <span className="text-[11px] text-amber-400">4 Risk Flags</span>
      </motion.div>

      {/* The mockup itself */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease }}
        className="relative rounded-2xl border border-pastel-border bg-surface shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6),0_0_0_1px_rgba(200,162,255,0.06)] overflow-hidden"
      >
        <CornerMarkers />
        <ScanBeam />

        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-pastel-border bg-surface-2/50 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-pastel-border" />
            <div className="h-2.5 w-2.5 rounded-full bg-pastel-border" />
            <div className="h-2.5 w-2.5 rounded-full bg-pastel-border" />
          </div>
          <div className="ml-3 flex items-center gap-2 rounded-md border border-pastel-border bg-base/50 px-2.5 py-1 text-[10px] text-text-tertiary">
            <Shield className="h-2.5 w-2.5 text-accent" />
            pastel.app/brief/acme-corp
          </div>
          <div className="ml-auto flex items-center gap-2 text-[10px] text-text-tertiary">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            Live
          </div>
        </div>

        {/* App body */}
        <div className="grid grid-cols-[140px_1fr]">
          {/* Sidebar */}
          <div className="border-r border-pastel-border bg-base/30 p-3 space-y-1">
            <div className="text-[9px] uppercase tracking-wider text-text-tertiary px-2 py-1.5">
              Brief Sections
            </div>
            {[
              { label: "Overview", active: false },
              { label: "Financial", active: true },
              { label: "Operational", active: false },
              { label: "Risk Score", active: false },
              { label: "Sources", active: false },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] ${
                  item.active
                    ? "bg-accent/10 text-accent border border-accent/20"
                    : "text-text-secondary"
                }`}
              >
                <FileText className="h-2.5 w-2.5" />
                {item.label}
                {item.active && <ChevronRight className="h-2.5 w-2.5 ml-auto" />}
              </div>
            ))}

            <div className="border-t border-pastel-border/50 my-3" />

            <div className="text-[9px] uppercase tracking-wider text-text-tertiary px-2 py-1.5">
              Documents
            </div>
            <div className="text-[10px] text-text-tertiary px-2 space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-accent" />
                <span className="truncate">FY24_10K.pdf</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-accent" />
                <span className="truncate">Q3_Report.xlsx</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-accent" />
                <span className="truncate">Cap_Table.pdf</span>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="p-5 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="text-[9px] uppercase tracking-[1.5px] text-accent mb-1">
                  Financial Analysis
                </p>
                <h3 className="font-heading text-base text-white">
                  Acme Corp · DD Brief
                </h3>
              </div>
              <span className="rounded-md bg-green-400/10 px-2 py-0.5 text-[9px] text-green-400 border border-green-400/20">
                COMPLETE
              </span>
            </div>

            {/* Top metrics row */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { label: "Revenue TTM", value: "$612M", color: "#C8A2FF" },
                { label: "EBITDA", value: "8.7%", color: "#8B5CF6" },
                { label: "ND/EBITDA", value: "2.1x", color: "#C8A2FF" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="rounded-lg border border-pastel-border bg-base/50 p-2.5"
                >
                  <p className="text-[8px] uppercase tracking-wider text-text-tertiary">
                    {m.label}
                  </p>
                  <p className="font-heading text-sm text-white mt-0.5">
                    {m.value}
                  </p>
                  <div className="mt-1.5 -mx-1">
                    <Sparkline
                      data={[10, 14, 12, 18, 16, 22, 28, 26, 32]}
                      color={m.color}
                      width={80}
                      height={20}
                      animate={false}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Big visual: chart + risk gauge */}
            <div className="grid grid-cols-[1fr_auto] gap-4 mb-4">
              {/* Revenue trend */}
              <div className="rounded-lg border border-pastel-border bg-base/50 p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[9px] uppercase tracking-wider text-text-tertiary">
                    Revenue Trend (3Y)
                  </p>
                  <span className="flex items-center gap-1 text-[9px] text-green-400">
                    <TrendingUp className="h-2.5 w-2.5" />
                    +12.4% CAGR
                  </span>
                </div>
                <Sparkline
                  data={[
                    32, 38, 35, 42, 48, 44, 52, 58, 54, 62, 68, 64, 72, 78, 84,
                  ]}
                  color="#C8A2FF"
                  width={240}
                  height={50}
                />
              </div>
              {/* Risk score */}
              <div className="rounded-lg border border-pastel-border bg-base/50 p-2 flex items-center justify-center">
                <Donut value={87} size={64} strokeWidth={5} label="Score" />
              </div>
            </div>

            {/* Findings */}
            <div className="space-y-1.5 mb-4">
              <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-text-tertiary">
                <span>Key Findings</span>
                <span>4 flagged</span>
              </div>
              {[
                {
                  text: "Revenue concentration: top 3 customers = 42%",
                  severity: "amber",
                  page: "p.24",
                },
                {
                  text: "Working capital cycle improved 18 days YoY",
                  severity: "green",
                  page: "p.41",
                },
              ].map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.6 + i * 0.15, ease }}
                  className="flex items-center gap-2 rounded-lg border border-pastel-border/50 bg-base/30 px-2.5 py-2"
                >
                  <span
                    className={`h-1 w-1 rounded-full ${
                      f.severity === "amber" ? "bg-amber-400" : "bg-green-400"
                    }`}
                  />
                  <span className="text-[10px] text-text-secondary flex-1 truncate">
                    {f.text}
                  </span>
                  <span className="text-[9px] text-accent/70 rounded bg-accent/10 px-1.5 py-0.5 border border-accent/10">
                    {f.page}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Query bar */}
            <div className="flex items-center gap-2 rounded-xl border border-accent/20 bg-base/50 px-3 py-2.5">
              <Search className="h-3 w-3 text-accent/60" />
              <span className="text-[11px] text-text-tertiary">
                Ask anything about this brief...
              </span>
              <span className="h-3 w-px bg-accent animate-blink-cursor ml-auto" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
