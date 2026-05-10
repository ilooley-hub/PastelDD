"use client"

import { useEffect, useRef, useState } from "react"

const STAGE_W = 1920
const STAGE_H = 1080
const ORB_CX = 960
const ORB_CY = 540
const ORB_SIZE = 520
const ORB_VISIBLE_R = 150
const DURATION = 16

const FONT_SANS = "var(--font-sans), system-ui, sans-serif"
const FONT_MONO = "var(--font-mono), ui-monospace, monospace"

type ColorKey = "blue" | "green" | "yellow" | "orange" | "purple" | "neutral"

const PAL: Record<
  ColorKey,
  { bg: string; icon: string; line: string; dot: string }
> = {
  blue: {
    bg: "oklch(96% 0.025 240)",
    icon: "oklch(62% 0.12 240)",
    line: "oklch(78% 0.06 240)",
    dot: "oklch(70% 0.10 240)",
  },
  green: {
    bg: "oklch(96% 0.025 165)",
    icon: "oklch(55% 0.10 165)",
    line: "oklch(78% 0.06 165)",
    dot: "oklch(70% 0.09 165)",
  },
  yellow: {
    bg: "oklch(96% 0.030 90)",
    icon: "oklch(60% 0.12 85)",
    line: "oklch(82% 0.07 85)",
    dot: "oklch(75% 0.10 85)",
  },
  orange: {
    bg: "oklch(96% 0.025 55)",
    icon: "oklch(65% 0.13 50)",
    line: "oklch(80% 0.06 50)",
    dot: "oklch(72% 0.10 50)",
  },
  purple: {
    bg: "oklch(96% 0.025 295)",
    icon: "oklch(58% 0.12 295)",
    line: "oklch(80% 0.06 295)",
    dot: "oklch(70% 0.10 295)",
  },
  neutral: {
    bg: "oklch(98% 0.003 80)",
    icon: "oklch(40% 0.005 80)",
    line: "oklch(82% 0.005 80)",
    dot: "oklch(60% 0.005 80)",
  },
}

type ChipIconName = "building" | "users" | "people" | "truck"

type NodeSpec =
  | {
      id: string
      kind: "chip"
      icon: ChipIconName
      label: string
      color: ColorKey
      x: number
      y: number
      delay: number
    }
  | {
      id: string
      kind: "file"
      label: string
      color: ColorKey
      x: number
      y: number
      delay: number
    }
  | {
      id: string
      kind: "concept"
      label: string
      color: ColorKey
      x: number
      y: number
      delay: number
    }

const NODES: NodeSpec[] = [
  // Ring 1 — entities (chips)
  { id: "vendors",   kind: "chip", icon: "building", label: "Vendors",   color: "green",  x: 700,  y: 290, delay: 1.9 },
  { id: "clients",   kind: "chip", icon: "users",    label: "Clients",   color: "orange", x: 1220, y: 290, delay: 2.15 },
  { id: "employees", kind: "chip", icon: "people",   label: "Employees", color: "blue",   x: 1230, y: 800, delay: 2.4 },
  { id: "suppliers", kind: "chip", icon: "truck",    label: "Suppliers", color: "purple", x: 690,  y: 800, delay: 2.65 },

  // Ring 2 — documents (files)
  { id: "invoice",  kind: "file", label: "Invoice_Q3-2026.pdf", color: "orange",  x: 320,  y: 380, delay: 3.10 },
  { id: "contract", kind: "file", label: "MSA_NorthStar.pdf",   color: "blue",    x: 1600, y: 380, delay: 3.35 },
  { id: "w2",       kind: "file", label: "W-2_2025_filed.pdf",  color: "green",   x: 1620, y: 720, delay: 3.60 },
  { id: "expense",  kind: "file", label: "Expenses_Q1.xlsx",    color: "purple",  x: 290,  y: 720, delay: 3.85 },
  { id: "po",       kind: "file", label: "PO_4421-Acme.pdf",    color: "yellow",  x: 960,  y: 175, delay: 4.10 },
  { id: "receipt",  kind: "file", label: "Receipt_8821.jpg",    color: "neutral", x: 960,  y: 920, delay: 4.35 },

  // Ring 3 — concepts
  { id: "gl",      kind: "concept", label: "General Ledger",  color: "neutral", x: 145,  y: 540, delay: 4.70 },
  { id: "cf",      kind: "concept", label: "Cash Flow",       color: "blue",    x: 1775, y: 540, delay: 4.85 },
  { id: "bs",      kind: "concept", label: "Balance Sheet",   color: "green",   x: 470,  y: 130, delay: 5.00 },
  { id: "pl",      kind: "concept", label: "P&L Statement",   color: "orange",  x: 1450, y: 130, delay: 5.15 },
  { id: "tax",     kind: "concept", label: "Tax Returns",     color: "purple",  x: 470,  y: 950, delay: 5.30 },
  { id: "audit",   kind: "concept", label: "Audit Trail",     color: "yellow",  x: 1450, y: 950, delay: 5.45 },
  { id: "payroll", kind: "concept", label: "Payroll",         color: "blue",    x: 175,  y: 240, delay: 5.60 },
  { id: "budget",  kind: "concept", label: "Budgets",         color: "green",   x: 1750, y: 240, delay: 5.75 },
  { id: "fx",      kind: "concept", label: "FX Rates",        color: "orange",  x: 175,  y: 855, delay: 5.90 },
  { id: "reconc",  kind: "concept", label: "Reconciliations", color: "purple",  x: 1745, y: 855, delay: 6.05 },
]

