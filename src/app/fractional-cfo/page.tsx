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
  Plug,
  Activity,
  RefreshCcw,
  FileText,
  AlertTriangle,
  Users,
  CalendarCheck,
  Building2,
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

const CLIENT_BADGES = [
  { label: "Atlas Industries", color: "#50C7FA" },
  { label: "Beacon Software", color: "#A7DFD8" },
  { label: "Cascade Health", color: "#FFE9B8" },
  { label: "Horizon Logistics", color: "#FFD3B0" },
  { label: "Meridian Capital", color: "#C4A7E7" },
]

function ClientBadge({
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
        left: `${index * 9 + 3}%`,
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
          <Building2 size={11} color={color} strokeWidth={2.4} />
        </span>
        <span className="text-[11px] font-medium text-fg-2 whitespace-nowrap">
          {label}
        </span>
      </motion.div>
    </motion.div>
  )
}

function HeroVisual() {
  return (
    <div className="relative h-[440px] w-full">
      {/* Top: Clients stratum */}
      <div className="absolute inset-x-0 top-0 h-[42%]">
        <div className="absolute left-3 top-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-fg-3">
          12 clients · live
        </div>
        {CLIENT_BADGES.map((c, i) => (
          <ClientBadge key={c.label} {...c} index={i} />
        ))}
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

      {/* Bottom: Practice dashboard preview */}
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
              Practice · today
            </div>
            <span
              className="rounded-[3px] bg-halo-linear px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em]"
              style={{ color: "#1A1228" }}
            >
              Live
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
            47 signals across 12 clients
          </div>
          <ul className="mt-3 flex flex-col gap-1.5 text-[12px]">
            <li className="flex items-start gap-2">
              <span
                className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: "#C8333A" }}
              />
              <span className="text-fg-2">
                Vendor double-billed · Atlas Industries · $24K
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span
                className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: "#B5781A" }}
              />
              <span className="text-fg-2">
                T&E +47% MoM · Beacon Software · review
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span
                className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: "#1F8A5B" }}
              />
              <span className="text-fg-2">
                Monthly pack ready · Cascade Health
              </span>
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  )
}

