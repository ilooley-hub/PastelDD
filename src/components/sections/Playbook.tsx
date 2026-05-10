"use client"

import { useEffect, useRef, useState } from "react"
import { RevealOnScroll } from "@/components/ui/RevealOnScroll"

// ── Tokens ─────────────────────────────────────────────────────────────────
const INK = "#14131C"
const INK_MUTE = "#76737F"
const INK_FAINT = "#ABA8B0"
const SURFACE = "#FFFFFF"
const SURFACE_2 = "#FBFAF6"
const ACCENT = "#7B5BD6"
const ACCENT_SOFT = "rgba(123,91,214,0.06)"
const ACCENT_BORDER = "rgba(123,91,214,0.22)"
const OK_GREEN = "#1F8A5B"
const LINE = "rgba(20,19,28,0.08)"
const LINE_SOFT = "rgba(20,19,28,0.05)"

const FONT_SERIF = "var(--font-display), Georgia, serif"
const FONT_SANS = "var(--font-sans), system-ui, sans-serif"
const FONT_MONO = "var(--font-mono), ui-monospace, monospace"

// ── Easing ─────────────────────────────────────────────────────────────────
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))
const easeOutCubic = (t: number) => --t * t * t + 1
const easeInCubic = (t: number) => t * t * t

function tween(
  from: number,
  to: number,
  start: number,
  end: number,
  t: number,
  ease: (x: number) => number = easeOutCubic
) {
  if (t <= start) return from
  if (t >= end) return to
  return from + (to - from) * ease((t - start) / (end - start))
}

// ── Cycle data ─────────────────────────────────────────────────────────────
type Channel = "slack" | "email"

type CycleRow = {
  primary: string
  secondary: string
  link: string
}

type Cycle = {
  id: string
  rule: string
  authoredBy: string
  recipient: string
  channel: Channel
  pastelMessage: string
  sectionTitle: string
  rows: CycleRow[]
  responseText: string
  responderTime: string
  confirmText: string
}

const CYCLES: Cycle[] = [
  {
    id: "invoices",
    rule: "Flag any invoice above $50k without an approval on record.",
    authoredBy: "CFO Office",
    recipient: "Finance Manager",
    channel: "slack",
    pastelMessage:
      "Three October invoices need approval. All above $50k, no sign-off on record.",
    sectionTitle: "Flagged invoices · October 2026",
    rows: [
      { primary: "AWS", secondary: "$84,200", link: "Invoice #4821" },
      { primary: "Salesforce", secondary: "$61,500", link: "Invoice #4836" },
      { primary: "WeWork", secondary: "$52,000", link: "Invoice #4849" },
    ],
    responseText: "On it. Approving all three.",
    responderTime: "9:04",
    confirmText: "Logged + linked to GL",
  },
  {
    id: "renewals",
    rule: "Alert me when any contract is 60 days from renewal.",
    authoredBy: "CFO Office",
    recipient: "Head of Procurement",
    channel: "email",
    pastelMessage:
      "Three vendor contracts enter the 60-day window this week. Pricing benchmarks attached.",
    sectionTitle: "Renewals · 60-day window",
    rows: [
      { primary: "Snowflake", secondary: "renews Mar 14", link: "MSA.pdf" },
      { primary: "Datadog", secondary: "renews Apr 03", link: "MSA.pdf" },
      { primary: "Atlassian", secondary: "renews Apr 21", link: "MSA.pdf" },
    ],
    responseText: "Reviewing. Renegotiating Snowflake first.",
    responderTime: "10:21",
    confirmText: "Tracked. Negotiation log opened",
  },
  {
    id: "zombies",
    rule: "Notify me of vendors unused for six months.",
    authoredBy: "CFO Office",
    recipient: "VP Engineering",
    channel: "slack",
    pastelMessage:
      "Three engineering tools show no activity in the last six months.",
    sectionTitle: "Zombie subscriptions · $10.8K/yr",
    rows: [
      { primary: "PagerDuty", secondary: "$4,800/yr", link: "sub-091" },
      { primary: "Mixpanel", secondary: "$3,600/yr", link: "sub-104" },
      { primary: "Asana", secondary: "$2,400/yr", link: "sub-127" },
    ],
    responseText: "Cancel all three.",
    responderTime: "14:08",
    confirmText: "Cancellation queued · $10.8K/yr saved",
  },
]

