"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkline, Donut, BarChart, RiskGauge } from "./charts"
import { BorderBeam } from "./ui/border-beam"
import {
  IconShield,
  IconSpark,
  IconFlag,
  IconBrief,
  IconSearch,
  IconTrendUp,
  IconChart,
  IconOps,
  IconSource,
} from "./icons"

const ease = [0.25, 0.1, 0.25, 1] as const

const tabs = [
  { label: "Overview", icon: IconBrief },
  { label: "Financial", icon: IconChart },
  { label: "Operational", icon: IconOps },
  { label: "Risk Score", icon: IconShield },
  { label: "Sources", icon: IconSource },
] as const

type TabLabel = (typeof tabs)[number]["label"]

/* ─── Tab content panels ─── */

function OverviewPanel() {
  return (
    <>
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-[9px] uppercase tracking-[1.5px] text-accent mb-1 font-semibold">
            Executive Summary
          </p>
          <h3 className="font-heading text-base text-text-primary">
            Acme Corp · DD Brief
          </h3>
        </div>
        <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[9px] text-emerald-700 border border-emerald-200 font-medium">
          COMPLETE
        </span>
      </div>

      <div className="rounded-lg border border-pastel-border bg-base/50 p-3 mb-4">
        <p className="text-[10px] text-text-secondary leading-relaxed">
          Acme Corp is a mid-market SaaS provider with $612M TTM revenue,
          demonstrating consistent double-digit growth over 3 years.
          The company shows strong unit economics offset by moderate customer
          concentration risk and an elevated net-debt position.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-4">
        {[
          { label: "Revenue", value: "$612M" },
          { label: "Growth", value: "+12.4%" },
          { label: "Risk Score", value: "87/100" },
          { label: "Flags", value: "4" },
        ].map((m) => (
          <div
            key={m.label}
            className="rounded-lg border border-pastel-border bg-base/50 p-2 text-center"
          >
            <p className="text-[8px] uppercase tracking-wider text-text-tertiary font-medium">
              {m.label}
            </p>
            <p className="font-heading text-sm text-text-primary mt-0.5">
              {m.value}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-1.5 mb-4">
        <p className="text-[9px] uppercase tracking-wider text-text-tertiary font-medium">
          Brief Highlights
        </p>
        {[
          "Strong revenue growth trajectory with 12.4% 3Y CAGR",
          "Customer concentration warrants monitoring: top 3 at 42%",
          "Working capital cycle improved 18 days year-over-year",
          "Net debt / EBITDA at 2.1x: within acceptable range",
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-lg border border-pastel-border bg-base/40 px-2.5 py-2"
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                i === 1 ? "bg-amber-500" : "bg-emerald-500"
              }`}
            />
            <span className="text-[10px] text-text-secondary flex-1 truncate">
              {item}
            </span>
          </div>
        ))}
      </div>
    </>
  )
}

function FinancialPanel() {
  return (
    <>
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-[9px] uppercase tracking-[1.5px] text-accent mb-1 font-semibold">
            Financial Analysis
          </p>
          <h3 className="font-heading text-base text-text-primary">
            Acme Corp · DD Brief
          </h3>
        </div>
        <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[9px] text-emerald-700 border border-emerald-200 font-medium">
          COMPLETE
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: "Revenue TTM", value: "$612M", color: "#7C3AED" },
          { label: "EBITDA", value: "8.7%", color: "#A855F7" },
          { label: "ND/EBITDA", value: "2.1x", color: "#7C3AED" },
        ].map((m) => (
          <div
            key={m.label}
            className="rounded-lg border border-pastel-border bg-base/50 p-2.5"
          >
            <p className="text-[8px] uppercase tracking-wider text-text-tertiary font-medium">
              {m.label}
            </p>
            <p className="font-heading text-sm text-text-primary mt-0.5">
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

      <div className="grid grid-cols-[1fr_auto] gap-4 mb-4">
        <div className="rounded-lg border border-pastel-border bg-base/50 p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[9px] uppercase tracking-wider text-text-tertiary font-medium">
              Revenue Trend (3Y)
            </p>
            <span className="flex items-center gap-1 text-[9px] text-emerald-600 font-medium">
              <IconTrendUp size={10} />
              +12.4% CAGR
            </span>
          </div>
          <Sparkline
            data={[32, 38, 35, 42, 48, 44, 52, 58, 54, 62, 68, 64, 72, 78, 84]}
            color="#7C3AED"
            width={240}
            height={50}
          />
        </div>
        <div className="rounded-lg border border-pastel-border bg-base/50 p-2 flex items-center justify-center">
          <Donut value={87} size={64} strokeWidth={5} label="Score" />
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-text-tertiary font-medium">
          <span>Key Findings</span>
          <span>4 flagged</span>
        </div>
        {[
          { text: "Revenue concentration: top 3 customers = 42%", severity: "amber", page: "p.24" },
          { text: "Working capital cycle improved 18 days YoY", severity: "green", page: "p.41" },
        ].map((f, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-lg border border-pastel-border bg-base/40 px-2.5 py-2"
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                f.severity === "amber" ? "bg-amber-500" : "bg-emerald-500"
              }`}
            />
            <span className="text-[10px] text-text-secondary flex-1 truncate">
              {f.text}
            </span>
            <span className="text-[9px] text-accent rounded bg-accent/10 px-1.5 py-0.5 border border-accent/15 font-medium">
              {f.page}
            </span>
          </div>
        ))}
      </div>
    </>
  )
}

