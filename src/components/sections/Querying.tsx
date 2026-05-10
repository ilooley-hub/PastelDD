"use client"

import { useEffect, useRef, useState } from "react"
import { RevealOnScroll } from "@/components/ui/RevealOnScroll"

// ── Tokens ──────────────────────────────────────────────────────────────────
const INK = "#14131C"
const INK_SOFT = "#4A4858"
const INK_MUTE = "#76737F"
const LINE = "rgba(20,19,28,0.08)"
const LINE_SOFT = "rgba(20,19,28,0.05)"
const SURFACE = "#FFFFFF"
const ACCENT = "#7B5BD6"

const HALO = {
  sky: "#7DC4F5",
  lav: "#C4A7E7",
  mint: "#A7DFD8",
  peach: "#FFD3B0",
  blossom: "#F2C5D5",
}

const FONT_SERIF = "var(--font-display), Georgia, serif"
const FONT_SANS = "var(--font-sans), system-ui, sans-serif"
const FONT_MONO = "var(--font-mono), ui-monospace, monospace"

// ── Easing ──────────────────────────────────────────────────────────────────
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))
const easeOutCubic = (t: number) => --t * t * t + 1
const easeInCubic = (t: number) => t * t * t
const easeOutBack = (t: number) => {
  const c1 = 1.70158, c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}

const stagger = (progress: number, i: number, total: number, fadeIn = 0.08) => {
  const slot = (1 - fadeIn) / total
  const localStart = i * slot
  const localEnd = localStart + fadeIn + slot * 0.6
  return clamp((progress - localStart) / (localEnd - localStart), 0, 1)
}

// ── Stage with RAF playhead ────────────────────────────────────────────────
// Internal canvas tuned to the actual content footprint (QueryBar + AnswerCard
// are 1320px wide), so the section reads cleanly in a half-width column.
const STAGE_W = 1440
const STAGE_H = 880
const SCENE_DUR = 9.5

type SceneSpec = { query: string; Answer: React.ComponentType<{ progress: number }> }