const NODE_BY_ID: Record<string, NodeSpec> = Object.fromEntries(
  NODES.map((n) => [n.id, n])
)

const EDGES: Array<[string, string]> = [
  ["vendors", "invoice"],
  ["clients", "contract"],
  ["employees", "w2"],
  ["suppliers", "expense"],
  ["vendors", "po"],
  ["clients", "pl"],
  ["employees", "payroll"],
  ["suppliers", "receipt"],
  ["invoice", "pl"],
  ["contract", "audit"],
  ["w2", "tax"],
  ["expense", "cf"],
  ["po", "budget"],
  ["receipt", "reconc"],
  ["gl", "bs"],
  ["cf", "pl"],
  ["budget", "reconc"],
  ["payroll", "tax"],
  ["vendors", "suppliers"],
  ["clients", "employees"],
]

const EDGE_TIMING = EDGES.map(([from, to], i) => ({
  from,
  to,
  delay: 7.5 + i * 0.14,
}))

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))
const easeOutCubic = (t: number) => --t * t * t + 1

function tween(
  from: number,
  to: number,
  start: number,
  end: number,
  t: number
) {
  if (t <= start) return from
  if (t >= end) return to
  const local = (t - start) / (end - start)
  return from + (to - from) * easeOutCubic(local)
}

// ── Per-frame computations ─────────────────────────────────────────────────

function OrbLine({ node, time }: { node: NodeSpec; time: number }) {
  const drawStart = node.delay - 0.35
  const drawDur = 1.05
  const t = clamp((time - drawStart) / drawDur, 0, 1)
  if (t <= 0) return null
  const eased = easeOutCubic(t)

  const dx = node.x - ORB_CX
  const dy = node.y - ORB_CY
  const dist = Math.sqrt(dx * dx + dy * dy)
  const sx = ORB_CX + (dx / dist) * ORB_VISIBLE_R
  const sy = ORB_CY + (dy / dist) * ORB_VISIBLE_R
  const ex = sx + (node.x - sx) * eased
  const ey = sy + (node.y - sy) * eased

  const stroke = PAL[node.color].line
  const fadeIn = clamp(t * 3, 0, 1)
  const op = 0.55 * fadeIn

  return (
    <>
      <line
        x1={sx}
        y1={sy}
        x2={ex}
        y2={ey}
        stroke={stroke}
        strokeWidth="1.2"
        strokeOpacity={op}
        strokeLinecap="round"
      />
      {t < 0.95 && (
        <circle
          cx={ex}
          cy={ey}
          r="3.5"
          fill={PAL[node.color].dot}
          opacity={fadeIn * 0.9}
        />
      )}
    </>
  )
}