function CfoHero() {
  return (
    <section
      className="relative overflow-hidden px-12"
      style={{ paddingTop: 72, paddingBottom: 56, minHeight: "76vh" }}
    >
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
            <span className="block">More clients.</span>
            <span
              className="block display-italic"
              style={{ lineHeight: 1.18, paddingBottom: "0.22em" }}
            >
              Without more headcount.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="mt-8 max-w-[520px] text-[18px] leading-[1.55] text-fg-2"
          >
            Pastel runs every client&apos;s books continuously. Anomalies,
            reconciliations and the monthly pack handled, so your team stays on
            judgement.
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
    id: "connect",
    icon: Plug,
    title: "Connect",
    body: "Link the client's GL, payroll, banks and billing. One-time setup.",
  },
  {
    id: "monitor",
    icon: Activity,
    title: "Monitor",
    body: "Pastel watches every transaction continuously, against your playbook.",
  },
  {
    id: "reconcile",
    icon: RefreshCcw,
    title: "Reconcile",
    body: "Exceptions, journals and anomalies surface, routed to the right person.",
  },
  {
    id: "brief",
    icon: FileText,
    title: "Brief",
    body: "Monthly pack ready on day one of the next period. Always current.",
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
          From client books to monthly pack.{" "}
          <span className="display-italic">In four moves.</span>
        </h2>

        <div className="mt-14 relative">
          <div
            aria-hidden
            className="absolute left-[36px] right-[36px] top-[28px] h-px"
            style={{ backgroundColor: "#DEDBD2" }}
          />
          <motion.div
            aria-hidden
            className="absolute left-[36px] top-[28px] h-px origin-left"
            style={{
              background:
                "linear-gradient(to right, #7B5BD6, #50C7FA, #C4A7E7, #FFD3B0)",
              width: `calc((100% - 72px) * ${(active + 1) / PIPELINE.length})`,
            }}
            initial={false}
            animate={{
              width: `calc((100% - 72px) * ${(active + 1) / PIPELINE.length})`,
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />

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
                      backgroundColor:
                        isActive || isPast ? "#FFFFFF" : "#FBFAF6",
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
                        animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
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
                      color: isActive
                        ? "#14131C"
                        : isPast
                          ? "#4A4858"
                          : "#76737F",
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
// 3. SIGNALS · auto-cycling Anomalies / Capacity / Close
// ────────────────────────────────────────────────────────────────────────────

type SignalItem = {
  title: string
  body: string
  impact: string
  severity: "high" | "medium" | "low"
}

type SignalCategory = {
  id: "anomalies" | "capacity" | "close"
  label: string
  icon: typeof AlertTriangle
  caption: string
  signals: SignalItem[]
}

const SIGNAL_CATEGORIES: SignalCategory[] = [
  {
    id: "anomalies",
    label: "Anomalies",
    icon: AlertTriangle,
    caption: "Unusual transactions across every client, surfaced as they land.",
    signals: [
      {
        title: "Vendor double-billed across two divisions",
        body: "Atlas Industries · same vendor invoiced twice, charged to procurement and engineering codes in the same week.",
        impact: "$24K duplicate · pending reversal",
        severity: "high",
      },
      {
        title: "T&E expense +47% month over month",
        body: "Beacon Software · travel and entertainment spike outside historical bands; one expense report exceeds policy by 3x.",
        impact: "$18K outside policy",
        severity: "medium",
      },
      {
        title: "312 GL entries reclassified to marketing",
        body: "Horizon Logistics · pattern of misclassification across last quarter would understate operating expense if left as-is.",
        impact: "P&L restatement · $86K",
        severity: "medium",
      },
    ],
  },
  {
    id: "capacity",
    label: "Capacity",
    icon: Users,
    caption:
      "Where your team's hours are going and where headroom is hiding.",
    signals: [
      {
        title: "Cascade Health is 23% over scope",
        body: "Logged hours through Sep tracked above the agreed annual envelope; recommend a scope review before Q4 renewal.",
        impact: "+$8.4K to recover",
        severity: "high",
      },
      {
        title: "Marcus Webb has 14h available this week",
        body: "Capacity opening up as Vista Properties wraps onboarding. Two prospect engagements queued.",
        impact: "Open · 14h",
        severity: "low",
      },
      {
        title: "Atlas Industries · billing trails by 6 days",
        body: "Time entries lagging behind work logged, putting the next invoice cycle at risk for accurate capture.",
        impact: "$11K at risk",
        severity: "medium",
      },
    ],
  },
  {
    id: "close",
    label: "Close & deliverables",
    icon: CalendarCheck,
    caption: "Status of every client's close and what's outstanding today.",
    signals: [
      {
        title: "Bank reconciliation pending · 3 clients",
        body: "Atlas Industries, Beacon Software and Vista Properties have unmatched bank items blocking close.",
        impact: "47 unmatched items",
        severity: "medium",
      },
      {
        title: "Journal entry awaiting approval",
        body: "Cascade Health · monthly accruals journal queued for partner review for 2 days past target.",
        impact: "1 entry · 2 days late",
        severity: "low",
      },
      {
        title: "Monthly pack ready · 9 of 12 clients",
        body: "Three clients have outstanding items. Pastel will auto-publish remaining packs once exceptions clear.",
        impact: "Day-1 close · 75%",
        severity: "low",
      },
    ],
  },
]

const SIGNALS_INTERVAL = 6500

function MiniSignalCard({ s }: { s: SignalItem }) {
  return (
    <div
      className="card-surface card-surface-hover rounded-[10px] p-5"
      style={{ minHeight: 200 }}
    >
      <SeverityTag severity={s.severity} />
      <h3
        className="mt-3 text-[16px] font-bold leading-[1.3] text-fg-1"
        style={{
          fontFamily: "var(--font-display), Georgia, serif",
          fontVariationSettings: "'opsz' 36",
          letterSpacing: "-0.01em",
        }}
      >
        {s.title}
      </h3>
      <p className="mt-2 text-[13px] leading-[1.55] text-fg-2">{s.body}</p>
      <div
        className="mt-4 inline-flex items-center rounded-[6px] border px-2.5 py-1 text-[11px] font-semibold num-tabular"
        style={{
          backgroundColor:
            s.severity === "high"
              ? "rgba(200,51,58,0.06)"
              : s.severity === "medium"
                ? "rgba(181,120,26,0.06)"
                : "rgba(31,138,91,0.06)",
          color:
            s.severity === "high"
              ? "#C8333A"
              : s.severity === "medium"
                ? "#B5781A"
                : "#1F8A5B",
          borderColor:
            s.severity === "high"
              ? "rgba(200,51,58,0.20)"
              : s.severity === "medium"
                ? "rgba(181,120,26,0.20)"
                : "rgba(31,138,91,0.20)",
        }}
      >
        {s.impact}
      </div>
    </div>
  )
}

function SignalsCycler() {
  const [active, setActive] = useState<SignalCategory["id"]>("anomalies")
  const [cycling, setCycling] = useState(true)
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!cycling) return
    const id = setInterval(() => {
      setActive((curr) => {
        const idx = SIGNAL_CATEGORIES.findIndex((c) => c.id === curr)
        return SIGNAL_CATEGORIES[(idx + 1) % SIGNAL_CATEGORIES.length].id
      })
    }, SIGNALS_INTERVAL)
    return () => clearInterval(id)
  }, [cycling])

  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current)
    }
  }, [])

  const handleSelect = (id: SignalCategory["id"]) => {
    setActive(id)
    setCycling(false)
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current)
    pauseTimerRef.current = setTimeout(() => setCycling(true), 18000)
  }

  const category =
    SIGNAL_CATEGORIES.find((c) => c.id === active) ?? SIGNAL_CATEGORIES[0]

  return (
    <section className="px-12 py-14">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid items-end gap-6 md:grid-cols-[1fr_auto] md:gap-12">
          <h2
            className="max-w-[640px] display-headline"
            style={{ fontSize: "clamp(32px, 4.2vw, 52px)" }}
          >
            Three signals on every client.{" "}
            <span className="display-italic">One pane of glass.</span>
          </h2>
          <p className="max-w-[420px] text-[15px] leading-[1.55] text-fg-2 md:text-right">
            Pastel watches every client's books, your team's capacity, and
            close status, and surfaces what needs your judgement.
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
            <div
              className="flex shrink-0 flex-col border-b md:border-b-0 md:border-r"
              style={{ borderColor: "#ECEAE3", backgroundColor: "#FBFAF6" }}
            >
              <div className="hidden px-5 pb-3 pt-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-fg-3 md:block">
                Signals
              </div>
              <div className="flex flex-row gap-1 overflow-x-auto p-2 md:flex-col md:gap-1 md:p-2">
                {SIGNAL_CATEGORIES.map((c) => {
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
                          {c.signals.length} signals
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
                            duration: SIGNALS_INTERVAL / 1000,
                            ease: "linear",
                          }}
                        />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            <div
              className="flex flex-col"
              style={{ backgroundColor: "#F8F7F4" }}
            >
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
                    <category.icon
                      size={16}
                      color="#7B5BD6"
                      strokeWidth={2.2}
                    />
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
                  {category.signals.length} signals
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
                    {category.signals.map((s, i) => (
                      <motion.div
                        key={`${active}-${i}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 * i, duration: 0.35 }}
                      >
                        <MiniSignalCard s={s} />
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
// 4. METRICS feature row · SaaS-style
// ────────────────────────────────────────────────────────────────────────────

const METRIC_VIEWS = [
  {
    id: "portfolio",
    title: "Client portfolio · billing",
    meta: "trailing 6 months · $K",
    kpis: [
      { label: "Active clients", value: "12" },
      { label: "Total billed", value: "$1.24M" },
      { label: "Realization", value: "92%" },
    ],
  },
  {
    id: "team",
    title: "Team utilization",
    meta: "this month · billable hours",
    kpis: [
      { label: "Utilization", value: "78%" },
      { label: "Avg hours / FTE", value: "142h" },
      { label: "Open capacity", value: "48h" },
    ],
  },
  {
    id: "anomalies",
    title: "Anomalies surfaced",
    meta: "across portfolio · trailing 6 months",
    kpis: [
      { label: "Surfaced", value: "284" },
      { label: "Resolved", value: "238" },
      { label: "Auto-flagged", value: "89%" },
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

function PortfolioChart() {
  const labels = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return (
    <Bar
      data={{
        labels,
        datasets: [
          {
            type: "bar" as const,
            label: "Billed",
            data: [168, 174, 192, 208, 218, 224],
            backgroundColor: CHART_SERIES.accent,
            yAxisID: "y",
            barThickness: 28,
            borderRadius: 4,
            borderWidth: 0,
            order: 2,
          },
          {
            type: "line" as const,
            label: "Hours",
            data: [1240, 1290, 1410, 1530, 1610, 1660],
            borderColor: CHART_SERIES.green,
            backgroundColor: CHART_SERIES.green,
            pointBackgroundColor: CHART_SERIES.green,
            pointRadius: 3.5,
            borderWidth: 1.75,
            yAxisID: "y1",
            tension: 0.25,
            order: 1,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { ...baseTooltip },
        },
        scales: {
          x: baseScales.x,
          y: {
            ...baseScales.y,
            position: "left" as const,
            beginAtZero: true,
            ticks: {
              ...baseScales.y.ticks,
              callback: (v) => `$${v}K`,
            },
          },
          y1: {
            position: "right" as const,
            beginAtZero: true,
            ticks: {
              color: CHART_TEXT,
              font: { size: 10, weight: 500 as const },
              callback: (v) => `${v}h`,
            },
            grid: { display: false },
            border: { color: CHART_BORDER },
          },
        },
      }}
    />
  )
}

const TEAM = [
  { name: "Sarah Chen", hours: 162, pct: 96 },
  { name: "Marcus Webb", hours: 148, pct: 88 },
  { name: "Priya Patel", hours: 138, pct: 82 },
  { name: "James Rivera", hours: 124, pct: 74 },
  { name: "Lena Park", hours: 96, pct: 57 },
]

function TeamChart() {
  return (
    <div className="flex flex-col gap-3 px-1 py-1">
      {TEAM.map((t) => (
        <div
          key={t.name}
          className="flex items-center gap-4 text-[12px]"
        >
          <div className="shrink-0 font-medium text-fg-1" style={{ width: 110 }}>
            {t.name}
          </div>
          <div
            className="relative h-[8px] flex-1 overflow-hidden rounded-full"
            style={{ backgroundColor: "#ECEAE3" }}
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${t.pct}%` }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full"
              style={{
                background:
                  t.pct >= 90
                    ? "linear-gradient(to right, #7B5BD6, #C4A7E7)"
                    : t.pct >= 70
                      ? CHART_SERIES.accent
                      : "rgba(123,91,214,0.55)",
              }}
            />
          </div>
          <div
            className="shrink-0 num-tabular text-fg-3"
            style={{ width: 56, textAlign: "right" }}
          >
            {t.hours}h
          </div>
        </div>
      ))}
    </div>
  )
}