function Stage({ scenes }: { scenes: SceneSpec[] }) {
  const total = scenes.length * SCENE_DUR

  const wrapRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [time, setTime] = useState(0)
  const [active, setActive] = useState(true)

  // Auto-fit width
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const measure = () => setScale(el.clientWidth / STAGE_W)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Pause when off-screen
  useEffect(() => {
    const el = wrapRef.current
    if (!el || typeof IntersectionObserver === "undefined") return
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.1 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // RAF loop
  useEffect(() => {
    if (!active) return
    let raf = 0
    let last: number | null = null
    const step = (ts: number) => {
      if (last == null) last = ts
      const dt = (ts - last) / 1000
      last = ts
      setTime((t) => (t + dt) % total)
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [active, total])

  const sceneIdx = Math.min(scenes.length - 1, Math.floor(time / SCENE_DUR))
  const sceneStart = sceneIdx * SCENE_DUR
  const scene = scenes[sceneIdx]

  return (
    <div
      ref={wrapRef}
      style={{
        width: "100%",
        aspectRatio: `${STAGE_W} / ${STAGE_H}`,
        position: "relative",
        overflow: "hidden",
        borderRadius: 24,
        border: `1px solid #DEDBD2`,
        backgroundColor: "#FBFAF6",
        boxShadow:
          "0 30px 60px -30px rgba(20,19,28,0.18), inset 0 1px 0 rgba(255,255,255,0.6)",
      }}
    >
      <div
        style={{
          width: STAGE_W,
          height: STAGE_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <BackgroundFlourish time={time} />
        <SceneFrame
          key={sceneIdx}
          query={scene.query}
          Answer={scene.Answer}
          time={time}
          sceneStart={sceneStart}
        />
      </div>
    </div>
  )
}

// ── Scene timing ────────────────────────────────────────────────────────────
function SceneFrame({
  query,
  Answer,
  time,
  sceneStart,
}: {
  query: string
  Answer: React.ComponentType<{ progress: number }>
  time: number
  sceneStart: number
}) {
  const localT = time - sceneStart

  // Beats: bar in 0-0.45, type 0.5-2.6, orb active 2.4-7.6, answer 3.0-8.4, fade 8.7-9.5
  const barIn = clamp(localT / 0.45, 0, 1)
  const barOut = clamp((localT - (SCENE_DUR - 0.7)) / 0.7, 0, 1)
  const barOpacity = easeOutCubic(barIn) * (1 - easeInCubic(barOut))
  const barTy = (1 - easeOutCubic(barIn)) * 24 + easeInCubic(barOut) * -16

  const typeP = clamp((localT - 0.5) / (2.6 - 0.5), 0, 1)
  const activeRamp =
    clamp((localT - 2.4) / 0.4, 0, 1) *
    (1 - clamp((localT - 7.6) / 0.6, 0, 1))

  const answerP = clamp((localT - 3.0) / (8.4 - 3.0), 0, 1)
  const answerOut = clamp((localT - (SCENE_DUR - 0.8)) / 0.8, 0, 1)
  const answerOpacity = 1 - easeInCubic(answerOut)

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        padding: "0 60px",
      }}
    >
      <div
        style={{
          opacity: barOpacity,
          transform: `translateY(${barTy}px)`,
          willChange: "transform, opacity",
        }}
      >
        <QueryBar
          text={query}
          typeProgress={typeP}
          active={activeRamp}
          idle={time}
        />
      </div>

      <div style={{ opacity: answerOpacity, willChange: "opacity" }}>
        <Answer progress={answerP} />
      </div>
    </div>
  )
}

// ── Orb ─────────────────────────────────────────────────────────────────────
function PastelOrb({ size = 84, active = 0, idle = 0 }) {
  const breath = 1 + Math.sin(idle * 1.4) * 0.025
  const activeScale = 1 + active * 0.12
  const haloScale = 1 + active * 0.4 + Math.sin(idle * 2.2) * 0.04
  const rot = idle * (12 + active * 60)
  const haloOpacity = 0.35 + active * 0.5

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "inline-block",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: -size * 0.35,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(125,196,245,0.45) 0%, rgba(196,167,231,0.30) 35%, rgba(242,197,213,0.18) 60%, rgba(167,223,216,0) 80%)",
          transform: `scale(${haloScale})`,
          opacity: haloOpacity,
          filter: `blur(${8 + active * 6}px)`,
          transition: "opacity 200ms",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          transform: `rotate(${rot}deg) scale(${breath * activeScale})`,
          backgroundImage: "url(/query-orb.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: `saturate(${1 + active * 0.3}) brightness(${1 + active * 0.05})`,
        }}
      />
    </div>
  )
}

// ── Typewriter ──────────────────────────────────────────────────────────────
function Typewriter({
  text,
  progress,
  caretBlink = 0,
}: {
  text: string
  progress: number
  caretBlink?: number
}) {
  const cnt = Math.floor(progress * text.length)
  const visible = text.slice(0, cnt)
  const blink = Math.sin(caretBlink * 6) > 0
  return (
    <span>
      {visible}
      <span
        style={{
          display: "inline-block",
          width: 2,
          height: "0.95em",
          background: INK,
          marginLeft: 4,
          marginBottom: -3,
          opacity: progress >= 1 ? (blink ? 1 : 0) : 1,
          verticalAlign: "baseline",
        }}
      />
    </span>
  )
}