function OperationalPanel() {
  return (
    <>
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-[9px] uppercase tracking-[1.5px] text-accent mb-1 font-semibold">
            Operational Review
          </p>
          <h3 className="font-heading text-base text-text-primary">
            Acme Corp · DD Brief
          </h3>
        </div>
        <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[9px] text-emerald-700 border border-emerald-200 font-medium">
          COMPLETE
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: "Headcount", value: "1,240" },
          { label: "Rev / Employee", value: "$494K" },
          { label: "Retention", value: "91%" },
        ].map((m) => (
          <div
            key={m.label}
            className="rounded-lg border border-pastel-border bg-base/50 p-2.5"
          >
            <p className="text-[8px] uppercase tracking-wider text-text-tertiary font-medium">
              {m.label}
            </p>
            <p className="font-heading text-sm text-text-primary mt-0.5">
              {m.value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-pastel-border bg-base/50 p-3 mb-4">
        <p className="text-[9px] uppercase tracking-wider text-text-tertiary font-medium mb-2">
          Department Spend Breakdown
        </p>
        <BarChart
          data={[
            { label: "Eng", value: 38, color: "#7C3AED" },
            { label: "Sales", value: 26, color: "#A855F7" },
            { label: "Ops", value: 18, color: "#C084FC" },
            { label: "G&A", value: 12, color: "#DDD6FE" },
            { label: "R&D", value: 6, color: "#EDE9FE" },
          ]}
          height={50}
        />
      </div>

      <div className="space-y-1.5">
        <p className="text-[9px] uppercase tracking-wider text-text-tertiary font-medium">
          Key Findings
        </p>
        {[
          { text: "Key person dependency on CTO: no succession plan", severity: "amber", page: "p.58" },
          { text: "3 vendor contracts expire within 90 days", severity: "amber", page: "p.63" },
          { text: "Engineering velocity above industry median", severity: "green", page: "p.71" },
        ].map((f, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-lg border border-pastel-border bg-base/40 px-2.5 py-2"
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                f.severity === "amber" ? "bg-amber-500" : "bg-emerald-500"
              }`}
            />
            <span className="text-[10px] text-text-secondary flex-1 truncate">
              {f.text}
            </span>
            <span className="text-[9px] text-accent rounded bg-accent/10 px-1.5 py-0.5 border border-accent/15 font-medium">
              {f.page}
            </span>
          </div>
        ))}
      </div>
    </>
  )
}

function RiskScorePanel() {
  return (
    <>
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-[9px] uppercase tracking-[1.5px] text-accent mb-1 font-semibold">
            Risk Assessment
          </p>
          <h3 className="font-heading text-base text-text-primary">
            Acme Corp · DD Brief
          </h3>
        </div>
        <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[9px] text-emerald-700 border border-emerald-200 font-medium">
          LOW RISK
        </span>
      </div>

      <div className="flex justify-center mb-4">
        <RiskGauge value={87} label="Overall Score" />
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {[
          { label: "Financial Risk", value: 82 },
          { label: "Operational Risk", value: 74 },
          { label: "Market Risk", value: 91 },
          { label: "Compliance Risk", value: 95 },
        ].map((r) => (
          <div
            key={r.label}
            className="rounded-lg border border-pastel-border bg-base/50 p-2.5"
          >
            <p className="text-[8px] uppercase tracking-wider text-text-tertiary font-medium">
              {r.label}
            </p>
            <div className="flex items-center gap-2 mt-1.5">
              <div className="flex-1 h-1.5 rounded-full bg-pastel-border overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${r.value}%`,
                    background:
                      r.value >= 85
                        ? "#10B981"
                        : r.value >= 70
                          ? "#F59E0B"
                          : "#EF4444",
                  }}
                />
              </div>
              <span className="text-[10px] font-heading text-text-primary">
                {r.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-1.5">
        <p className="text-[9px] uppercase tracking-wider text-text-tertiary font-medium">
          Flagged Risks
        </p>
        {[
          { text: "Customer concentration above 40% threshold", severity: "amber", page: "p.24" },
          { text: "Key person risk: CTO has no deputy", severity: "amber", page: "p.58" },
          { text: "3 vendor contracts nearing expiry", severity: "amber", page: "p.63" },
          { text: "Debt covenants within 15% of trigger", severity: "amber", page: "p.34" },
        ].map((f, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-lg border border-pastel-border bg-base/40 px-2.5 py-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            <span className="text-[10px] text-text-secondary flex-1 truncate">
              {f.text}
            </span>
            <span className="text-[9px] text-accent rounded bg-accent/10 px-1.5 py-0.5 border border-accent/15 font-medium">
              {f.page}
            </span>
          </div>
        ))}
      </div>
    </>
  )
}

function SourcesPanel() {
  const sources = [
    { name: "FY24_10K.pdf", type: "Filing", pages: 142, refs: 38 },
    { name: "Q3_Report.xlsx", type: "Financial", pages: 24, refs: 22 },
    { name: "Cap_Table.pdf", type: "Legal", pages: 8, refs: 12 },
    { name: "Mgmt_Deck_2024.pdf", type: "Presentation", pages: 36, refs: 18 },
    { name: "Vendor_Contracts.zip", type: "Legal", pages: 94, refs: 9 },
    { name: "HR_Summary.xlsx", type: "Operational", pages: 12, refs: 14 },
  ]

  return (
    <>
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-[9px] uppercase tracking-[1.5px] text-accent mb-1 font-semibold">
            Source Documents
          </p>
          <h3 className="font-heading text-base text-text-primary">
            Acme Corp · DD Brief
          </h3>
        </div>
        <span className="rounded-md bg-accent/10 px-2 py-0.5 text-[9px] text-accent border border-accent/20 font-medium">
          6 FILES
        </span>
      </div>

      <div className="rounded-lg border border-pastel-border bg-base/50 p-3 mb-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { label: "Documents", value: "6" },
            { label: "Total Pages", value: "316" },
            { label: "Citations", value: "113" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-heading text-sm text-text-primary">{s.value}</p>
              <p className="text-[8px] uppercase tracking-wider text-text-tertiary font-medium mt-0.5">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <p className="text-[9px] uppercase tracking-wider text-text-tertiary font-medium">
          Indexed Files
        </p>
        {sources.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-lg border border-pastel-border bg-base/40 px-2.5 py-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-[10px] text-text-primary font-medium flex-1 truncate">
              {s.name}
            </span>
            <span className="text-[9px] text-text-tertiary">{s.pages}p</span>
            <span className="text-[9px] text-accent rounded bg-accent/10 px-1.5 py-0.5 border border-accent/15 font-medium">
              {s.refs} refs
            </span>
          </div>
        ))}
      </div>
    </>
  )
}

const panelComponents: Record<TabLabel, React.FC> = {
  Overview: OverviewPanel,
  Financial: FinancialPanel,
  Operational: OperationalPanel,
  "Risk Score": RiskScorePanel,
  Sources: SourcesPanel,
}

/**
 * The signature DD Brief dashboard mockup - light theme, interactive tabs.
 */
export function BriefMockup() {
  const [activeTab, setActiveTab] = useState<TabLabel>("Financial")
  const ActivePanel = panelComponents[activeTab]

  return (
    <div className="relative">
      {/* Outer glow */}
      <div className="absolute -inset-12 bg-[radial-gradient(ellipse_at_center,rgba(200,162,255,0.32)_0%,rgba(255,184,217,0.18)_35%,transparent_70%)] blur-2xl" />

      {/* Floating accent badges around the mockup */}
      <motion.div
        initial={{ opacity: 0, y: 20, x: -20 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.8, delay: 1, ease }}
        className="absolute -top-4 -left-8 z-20 flex items-center gap-2 rounded-full border border-emerald-200 bg-white/95 backdrop-blur-md px-3 py-1.5 shadow-pastel"
      >
        <IconShield size={12} className="text-emerald-600" />
        <span className="text-[11px] text-emerald-700 font-medium">
          Verified
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20, x: 20 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease }}
        className="absolute -top-2 -right-6 z-20 flex items-center gap-2 rounded-full border border-accent/30 bg-white/95 backdrop-blur-md px-3 py-1.5 shadow-pastel"
      >
        <IconSpark size={12} className="text-accent" />
        <span className="text-[11px] text-accent font-medium">AI Generated</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20, x: 20 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.8, delay: 1.4, ease }}
        className="absolute -bottom-3 -right-4 z-20 flex items-center gap-2 rounded-full border border-amber-200 bg-white/95 backdrop-blur-md px-3 py-1.5 shadow-pastel"
      >
        <IconFlag size={12} className="text-amber-600" />
        <span className="text-[11px] text-amber-700 font-medium">
          4 Risk Flags
        </span>
      </motion.div>

      {/* The mockup itself */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease }}
        className="relative rounded-3xl border border-pastel-border bg-white shadow-pastel-lg overflow-hidden"
      >
        <BorderBeam
          size={400}
          duration={7}
          colorFrom="#8DD0FF"
          colorTo="#C8A2FF"
          borderWidth={4}
        />
        <BorderBeam
          size={400}
          duration={7}
          delay={3.5}
          colorFrom="#FFB8D9"
          colorTo="#FFCFA0"
          borderWidth={4}
        />
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-pastel-border bg-base/60 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-pastel-border" />
            <div className="h-2.5 w-2.5 rounded-full bg-pastel-border" />
            <div className="h-2.5 w-2.5 rounded-full bg-pastel-border" />
          </div>
          <div className="ml-3 flex items-center gap-2 rounded-md border border-pastel-border bg-white px-2.5 py-1 text-[10px] text-text-tertiary">
            <IconShield size={10} className="text-accent" />
            pastel.app/brief/acme-corp
          </div>
          <div className="ml-auto flex items-center gap-2 text-[10px] text-text-tertiary">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </div>
        </div>

        {/* App body */}
        <div className="grid grid-cols-[150px_1fr]">
          {/* Sidebar */}
          <div className="border-r border-pastel-border bg-base/40 p-3 space-y-1">
            <div className="text-[9px] uppercase tracking-wider text-text-tertiary px-2 py-1.5 font-medium">
              Brief Sections
            </div>
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[11px] text-left transition-colors duration-200 ${
                  activeTab === tab.label
                    ? "bg-accent/10 text-accent border border-accent/20 font-medium"
                    : "text-text-secondary hover:bg-base/80 hover:text-text-primary border border-transparent"
                }`}
              >
                <tab.icon size={11} />
                {tab.label}
              </button>
            ))}

            <div className="border-t border-pastel-border my-3" />

            <div className="text-[9px] uppercase tracking-wider text-text-tertiary px-2 py-1.5 font-medium">
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

          {/* Main content - animated panel swap */}
          <div className="p-5 min-w-0 bg-white overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease }}
              >
                <ActivePanel />
              </motion.div>
            </AnimatePresence>

            {/* Query bar - always visible */}
            <div className="flex items-center gap-2 rounded-xl border border-accent/25 bg-accent/[0.04] px-3 py-2.5 mt-4">
              <IconSearch size={12} className="text-accent/80" />
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