function AnomaliesChart() {
  const labels = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            label: "Surfaced",
            data: [38, 42, 51, 47, 53, 53],
            borderColor: CHART_SERIES.accent,
            backgroundColor: "rgba(123,91,214,0.10)",
            borderWidth: 2,
            pointBackgroundColor: CHART_SERIES.accent,
            pointRadius: 3,
            fill: true,
            tension: 0.3,
          },
          {
            label: "Resolved",
            data: [32, 36, 45, 41, 46, 48],
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
          tooltip: {
            ...baseTooltip,
            callbacks: {
              label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}`,
            },
          },
        },
        scales: {
          x: baseScales.x,
          y: {
            ...baseScales.y,
            beginAtZero: true,
            ticks: { ...baseScales.y.ticks },
          },
        },
      }}
    />
  )
}

const METRICS_INTERVAL = 5800

function CfoMetrics() {
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
        <div>
          <h2
            className="display-headline"
            style={{ fontSize: "clamp(32px, 4.2vw, 52px)" }}
          >
            One dashboard.{" "}
            <span className="display-italic">Twelve clients.</span>
          </h2>
          <p className="mt-6 max-w-[440px] text-[16px] leading-[1.6] text-fg-2">
            Billing, utilization, anomalies. The practice metrics that used to
            live in a spreadsheet now run live across every engagement.
          </p>
          <ul className="mt-8 flex flex-col gap-3">
            {[
              "Billing tracked against agreement, every client",
              "Utilization and capacity visible in real time",
              "Anomalies auto-surfaced before they become surprises",
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
            <div className="text-[13px] font-semibold text-fg-1">
              {view.title}
            </div>
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
                      {view.id === "portfolio" && <PortfolioChart />}
                      {view.id === "team" && <TeamChart />}
                      {view.id === "anomalies" && <AnomaliesChart />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

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
                  backgroundColor: i === active ? "#7B5BD6" : "#DEDBD2",
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

export default function FractionalCfoPage() {
  return (
    <>
      <Nav />
      <main>
        <CfoHero />
        <Divider />
        <PipelineStepper />
        <Divider />
        <SignalsCycler />
        <Divider />
        <CfoMetrics />
        <Divider />
        <CtaBlock />
      </main>
      <Footer />
    </>
  )
}
