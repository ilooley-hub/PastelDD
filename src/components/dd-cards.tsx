"use client"

import { Shield, AlertTriangle, Clock } from "lucide-react"
import { motion } from "framer-motion"

const ease = [0.25, 0.1, 0.25, 1] as const

function DataRow({
  label,
  value,
  muted = false,
  highlight = false,
}: {
  label: string
  value: string
  muted?: boolean
  highlight?: boolean
}) {
  return (
    <div
      className={`flex items-center justify-between py-2.5 border-b border-pastel-border/30 last:border-0 ${
        muted ? "opacity-30" : ""
      }`}
    >
      <span className="text-[13px] text-text-secondary">{label}</span>
      <span
        className={`text-[13px] font-medium ${
          highlight
            ? "text-amber-400"
            : muted
              ? "text-text-tertiary"
              : "text-white"
        }`}
      >
        {value}
      </span>
    </div>
  )
}

function SourceTag({
  pages,
  color = "accent",
}: {
  pages: string
  color?: string
}) {
  const colorMap: Record<string, string> = {
    accent: "bg-accent/10 text-accent border-accent/20",
    deep: "bg-accent-deep/10 text-accent-deep border-accent-deep/20",
    muted: "bg-text-tertiary/10 text-text-tertiary border-text-tertiary/20",
  }
  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-1 text-[10px] font-medium border ${colorMap[color]}`}
    >
      {pages}
    </span>
  )
}

export function DDCards() {
  return (
    <div className="relative h-[520px]">
      {/* Card 3: Legal & Compliance (back) */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: 3 }}
        animate={{ opacity: 1, y: 0, rotate: 1 }}
        transition={{ duration: 0.9, delay: 0.4, ease }}
        className="absolute top-0 right-0 w-[310px]"
      >
        <div className="rounded-2xl border border-pastel-border/50 bg-surface/60 backdrop-blur-sm p-5 opacity-50 transition-all duration-500 hover:translate-y-[-4px] hover:opacity-60">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-sm text-white/80">
              Legal &amp; Compliance
            </h3>
            <span className="flex items-center gap-1.5 rounded-full bg-text-tertiary/10 px-2.5 py-1 text-[10px] font-medium text-text-tertiary border border-text-tertiary/20">
              <Clock className="h-2.5 w-2.5" />
              Coming Soon
            </span>
          </div>
          <div className="space-y-0">
            <DataRow label="Contract Review" value="Q4 2026" muted />
            <DataRow label="IP Portfolio Assessment" value="Q4 2026" muted />
            <DataRow label="Regulatory Risk Mapping" value="Q4 2026" muted />
          </div>
        </div>
      </motion.div>

      {/* Card 2: Operational Review (middle) */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: -1.5 }}
        transition={{ duration: 0.9, delay: 0.55, ease }}
        className="absolute top-[50px] right-[25px] w-[320px]"
      >
        <div className="rounded-2xl border border-pastel-border bg-surface backdrop-blur-sm p-5 shadow-[0_8px_40px_rgba(0,0,0,0.3)] transition-all duration-500 hover:translate-y-[-4px] hover:border-pastel-border-hover">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-sm text-white">
              Operational Review
            </h3>
            <span className="flex items-center gap-1.5 rounded-full bg-amber-400/10 px-2.5 py-1 text-[10px] font-medium text-amber-400 border border-amber-400/20">
              <AlertTriangle className="h-2.5 w-2.5" />
              4 flags
            </span>
          </div>
          <div className="space-y-0">
            <DataRow
              label="Vendor Concentration"
              value="High (top 3 = 68%)"
              highlight
            />
            <DataRow label="Process Automation Rate" value="34%" />
            <DataRow label="Headcount Efficiency" value="$187K/FTE" />
            <DataRow
              label="Key Person Dependency"
              value="Elevated"
              highlight
            />
          </div>
          <div className="mt-4">
            <SourceTag pages="pg. 48-89" color="deep" />
          </div>
        </div>
      </motion.div>

      {/* Card 1: Financial Analysis (front) */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: 0 }}
        animate={{ opacity: 1, y: 0, rotate: 2 }}
        transition={{ duration: 0.9, delay: 0.7, ease }}
        className="absolute top-[100px] right-[50px] w-[340px]"
      >
        <div className="relative rounded-2xl border border-accent/20 bg-surface p-6 shadow-[0_12px_50px_rgba(200,162,255,0.08),0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-500 hover:translate-y-[-4px] hover:shadow-[0_20px_60px_rgba(200,162,255,0.12),0_4px_20px_rgba(0,0,0,0.3)] hover:border-accent/30">
          {/* Subtle inner glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/[0.03] to-transparent pointer-events-none" />

          <div className="relative">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-heading text-base text-white">
                Financial Analysis
              </h3>
              <span className="flex items-center gap-1.5 rounded-full bg-green-400/10 px-2.5 py-1 text-[10px] font-medium text-green-400 border border-green-400/20">
                <Shield className="h-2.5 w-2.5" />
                Verified
              </span>
            </div>
            <div className="space-y-0">
              <DataRow label="Revenue (TTM)" value="$612.4M" />
              <DataRow label="EBITDA Margin" value="8.7%" />
              <DataRow label="Net Debt / EBITDA" value="2.1x" />
              <DataRow label="Revenue Concentration" value="Medium" />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <SourceTag pages="pg. 12-47" color="accent" />
            </div>

            {/* Query bar */}
            <div className="mt-5 flex items-center gap-2 rounded-xl bg-base border border-pastel-border px-4 py-3 transition-all duration-300 hover:border-accent/30">
              <span className="text-[13px] text-text-tertiary">
                Ask anything about this brief...
              </span>
              <span className="h-4 w-0.5 bg-accent animate-blink-cursor ml-auto rounded-full" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