// ── Beats (within a single cycle) ──────────────────────────────────────────
const CYCLE_DUR = 9.0

const T_IN = 0.0
const T_HEADER = 0.4
const T_GREETING = 1.2
const T_INVOICES = 2.6
const T_FM_TYPING = 4.6
const T_FM_RESPONSE = 5.7
const T_CONFIRM = 6.8
const T_HOLD_END = 8.4
const T_OUT_END = 9.0

const TOTAL = CYCLE_DUR * CYCLES.length

// ── Channel icons ─────────────────────────────────────────────────────────
function SlackIcon({ size = 16, dim = false }: { size?: number; dim?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ flexShrink: 0, opacity: dim ? 0.45 : 1 }}
      aria-hidden
    >
      <rect x="2" y="9.5" width="8" height="3" rx="1.5" fill="#36C5F0" />
      <rect x="14" y="11.5" width="8" height="3" rx="1.5" fill="#2EB67D" />
      <rect x="9.5" y="2" width="3" height="8" rx="1.5" fill="#E01E5A" />
      <rect x="11.5" y="14" width="3" height="8" rx="1.5" fill="#ECB22E" />
    </svg>
  )
}

function MailIcon({
  size = 16,
  color = INK,
  dim = false,
}: {
  size?: number
  color?: string
  dim?: boolean
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, opacity: dim ? 0.55 : 1 }}
      aria-hidden
    >
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 7l9 7 9-7" />
    </svg>
  )
}

function SmallOrb({ size = 28 }: { size?: number }) {
  return (
    <div
      aria-hidden
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundImage: "url(/query-orb.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        flexShrink: 0,
      }}
    />
  )
}

function PersonAvatar({ size = 28 }: { size?: number }) {
  return (
    <div
      aria-hidden
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "rgba(167,223,216,0.5)",
        border: "1px solid rgba(31,138,91,0.22)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg
        width={Math.round(size * 0.55)}
        height={Math.round(size * 0.55)}
        viewBox="0 0 24 24"
        fill="none"
        stroke={OK_GREEN}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="9" r="3.5" />
        <path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" />
      </svg>
    </div>
  )
}

function CheckIcon({ size = 11, color = ACCENT }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="5" stroke={color} strokeWidth="1.4" />
      <path
        d="M3.8 6.2l1.5 1.5 2.9-3.2"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ── Rule card (left column, swaps content between cycles) ──────────────────
function RuleCard({
  cycle,
  localTime,
}: {
  cycle: Cycle
  localTime: number
}) {
  const inOp = tween(0, 1, T_IN, T_IN + 0.5, localTime)
  const outOp = tween(1, 0, T_HOLD_END, T_OUT_END, localTime, easeInCubic)
  const opacity = inOp * outOp

  return (
    <div
      className="mt-8"
      style={{
        background: SURFACE,
        border: `1px solid ${ACCENT_BORDER}`,
        borderRadius: 16,
        padding: "20px 24px",
        boxShadow:
          "0 1px 0 rgba(20,19,28,0.04), 0 16px 36px -22px rgba(20,19,28,0.10)",
        minHeight: 168,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 12,
          fontFamily: FONT_MONO,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: ACCENT,
        }}
      >
        <span
          aria-hidden
          className="bg-halo-linear"
          style={{ width: 22, height: 2, borderRadius: 2, display: "inline-block" }}
        />
        Playbook rule
      </div>
      <div style={{ opacity }}>
        <div
          style={{
            fontFamily: FONT_SERIF,
            fontSize: 20,
            fontWeight: 500,
            lineHeight: 1.35,
            color: INK,
            letterSpacing: "-0.01em",
          }}
        >
          &ldquo;{cycle.rule}&rdquo;
        </div>
        <div
          style={{
            marginTop: 12,
            fontFamily: FONT_MONO,
            fontSize: 11,
            color: INK_MUTE,
          }}
        >
          Authored by · {cycle.authoredBy} · always on
        </div>
      </div>
    </div>
  )
}

// ── Channel strip (right column top) ──────────────────────────────────────
function ChannelStrip({
  cycle,
  localTime,
}: {
  cycle: Cycle
  localTime: number
}) {
  const inOp = tween(0, 1, T_IN, T_IN + 0.5, localTime)
  const outOp = tween(1, 0, T_HOLD_END, T_OUT_END, localTime, easeInCubic)
  const opacity = inOp * outOp
  const isSlack = cycle.channel === "slack"

  return (
    <div
      style={{
        position: "absolute",
        left: 30,
        top: 24,
        width: STAGE_W - 60,
        opacity,
        display: "flex",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
      }}
    >
      <span
        style={{
          fontFamily: FONT_MONO,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: INK_MUTE,
        }}
      >
        Pastel routed
      </span>

      <ChannelPill label="Slack" active={isSlack}>
        <SlackIcon size={14} dim={!isSlack} />
      </ChannelPill>
      <ChannelPill label="Email" active={!isSlack}>
        <MailIcon size={14} color={!isSlack ? INK : INK_MUTE} dim={isSlack} />
      </ChannelPill>

      <span
        style={{
          marginLeft: "auto",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontFamily: FONT_MONO,
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.10em",
          textTransform: "uppercase",
          color: INK_MUTE,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: OK_GREEN,
          }}
        />
        auto
      </span>
    </div>
  )
}

function ChannelPill({
  label,
  active,
  children,
}: {
  label: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 12px",
        borderRadius: 999,
        background: active ? ACCENT_SOFT : "transparent",
        border: active ? `1px solid ${ACCENT_BORDER}` : `1px dashed ${LINE}`,
        opacity: active ? 1 : 0.55,
        transition: "background 200ms, border 200ms, opacity 200ms",
      }}
    >
      {children}
      <span
        style={{
          fontFamily: FONT_SANS,
          fontSize: 13,
          fontWeight: active ? 600 : 500,
          color: active ? INK : INK_MUTE,
        }}
      >
        {label}
      </span>
      {active && <CheckIcon size={11} color={ACCENT} />}
    </div>
  )
}