// ── Query bar ───────────────────────────────────────────────────────────────
function QueryBar({
  text,
  typeProgress,
  active,
  idle,
}: {
  text: string
  typeProgress: number
  active: number
  idle: number
}) {
  return (
    <div
      style={{
        width: 1320,
        background: SURFACE,
        borderRadius: 28,
        padding: "36px 44px",
        display: "flex",
        alignItems: "center",
        gap: 28,
        boxShadow:
          "0 1px 0 rgba(20,19,28,0.04), 0 30px 60px -30px rgba(20,19,28,0.10), 0 8px 20px -10px rgba(125,196,245,0.18)",
        border: `1px solid ${LINE}`,
      }}
    >
      <PastelOrb size={84} active={active} idle={idle} />
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontFamily: FONT_SERIF,
          fontSize: 44,
          fontWeight: 400,
          color: INK,
          letterSpacing: "-0.015em",
          lineHeight: 1.15,
        }}
      >
        <span
          style={{
            color: INK_MUTE,
            fontFamily: FONT_MONO,
            fontSize: 32,
            fontWeight: 500,
          }}
        >
          ›
        </span>
        <span>
          <Typewriter text={text} progress={typeProgress} caretBlink={idle} />
        </span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          color: active > 0.3 ? INK : INK_MUTE,
          fontFamily: FONT_SANS,
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: active > 0.3 ? "#1F8A5B" : INK_MUTE,
            opacity: active > 0.3 ? 0.7 + Math.sin(idle * 4) * 0.3 : 0.5,
            transition: "background 300ms",
          }}
        />
        <span>{active > 0.3 ? "Resolving" : "Pastel agent"}</span>
      </div>
    </div>
  )
}

// ── Answer wrapper ──────────────────────────────────────────────────────────
function AnswerCard({
  children,
  progress,
  height = 520,
}: {
  children: React.ReactNode
  progress: number
  height?: number
}) {
  const eased = easeOutCubic(clamp(progress, 0, 1))
  const opacity = clamp(progress * 1.5, 0, 1)
  return (
    <div
      style={{
        width: 1320,
        minHeight: height,
        background: SURFACE,
        borderRadius: 28,
        padding: "40px 48px",
        border: `1px solid ${LINE}`,
        boxShadow:
          "0 1px 0 rgba(20,19,28,0.04), 0 30px 60px -30px rgba(20,19,28,0.10)",
        transform: `translateY(${(1 - eased) * 24}px)`,
        opacity,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {children}
    </div>
  )
}

// ── Answer 1: finding ───────────────────────────────────────────────────────
function FindingAnswer({ progress }: { progress: number }) {
  const steps = [
    { label: "Graph traversal complete", meta: "312 MSAs indexed" },
    { label: "CPI escalator playbook", meta: "18 contracts flagged" },
    {
      label: "Quantifying ARR leakage",
      meta: "cross-referencing invoice history",
    },
    { label: "EV impact calculation", meta: "completed" },
  ]
  const dotColors = [HALO.mint, HALO.lav, HALO.sky, HALO.peach]

  return (
    <AnswerCard progress={progress}>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {steps.map((s, i) => {
          const p = stagger(progress, i, steps.length + 2, 0.06)
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                opacity: p,
                transform: `translateX(${(1 - p) * -8}px)`,
                fontFamily: FONT_SANS,
                fontSize: 22,
                color: INK,
              }}
            >
              <CheckDot color={dotColors[i]} />
              <span style={{ fontWeight: 500 }}>{s.label}</span>
              <span
                style={{
                  color: INK_MUTE,
                  fontFamily: FONT_MONO,
                  fontSize: 18,
                }}
              >
                · {s.meta}
              </span>
            </div>
          )
        })}

        {(() => {
          const p = stagger(progress, steps.length, steps.length + 2, 0.1)
          return (
            <div
              style={{
                marginTop: 16,
                padding: "28px 32px",
                borderRadius: 18,
                background:
                  "linear-gradient(135deg, rgba(196,167,231,0.18) 0%, rgba(242,197,213,0.14) 100%)",
                border: "1px solid rgba(196,167,231,0.35)",
                opacity: p,
                transform: `translateY(${(1 - p) * 12}px)`,
              }}
            >
              <div
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: ACCENT,
                  marginBottom: 14,
                }}
              >
                Finding
              </div>
              <div
                style={{
                  fontFamily: FONT_SERIF,
                  fontSize: 28,
                  lineHeight: 1.35,
                  color: INK,
                  letterSpacing: "-0.01em",
                }}
              >
                <span style={{ color: ACCENT, fontWeight: 600 }}>
                  18 of 312 active MSAs
                </span>{" "}
                contain a mandated 5% annual CPI uplift that was{" "}
                <span style={{ color: "#C8688A", fontWeight: 600 }}>
                  not applied
                </span>{" "}
                at renewal. ARR leakage{" "}
                <span style={{ color: ACCENT, fontWeight: 600 }}>$1.24M</span>,
                ≈{" "}
                <span style={{ color: ACCENT, fontWeight: 600 }}>
                  $14.6M EV impact
                </span>
                .
              </div>
              <div
                style={{
                  marginTop: 18,
                  paddingTop: 14,
                  borderTop: "1px solid rgba(123,91,214,0.18)",
                  fontFamily: FONT_MONO,
                  fontSize: 14,
                  color: INK_SOFT,
                }}
              >
                Cited: MSA_Renewal_Archive.zip · rows 14–31 · NetSuite AR
                export · col G
              </div>
            </div>
          )
        })()}
      </div>
    </AnswerCard>
  )
}

