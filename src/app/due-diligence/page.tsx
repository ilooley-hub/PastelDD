"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bar, Line } from "react-chartjs-2"
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  LineController,
  BarController,
  Tooltip,
  Filler,
} from "chart.js"
import {
  Inbox,
  Network,
  FileText,
  MessageSquareText,
  Scale,
  Briefcase,
  Wallet,
} from "lucide-react"
import { Nav } from "@/components/layout/Nav"
import { Footer } from "@/components/layout/Footer"
import { CtaBlock } from "@/components/sections/CtaBlock"
import { HaloCta, GhostCta } from "@/components/ui/Buttons"
import { SeverityTag } from "@/components/ui/SeverityTag"
import {
  CHART_TEXT,
  CHART_GRID,
  CHART_BORDER,
  CHART_SERIES,
} from "@/lib/chartConfig"

Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  LineController,
  BarController,
  Tooltip,
  Filler
)

function Divider() {
  return (
    <div className="px-12">
      <div className="section-divider" />
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// 1. HERO
// ────────────────────────────────────────────────────────────────────────────

const VDR_DOCS = [
  { label: "MSA_NorthStar.pdf", color: "#50C7FA" },
  { label: "Cap_Table_v7.xlsx", color: "#A7DFD8" },
  { label: "QoE_Pack_FY25.pdf", color: "#FFE9B8" },
  { label: "Board_Deck_Q3.pptx", color: "#FFD3B0" },
  { label: "AR_aging_export.csv", color: "#C4A7E7" },
]

function FloatingDoc({
  label,
  color,
  index,
}: {
  label: string
  color: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
      className="absolute"
      style={{
        left: `${index * 8 + 4}%`,
        top: `${(index % 3) * 14 + 4}%`,
      }}
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 4 + index * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.2,
        }}
        className="flex items-center gap-2 rounded-[8px] border bg-white px-3 py-2"
        style={{
          borderColor: "#DEDBD2",
          boxShadow:
            "0 2px 6px rgba(20,19,28,0.04), inset 0 1px 0 rgba(255,255,255,0.8)",
        }}
      >
        <span
          className="inline-flex h-5 w-5 items-center justify-center rounded-[4px]"
          style={{ backgroundColor: `${color}30` }}
        >
          <FileText size={11} color={color.replace(/^#/, "#")} strokeWidth={2.4} />
        </span>
        <span className="font-mono text-[11px] text-fg-2">{label}</span>
      </motion.div>
    </motion.div>
  )
}

function HeroVisual() {
  return (
    <div className="relative h-[440px] w-full">
      {/* Top: VDR documents stratum */}
      <div className="absolute inset-x-0 top-0 h-[42%]">
        <div className="absolute left-3 top-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-fg-3">
          VDR · 4,612 docs
        </div>
        {VDR_DOCS.map((d, i) => (
          <FloatingDoc key={d.label} {...d} index={i} />
        ))}
        {/* Particles flowing down */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 15}%`,
              top: "60%",
              width: 5,
              height: 5,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, #C4A7E7, rgba(196,167,231,0.5))",
              boxShadow: "0 0 8px rgba(196,167,231,0.7)",
            }}
            animate={{
              top: ["60%", "180%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2.4,
              delay: i * 0.4,
              repeat: Infinity,
              ease: "easeIn",
            }}
          />
        ))}
      </div>

      {/* Middle: Pastel orb */}
      <div className="absolute left-1/2 top-[44%] -translate-x-1/2">
        <div className="relative" style={{ width: 96, height: 96 }}>
          <motion.div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              inset: -28,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(196,167,231,0.42) 0%, rgba(80,199,250,0.22) 45%, transparent 75%)",
              filter: "blur(12px)",
            }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.65, 1, 0.65] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/query-orb.png"
            alt=""
            draggable={false}
            style={{
              width: 96,
              height: 96,
              objectFit: "contain",
              position: "relative",
              display: "block",
            }}
          />
        </div>
      </div>

      {/* Bottom: Brief output */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 px-2"
      >
        <div
          className="rounded-[12px] border bg-white p-4"
          style={{
            borderColor: "#DEDBD2",
            boxShadow:
              "0 12px 32px rgba(20,19,28,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-fg-3">
              Investment brief · ready
            </div>
            <span className="rounded-[3px] bg-halo-linear px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em]" style={{ color: "#1A1228" }}>
              48h
            </span>
          </div>
          <div
            className="mt-2 text-[15px] font-bold leading-tight text-fg-1"
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontVariationSettings: "'opsz' 32",
              letterSpacing: "-0.015em",
            }}
          >
            17 material findings
          </div>
          <ul className="mt-3 flex flex-col gap-1.5 text-[12px]">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "#C8333A" }} />
              <span className="text-fg-2">CPI uplifts un-applied · $14.6M EV impact</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "#C8333A" }} />
              <span className="text-fg-2">Customer concentration · top 3 = 38% ARR</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "#B5781A" }} />
              <span className="text-fg-2">CoC clauses triggered in 14 of 312 MSAs</span>
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  )
}

function DiligenceHero() {
  return (
    <section
      className="relative overflow-hidden px-12"
      style={{ paddingTop: 72, paddingBottom: 56, minHeight: "76vh" }}
    >
      {/* Soft halo wash at top right */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          right: -100,
          top: -120,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(196,167,231,0.32) 0%, rgba(80,199,250,0.18) 45%, transparent 75%)",
          filter: "blur(20px)",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-[1280px] items-center gap-12 md:grid-cols-[6fr_5fr] md:gap-16">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="display-headline-xl"
            style={{ fontSize: "clamp(44px, 6.5vw, 84px)", overflow: "visible" }}
          >
            <span className="block">From data room</span>
            <span
              className="block display-italic"
              style={{ lineHeight: 1.18, paddingBottom: "0.22em" }}
            >
              to investment committee.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="mt-8 max-w-[520px] text-[18px] leading-[1.55] text-fg-2"
          >
            Pastel ingests the VDR, builds the deal ontology, and produces a
            brief your committee can defend. In 48 hours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            <HaloCta href="#contact">Request access</HaloCta>
            <GhostCta href="#how-it-works">See how it works →</GhostCta>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// 2. PIPELINE STEPPER
// ────────────────────────────────────────────────────────────────────────────

const PIPELINE = [
  {
    id: "ingest",
    icon: Inbox,
    title: "Ingest",
    body: "VDR, financials, contracts, captable. Pastel parses every document.",
  },
  {
    id: "map",
    icon: Network,
    title: "Map",
    body: "Counterparties, contracts, invoices, revenue. The deal ontology forms.",
  },
  {
    id: "brief",
    icon: FileText,
    title: "Brief",
    body: "Material findings surface against canonical playbooks. Quantified.",
  },
  {
    id: "query",
    icon: MessageSquareText,
    title: "Query",
    body: "Ask anything of the deal. Cited answer back, traceable to source.",
  },
]

const PIPELINE_INTERVAL = 4200

function PipelineStepper() {
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % PIPELINE.length),
      PIPELINE_INTERVAL
    )
    return () => clearInterval(id)
  }, [])

  const display = hovered ?? active

  return (
    <section id="how-it-works" className="px-12 py-14">
      <div className="mx-auto max-w-[1080px]">
        <h2
          className="max-w-[760px] display-headline"
          style={{ fontSize: "clamp(32px, 4.2vw, 52px)" }}
        >
          From VDR to committee brief.{" "}
          <span className="display-italic">In four moves.</span>
        </h2>

        <div className="mt-14 relative">
          {/* Connector line */}
          <div
            aria-hidden
            className="absolute left-[36px] right-[36px] top-[28px] h-px"
            style={{ backgroundColor: "#DEDBD2" }}
          />
          {/* Animated halo gradient line */}
          <motion.div
            aria-hidden
            className="absolute left-[36px] top-[28px] h-px origin-left"
            style={{
              right: `${36 + (PIPELINE.length - 1 - active) * (100 / PIPELINE.length) * (PIPELINE.length / (PIPELINE.length - 1) - 1) * 0}px`,
              background:
                "linear-gradient(to right, #7B5BD6, #50C7FA, #C4A7E7, #FFD3B0)",
              width: `calc((100% - 72px) * ${(active + 1) / PIPELINE.length})`,
            }}
            initial={false}
            animate={{ width: `calc((100% - 72px) * ${(active + 1) / PIPELINE.length})` }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Steps */}
          <div className="relative grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-y-0">
            {PIPELINE.map((step, i) => {
              const Icon = step.icon
              const isActive = display === i
              const isPast = active > i
              return (
                <button
                  key={step.id}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setActive(i)}
                  className="group relative flex flex-col items-center text-center"
                  type="button"
                >
                  <motion.span
                    className="relative inline-flex items-center justify-center rounded-full"
                    style={{
                      width: 56,
                      height: 56,
                      backgroundColor: isActive
                        ? "#FFFFFF"
                        : isPast
                          ? "#FFFFFF"
                          : "#FBFAF6",
                      border: `1px solid ${isActive || isPast ? "#C4A7E7" : "#DEDBD2"}`,
                      boxShadow: isActive
                        ? "0 0 0 6px rgba(196,167,231,0.18), 0 4px 12px rgba(123,91,214,0.16)"
                        : "0 1px 2px rgba(20,19,28,0.04)",
                    }}
                    animate={{ scale: isActive ? 1.06 : 1 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Icon
                      size={20}
                      color={isActive || isPast ? "#7B5BD6" : "#76737F"}
                      strokeWidth={2.2}
                    />
                    {isActive && (
                      <motion.span
                        aria-hidden
                        className="absolute inset-0 rounded-full"
                        style={{ border: "1px solid #C4A7E7" }}
                        animate={{
                          scale: [1, 1.6],
                          opacity: [0.6, 0],
                        }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                    )}
                  </motion.span>

                  <div
                    className="mt-4 text-[17px] font-bold tracking-[-0.01em]"
                    style={{
                      fontFamily: "var(--font-display), Georgia, serif",
                      fontVariationSettings: "'opsz' 36",
                      color: isActive ? "#14131C" : isPast ? "#4A4858" : "#76737F",
                    }}
                  >
                    {step.title}
                  </div>

                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.p
                        key={step.id}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -2 }}
                        transition={{ duration: 0.35 }}
                        className="mt-2 max-w-[200px] text-[13px] leading-[1.5] text-fg-2"
                      >
                        {step.body}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// 3. FINDINGS · auto-cycling Financial / Legal / Operational
// ────────────────────────────────────────────────────────────────────────────

type FindingItem = {
  title: string
  body: string
  impact: string
  severity: "high" | "medium" | "low"
}

type FindingCategory = {
  id: "financial" | "legal" | "operational"
  label: string
  icon: typeof Wallet
  caption: string
  findings: FindingItem[]
}

const FINDING_CATEGORIES: FindingCategory[] = [
  {
    id: "financial",
    label: "Financial",
    icon: Wallet,
    caption: "Earnings quality, NWC manipulation, revenue recognition.",
    findings: [
      {
        title: "Revenue leakage from un-applied CPI escalators",
        body: "18 of 312 active MSAs carry a 5% mandated annual uplift, renewed at flat invoiced rates over the trailing 24 months. NRR overstated by ~3.1pts.",
        impact: "$1.24M ARR · $14.6M EV impact",
        severity: "high",
      },
      {
        title: "Setup fees recognised at invoice, not deferred",
        body: "$680K of one-time implementation fees recognised immediately upon billing across 41 enterprise deals. EBITDA overstated 14.2%.",
        impact: "Restate: -$1.88M EBITDA",
        severity: "high",
      },
      {
        title: "DSO compressed sharply pre-LOI",
        body: "DSO dropped from 58 to 45 days across Q3-Q4 while DPO expanded from 32 to 47. Pattern suggests collection and payment timing engineered to inflate cash at close.",
        impact: "NWC peg revised +$1.7M",
        severity: "medium",
      },
    ],
  },
  {
    id: "legal",
    label: "Legal",
    icon: Scale,
    caption: "Change-of-control, indemnities, contract risk concentration.",
    findings: [
      {
        title: "Change-of-control triggers in 14 of 312 MSAs",
        body: "Top 5 customers (44% of ARR) carry CoC clauses allowing termination without penalty on a private-equity acquisition.",
        impact: "$8.4M ARR exposed at close",
        severity: "high",
      },
      {
        title: "Indemnity caps below market in 9 contracts",
        body: "Indemnity capped at 1× annual fees vs the typical 2× cap, exposing the buyer to disproportionate risk in any post-close dispute.",
        impact: "Indemnity exposure · $2.1M",
        severity: "medium",
      },
      {
        title: "Auto-renewal terms inconsistent with master template",
        body: "23 contracts diverge from the standard MSA renewal language, creating leverage for customers to dispute pricing on renewal.",
        impact: "Pricing risk · 7 enterprise accts",
        severity: "medium",
      },
    ],
  },
  {
    id: "operational",
    label: "Operational",
    icon: Briefcase,
    caption: "Concentration risk, key-person exposure, capacity constraints.",
    findings: [
      {
        title: "Customer concentration above segment threshold",
        body: "Top 3 customers account for 38% of ARR. Loss of any one drops ARR below the covenant baseline modelled in the LOI.",
        impact: "Concentration · 38% top-3",
        severity: "high",
      },
      {
        title: "Two-thirds of ARR depends on three sales engineers",
        body: "Solutions architects on the top 8 enterprise accounts overlap to 3 individuals, all in the same office, none with retention agreements past Year 1.",
        impact: "Key-person risk · $12.8M ARR",
        severity: "high",
      },
      {
        title: "Deployment velocity uneven across regions",
        body: "EMEA and APAC production deployments lag US by 4-6 weeks on average, indicating capacity constraints likely to slow the post-close expansion plan.",
        impact: "Expansion lag · 4-6 weeks",
        severity: "medium",
      },
    ],
  },
]

const FINDINGS_INTERVAL = 6500

function MiniFindingCard({ f }: { f: FindingItem }) {
  return (
    <div
      className="card-surface card-surface-hover rounded-[10px] p-5"
      style={{ minHeight: 200 }}
    >
      <SeverityTag severity={f.severity} />
      <h3
        className="mt-3 text-[16px] font-bold leading-[1.3] text-fg-1"
        style={{
          fontFamily: "var(--font-display), Georgia, serif",
          fontVariationSettings: "'opsz' 36",
          letterSpacing: "-0.01em",
        }}
      >
        {f.title}
      </h3>
      <p className="mt-2 text-[13px] leading-[1.55] text-fg-2">{f.body}</p>
      <div
        className="mt-4 inline-flex items-center rounded-[6px] border px-2.5 py-1 text-[11px] font-semibold num-tabular"
        style={{
          backgroundColor:
            f.severity === "high"
              ? "rgba(200,51,58,0.06)"
              : "rgba(181,120,26,0.06)",
          color: f.severity === "high" ? "#C8333A" : "#B5781A",
          borderColor:
            f.severity === "high"
              ? "rgba(200,51,58,0.20)"
              : "rgba(181,120,26,0.20)",
        }}
      >
        {f.impact}
      </div>
    </div>
  )
}

function FindingsCycler() {
  const [active, setActive] = useState<FindingCategory["id"]>("financial")
  const [cycling, setCycling] = useState(true)
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!cycling) return
    const id = setInterval(() => {
      setActive((curr) => {
        const idx = FINDING_CATEGORIES.findIndex((c) => c.id === curr)
        return FINDING_CATEGORIES[(idx + 1) % FINDING_CATEGORIES.length].id
      })
    }, FINDINGS_INTERVAL)
    return () => clearInterval(id)
  }, [cycling])

  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current)
    }
  }, [])

  const handleSelect = (id: FindingCategory["id"]) => {
    setActive(id)
    setCycling(false)
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current)
    pauseTimerRef.current = setTimeout(() => setCycling(true), 18000)
  }

  const category =
    FINDING_CATEGORIES.find((c) => c.id === active) ?? FINDING_CATEGORIES[0]

  return (
    <section className="px-12 py-14">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid items-end gap-6 md:grid-cols-[1fr_auto] md:gap-12">
          <h2
            className="max-w-[640px] display-headline"
            style={{ fontSize: "clamp(32px, 4.2vw, 52px)" }}
          >
            Three lenses on the deal.{" "}
            <span className="display-italic">One brief.</span>
          </h2>
          <p className="max-w-[420px] text-[15px] leading-[1.55] text-fg-2 md:text-right">
            Pastel categorises every material finding across the three angles
            your committee asks about.
          </p>
        </div>

        <div
          className="mt-12 overflow-hidden rounded-[14px] border bg-white"
          style={{
            borderColor: "#DEDBD2",
            boxShadow:
              "0 8px 24px rgba(20,19,28,0.06), inset 0 1px 0 rgba(255,255,255,0.6)",
          }}
        >
          <div className="grid md:grid-cols-[260px_1fr]">
            {/* Sidebar */}
            <div
              className="flex shrink-0 flex-col border-b md:border-b-0 md:border-r"
              style={{ borderColor: "#ECEAE3", backgroundColor: "#FBFAF6" }}
            >
              <div className="hidden px-5 pb-3 pt-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-fg-3 md:block">
                Findings
              </div>
              <div className="flex flex-row gap-1 overflow-x-auto p-2 md:flex-col md:gap-1 md:p-2">
                {FINDING_CATEGORIES.map((c) => {
                  const Icon = c.icon
                  const isActive = c.id === active
                  return (
                    <button
                      key={c.id}
                      onClick={() => handleSelect(c.id)}
                      className="group relative flex shrink-0 items-start gap-3 overflow-hidden rounded-[8px] px-3 py-3 text-left transition-colors md:shrink"
                      style={{
                        backgroundColor: isActive ? "#FFFFFF" : "transparent",
                        boxShadow: isActive
                          ? "0 1px 2px rgba(20,19,28,0.04), inset 0 0 0 1px #ECEAE3"
                          : "none",
                      }}
                      type="button"
                    >
                      <span
                        className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                        style={{
                          backgroundColor: isActive
                            ? "rgba(123,91,214,0.10)"
                            : "#FFFFFF",
                          border: "1px solid #ECEAE3",
                        }}
                      >
                        <Icon
                          size={14}
                          color={isActive ? "#7B5BD6" : "#76737F"}
                          strokeWidth={2.2}
                        />
                      </span>
                      <span className="flex flex-col">
                        <span
                          className="text-[14px] font-semibold tracking-[-0.005em] whitespace-nowrap"
                          style={{ color: isActive ? "#14131C" : "#4A4858" }}
                        >
                          {c.label}
                        </span>
                        <span className="hidden text-[12px] text-fg-3 md:block">
                          {c.findings.length} findings
                        </span>
                      </span>

                      {isActive && cycling && (
                        <motion.span
                          key={c.id}
                          aria-hidden
                          className="pointer-events-none absolute bottom-0 left-0 h-[2px] origin-left"
                          style={{
                            background:
                              "linear-gradient(to right, #7B5BD6, #50C7FA, #C4A7E7)",
                            width: "100%",
                          }}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{
                            duration: FINDINGS_INTERVAL / 1000,
                            ease: "linear",
                          }}
                        />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Main panel */}
            <div className="flex flex-col" style={{ backgroundColor: "#F8F7F4" }}>
              <div
                className="flex flex-wrap items-start justify-between gap-3 border-b px-6 py-5"
                style={{ borderColor: "#ECEAE3" }}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md"
                    style={{
                      backgroundColor: "rgba(123,91,214,0.08)",
                      border: "1px solid #ECEAE3",
                    }}
                  >
                    <category.icon size={16} color="#7B5BD6" strokeWidth={2.2} />
                  </span>
                  <div>
                    <div
                      className="text-[20px] font-bold leading-tight tracking-[-0.01em] text-fg-1"
                      style={{
                        fontFamily: "var(--font-display), Georgia, serif",
                        fontVariationSettings: "'opsz' 36",
                      }}
                    >
                      {category.label}
                    </div>
                    <div className="mt-1 text-[13px] text-fg-2">
                      {category.caption}
                    </div>
                  </div>
                </div>
                <div className="text-[11px] font-mono uppercase tracking-[0.1em] text-fg-3">
                  {category.findings.length} findings
                </div>
              </div>

              <div className="px-5 py-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="grid gap-3 md:grid-cols-3"
                  >
                    {category.findings.map((f, i) => (
                      <motion.div
                        key={`${active}-${i}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 * i, duration: 0.35 }}
                      >
                        <MiniFindingCard f={f} />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// 4. METRICS feature row · SaaS-style (heading left, chart right, auto-cycle)
// ────────────────────────────────────────────────────────────────────────────

const METRIC_VIEWS = [
  {
    id: "ebitda",
    title: "EBITDA bridge · reported to adjusted",
    meta: "FY2025 · $M",
    kpis: [
      { label: "Reported", value: "$14.2M" },
      { label: "Adjusted", value: "$11.6M" },
      { label: "Adjustments", value: "12" },
    ],
  },
  {
    id: "concentration",
    title: "Customer concentration · top 10",
    meta: "% of ARR",
    kpis: [
      { label: "Top 1", value: "16%" },
      { label: "Top 3", value: "38%" },
      { label: "Top 10", value: "62%" },
    ],
  },
  {
    id: "nwc",
    title: "Working capital movement · 12 months",
    meta: "trailing · $M",
    kpis: [
      { label: "DSO", value: "47 d" },
      { label: "DPO", value: "38 d" },
      { label: "Cash conv.", value: "94%" },
    ],
  },
] as const

const baseScales = {
  x: {
    ticks: {
      color: CHART_TEXT,
      font: { size: 10, weight: 500 as const },
      maxRotation: 0,
      autoSkip: false,
    },
    grid: { display: false },
    border: { color: CHART_BORDER },
  },
  y: {
    ticks: { color: CHART_TEXT, font: { size: 10, weight: 500 as const } },
    grid: { color: CHART_GRID },
    border: { color: CHART_BORDER },
  },
}

const baseTooltip = {
  backgroundColor: "#FFFFFF",
  borderColor: "#DEDBD2",
  borderWidth: 1,
  titleColor: "#14131C",
  bodyColor: "#4A4858",
  displayColors: false,
  cornerRadius: 6,
  padding: 10,
}

function EbitdaChart() {
  const labels = ["Reported", "One-time", "Owner comp", "Pubco prep", "Pro-forma", "Adjusted"]
  const steps: ("total" | "pos" | "neg")[] = ["total", "neg", "neg", "neg", "pos", "total"]
  const values = [14.2, 1.4, 0.6, 0.8, 0.2, 11.6]
  let running = 0
  const base: number[] = []
  const value: number[] = []
  const colors: string[] = []
  values.forEach((v, i) => {
    if (steps[i] === "total") {
      base.push(0)
      value.push(v)
      colors.push(CHART_SERIES.accent)
      running = v
    } else if (steps[i] === "pos") {
      base.push(running)
      value.push(v)
      colors.push(CHART_SERIES.green)
      running += v
    } else {
      base.push(running - v)
      value.push(v)
      colors.push(CHART_SERIES.red)
      running -= v
    }
  })
  return (
    <Bar
      data={{
        labels,
        datasets: [
          { label: "base", data: base, backgroundColor: "transparent", stack: "wf", borderWidth: 0 },
          { label: "value", data: value, backgroundColor: colors, stack: "wf", barThickness: 36, borderRadius: 4, borderWidth: 0 },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { ...baseTooltip, filter: (i) => i.datasetIndex === 1, callbacks: { label: (ctx) => `$${(ctx.parsed.y as number).toFixed(1)}M` } },
        },
        scales: {
          x: { ...baseScales.x, stacked: true },
          y: { ...baseScales.y, stacked: true, beginAtZero: true, ticks: { ...baseScales.y.ticks, callback: (v) => `$${v}M` } },
        },
      }}
    />
  )
}

function ConcentrationChart() {
  const labels = ["#1", "#2", "#3", "#4", "#5", "#6", "#7", "#8", "#9", "#10"]
  const data = [16, 13, 9, 7, 5, 4, 3, 2.5, 1.5, 1]
  return (
    <Bar
      data={{
        labels,
        datasets: [
          {
            label: "% of ARR",
            data,
            backgroundColor: data.map((v) =>
              v >= 10 ? "#C8333A" : v >= 5 ? "#B5781A" : CHART_SERIES.accent
            ),
            barThickness: 22,
            borderRadius: 4,
            borderWidth: 0,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { ...baseTooltip, callbacks: { label: (ctx) => `${(ctx.parsed.y as number).toFixed(1)}%` } },
        },
        scales: {
          x: baseScales.x,
          y: { ...baseScales.y, beginAtZero: true, ticks: { ...baseScales.y.ticks, callback: (v) => `${v}%` } },
        },
      }}
    />
  )
}

function NwcChart() {
  const labels = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            label: "DSO",
            data: [54, 56, 58, 56, 53, 50, 48, 47, 46, 45, 47, 47],
            borderColor: CHART_SERIES.accent,
            backgroundColor: "rgba(123,91,214,0.10)",
            borderWidth: 2,
            pointBackgroundColor: CHART_SERIES.accent,
            pointRadius: 3,
            fill: true,
            tension: 0.3,
          },
          {
            label: "DPO",
            data: [33, 32, 32, 35, 38, 41, 44, 45, 46, 47, 38, 38],
            borderColor: "#1F8A5B",
            backgroundColor: "transparent",
            borderWidth: 1.5,
            borderDash: [6, 6],
            pointRadius: 0,
            tension: 0.3,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { ...baseTooltip, callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y} days` } },
        },
        scales: {
          x: baseScales.x,
          y: { ...baseScales.y, beginAtZero: false, ticks: { ...baseScales.y.ticks, callback: (v) => `${v}d` } },
        },
      }}
    />
  )
}

const METRICS_INTERVAL = 5800

function DiligenceMetrics() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % METRIC_VIEWS.length),
      METRICS_INTERVAL
    )
    return () => clearInterval(id)
  }, [])

  const view = METRIC_VIEWS[active]

  return (
    <section className="px-12 py-14">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 md:grid-cols-[5fr_7fr] md:gap-16">
        {/* Left: copy */}
        <div>
          <h2
            className="display-headline"
            style={{ fontSize: "clamp(32px, 4.2vw, 52px)" }}
          >
            Every metric.{" "}
            <span className="display-italic">Live from hour one.</span>
          </h2>
          <p className="mt-6 max-w-[440px] text-[16px] leading-[1.6] text-fg-2">
            EBITDA bridge, customer concentration, working capital, covenant
            headroom. The diligence dashboard updates as new documents land in
            the room.
          </p>
          <ul className="mt-8 flex flex-col gap-3">
            {[
              "Adjusted from reported, traceable to journals",
              "Concentration thresholds checked against the LOI",
              "Working capital trends versus the seller's peg",
            ].map((t) => (
              <li key={t} className="flex gap-3 text-[14px] text-fg-2">
                <span
                  aria-hidden
                  className="mt-[7px] inline-block shrink-0 rounded-full bg-halo-linear"
                  style={{ width: 6, height: 6 }}
                />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: dashboard preview */}
        <div
          className="overflow-hidden rounded-[14px] border bg-white"
          style={{
            borderColor: "#DEDBD2",
            boxShadow:
              "0 8px 24px rgba(20,19,28,0.06), inset 0 1px 0 rgba(255,255,255,0.6)",
          }}
        >
          <div
            className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-3.5"
            style={{ borderColor: "#ECEAE3" }}
          >
            <div className="text-[13px] font-semibold text-fg-1">{view.title}</div>
            <div className="text-[10px] font-mono uppercase tracking-[0.08em] text-fg-3">
              {view.meta}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 px-5 py-5">
            {view.kpis.map((k) => (
              <div
                key={k.label}
                className="rounded-[10px] border bg-white p-4"
                style={{ borderColor: "#ECEAE3" }}
              >
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-fg-3">
                  {k.label}
                </div>
                <div
                  className="mt-2 text-[22px] font-bold leading-none num-tabular text-fg-1"
                  style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontVariationSettings: "'opsz' 36",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {k.value}
                </div>
              </div>
            ))}
          </div>

          <div className="px-5 pb-5">
            <div
              className="rounded-[10px] border bg-white"
              style={{ borderColor: "#ECEAE3" }}
            >
              <div className="px-5 py-5">
                <div className="h-[220px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={view.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="h-full w-full"
                    >
                      {view.id === "ebitda" && <EbitdaChart />}
                      {view.id === "concentration" && <ConcentrationChart />}
                      {view.id === "nwc" && <NwcChart />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Progress dots */}
          <div
            className="flex items-center justify-center gap-1.5 border-t py-3"
            style={{ borderColor: "#ECEAE3" }}
          >
            {METRIC_VIEWS.map((m, i) => (
              <button
                key={m.id}
                onClick={() => setActive(i)}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i === active ? 18 : 6,
                  backgroundColor:
                    i === active ? "#7B5BD6" : "#DEDBD2",
                }}
                aria-label={`View ${m.title}`}
                type="button"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// PAGE
// ────────────────────────────────────────────────────────────────────────────

export default function DueDiligencePage() {
  return (
    <>
      <Nav />
      <main>
        <DiligenceHero />
        <Divider />
        <PipelineStepper />
        <Divider />
        <FindingsCycler />
        <Divider />
        <DiligenceMetrics />
        <Divider />
        <CtaBlock />
      </main>
      <Footer />
    </>
  )
}