// ── Chat panel ─────────────────────────────────────────────────────────────
function ChatPanel({ cycle, localTime }: { cycle: Cycle; localTime: number }) {
  const fadeOut = tween(1, 0, T_HOLD_END, T_OUT_END, localTime, easeInCubic)
  if (fadeOut <= 0) return null

  return (
    <div
      style={{
        position: "absolute",
        left: 30,
        top: 90,
        width: STAGE_W - 60,
        background: SURFACE,
        border: `1px solid ${LINE}`,
        borderRadius: 16,
        boxShadow:
          "0 1px 0 rgba(20,19,28,0.04), 0 30px 60px -30px rgba(20,19,28,0.10)",
        overflow: "hidden",
        opacity: fadeOut,
      }}
    >
      <ChatHeader cycle={cycle} localTime={localTime} />
      <div style={{ padding: "16px 22px 22px" }}>
        <PastelGreeting cycle={cycle} localTime={localTime} />
        <DataCard cycle={cycle} localTime={localTime} />
        <FMTyping localTime={localTime} />
        <FMResponse cycle={cycle} localTime={localTime} />
        <PastelConfirm cycle={cycle} localTime={localTime} />
      </div>
    </div>
  )
}

function ChatHeader({ cycle, localTime }: { cycle: Cycle; localTime: number }) {
  const op = tween(0, 1, T_HEADER, T_HEADER + 0.5, localTime)
  const isSlack = cycle.channel === "slack"
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 22px",
        borderBottom: `1px solid ${LINE}`,
        background: SURFACE_2,
        opacity: op,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
        {isSlack ? <SlackIcon size={14} /> : <MailIcon size={14} color={INK} />}
        <span
          style={{
            fontFamily: FONT_SANS,
            fontSize: 13,
            fontWeight: 600,
            color: INK,
          }}
        >
          Pastel
        </span>
        <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: INK_FAINT }}>
          →
        </span>
        <span
          style={{
            fontFamily: FONT_SANS,
            fontSize: 13,
            fontWeight: 600,
            color: INK,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {cycle.recipient}
        </span>
      </div>
      <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: INK_MUTE, flexShrink: 0 }}>
        today, 9:02
      </div>
    </div>
  )
}