function CrossEdge({
  from,
  to,
  delay,
  time,
}: {
  from: string
  to: string
  delay: number
  time: number
}) {
  const a = NODE_BY_ID[from]
  const b = NODE_BY_ID[to]
  const t = clamp((time - delay) / 1.4, 0, 1)
  if (t <= 0) return null
  const eased = easeOutCubic(t)

  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2
  const ovx = mx - ORB_CX
  const ovy = my - ORB_CY
  const ovl = Math.max(1, Math.sqrt(ovx * ovx + ovy * ovy))
  const bow = 0.18
  const cpx = mx + (ovx / ovl) * ovl * bow
  const cpy = my + (ovy / ovl) * ovl * bow

  const approxLen = Math.hypot(a.x - b.x, a.y - b.y) * 1.05
  const dashOffset = approxLen * (1 - eased)

  return (
    <path
      d={`M ${a.x} ${a.y} Q ${cpx} ${cpy} ${b.x} ${b.y}`}
      fill="none"
      stroke="oklch(70% 0.02 80)"
      strokeWidth="1"
      strokeOpacity={0.32 * eased}
      strokeLinecap="round"
      strokeDasharray={approxLen}
      strokeDashoffset={dashOffset}
    />
  )
}

function NodeEmit({
  node,
  time,
  children,
}: {
  node: NodeSpec
  time: number
  children: React.ReactNode
}) {
  const local = time - node.delay
  if (local < 0) return null

  const slideT = clamp(local / 0.95, 0, 1)
  const slide = easeOutCubic(slideT)
  const fade = clamp(local / 0.55, 0, 1)

  const dx = node.x - ORB_CX
  const dy = node.y - ORB_CY
  const dist = Math.sqrt(dx * dx + dy * dy)
  const sx = ORB_CX + (dx / dist) * (ORB_VISIBLE_R + 10)
  const sy = ORB_CY + (dy / dist) * (ORB_VISIBLE_R + 10)
  const x = sx + (node.x - sx) * slide
  const y = sy + (node.y - sy) * slide

  const idle =
    local > 1.0 ? Math.sin((time + node.x * 0.01) * 1.4) * 1.5 : 0

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + idle,
        transform: "translate(-50%, -50%)",
        opacity: easeOutCubic(fade),
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  )
}

// ── Visual atoms ───────────────────────────────────────────────────────────

function ChipIcon({ name }: { name: ChipIconName }) {
  const s = { width: 22, height: 22 } as const
  switch (name) {
    case "building":
      return (
        <svg
          style={s}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="4" y="3" width="16" height="18" rx="1.5" />
          <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
        </svg>
      )
    case "users":
      return (
        <svg
          style={s}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="9" r="3.2" />
          <circle cx="17" cy="10" r="2.4" />
          <path d="M3 19c0-2.8 2.7-5 6-5s6 2.2 6 5" />
          <path d="M14.5 19c.2-2 1.7-3.5 4-3.5s3.5 1.5 3.5 3.5" />
        </svg>
      )
    case "people":
      return (
        <svg
          style={s}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" />
        </svg>
      )
    case "truck":
      return (
        <svg
          style={s}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 7h11v9H2zM13 11h5l3 3v2h-8z" />
          <circle cx="6.5" cy="18" r="1.7" />
          <circle cx="17" cy="18" r="1.7" />
        </svg>
      )
  }
}

function Chip({
  label,
  color,
  icon,
}: {
  label: string
  color: ColorKey
  icon: ChipIconName
}) {
  const c = PAL[color]
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 26px 14px 14px",
        background: "#FFFFFF",
        border: "1px solid rgba(20,20,20,0.06)",
        borderRadius: 999,
        boxShadow:
          "0 1px 2px rgba(20,20,20,0.04), 0 8px 24px -10px rgba(20,20,20,0.08)",
        fontFamily: FONT_SANS,
        fontSize: 28,
        fontWeight: 600,
        color: "#1a1a1a",
        letterSpacing: "-0.01em",
        whiteSpace: "nowrap",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: c.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: c.icon,
        }}
      >
        <ChipIcon name={icon} />
      </div>
      <span>{label}</span>
    </div>
  )
}

