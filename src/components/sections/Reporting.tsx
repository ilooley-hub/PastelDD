"use client"

import { useState, useEffect, useRef } from "react"
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
  CalendarRange,
  Wallet,
  TrendingUp,
  ShieldCheck,
} from "lucide-react"
import { RevealOnScroll } from "@/components/ui/RevealOnScroll"
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

const CYCLE_MS = 5800
const PAUSE_AFTER_CLICK_MS = 15000

// ─────────────────────────────────────────────────────────────────────────────
// Categories
// ─────────────────────────────────────────────────────────────────────────────

type CategoryId = "close" | "cash" | "qoe" | "covenants"

type Category = {
  id: CategoryId
  label: string
  icon: typeof CalendarRange
  subtitle: string
  caption: string
}

const CATEGORIES: Category[] = [
  {
    id: "close",
    label: "Close & Variance",
    icon: CalendarRange,
    subtitle: "Month-end · Sep 2026",
    caption: "How the quarter actually landed against plan.",
  },
  {
    id: "cash",
    label: "Cash & Liquidity",
    icon: Wallet,
    subtitle: "13-week rolling",
    caption: "Where cash is going and how much room is left.",
  },
  {
    id: "qoe",
    label: "Quality of Earnings",
    icon: TrendingUp,
    subtitle: "FY2025 diligence pack",
    caption: "Reported earnings versus what survives diligence.",
  },
  {
    id: "covenants",
    label: "Covenants & Audit",
    icon: ShieldCheck,
    subtitle: "8 active covenants",
    caption: "Headroom on every covenant, every test cycle.",
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Shared bits
// ─────────────────────────────────────────────────────────────────────────────

function KpiCard({
  label,
  value,
  delta,
  trend,
}: {
  label: string
  value: string
  delta?: string
  trend?: "up" | "down" | "neutral"
}) {
  const trendColor =
    trend === "up" ? "#1F8A5B" : trend === "down" ? "#C8333A" : "#76737F"
  return (
    <div
      className="rounded-[10px] border bg-white p-5"
      style={{ borderColor: "#ECEAE3" }}
    >
      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-fg-3">
        {label}
      </div>
      <div
        className="mt-3 text-[26px] font-bold leading-none num-tabular text-fg-1"
        style={{
          fontFamily: "var(--font-display), Georgia, serif",
          fontVariationSettings: "'opsz' 36",
          letterSpacing: "-0.02em",
        }}
      >
        {value}
      </div>
      {delta && (
        <div
          className="mt-2 text-[12px] font-semibold num-tabular"
          style={{ color: trendColor }}
        >
          {delta}
        </div>
      )}
    </div>
  )
}

function ChartFrame({
  title,
  meta,
  children,
  source,
}: {
  title: string
  meta?: string
  children: React.ReactNode
  source?: string
}) {
  return (
    <div
      className="flex flex-col rounded-[10px] border bg-white"
      style={{ borderColor: "#ECEAE3" }}
    >
      <div
        className="flex items-center justify-between border-b px-5 py-3.5"
        style={{ borderColor: "#ECEAE3" }}
      >
        <div className="text-[13px] font-semibold text-fg-1">{title}</div>
        {meta && (
          <div className="text-[10px] font-mono uppercase tracking-[0.08em] text-fg-3">
            {meta}
          </div>
        )}
      </div>
      <div className="px-5 py-5">{children}</div>
      {source && (
        <div
          className="border-t px-5 py-2.5 font-mono text-[10px] text-fg-3"
          style={{ borderColor: "#ECEAE3" }}
        >
          Source · {source}
        </div>
      )}
    </div>
  )
}

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

function buildBridgeBars(
  steps: { kind: "total" | "pos" | "neg"; value: number }[]
) {
  let running = 0
  const base: number[] = []
  const value: number[] = []
  const colors: string[] = []
  steps.forEach((s) => {
    if (s.kind === "total") {
      base.push(0)
      value.push(s.value)
      colors.push(CHART_SERIES.accent)
      running = s.value
    } else if (s.kind === "pos") {
      base.push(running)
      value.push(s.value)
      colors.push(CHART_SERIES.green)
      running += s.value
    } else {
      const next = running - s.value
      base.push(next)
      value.push(s.value)
      colors.push(CHART_SERIES.red)
      running = next
    }
  })
  return { base, value, colors }
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. CLOSE & VARIANCE
// ─────────────────────────────────────────────────────────────────────────────

const CLOSE_KPIS = [
  { label: "EBITDA · actual", value: "$4.1M", delta: "vs plan -26.8%", trend: "down" as const },
  { label: "Revenue · actual", value: "$24.3M", delta: "-8.3% to plan", trend: "down" as const },
  { label: "Variance breaches", value: "4", delta: "2 routed", trend: "neutral" as const },
]

const CLOSE_BRIDGE = {
  labels: ["Plan", "Subs", "Services", "COGS", "S&M", "G&A", "Actual"],
  steps: [
    { kind: "total" as const, value: 5.6 },
    { kind: "neg" as const, value: 0.6 },
    { kind: "pos" as const, value: 0.2 },
    { kind: "neg" as const, value: 0.8 },
    { kind: "pos" as const, value: 0.3 },
    { kind: "neg" as const, value: 0.6 },
    { kind: "total" as const, value: 4.1 },
  ],
}

function CloseDashboard() {
  const { base, value, colors } = buildBridgeBars(CLOSE_BRIDGE.steps)
  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {CLOSE_KPIS.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </div>

      <div className="mt-4">
        <ChartFrame
          title="EBITDA bridge · plan to actual"
          meta="$M"
          source="GL · budgets · variance playbook"
        >
          <div className="h-[260px]">
            <Bar
              data={{
                labels: CLOSE_BRIDGE.labels,
                datasets: [
                  {
                    label: "base",
                    data: base,
                    backgroundColor: "transparent",
                    borderWidth: 0,
                    stack: "wf",
                  },
                  {
                    label: "value",
                    data: value,
                    backgroundColor: colors,
                    borderWidth: 0,
                    stack: "wf",
                    barThickness: 36,
                    borderRadius: 4,
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
                    filter: (item) => item.datasetIndex === 1,
                    callbacks: {
                      label: (ctx) => `$${(ctx.parsed.y as number).toFixed(2)}M`,
                    },
                  },
                },
                scales: {
                  x: { ...baseScales.x, stacked: true },
                  y: {
                    ...baseScales.y,
                    stacked: true,
                    beginAtZero: true,
                    ticks: {
                      ...baseScales.y.ticks,
                      callback: (v) => `$${v}M`,
                    },
                  },
                },
              }}
            />
          </div>
        </ChartFrame>
      </div>
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. CASH & LIQUIDITY
// ─────────────────────────────────────────────────────────────────────────────

const CASH_KPIS = [
  { label: "Cash balance", value: "$18.4M", delta: "+$0.6M wow", trend: "up" as const },
  { label: "Runway", value: "14.2 mo", delta: "stable", trend: "neutral" as const },
  { label: "DSO", value: "47 days", delta: "+3 vs plan", trend: "down" as const },
]

const CASH_FORECAST_LABELS = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12", "W13"]
const CASH_FORECAST = [18.4, 18.0, 17.4, 16.9, 16.6, 16.0, 15.4, 14.7, 14.0, 13.4, 12.9, 12.3, 11.8]
const CASH_PRIOR = [18.4, 18.2, 17.9, 17.5, 17.3, 16.9, 16.5, 16.0, 15.5, 15.1, 14.7, 14.3, 13.9]

function CashDashboard() {
  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {CASH_KPIS.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </div>

      <div className="mt-4">
        <ChartFrame
          title="13-week cash position"
          meta="$M"
          source="AR · AP · payroll · scheduled debt service"
        >
          <div className="h-[260px]">
            <Line
              data={{
                labels: CASH_FORECAST_LABELS,
                datasets: [
                  {
                    label: "Prior forecast",
                    data: CASH_PRIOR,
                    borderColor: "rgba(196,167,231,0.55)",
                    backgroundColor: "transparent",
                    borderWidth: 1.5,
                    borderDash: [4, 4],
                    pointRadius: 0,
                    tension: 0.3,
                  },
                  {
                    label: "Current forecast",
                    data: CASH_FORECAST,
                    borderColor: CHART_SERIES.accent,
                    backgroundColor: "rgba(123,91,214,0.12)",
                    borderWidth: 2,
                    pointBackgroundColor: CHART_SERIES.accent,
                    pointRadius: 3,
                    fill: true,
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
                      label: (ctx) =>
                        `${ctx.dataset.label}: $${(ctx.parsed.y as number).toFixed(1)}M`,
                    },
                  },
                },
                scales: {
                  x: baseScales.x,
                  y: {
                    ...baseScales.y,
                    beginAtZero: false,
                    ticks: {
                      ...baseScales.y.ticks,
                      callback: (v) => `$${v}M`,
                    },
                  },
                },
              }}
            />
          </div>
        </ChartFrame>
      </div>
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. QUALITY OF EARNINGS
// ─────────────────────────────────────────────────────────────────────────────

const QOE_KPIS = [
  { label: "Reported EBITDA", value: "$14.2M", delta: "FY2025", trend: "neutral" as const },
  { label: "Adjusted EBITDA", value: "$11.6M", delta: "-18.3%", trend: "down" as const },
  { label: "Adjustments", value: "12", delta: "-$2.6M", trend: "down" as const },
]

const QOE_BRIDGE = {
  labels: ["Reported", "One-time", "Owner comp", "Pubco prep", "Pro-forma", "Adjusted"],
  steps: [
    { kind: "total" as const, value: 14.2 },
    { kind: "neg" as const, value: 1.4 },
    { kind: "neg" as const, value: 0.6 },
    { kind: "neg" as const, value: 0.8 },
    { kind: "pos" as const, value: 0.2 },
    { kind: "total" as const, value: 11.6 },
  ],
}

function QoeDashboard() {
  const { base, value, colors } = buildBridgeBars(QOE_BRIDGE.steps)
  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {QOE_KPIS.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </div>

      <div className="mt-4">
        <ChartFrame
          title="EBITDA bridge · reported to adjusted"
          meta="FY2025 · $M"
          source="GL · MSAs · payroll · 18 contracts cited"
        >
          <div className="h-[260px]">
            <Bar
              data={{
                labels: QOE_BRIDGE.labels,
                datasets: [
                  {
                    label: "base",
                    data: base,
                    backgroundColor: "transparent",
                    borderWidth: 0,
                    stack: "wf",
                  },
                  {
                    label: "value",
                    data: value,
                    backgroundColor: colors,
                    borderWidth: 0,
                    stack: "wf",
                    barThickness: 40,
                    borderRadius: 4,
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
                    filter: (item) => item.datasetIndex === 1,
                    callbacks: {
                      label: (ctx) => `$${(ctx.parsed.y as number).toFixed(1)}M`,
                    },
                  },
                },
                scales: {
                  x: { ...baseScales.x, stacked: true },
                  y: {
                    ...baseScales.y,
                    stacked: true,
                    beginAtZero: true,
                    ticks: {
                      ...baseScales.y.ticks,
                      callback: (v) => `$${v}M`,
                    },
                  },
                },
              }}
            />
          </div>
        </ChartFrame>
      </div>
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. COVENANTS & AUDIT
// ─────────────────────────────────────────────────────────────────────────────

const COVENANT_KPIS = [
  { label: "In compliance", value: "7 / 8", delta: "1 watch", trend: "down" as const },
  { label: "Min headroom", value: "12.4%", delta: "DSCR · tightest", trend: "neutral" as const },
  { label: "Next test", value: "14 days", delta: "Q3 cert", trend: "neutral" as const },
]

const DSCR_LABELS = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
const DSCR_VALUES = [1.52, 1.49, 1.48, 1.46, 1.42, 1.40, 1.38, 1.36, 1.36, 1.34, 1.33, 1.32]
const DSCR_THRESHOLD = 1.20

function CovenantsDashboard() {
  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {COVENANT_KPIS.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </div>

      <div className="mt-4">
        <ChartFrame
          title="DSCR vs threshold · trailing 12 months"
          meta="ratio"
          source="GL · debt schedule · derived ratio"
        >
          <div className="h-[260px]">
            <Line
              data={{
                labels: DSCR_LABELS,
                datasets: [
                  {
                    label: "Threshold",
                    data: DSCR_LABELS.map(() => DSCR_THRESHOLD),
                    borderColor: "#C8333A",
                    backgroundColor: "rgba(200,51,58,0.08)",
                    borderWidth: 1.5,
                    borderDash: [6, 6],
                    pointRadius: 0,
                    fill: false,
                  },
                  {
                    label: "DSCR",
                    data: DSCR_VALUES,
                    borderColor: CHART_SERIES.accent,
                    backgroundColor: "rgba(123,91,214,0.10)",
                    borderWidth: 2,
                    pointBackgroundColor: CHART_SERIES.accent,
                    pointRadius: 3,
                    fill: true,
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
                      label: (ctx) =>
                        `${ctx.dataset.label}: ${(ctx.parsed.y as number).toFixed(2)}×`,
                    },
                  },
                },
                scales: {
                  x: baseScales.x,
                  y: {
                    ...baseScales.y,
                    beginAtZero: false,
                    suggestedMin: 1.1,
                    suggestedMax: 1.6,
                    ticks: {
                      ...baseScales.y.ticks,
                      callback: (v) => `${(v as number).toFixed(2)}×`,
                    },
                  },
                },
              }}
            />
          </div>
        </ChartFrame>
      </div>
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Sidebar
// ─────────────────────────────────────────────────────────────────────────────

function Sidebar({
  active,
  onSelect,
  cycling,
}: {
  active: CategoryId
  onSelect: (id: CategoryId) => void
  cycling: boolean
}) {
  return (
    <div
      className="flex shrink-0 flex-col border-b md:border-b-0 md:border-r"
      style={{
        borderColor: "#ECEAE3",
        backgroundColor: "#FBFAF6",
      }}
    >
      <div className="hidden px-5 pb-3 pt-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-fg-3 md:block">
        Reporting
      </div>
      <div className="flex flex-row gap-1 overflow-x-auto p-2 md:flex-col md:gap-1 md:p-2">
        {CATEGORIES.map((c) => {
          const Icon = c.icon
          const isActive = c.id === active
          return (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className="group relative flex shrink-0 items-start gap-3 overflow-hidden rounded-[8px] px-3 py-2.5 text-left transition-colors md:shrink"
              style={{
                backgroundColor: isActive ? "#FFFFFF" : "transparent",
                boxShadow: isActive
                  ? "0 1px 2px rgba(20,19,28,0.04), inset 0 0 0 1px #ECEAE3"
                  : "none",
              }}
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
                  {c.subtitle}
                </span>
              </span>

              {/* Auto-cycle progress bar — re-mounts when active changes */}
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
                  transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function DashboardHeader({ category }: { category: Category }) {
  const Icon = category.icon
  return (
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
          <Icon size={16} color="#7B5BD6" strokeWidth={2.2} />
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
          <div className="mt-1 text-[13px] text-fg-2">{category.caption}</div>
        </div>
      </div>
      <div className="text-[11px] font-mono uppercase tracking-[0.1em] text-fg-3">
        {category.subtitle}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────────────────────

export function Reporting() {
  const [active, setActive] = useState<CategoryId>("close")
  const [cycling, setCycling] = useState(true)
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Auto-cycle through categories
  useEffect(() => {
    if (!cycling) return
    const interval = setInterval(() => {
      setActive((curr) => {
        const idx = CATEGORIES.findIndex((c) => c.id === curr)
        return CATEGORIES[(idx + 1) % CATEGORIES.length].id
      })
    }, CYCLE_MS)
    return () => clearInterval(interval)
  }, [cycling])

  const handleSelect = (id: CategoryId) => {
    setActive(id)
    setCycling(false)
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current)
    pauseTimerRef.current = setTimeout(
      () => setCycling(true),
      PAUSE_AFTER_CLICK_MS
    )
  }

  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current)
    }
  }, [])

  const category = CATEGORIES.find((c) => c.id === active) ?? CATEGORIES[0]

  return (
    <section className="px-12 py-14">
      <RevealOnScroll>
        <h2
          className="display-headline max-w-[820px]"
          style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
        >
          The reports you rebuild every quarter.{" "}
          <span className="display-italic">
            Already running, cited, current.
          </span>
        </h2>
        <p className="mt-6 max-w-[680px] text-[17px] leading-[1.6] text-fg-2">
          Close, diligence, audit, board pack. Every dashboard runs on the same
          ontology, with every figure traceable to its source row, contract
          clause, or message.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <div
          className="mt-12 overflow-hidden rounded-[14px] border bg-white"
          style={{
            borderColor: "#DEDBD2",
            boxShadow:
              "0 8px 24px rgba(20,19,28,0.06), inset 0 1px 0 rgba(255,255,255,0.6)",
          }}
        >
          <div className="grid md:grid-cols-[280px_1fr]">
            <Sidebar active={active} onSelect={handleSelect} cycling={cycling} />
            <div className="flex flex-col" style={{ backgroundColor: "#F8F7F4" }}>
              <DashboardHeader category={category} />
              <div className="px-5 py-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {active === "close" && <CloseDashboard />}
                    {active === "cash" && <CashDashboard />}
                    {active === "qoe" && <QoeDashboard />}
                    {active === "covenants" && <CovenantsDashboard />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}