function CheckDot({ color }: { color: string }) {
  return (
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M3 7.5l2.5 2.5L11 4.5"
          stroke={INK}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

// ── Answer 2: table ─────────────────────────────────────────────────────────
function TableAnswer({ progress }: { progress: number }) {
  const rows = [
    { name: "Meridian Capital", rev: "$48.2M", pct: 18.4, color: HALO.sky },
    {
      name: "Northwind Holdings",
      rev: "$31.7M",
      pct: 12.1,
      color: HALO.lav,
    },
    { name: "Helios Industries", rev: "$24.5M", pct: 9.4, color: HALO.mint },
    { name: "Atlas Logistics", rev: "$19.8M", pct: 7.6, color: HALO.peach },
    { name: "Caspian Foods", rev: "$15.4M", pct: 5.9, color: HALO.blossom },
  ]

  return (
    <AnswerCard progress={progress}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "40px 1fr 180px 220px",
          gap: 0,
          fontFamily: FONT_SANS,
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: INK_MUTE,
          paddingBottom: 16,
          borderBottom: `1px solid ${LINE}`,
        }}
      >
        <div></div>
        <div>Account</div>
        <div style={{ textAlign: "right" }}>FY revenue</div>
        <div style={{ textAlign: "right" }}>% of total</div>
      </div>

      {rows.map((r, i) => {
        const p = stagger(progress, i, rows.length + 1, 0.08)
        const barW = (r.pct / 20) * 100
        const barFill = clamp((progress - (i * 0.06 + 0.2)) / 0.4, 0, 1)
        return (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "40px 1fr 180px 220px",
              alignItems: "center",
              padding: "20px 0",
              borderBottom:
                i < rows.length - 1 ? `1px solid ${LINE_SOFT}` : "none",
              opacity: p,
              transform: `translateY(${(1 - p) * 6}px)`,
              fontFamily: FONT_SANS,
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 4,
                background: r.color,
              }}
            />
            <div
              style={{
                fontSize: 24,
                fontWeight: 500,
                color: INK,
                fontFamily: FONT_SERIF,
                letterSpacing: "-0.01em",
              }}
            >
              {r.name}
            </div>
            <div
              style={{
                textAlign: "right",
                fontSize: 22,
                color: INK,
                fontFamily: FONT_MONO,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {r.rev}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  width: 120,
                  height: 8,
                  borderRadius: 4,
                  background: LINE_SOFT,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${barW * easeOutCubic(barFill)}%`,
                    background: r.color,
                    borderRadius: 4,
                  }}
                />
              </div>
              <div
                style={{
                  width: 64,
                  textAlign: "right",
                  fontSize: 22,
                  fontFamily: FONT_MONO,
                  fontVariantNumeric: "tabular-nums",
                  color: INK,
                }}
              >
                {(r.pct * easeOutCubic(barFill)).toFixed(1)}%
              </div>
            </div>
          </div>
        )
      })}
    </AnswerCard>
  )
}

// ── Answer 3: line chart ────────────────────────────────────────────────────
function LineChartAnswer({ progress }: { progress: number }) {
  const W = 1100, H = 360, PAD_L = 70, PAD_R = 70, PAD_T = 30, PAD_B = 50
  const years = ["FY22", "FY23", "FY24", "FY25"]
  const revenue = [142, 178, 219, 268]
  const ebitda = [18.2, 21.6, 24.8, 27.4]

  const xFor = (i: number) =>
    PAD_L + (i / (years.length - 1)) * (W - PAD_L - PAD_R)
  const innerH = H - PAD_T - PAD_B
  const yRev = (v: number) =>
    PAD_T + (1 - (v - 120) / 180) * (innerH * 0.55)
  const yMar = (v: number) =>
    PAD_T + innerH * 0.55 + 24 + (1 - (v - 16) / 14) * (innerH * 0.45 - 24)

  const drawProgress = clamp((progress - 0.1) / 0.55, 0, 1)
  const eased = easeOutCubic(drawProgress)

  const buildPath = (data: number[], yFn: (v: number) => number) =>
    data
      .map((v, i) => `${i === 0 ? "M" : "L"} ${xFor(i)} ${yFn(v)}`)
      .join(" ")

  const buildArea = (data: number[], yFn: (v: number) => number) => {
    let d = `M ${xFor(0)} ${H - PAD_B} `
    data.forEach((v, i) => {
      d += `L ${xFor(i)} ${yFn(v)} `
    })
    d += `L ${xFor(data.length - 1)} ${H - PAD_B} Z`
    return d
  }

  const pathLen = 1500
  const headerP = stagger(progress, 0, 8, 0.1)

  return (
    <AnswerCard progress={progress}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 20,
          opacity: headerP,
        }}
      >
        <div style={{ display: "flex", gap: 40 }}>
          <Metric label="Revenue" value="$268M" sub="FY25 · +88.7%" />
          <Metric label="EBITDA %" value="27.4%" sub="FY25 · +9.2pp" />
        </div>
        <div
          style={{
            display: "flex",
            gap: 20,
            alignItems: "center",
            fontFamily: FONT_SANS,
            fontSize: 14,
            color: INK_SOFT,
          }}
        >
          <Legend color={HALO.sky} label="Revenue ($M)" />
          <Legend color={HALO.lav} label="EBITDA margin (%)" />
        </div>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: "100%", height: 360, display: "block" }}
      >
        {[0, 1, 2, 3].map((g) => (
          <line
            key={g}
            x1={PAD_L}
            x2={W - PAD_R}
            y1={PAD_T + (g * (H - PAD_T - PAD_B)) / 3}
            y2={PAD_T + (g * (H - PAD_T - PAD_B)) / 3}
            stroke={LINE}
            strokeWidth="1"
            strokeDasharray="2 4"
          />
        ))}

        <defs>
          <linearGradient id="qa-revFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={HALO.sky} stopOpacity="0.45" />
            <stop offset="100%" stopColor={HALO.sky} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="qa-marFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={HALO.lav} stopOpacity="0.35" />
            <stop offset="100%" stopColor={HALO.lav} stopOpacity="0" />
          </linearGradient>
        </defs>

        <g style={{ opacity: eased }}>
          <path d={buildArea(revenue, yRev)} fill="url(#qa-revFill)" />
        </g>
        <g style={{ opacity: eased }}>
          <path d={buildArea(ebitda, yMar)} fill="url(#qa-marFill)" />
        </g>

        <path
          d={buildPath(revenue, yRev)}
          stroke={HALO.sky}
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLen}
          strokeDashoffset={pathLen * (1 - eased)}
        />
        <path
          d={buildPath(ebitda, yMar)}
          stroke={HALO.lav}
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLen}
          strokeDashoffset={pathLen * (1 - eased)}
        />

        {revenue.map((v, i) => {
          const p = clamp((progress - 0.2 - i * 0.06) / 0.15, 0, 1)
          return (
            <circle
              key={`r${i}`}
              cx={xFor(i)}
              cy={yRev(v)}
              r={6 * easeOutBack(p)}
              fill="#fff"
              stroke={HALO.sky}
              strokeWidth="3"
            />
          )
        })}
        {ebitda.map((v, i) => {
          const p = clamp((progress - 0.25 - i * 0.06) / 0.15, 0, 1)
          return (
            <circle
              key={`m${i}`}
              cx={xFor(i)}
              cy={yMar(v)}
              r={6 * easeOutBack(p)}
              fill="#fff"
              stroke={HALO.lav}
              strokeWidth="3"
            />
          )
        })}

        {years.map((y, i) => (
          <text
            key={y}
            x={xFor(i)}
            y={H - 18}
            fontFamily={FONT_MONO}
            fontSize="14"
            fill={INK_MUTE}
            textAnchor="middle"
          >
            {y}
          </text>
        ))}
      </svg>
    </AnswerCard>
  )
}

function Metric({
  label,
  value,
  sub,
}: {
  label: string
  value: string
  sub: string
}) {
  return (
    <div style={{ minWidth: 200 }}>
      <div
        style={{
          fontFamily: FONT_SANS,
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: INK_MUTE,
          marginBottom: 6,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: FONT_SERIF,
          fontSize: 36,
          fontWeight: 500,
          color: INK,
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: FONT_MONO,
          fontSize: 13,
          color: INK_SOFT,
          marginTop: 4,
        }}
      >
        {sub}
      </div>
    </div>
  )
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div
        style={{ width: 18, height: 3, background: color, borderRadius: 2 }}
      />
      <span>{label}</span>
    </div>
  )
}

// ── Answer 4: stacked bars ──────────────────────────────────────────────────
function BarsAnswer({ progress }: { progress: number }) {
  const segments = [
    { name: "Platform", color: HALO.sky, values: [38, 22, 14, 9] },
    { name: "Services", color: HALO.lav, values: [21, 15, 11, 7] },
    { name: "Marketplace", color: HALO.mint, values: [12, 18, 10, 5] },
    { name: "Subscriptions", color: HALO.peach, values: [16, 11, 8, 6] },
  ]
  const geos = ["Americas", "EMEA", "APAC", "LATAM"]

  const totals = geos.map((_, gi) =>
    segments.reduce((a, s) => a + s.values[gi], 0)
  )
  const maxTotal = Math.max(...totals)

  const W = 1100, H = 340, PAD_L = 80, PAD_R = 30, PAD_T = 20, PAD_B = 60
  const innerW = W - PAD_L - PAD_R
  const innerH = H - PAD_T - PAD_B
  const gap = innerW / geos.length
  const barW = gap * 0.55

  return (
    <AnswerCard progress={progress}>
      <div
        style={{
          display: "flex",
          gap: 24,
          marginBottom: 20,
          opacity: stagger(progress, 0, 6, 0.1),
          flexWrap: "wrap",
        }}
      >
        {segments.map((s) => (
          <div
            key={s.name}
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 4,
                background: s.color,
              }}
            />
            <span
              style={{
                fontFamily: FONT_SANS,
                fontSize: 16,
                fontWeight: 500,
                color: INK,
              }}
            >
              {s.name}
            </span>
          </div>
        ))}
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: "100%", height: 340, display: "block" }}
      >
        {[0, 0.25, 0.5, 0.75, 1].map((g, i) => (
          <g key={i}>
            <line
              x1={PAD_L}
              x2={W - PAD_R}
              y1={PAD_T + g * innerH}
              y2={PAD_T + g * innerH}
              stroke={LINE}
              strokeWidth="1"
              strokeDasharray="2 4"
            />
            <text
              x={PAD_L - 12}
              y={PAD_T + g * innerH + 4}
              fontFamily={FONT_MONO}
              fontSize="12"
              fill={INK_MUTE}
              textAnchor="end"
            >
              ${Math.round(maxTotal * (1 - g))}M
            </text>
          </g>
        ))}

        {geos.map((geo, gi) => {
          const cx = PAD_L + gap * gi + gap / 2
          const x = cx - barW / 2
          return (
            <g key={geo}>
              {segments.map((s, si) => {
                const segP = clamp(
                  (progress - 0.18 - gi * 0.06 - si * 0.04) / 0.35,
                  0,
                  1
                )
                const cumulativeUpTo = segments
                  .slice(0, si + 1)
                  .reduce((a, ss) => a + ss.values[gi], 0)
                const barTop =
                  PAD_T + innerH - (cumulativeUpTo / maxTotal) * innerH
                const segHeight =
                  (s.values[gi] / maxTotal) * innerH * easeOutCubic(segP)
                return (
                  <rect
                    key={s.name}
                    x={x}
                    y={barTop}
                    width={barW}
                    height={segHeight}
                    fill={s.color}
                    rx={si === segments.length - 1 ? 6 : 0}
                    ry={si === segments.length - 1 ? 6 : 0}
                    opacity={segP}
                  />
                )
              })}
              <text
                x={cx}
                y={H - 24}
                fontFamily={FONT_SANS}
                fontSize="16"
                fontWeight="500"
                fill={INK}
                textAnchor="middle"
              >
                {geo}
              </text>
              <text
                x={cx}
                y={PAD_T + innerH - (totals[gi] / maxTotal) * innerH - 14}
                fontFamily={FONT_MONO}
                fontSize="14"
                fill={INK}
                fontWeight="600"
                textAnchor="middle"
                opacity={clamp((progress - 0.55) / 0.25, 0, 1)}
              >
                ${totals[gi]}M
              </text>
            </g>
          )
        })}
      </svg>
    </AnswerCard>
  )
}

// ── Background flourish ─────────────────────────────────────────────────────
function BackgroundFlourish({ time }: { time: number }) {
  return (
    <>
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: -200,
          top: -200,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(125,196,245,0.18) 0%, rgba(196,167,231,0.12) 40%, rgba(248,247,244,0) 70%)",
          transform: `translate(${Math.sin(time * 0.3) * 30}px, ${Math.cos(time * 0.25) * 20}px)`,
          filter: "blur(20px)",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: -250,
          bottom: -250,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(242,197,213,0.16) 0%, rgba(255,211,184,0.10) 45%, rgba(248,247,244,0) 70%)",
          transform: `translate(${Math.cos(time * 0.22) * 24}px, ${Math.sin(time * 0.28) * 18}px)`,
          filter: "blur(20px)",
        }}
      />
    </>
  )
}

// ── Section ─────────────────────────────────────────────────────────────────
const SCENES: SceneSpec[] = [
  { query: "Flag revenue recognition issues in the VDR", Answer: FindingAnswer },
  {
    query: "Which accounts represent more than 5% of revenue?",
    Answer: TableAnswer,
  },
  {
    query: "Show revenue and EBITDA margin trend, last 4 years",
    Answer: LineChartAnswer,
  },
  {
    query: "Break down revenue by segment and geography",
    Answer: BarsAnswer,
  },
]

export function Querying() {
  return (
    <section className="px-12 py-14">
      <div className="grid items-center gap-12 md:grid-cols-[7fr_5fr] md:gap-16">
        <RevealOnScroll>
          <Stage scenes={SCENES} />
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <h2
            className="display-headline"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            <span className="block">Ask anything.</span>
            <span className="block display-italic">A cited answer back, not a guess.</span>
          </h2>
          <p className="mt-6 max-w-[500px] text-[17px] leading-[1.6] text-fg-2">
            Plain English in. A cited answer out, returned as text, table, or
            chart, with every figure traced back to its source row, clause, or
            message.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  )
}