function FileCard({ label, color }: { label: string; color: ColorKey }) {
  const c = PAL[color]
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 18px 12px 12px",
        background: "#FFFFFF",
        border: "1px solid rgba(20,20,20,0.06)",
        borderRadius: 14,
        boxShadow:
          "0 1px 2px rgba(20,20,20,0.04), 0 10px 28px -12px rgba(20,20,20,0.10)",
        fontFamily: FONT_MONO,
        fontSize: 19,
        fontWeight: 500,
        color: "#1a1a1a",
        letterSpacing: "-0.005em",
        whiteSpace: "nowrap",
      }}
    >
      <div
        style={{
          width: 36,
          height: 44,
          borderRadius: 6,
          background: c.bg,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: c.icon,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 10,
            height: 10,
            background: "rgba(0,0,0,0.06)",
            clipPath: "polygon(0 0, 100% 100%, 100% 0)",
            borderRadius: "0 6px 0 0",
          }}
        />
        <svg
          width="16"
          height="20"
          viewBox="0 0 16 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          <path d="M3 5h6M3 9h10M3 13h10M3 17h7" />
        </svg>
      </div>
      <span>{label}</span>
    </div>
  )
}

function Concept({ label, color }: { label: string; color: ColorKey }) {
  const c = PAL[color]
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        fontFamily: FONT_SANS,
        fontSize: 24,
        fontWeight: 500,
        color: "#3a3530",
        letterSpacing: "-0.005em",
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: 999,
          background: c.dot,
          boxShadow: `0 0 0 4px ${c.bg}`,
        }}
      />
      <span>{label}</span>
    </div>
  )
}

function Orb({ time }: { time: number }) {
  const fade = tween(0, 1, 0, 1.2, time)
  const intro = tween(0.78, 1, 0, 1.6, time)
  const breathe = 1 + Math.sin(time * 1.15) * 0.018
  const scale = intro * breathe
  const drift = Math.sin(time * 0.6) * 4

  const pulseT = clamp((time - 1.5) / 1.4, 0, 1)
  const pulseOp = pulseT > 0 && pulseT < 1 ? (1 - pulseT) * 0.55 : 0
  const pulseScale = 1 + pulseT * 0.6

  return (
    <>
      {pulseOp > 0 && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: ORB_CX,
            top: ORB_CY + drift,
            width: 360,
            height: 360,
            transform: `translate(-50%, -50%) scale(${pulseScale})`,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, oklch(85% 0.08 230 / 0.45), transparent 65%)",
            opacity: pulseOp,
            pointerEvents: "none",
          }}
        />
      )}
      <img
        src="/query-orb.png"
        alt=""
        style={{
          position: "absolute",
          left: ORB_CX,
          top: ORB_CY + drift,
          width: ORB_SIZE,
          height: ORB_SIZE,
          transform: `translate(-50%, -50%) scale(${scale})`,
          opacity: fade,
          userSelect: "none",
          pointerEvents: "none",
          willChange: "transform, opacity",
        }}
      />
    </>
  )
}

// ── Stage ──────────────────────────────────────────────────────────────────

export function OntologyAnim({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [time, setTime] = useState(0)
  const [active, setActive] = useState(true)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const apply = () => setReduced(mq.matches)
    apply()
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const measure = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      // cover behavior — fill the larger dimension
      setScale(Math.max(w / STAGE_W, h / STAGE_H))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const el = wrapRef.current
    if (!el || typeof IntersectionObserver === "undefined") return
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.05 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (reduced) {
      // park at the moment everything is laid out (just after node spawn finishes)
      setTime(7)
      return
    }
    if (!active) return
    let raf = 0
    let last: number | null = null
    const step = (ts: number) => {
      if (last == null) last = ts
      const dt = (ts - last) / 1000
      last = ts
      setTime((t) => (t + dt) % DURATION)
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [active, reduced])

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: STAGE_W,
          height: STAGE_H,
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <svg
          width={STAGE_W}
          height={STAGE_H}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
          }}
        >
          {NODES.map((n) => (
            <OrbLine key={`l-${n.id}`} node={n} time={time} />
          ))}
          {EDGE_TIMING.map((e, i) => (
            <CrossEdge key={`e-${i}`} {...e} time={time} />
          ))}
        </svg>

        <Orb time={time} />

        {NODES.map((n) => (
          <NodeEmit key={n.id} node={n} time={time}>
            {n.kind === "chip" && (
              <Chip label={n.label} color={n.color} icon={n.icon} />
            )}
            {n.kind === "file" && (
              <FileCard label={n.label} color={n.color} />
            )}
            {n.kind === "concept" && (
              <Concept label={n.label} color={n.color} />
            )}
          </NodeEmit>
        ))}
      </div>
    </div>
  )
}