function PastelGreeting({
  cycle,
  localTime,
}: {
  cycle: Cycle
  localTime: number
}) {
  const op = tween(0, 1, T_GREETING, T_GREETING + 0.6, localTime)
  const ty = tween(8, 0, T_GREETING, T_GREETING + 0.6, localTime)
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        opacity: op,
        transform: `translateY(${ty}px)`,
        marginBottom: 14,
      }}
    >
      <SmallOrb size={28} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 11,
            color: INK_MUTE,
            marginBottom: 4,
          }}
        >
          Pastel · 9:02
        </div>
        <div
          style={{
            background: SURFACE_2,
            border: `1px solid ${LINE}`,
            borderRadius: 10,
            padding: "10px 14px",
            fontFamily: FONT_SANS,
            fontSize: 13,
            lineHeight: 1.45,
            color: INK,
          }}
        >
          {cycle.pastelMessage}
        </div>
      </div>
    </div>
  )
}

function DataCard({ cycle, localTime }: { cycle: Cycle; localTime: number }) {
  const op = tween(0, 1, T_INVOICES, T_INVOICES + 0.7, localTime)
  const ty = tween(10, 0, T_INVOICES, T_INVOICES + 0.7, localTime)

  return (
    <div
      style={{
        marginLeft: 38,
        marginBottom: 14,
        opacity: op,
        transform: `translateY(${ty}px)`,
        border: `1px solid ${ACCENT_BORDER}`,
        borderLeft: `3px solid ${ACCENT}`,
        borderRadius: 10,
        background: SURFACE,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "10px 14px 6px",
          fontFamily: FONT_SANS,
          fontSize: 12,
          fontWeight: 600,
          color: INK,
        }}
      >
        {cycle.sectionTitle}
      </div>
      <div style={{ padding: "0 14px 10px" }}>
        {cycle.rows.map((r, i) => {
          const rowP = tween(
            0,
            1,
            T_INVOICES + 0.4 + i * 0.16,
            T_INVOICES + 1.0 + i * 0.16,
            localTime
          )
          return (
            <div
              key={`${cycle.id}-${i}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px 0",
                borderTop: i === 0 ? "none" : `1px solid ${LINE_SOFT}`,
                opacity: rowP,
              }}
            >
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 13,
                  fontVariantNumeric: "tabular-nums",
                  minWidth: 0,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <span style={{ fontWeight: 600, color: INK }}>{r.primary}</span>
                <span style={{ color: INK_MUTE }}>{` · ${r.secondary}`}</span>
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  fontFamily: FONT_MONO,
                  fontSize: 12,
                  fontWeight: 500,
                  color: ACCENT,
                  flexShrink: 0,
                  marginLeft: 12,
                }}
              >
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M3 9L9 3M9 3H4.5M9 3V7.5"
                    stroke={ACCENT}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {r.link}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function FMTyping({ localTime }: { localTime: number }) {
  const inOp = tween(0, 1, T_FM_TYPING, T_FM_TYPING + 0.4, localTime)
  const outOp = tween(
    1,
    0,
    T_FM_RESPONSE - 0.1,
    T_FM_RESPONSE + 0.3,
    localTime,
    easeInCubic
  )
  const opacity = inOp * outOp
  if (opacity <= 0) return null

  return (
    <div style={{ display: "flex", gap: 10, opacity, marginBottom: 14 }}>
      <PersonAvatar size={28} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 11,
            color: INK_MUTE,
            marginBottom: 4,
          }}
        >
          typing
        </div>
        <div
          style={{
            display: "inline-flex",
            gap: 5,
            padding: "10px 14px",
            background: SURFACE_2,
            border: `1px solid ${LINE}`,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          {[0, 1, 2].map((i) => {
            const phase = (Math.sin(localTime * 6 - i * 0.7) + 1) / 2
            return (
              <span
                key={i}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: INK_MUTE,
                  opacity: 0.3 + phase * 0.7,
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

function FMResponse({ cycle, localTime }: { cycle: Cycle; localTime: number }) {
  const op = tween(0, 1, T_FM_RESPONSE, T_FM_RESPONSE + 0.5, localTime)
  const ty = tween(8, 0, T_FM_RESPONSE, T_FM_RESPONSE + 0.5, localTime)
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        opacity: op,
        transform: `translateY(${ty}px)`,
        marginBottom: 14,
      }}
    >
      <PersonAvatar size={28} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 11,
            color: INK_MUTE,
            marginBottom: 4,
          }}
        >
          {cycle.recipient} · {cycle.responderTime}
        </div>
        <div
          style={{
            background: "rgba(31,138,91,0.08)",
            border: "1px solid rgba(31,138,91,0.20)",
            borderRadius: 10,
            padding: "10px 14px",
            fontFamily: FONT_SANS,
            fontSize: 13,
            lineHeight: 1.45,
            color: INK,
          }}
        >
          {cycle.responseText}
        </div>
      </div>
    </div>
  )
}

function PastelConfirm({
  cycle,
  localTime,
}: {
  cycle: Cycle
  localTime: number
}) {
  const op = tween(0, 1, T_CONFIRM, T_CONFIRM + 0.5, localTime)
  const ty = tween(8, 0, T_CONFIRM, T_CONFIRM + 0.5, localTime)
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        opacity: op,
        transform: `translateY(${ty}px)`,
      }}
    >
      <SmallOrb size={28} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 11,
            color: INK_MUTE,
            marginBottom: 4,
          }}
        >
          Pastel · {cycle.responderTime}
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 14px",
            background: ACCENT_SOFT,
            border: `1px solid ${ACCENT_BORDER}`,
            borderRadius: 10,
            fontFamily: FONT_SANS,
            fontSize: 13,
            fontWeight: 500,
            color: INK,
          }}
        >
          <CheckIcon size={14} color={ACCENT} />
          {cycle.confirmText}
        </div>
      </div>
    </div>
  )
}

// ── Stage (right column scaled canvas) ─────────────────────────────────────
const STAGE_W = 720
const STAGE_H = 720

function Stage({ cycle, localTime }: { cycle: Cycle; localTime: number }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const measure = () => setScale(el.clientWidth / STAGE_W)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={wrapRef}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: `${STAGE_W} / ${STAGE_H}`,
        borderRadius: 20,
        background: SURFACE_2,
        border: "1px solid #DEDBD2",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.6) inset, 0 30px 60px -30px rgba(20,19,28,0.10)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: STAGE_W,
          height: STAGE_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <ChannelStrip cycle={cycle} localTime={localTime} />
        <ChatPanel cycle={cycle} localTime={localTime} />
      </div>
    </div>
  )
}

// ── Section ────────────────────────────────────────────────────────────────
export function Playbook() {
  const sectionRef = useRef<HTMLElement>(null)
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
    const el = sectionRef.current
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
      // Park mid-cycle 1, conversation laid out
      setTime(7.0)
      return
    }
    if (!active) return
    let raf = 0
    let last: number | null = null
    const step = (ts: number) => {
      if (last == null) last = ts
      const dt = (ts - last) / 1000
      last = ts
      setTime((t) => (t + dt) % TOTAL)
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [active, reduced])

  const cycleIndex = clamp(
    Math.floor(time / CYCLE_DUR),
    0,
    CYCLES.length - 1
  )
  const cycle = CYCLES[cycleIndex]
  const localTime = time - cycleIndex * CYCLE_DUR

  return (
    <section ref={sectionRef} className="px-12 py-14">
      <div className="grid items-start gap-12 md:grid-cols-[5fr_7fr] md:gap-16">
        <RevealOnScroll>
          <h2
            className="display-headline"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            <span className="block">A teammate who never misses.</span>
            <span className="block display-italic">
              Pastel runs your playbook end to end.
            </span>
          </h2>
          <p className="mt-6 max-w-[500px] text-[17px] leading-[1.6] text-fg-2">
            Whatever your team has written down, controls, exceptions,
            escalations, Pastel reads every transaction against the playbook,
            routes the brief to the right owner, and closes the loop with full
            citations.
          </p>
          <RuleCard cycle={cycle} localTime={localTime} />
          <CycleIndicator cycleIndex={cycleIndex} />
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <Stage cycle={cycle} localTime={localTime} />
        </RevealOnScroll>
      </div>
    </section>
  )
}

function CycleIndicator({ cycleIndex }: { cycleIndex: number }) {
  return (
    <div className="mt-5 flex items-center gap-2">
      {CYCLES.map((c, i) => {
        const active = i === cycleIndex
        return (
          <span
            key={c.id}
            style={{
              width: active ? 24 : 6,
              height: 4,
              borderRadius: 999,
              background: active ? ACCENT : "rgba(20,19,28,0.16)",
              transition: "width 320ms ease, background 320ms ease",
            }}
          />
        )
      })}
    </div>
  )
}
