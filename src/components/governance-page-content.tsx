"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { FadeUp, StaggerContainer, StaggerItem } from "./motion"
import { Divider } from "./divider"
import {
  GradientOrbs,
  FloatingBadge,
  GlowDot,
} from "./visual-effects"
import {
  DotGrid,
  SectionLabel,
  CornerMarkers,
  DiagonalStripes,
  ConcentricRings,
  ScanBeam,
} from "./decorations"
import { Ripple } from "./ui/ripple"
import { Particles } from "./ui/particles"
import { Meteors } from "./ui/meteors"
import { AnimatedBeam } from "./ui/animated-beam"
import { BorderBeam } from "./ui/border-beam"
import { NumberTicker } from "./ui/number-ticker"
import { AuroraText } from "./ui/aurora-text"
import { AnimatedShinyText } from "./ui/animated-shiny-text"
import { OrbitingCircles } from "./ui/orbiting-circles"
import { ShimmerButton } from "./ui/shimmer-button"
import {
  IconArrowRight,
  IconPulse,
  IconShield,
  IconChart,
  IconOps,
  IconSpark,
  IconClock,
  IconCheck,
  IconBrief,
  IconChat,
  IconStack,
  IconSource,
  IconBuilding,
  IconFlag,
  IconLock,
} from "./icons"

const ease = [0.25, 0.1, 0.25, 1] as const

/* ─────────────── Hero ─────────────── */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-base pt-36 pb-24 grain">
      <GradientOrbs variant="purple" />
      <DotGrid color="rgba(124, 58, 237, 0.05)" size={32} dotSize={1} />

      {/* Drifting particles */}
      <Particles
        className="absolute inset-0"
        quantity={55}
        ease={70}
        color="#7C3AED"
        size={0.5}
        staticity={45}
      />

      {/* Corner markers frame the hero as an engineered artifact */}
      <div className="pointer-events-none absolute inset-8 hidden lg:block">
        <CornerMarkers />
      </div>

      {/* Floating decorative badges - four corners of the hero frame */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease }}
        className="pointer-events-none absolute top-32 left-12 hidden lg:block"
      >
        <FloatingBadge className="text-[10px] text-text-tertiary">
          <GlowDot color="green" />
          <span>Truth layer · live</span>
        </FloatingBadge>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.95, ease }}
        className="pointer-events-none absolute top-44 right-12 hidden lg:block"
      >
        <FloatingBadge className="text-[10px] text-text-tertiary">
          <GlowDot color="accent" />
          <span>Playbook · Financial governance</span>
        </FloatingBadge>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.1, ease }}
        className="pointer-events-none absolute bottom-24 left-20 hidden lg:block"
      >
        <FloatingBadge className="text-[10px] text-text-tertiary">
          <IconChat size={11} className="text-accent" />
          <span>Agent · Slack outreach</span>
        </FloatingBadge>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.25, ease }}
        className="pointer-events-none absolute bottom-32 right-20 hidden lg:block"
      >
        <FloatingBadge className="text-[10px] text-text-tertiary">
          <IconLock size={11} className="text-text-secondary" />
          <span>Audit trail · on</span>
        </FloatingBadge>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8 text-center">
        <FadeUp>
          <div className="relative inline-block mb-7">
            <FloatingBadge>
              <GlowDot color="accent" />
              <span className="text-text-secondary">
                Post-close, always on
              </span>
            </FloatingBadge>
            <BorderBeam
              size={60}
              duration={8}
              colorFrom="#C8A2FF"
              colorTo="#8DD0FF"
              borderWidth={1}
            />
          </div>
        </FadeUp>

        <FadeUp delay={0.05}>
          <h1 className="font-heading text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.02] tracking-heading-tight text-text-primary mb-7">
            Governance that doesn&apos;t{" "}
            <em className="not-italic font-normal italic">
              <AuroraText
                colors={["#8DD0FF", "#C8A2FF", "#FFB8D9", "#FFCFA0", "#8DD0FF"]}
                speed={1.1}
              >
                go cold after close.
              </AuroraText>
            </em>
          </h1>
        </FadeUp>

        <FadeUp delay={0.12}>
          <p className="mx-auto max-w-2xl text-lg text-text-secondary leading-relaxed mb-10">
            Pastel keeps the diligence truth layer live after the wire clears.
            Playbooks run on top of it. Agents chase the follow-up across Slack
            and email, so oversight keeps moving without your team becoming
            project managers.
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link href="/#contact" className="inline-flex">
              <ShimmerButton
                background="#14141C"
                shimmerColor="#C8A2FF"
                shimmerDuration="2.5s"
                className="magnetic px-8 py-4 text-base font-medium shadow-pastel"
              >
                <span className="inline-flex items-center gap-2">
                  Request a demo
                  <IconArrowRight size={16} />
                </span>
              </ShimmerButton>
            </Link>
            <a
              href="#operating-graph"
              className="inline-flex items-center gap-2 rounded-full border border-pastel-border bg-surface/60 backdrop-blur-sm px-8 py-4 text-base font-medium text-text-primary transition-all duration-300 hover:border-accent/40 hover:bg-surface"
            >
              See how it works
            </a>
          </div>
        </FadeUp>

        {/* Stat strip */}
        <FadeUp delay={0.3}>
          <div className="mt-14 flex items-center justify-center gap-8 sm:gap-12 flex-wrap">
            {[
              { value: 842, label: "Contracts indexed", suffix: "+" },
              { value: 91, label: "Diligence readiness", suffix: "%" },
              { value: 12, label: "Forward-looking events", suffix: "" },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-6 sm:gap-8">
                {i > 0 && <div className="h-10 w-px bg-pastel-border" />}
                <div className="flex flex-col">
                  <span className="font-heading text-2xl sm:text-3xl text-text-primary leading-none">
                    <NumberTicker
                      value={stat.value}
                      className="text-text-primary"
                    />
                    {stat.suffix}
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[1.5px] text-text-tertiary mt-2">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ─────────────── Operating graph (truth layer → playbooks → agents) ─────────────── */

const graphLayers = [
  {
    icon: IconStack,
    label: "Core engine",
    sub: "Live inputs",
    title: "Truth layer",
    description:
      "Contracts, documents, finance, and stakeholder input come together in one operating picture. Every new artifact is reconciled against what&apos;s already there.",
    items: ["Contracts", "Documents", "Finance", "Stakeholders"],
  },
  {
    icon: IconShield,
    label: "Playbooks",
    sub: "Rules in motion",
    title: "See the real risk",
    description:
      "Rule-based checks run against the truth layer and surface what matters before governance turns reactive. Calibrated to your underwriting and covenant thresholds.",
    items: ["Revenue leaks", "Compliance gaps", "Spend anomalies", "Deal risks"],
  },
  {
    icon: IconChat,
    label: "Agents",
    sub: "Slack + email",
    title: "Move the follow-up",
    description:
      "Agents use the same context to request support, route outreach, and push work forward. They close loops without the deal team becoming project managers.",
    items: ["Owner outreach", "Doc requests", "Escalations", "Post-close tasks"],
  },
] as const

function TruthLayerVisual() {
  return (
    <div className="mt-5 rounded-xl border border-pastel-border/60 bg-base/60 p-3 space-y-1.5">
      {[
        { label: "Contracts", count: 842 },
        { label: "Documents", count: 1247 },
        { label: "Finance", count: 12 },
      ].map((r, i) => (
        <div
          key={r.label}
          className="flex items-center justify-between text-[10px]"
        >
          <span className="text-text-secondary">{r.label}</span>
          <div className="flex items-center gap-2 flex-1 mx-3">
            <div className="h-1 rounded-full bg-pastel-border/40 flex-1 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-accent-deep to-accent"
                initial={{ width: 0 }}
                whileInView={{ width: `${60 + i * 12}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 + i * 0.1, ease }}
              />
            </div>
          </div>
          <span className="text-[10px] font-medium text-accent tabular-nums">
            {r.count}
          </span>
        </div>
      ))}
    </div>
  )
}

function PlaybookVisual() {
  return (
    <div className="mt-5 rounded-xl border border-pastel-border/60 bg-base/60 p-3 space-y-1.5">
      {[
        { label: "Pricing leakage", status: "Running", tone: "accent" },
        { label: "Covenant headroom", status: "Passed", tone: "green" },
        { label: "Vendor renewals", status: "3 flags", tone: "amber" },
      ].map((r, i) => (
        <motion.div
          key={r.label}
          initial={{ opacity: 0, x: -6 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 + i * 0.1, ease }}
          className="flex items-center justify-between text-[10px]"
        >
          <div className="flex items-center gap-1.5">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                r.tone === "green"
                  ? "bg-emerald-500"
                  : r.tone === "amber"
                  ? "bg-amber-500"
                  : "bg-accent animate-pulse"
              }`}
            />
            <span className="text-text-secondary">{r.label}</span>
          </div>
          <span
            className={`text-[9px] uppercase tracking-wider ${
              r.tone === "green"
                ? "text-emerald-600"
                : r.tone === "amber"
                ? "text-amber-600"
                : "text-accent"
            }`}
          >
            {r.status}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

function AgentVisual() {
  return (
    <div className="mt-5 rounded-xl border border-pastel-border/60 bg-base/60 p-3 space-y-2">
      <div className="flex items-start gap-2">
        <div className="h-5 w-5 rounded-md bg-gradient-to-br from-[#C8A2FF] to-[#8DD0FF] shrink-0 flex items-center justify-center">
          <IconSpark size={10} className="text-white" />
        </div>
        <div className="flex-1 rounded-lg bg-surface border border-pastel-border/60 px-2 py-1.5">
          <p className="text-[10px] text-text-secondary leading-snug">
            Missing signed SOW · pinging Sarah
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 pl-7">
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          className="h-1 w-1 rounded-full bg-accent"
        />
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: 0.2,
            ease: "easeInOut",
          }}
          className="h-1 w-1 rounded-full bg-accent"
        />
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: 0.4,
            ease: "easeInOut",
          }}
          className="h-1 w-1 rounded-full bg-accent"
        />
        <span className="text-[9px] text-text-tertiary ml-1">
          Replying...
        </span>
      </div>
    </div>
  )
}

function OperatingGraph() {
  const containerRef = useRef<HTMLDivElement>(null)
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)
  const card3Ref = useRef<HTMLDivElement>(null)
  const cardRefs = [card1Ref, card2Ref, card3Ref]
  const visuals = [<TruthLayerVisual key="t" />, <PlaybookVisual key="p" />, <AgentVisual key="a" />]

  return (
    <section
      id="operating-graph"
      className="relative overflow-hidden bg-surface py-28 grain"
    >
      <DiagonalStripes />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <FadeUp className="mx-auto max-w-2xl text-center mb-16">
          <SectionLabel color="deep">How it works</SectionLabel>
          <h2 className="font-heading text-[clamp(2rem,4vw,2.75rem)] leading-[1.02] tracking-heading-tight text-text-primary text-balance">
            From company data to{" "}
            <em className="gradient-text not-italic font-normal italic">
              coordinated action.
            </em>
          </h2>
          <p className="mt-4 text-text-secondary text-base">
            One truth layer. Playbooks that run on top. Agents that close the loop.
          </p>
        </FadeUp>

        <div ref={containerRef} className="relative grid gap-6 lg:grid-cols-3">
          {graphLayers.map((layer, i) => (
            <FadeUp key={layer.title} delay={i * 0.12}>
              <div
                ref={cardRefs[i]}
                className="relative h-full rounded-2xl border border-pastel-border bg-base p-7 transition-all duration-500 hover:border-pastel-border-hover hover:shadow-pastel overflow-hidden"
              >
                {/* Middle "Playbooks" card gets a permanent border beam */}
                {i === 1 && (
                  <BorderBeam
                    size={80}
                    duration={10}
                    colorFrom="#C8A2FF"
                    colorTo="#8DD0FF"
                    borderWidth={1}
                  />
                )}

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-accent">
                      <layer.icon size={20} />
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-[2px] text-accent-deep">
                        {layer.label}
                      </p>
                      <p className="text-[10px] text-text-tertiary mt-0.5">
                        {layer.sub}
                      </p>
                    </div>
                  </div>

                  <h3 className="font-heading text-lg text-text-primary mb-2">
                    {layer.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-text-secondary mb-4">
                    {layer.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-1">
                    {layer.items.map((it) => (
                      <span
                        key={it}
                        className="text-[11px] rounded-full border border-pastel-border/70 bg-surface px-2.5 py-1 text-text-secondary"
                      >
                        {it}
                      </span>
                    ))}
                  </div>

                  {visuals[i]}
                </div>
              </div>
            </FadeUp>
          ))}

          {/* Animated beams connect the cards */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={card1Ref}
            toRef={card2Ref}
            pathColor="rgba(124, 58, 237, 0.2)"
            pathWidth={1.5}
            gradientStartColor="#8DD0FF"
            gradientStopColor="#C8A2FF"
            duration={4}
            curvature={0}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={card2Ref}
            toRef={card3Ref}
            pathColor="rgba(124, 58, 237, 0.2)"
            pathWidth={1.5}
            gradientStartColor="#C8A2FF"
            gradientStopColor="#FFB8D9"
            duration={4}
            delay={0.5}
            curvature={0}
          />
        </div>
      </div>
    </section>
  )
}

/* ─────────────── Three governance streams ─────────────── */

const streams = [
  {
    icon: IconChart,
    label: "Financial governance",
    title: "Find the reconciliation gaps before the CFO does.",
    description:
      "ERP lag, cost-center drift, unusual journal entries, and period-over-period movement outside plan tolerance. Every exception lands in finance&apos;s queue with context attached.",
    trendData: [32, 38, 35, 42, 40, 38, 42, 46, 44, 48, 52, 49],
    trendTone: "amber" as const,
    examples: [
      {
        headline: "Payment mismatch",
        detail: "$5.2k overpayment identified against agreed terms",
      },
      {
        headline: "Reconciliation lag",
        detail: "ERP close stretched to 14 days in two cost centers",
      },
      {
        headline: "Covenant headroom",
        detail: "Net debt / EBITDA within 12% of trigger",
      },
    ],
  },
  {
    icon: IconSource,
    label: "Commercial term compliance",
    title: "Match the contracts to what&apos;s actually being billed.",
    description:
      "Pricing mechanics, escalators, renewal terms, and service levels don&apos;t always flow from legal into billing. Pastel reads both and flags where they diverge.",
    trendData: [60, 62, 58, 65, 68, 64, 70, 72, 69, 74, 78, 80],
    trendTone: "accent" as const,
    examples: [
      {
        headline: "Invoice without contract",
        detail: "$18.5k bill flagged for immediate follow-up",
      },
      {
        headline: "Pricing exception",
        detail: "3 customer agreements contain mechanics not in billing",
      },
      {
        headline: "Lease expiry",
        detail: "60-day renewal risk flagged for review",
      },
    ],
  },
  {
    icon: IconBuilding,
    label: "Post-M&A governance",
    title: "Carry diligence findings into the 100-day plan.",
    description:
      "Value-creation actions from diligence memos shouldn&apos;t die in a PDF. Pastel turns them into tracked workstreams owned by the right operating partner.",
    trendData: [20, 28, 34, 40, 48, 55, 62, 66, 72, 78, 85, 91],
    trendTone: "green" as const,
    examples: [
      {
        headline: "Value-creation actions",
        detail: "8 diligence items assigned into 100-day plan",
      },
      {
        headline: "Readiness score",
        detail: "91% of required docs indexed across 4 workstreams",
      },
      {
        headline: "Open priority",
        detail: "Vendor contract clean-up · resolve within 30 days",
      },
    ],
  },
] as const

function MiniSparkline({
  data,
  tone,
}: {
  data: readonly number[]
  tone: "amber" | "accent" | "green"
}) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const width = 120
  const height = 28
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width
      const y = height - ((v - min) / range) * height
      return `${x},${y}`
    })
    .join(" ")

  const stroke =
    tone === "amber" ? "#D97706" : tone === "green" ? "#059669" : "#7C3AED"

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="overflow-visible"
    >
      <motion.polyline
        fill="none"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        points={pts}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
      />
      <circle
        cx={width}
        cy={height - ((data[data.length - 1] - min) / range) * height}
        r={2.5}
        fill={stroke}
      />
    </svg>
  )
}

function GovernanceStreams() {
  return (
    <section className="relative overflow-hidden bg-base py-28 grain">
      <GradientOrbs variant="default" />
      <DotGrid color="rgba(200, 162, 255, 0.04)" size={36} dotSize={1} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <FadeUp className="mx-auto max-w-2xl text-center mb-20">
          <SectionLabel>Review streams</SectionLabel>
          <h2 className="font-heading text-[clamp(2rem,4vw,2.75rem)] leading-[1.02] tracking-heading-tight text-text-primary text-balance">
            Three streams of{" "}
            <em className="gradient-text not-italic font-normal italic">
              always-on oversight.
            </em>
          </h2>
          <p className="mt-4 text-text-secondary text-base">
            Built around how operating partners, deal teams, and finance owners actually split the work.
          </p>
        </FadeUp>

        <StaggerContainer
          staggerDelay={0.12}
          className="grid gap-6 lg:grid-cols-3"
        >
          {streams.map((s, i) => (
            <StaggerItem key={s.label}>
              <div className="group relative h-full rounded-2xl border border-pastel-border bg-surface p-7 transition-all duration-500 hover:border-pastel-border-hover hover:bg-surface-2 hover:shadow-pastel overflow-hidden">
                {/* Middle card has a permanent subtle border beam */}
                {i === 1 && (
                  <BorderBeam
                    size={70}
                    duration={12}
                    colorFrom="#FFB8D9"
                    colorTo="#C8A2FF"
                    borderWidth={1}
                  />
                )}

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-accent transition-all duration-500 group-hover:bg-accent/15 group-hover:border-accent/30">
                      <s.icon size={20} />
                    </div>
                    <MiniSparkline data={s.trendData} tone={s.trendTone} />
                  </div>

                  <p className="text-[10px] uppercase tracking-[2px] text-text-tertiary mb-3">
                    {s.label}
                  </p>

                  <h3
                    className="font-heading text-lg text-text-primary mb-3 leading-snug"
                    dangerouslySetInnerHTML={{ __html: s.title }}
                  />
                  <p
                    className="text-[13px] leading-relaxed text-text-secondary mb-6"
                    dangerouslySetInnerHTML={{ __html: s.description }}
                  />

                  <div className="space-y-2">
                    {s.examples.map((ex) => (
                      <div
                        key={ex.headline}
                        className="rounded-xl border border-pastel-border/60 bg-base/60 px-4 py-3 transition-colors group-hover:border-pastel-border-hover"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <IconFlag size={11} className="text-amber-600" />
                          <p className="text-[12px] font-medium text-text-primary">
                            {ex.headline}
                          </p>
                        </div>
                        <p className="text-[11.5px] text-text-tertiary leading-snug">
                          {ex.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

/* ─────────────── Financial Timeline ─────────────── */

const timelineEvents = [
  {
    type: "Payment due",
    icon: IconClock,
    detail: "Office lease monthly rent posts on Mar 14, 2026.",
    tag: "Accounting",
    days: 7,
  },
  {
    type: "Renewal notice",
    icon: IconSource,
    detail: "HubSpot 3-year contract auto-renews on Mar 29, 2026.",
    tag: "Contract",
    days: 22,
  },
  {
    type: "Price escalator",
    icon: IconChart,
    detail: "Salesforce annual contract increases 3% on Apr 13, 2026.",
    tag: "Contract",
    days: 37,
  },
  {
    type: "Bonus payout",
    icon: IconOps,
    detail: "Performance compensation accrues on May 28, 2026.",
    tag: "People",
    days: 82,
  },
] as const

function FinancialTimeline() {
  return (
    <section className="relative overflow-hidden bg-surface py-28 grain">
      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] items-center">
          <FadeUp>
            <SectionLabel color="deep">Financial Timeline</SectionLabel>
            <h2 className="font-heading text-[clamp(2rem,4vw,2.75rem)] leading-[1.05] tracking-heading-tight text-text-primary mb-5 text-balance">
              Map the obligations that{" "}
              <em className="gradient-text not-italic font-normal italic">
                can move the model.
              </em>
            </h2>
            <p className="text-[15px] leading-relaxed text-text-secondary max-w-md mb-6">
              Renewals, escalators, payouts, and accounting events stay visible
              as forward-looking operating signals, not buried footnotes. See
              what&apos;s coming and who needs to respond before it hits the
              income statement.
            </p>
            <div className="relative rounded-xl border border-accent/15 bg-accent/[0.04] px-5 py-4 overflow-hidden">
              <p className="text-[10px] uppercase tracking-[2px] text-accent-deep mb-1.5">
                Impact snapshot · next 30 days
              </p>
              <p className="text-[13.5px] text-text-secondary leading-relaxed">
                Two contract events and one accounting event are likely to
                affect pricing, cash timing, and diligence questions.
              </p>
              <ScanBeam />
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="relative rounded-2xl border border-pastel-border bg-base p-6 lg:p-7 shadow-pastel-lg overflow-hidden">
              <BorderBeam
                size={90}
                duration={14}
                colorFrom="#C8A2FF"
                colorTo="#FFB8D9"
                borderWidth={1}
              />
              <div className="pointer-events-none absolute inset-0">
                <CornerMarkers className="p-3" />
              </div>

              <div className="relative flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <IconClock size={14} className="text-accent" />
                  <p className="text-[11px] font-medium text-text-primary">
                    <NumberTicker
                      value={12}
                      className="text-text-primary font-medium"
                    />
                    <span> events · next 90 days</span>
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-emerald-700 border border-emerald-300 bg-emerald-50 rounded-full px-2 py-0.5">
                  <GlowDot color="green" />
                  Live
                </span>
              </div>

              <div className="relative space-y-3">
                {/* Vertical rail */}
                <div className="absolute left-[14px] top-3 bottom-3 w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent" />

                {timelineEvents.map((ev, i) => (
                  <motion.div
                    key={ev.type}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.08, ease }}
                    className="relative flex items-start gap-4 pl-0"
                  >
                    <div className="relative z-10 flex h-[30px] w-[30px] items-center justify-center rounded-full border border-pastel-border bg-surface shrink-0">
                      <ev.icon size={13} className="text-accent" />
                      {i === 0 && (
                        <span className="absolute inset-0 rounded-full animate-ping bg-accent/30" />
                      )}
                    </div>
                    <div className="flex-1 rounded-xl border border-pastel-border/60 bg-surface px-4 py-3">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[12px] font-medium text-text-primary">
                          {ev.type}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-text-tertiary tabular-nums">
                            +{ev.days}d
                          </span>
                          <span className="text-[9px] uppercase tracking-wider text-text-tertiary border border-pastel-border/60 rounded-full px-1.5 py-0.5">
                            {ev.tag}
                          </span>
                        </div>
                      </div>
                      <p className="text-[11.5px] text-text-secondary leading-snug">
                        {ev.detail}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

/* ─────────────── Agents in action (Slack thread) ─────────────── */

function AgentsInAction() {
  return (
    <section className="relative overflow-hidden bg-base py-28 grain">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px]">
        <Ripple
          mainCircleSize={120}
          mainCircleOpacity={0.12}
          numCircles={5}
        />
      </div>
      <div className="pointer-events-none absolute inset-0">
        <Meteors number={8} angle={235} />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] items-center">
          <FadeUp>
            <SectionLabel>Agents in action</SectionLabel>
            <h2 className="font-heading text-[clamp(2rem,4vw,2.75rem)] leading-[1.05] tracking-heading-tight text-text-primary mb-5 text-balance">
              Keep diligence moving{" "}
              <em className="gradient-text not-italic font-normal italic">
                without manual chasing.
              </em>
            </h2>
            <p className="text-[15px] leading-relaxed text-text-secondary max-w-md mb-6">
              When support is missing or context is incomplete, Pastel launches
              the right playbook, contacts the right person, and keeps the
              checklist moving. Humans stay in the loop on every decision.
            </p>
            <ul className="space-y-2.5 text-[13.5px] text-text-secondary">
              {[
                "Request documents over Slack and email",
                "Route exceptions to the right finance owner",
                "Every agent action is logged and traceable",
                "Deal team approves outbound messages before send",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/10 border border-accent/20 shrink-0">
                    <IconCheck size={12} className="text-accent" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="relative rounded-2xl border border-pastel-border bg-surface shadow-pastel-lg overflow-hidden">
              <BorderBeam
                size={100}
                duration={9}
                colorFrom="#8DD0FF"
                colorTo="#C8A2FF"
                borderWidth={1}
              />

              {/* Slack-style header */}
              <div className="relative flex items-center justify-between border-b border-pastel-border/70 px-5 py-3 bg-base/60">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 border border-accent/20">
                    <IconChat size={13} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-text-primary leading-none">
                      #diligence-requests
                    </p>
                    <p className="text-[10px] text-text-tertiary mt-0.5">
                      Slack · agent live
                    </p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-emerald-700 border border-emerald-300 bg-emerald-50 rounded-full px-2 py-0.5">
                  <GlowDot color="green" />
                  <AnimatedShinyText className="text-emerald-700">
                    Active
                  </AnimatedShinyText>
                </div>
              </div>

              {/* Thread */}
              <div className="relative px-6 py-6 space-y-4">
                {/* Pastel Agent msg 1 */}
                <div className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#C8A2FF] to-[#8DD0FF] shrink-0 flex items-center justify-center">
                    <IconSpark size={13} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-[12px] font-semibold text-text-primary">
                        Pastel Agent
                      </span>
                      <span className="text-[10px] text-text-tertiary">
                        10:30 AM
                      </span>
                    </div>
                    <p className="text-[13px] text-text-secondary leading-relaxed">
                      We&apos;re still missing the signed SOW for GlobalCorp.
                      Can you upload it or confirm the active version for
                      diligence?
                    </p>
                    <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] rounded bg-accent/10 border border-accent/15 text-accent-deep px-1.5 py-0.5">
                        GlobalCorp_MSA_Signed.pdf
                      </span>
                      <span className="text-[10px] rounded bg-accent/10 border border-accent/15 text-accent-deep px-1.5 py-0.5">
                        Checklist item #14
                      </span>
                    </div>
                  </div>
                </div>

                {/* Human reply */}
                <div className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#FFB8D9] to-[#FFCFA0] shrink-0 flex items-center justify-center">
                    <span className="text-[10px] font-semibold text-white">
                      SC
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-[12px] font-semibold text-text-primary">
                        Sarah Chen
                      </span>
                      <span className="text-[10px] text-text-tertiary">
                        · VP R&amp;D · 10:31 AM
                      </span>
                    </div>
                    <p className="text-[13px] text-text-secondary leading-relaxed">
                      The signed copy is in our shared drive. Sending it now
                      and will confirm the active version.
                    </p>
                  </div>
                </div>

                {/* Pastel Agent confirmation */}
                <div className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#C8A2FF] to-[#8DD0FF] shrink-0 flex items-center justify-center">
                    <IconSpark size={13} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-[12px] font-semibold text-text-primary">
                        Pastel Agent
                      </span>
                      <span className="text-[10px] text-text-tertiary">
                        10:32 AM
                      </span>
                    </div>
                    <p className="text-[13px] text-text-secondary leading-relaxed">
                      Received. Linked to the deal room, checklist updated, and
                      finance review is unblocked.
                    </p>
                    <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                      <span className="inline-flex items-center gap-1 text-[10px] rounded bg-emerald-50 border border-emerald-200 text-emerald-700 px-1.5 py-0.5">
                        <IconCheck size={9} />
                        Indexed
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] rounded bg-emerald-50 border border-emerald-200 text-emerald-700 px-1.5 py-0.5">
                        <IconCheck size={9} />
                        Finance notified
                      </span>
                    </div>
                  </div>
                </div>

                {/* Typing indicator */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#C8A2FF] to-[#8DD0FF] shrink-0 flex items-center justify-center opacity-70">
                    <IconSpark size={13} className="text-white" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-pastel-border/70 bg-base/60 px-3 py-1.5">
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="h-1.5 w-1.5 rounded-full bg-accent"
                    />
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: 0.2,
                        ease: "easeInOut",
                      }}
                      className="h-1.5 w-1.5 rounded-full bg-accent"
                    />
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: 0.4,
                        ease: "easeInOut",
                      }}
                      className="h-1.5 w-1.5 rounded-full bg-accent"
                    />
                    <span className="text-[10px] text-text-tertiary ml-1">
                      Drafting next outreach...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

/* ─────────────── Playbooks library ─────────────── */

const playbooks = [
  {
    icon: IconBrief,
    name: "Document chase",
    description:
      "Collect missing agreements, supporting schedules, and diligence artifacts without the deal team becoming project managers.",
    teammate: "DD coordinator",
    activity: [
      { label: "Docs requested", value: 14 },
      { label: "Received", value: 11 },
      { label: "Pending", value: 3 },
    ],
  },
  {
    icon: IconShield,
    name: "Financial governance",
    description:
      "Route exceptions, reconciliation gaps, and approvals to the right finance owner with the supporting context attached.",
    teammate: "Finance controller",
    activity: [
      { label: "Exceptions routed", value: 26 },
      { label: "Resolved", value: 22 },
      { label: "Open", value: 4 },
    ],
  },
  {
    icon: IconBuilding,
    name: "Post-close actioning",
    description:
      "Carry diligence findings into live workstreams with owners, deadlines, and status tracking tied to the 100-day plan.",
    teammate: "Integration PM",
    activity: [
      { label: "Actions tracked", value: 31 },
      { label: "Complete", value: 19 },
      { label: "In flight", value: 12 },
    ],
  },
] as const

function PlaybooksLibrary() {
  return (
    <section className="relative overflow-hidden bg-surface py-28 grain">
      <GradientOrbs variant="default" />

      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40 hidden lg:block">
        <ConcentricRings size={700} />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        <FadeUp className="mx-auto max-w-2xl text-center mb-16">
          <SectionLabel color="deep">Playbooks</SectionLabel>
          <h2 className="font-heading text-[clamp(2rem,4vw,2.75rem)] leading-[1.02] tracking-heading-tight text-text-primary text-balance">
            Virtual teammates for{" "}
            <em className="gradient-text not-italic font-normal italic">
              the work you already do.
            </em>
          </h2>
          <p className="mt-4 text-text-secondary text-base">
            Each playbook runs a defined role. Calibrate the scope; humans approve the moves.
          </p>
        </FadeUp>

        <div className="grid gap-5 md:grid-cols-3">
          {playbooks.map((p, i) => (
            <FadeUp key={p.name} delay={i * 0.1}>
              <div className="group relative h-full rounded-2xl border border-pastel-border bg-base p-7 transition-all duration-500 hover:border-pastel-border-hover hover:shadow-pastel overflow-hidden">
                {i === 1 && (
                  <BorderBeam
                    size={70}
                    duration={11}
                    colorFrom="#C8A2FF"
                    colorTo="#8DD0FF"
                    borderWidth={1}
                  />
                )}

                <div className="relative z-10">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-accent mb-5">
                    <p.icon size={20} />
                  </div>
                  <h3 className="font-heading text-lg text-text-primary mb-2">
                    {p.name}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-text-secondary mb-5">
                    {p.description}
                  </p>

                  {/* Activity strip */}
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {p.activity.map((a) => (
                      <div
                        key={a.label}
                        className="rounded-lg border border-pastel-border/60 bg-surface px-2.5 py-2"
                      >
                        <p className="text-[9px] uppercase tracking-wider text-text-tertiary mb-0.5">
                          {a.label}
                        </p>
                        <p className="font-heading text-base text-text-primary tabular-nums">
                          <NumberTicker
                            value={a.value}
                            className="text-text-primary"
                          />
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-pastel-border/60">
                    <p className="text-[10px] uppercase tracking-[2px] text-text-tertiary mb-1">
                      Virtual teammate
                    </p>
                    <p className="text-[13px] font-medium text-text-primary">
                      {p.teammate}
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────── Priorities (100-day plan) ─────────────── */

const priorities = [
  {
    num: "01",
    title: "Vendor contract clean-up",
    detail:
      "Resolve missing agreements and renewal exposure within the first 30 days.",
    window: "Days 0–30",
    progress: 68,
    status: "In flight",
    tone: "accent",
  },
  {
    num: "02",
    title: "Pricing leakage review",
    detail:
      "Link contract mechanics to billing and margin analysis right after close.",
    window: "Days 15–45",
    progress: 34,
    status: "Starting",
    tone: "amber",
  },
  {
    num: "03",
    title: "Cash-impact timeline",
    detail:
      "Track renewals, escalators, and compensation events through the first board cycle.",
    window: "First board cycle",
    progress: 12,
    status: "Upcoming",
    tone: "deep",
  },
] as const

function Priorities() {
  return (
    <section className="relative overflow-hidden bg-base py-28 grain">
      <GradientOrbs variant="default" />
      <DiagonalStripes />

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
        <FadeUp className="mx-auto max-w-2xl text-center mb-14">
          <SectionLabel>Priorities</SectionLabel>
          <h2 className="font-heading text-[clamp(2rem,4vw,2.75rem)] leading-[1.02] tracking-heading-tight text-text-primary text-balance">
            The first 100 days,{" "}
            <em className="gradient-text not-italic font-normal italic">
              already scoped.
            </em>
          </h2>
          <p className="mt-4 text-text-secondary text-base">
            Every engagement starts with a calibrated priority stack.
          </p>
        </FadeUp>

        <div className="space-y-3">
          {priorities.map((p, i) => (
            <FadeUp key={p.num} delay={i * 0.08}>
              <div className="group relative overflow-hidden flex flex-col sm:flex-row sm:items-center gap-5 rounded-2xl border border-pastel-border bg-surface px-6 py-5 transition-all duration-500 hover:border-pastel-border-hover hover:shadow-pastel">
                <ScanBeam />
                <span className="font-heading text-2xl text-accent/80 shrink-0 w-10">
                  {p.num}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <p className="text-[14.5px] font-medium text-text-primary">
                      {p.title}
                    </p>
                    <span
                      className={`text-[9px] uppercase tracking-wider rounded-full px-2 py-0.5 border ${
                        p.tone === "accent"
                          ? "text-accent border-accent/30 bg-accent/10"
                          : p.tone === "amber"
                          ? "text-amber-700 border-amber-300 bg-amber-50"
                          : "text-text-tertiary border-pastel-border bg-base"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                  <p className="text-[13px] text-text-secondary leading-relaxed mb-3">
                    {p.detail}
                  </p>

                  {/* Progress bar */}
                  <div className="flex items-center gap-3">
                    <div className="h-1 flex-1 rounded-full bg-pastel-border/60 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-accent-deep to-accent"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${p.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.1, ease }}
                      />
                    </div>
                    <span className="text-[11px] text-text-tertiary tabular-nums w-12 text-right">
                      {p.progress}%
                    </span>
                  </div>
                </div>
                <span className="hidden sm:inline-flex text-[10px] uppercase tracking-[2px] text-text-tertiary border border-pastel-border/70 rounded-full px-3 py-1 shrink-0">
                  {p.window}
                </span>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────── Security band ─────────────── */

const securityFeatures = [
  {
    icon: IconLock,
    title: "Permissioned access",
    detail:
      "Workspaces scoped per deal, per fund. Owners and viewers set explicitly.",
  },
  {
    icon: IconSource,
    title: "Audit trail",
    detail:
      "Every agent action, doc request, and answer is logged with source links.",
  },
  {
    icon: IconShield,
    title: "Human-in-the-loop",
    detail:
      "Agents propose; the deal team approves before anything goes outbound.",
  },
  {
    icon: IconBrief,
    title: "Traceable outputs",
    detail:
      "Every finding traces back to the exact document, page, and paragraph.",
  },
]

function Security() {
  return (
    <section className="relative overflow-hidden bg-surface py-28 grain">
      {/* Giant faded shield in the background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.035]">
        <IconShield size={680} className="text-accent" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        <FadeUp className="mx-auto max-w-2xl text-center mb-14">
          <SectionLabel color="deep">Security</SectionLabel>
          <h2 className="font-heading text-[clamp(2rem,4vw,2.75rem)] leading-[1.02] tracking-heading-tight text-text-primary text-balance">
            <AnimatedShinyText className="inline">
              <span className="text-text-primary">Built for </span>
            </AnimatedShinyText>
            <em className="gradient-text not-italic font-normal italic">
              sensitive deal work.
            </em>
          </h2>
          <p className="mt-4 text-text-secondary text-base max-w-xl mx-auto">
            Diligence tools need more than a good interface. They need clear
            access control, traceability, and a workflow the team can trust
            with confidential company information.
          </p>
        </FadeUp>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {securityFeatures.map((f, i) => (
            <FadeUp key={f.title} delay={i * 0.07}>
              <div className="group relative h-full rounded-2xl border border-pastel-border bg-base p-6 transition-all duration-500 hover:border-pastel-border-hover hover:shadow-pastel overflow-hidden">
                <ScanBeam className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-accent mb-4 transition-all duration-500 group-hover:bg-accent/15 group-hover:border-accent/30">
                  <f.icon size={18} />
                </div>
                <h3 className="font-heading text-[15px] text-text-primary mb-1.5">
                  {f.title}
                </h3>
                <p className="text-[12.5px] leading-relaxed text-text-secondary">
                  {f.detail}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────── FAQ ─────────────── */

const governanceFaqs: { question: string; answer: string }[] = [
  {
    question: "How is this different from a dashboard or monitoring tool?",
    answer:
      "Most tools alert. Pastel acts. Playbooks run on top of the truth layer, and agents carry exceptions forward: they draft the Slack message, route the finance owner, update the checklist, and log the response. The deal team supervises instead of coordinating.",
  },
  {
    question: "Do agents actually message our CFOs and operators?",
    answer:
      "Yes, over Slack and email, but only after the deal team approves the outbound. Agents draft; humans send. Every message is tied back to a specific playbook and logged for audit.",
  },
  {
    question: "What gets into the truth layer?",
    answer:
      "Contracts, signed agreements, monthly financials, board packs, operating reports, ERP exports, and stakeholder input. If it&apos;s a document your team already receives, Pastel can read it; if it&apos;s a system, we connect directly.",
  },
  {
    question: "How do you handle sensitive deal information?",
    answer:
      "Workspaces are permissioned per deal. Data is encrypted at rest and in transit, isolated per fund, and never used to train models. SOC 2 compliant. Deployment inside your VPC is available for firms that need it.",
  },
  {
    question: "How long does onboarding take?",
    answer:
      "A single portfolio company can be live in under a week. A full portfolio rollout typically takes two to four weeks depending on how data sources are structured.",
  },
  {
    question: "Does this replace our operating partners or portfolio finance team?",
    answer:
      "No. It gives them leverage. Operating partners still drive strategy and talk to CFOs. Pastel handles the read-everything, chase-every-missing-doc, route-every-exception work that a human team can&apos;t realistically cover at scale.",
  },
]

function GovernanceFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="relative overflow-hidden bg-base py-28 grain">
      <GradientOrbs variant="default" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8">
        <FadeUp className="mx-auto max-w-2xl text-center mb-14">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="font-heading text-[clamp(2rem,4vw,2.75rem)] leading-tight tracking-heading text-text-primary text-balance">
            Common questions about{" "}
            <em className="gradient-text not-italic font-normal italic">
              governance.
            </em>
          </h2>
        </FadeUp>

        <div className="relative rounded-2xl border border-pastel-border bg-surface px-6 sm:px-8 shadow-pastel">
          <div className="pointer-events-none absolute inset-0">
            <CornerMarkers className="p-2" />
          </div>

          {governanceFaqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05, ease }}
                className="border-b border-pastel-border/60 last:border-0"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left transition-colors hover:text-accent"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-medium text-text-primary">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="shrink-0"
                  >
                    <ChevronDown className="h-5 w-5 text-text-tertiary" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease }}
                      className="overflow-hidden"
                    >
                      <p
                        className="pb-6 text-sm leading-relaxed text-text-secondary max-w-2xl"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─────────────── Closing CTA ─────────────── */

function ClosingCTA() {
  return (
    <section className="relative overflow-hidden bg-surface py-32 grain">
      <GradientOrbs variant="cta" />
      <div className="pointer-events-none absolute inset-0">
        <Meteors number={12} angle={235} />
      </div>

      {/* Orbiting decorative circles behind the headline */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[420px] hidden lg:block opacity-70">
        <OrbitingCircles iconSize={22} radius={180} duration={30}>
          <IconChart size={14} className="text-accent" />
          <IconPulse size={14} className="text-accent-deep" />
          <IconShield size={14} className="text-warm-dark" />
          <IconChat size={14} className="text-accent" />
        </OrbitingCircles>
        <OrbitingCircles
          iconSize={18}
          radius={110}
          duration={22}
          reverse
        >
          <IconFlag size={12} className="text-accent" />
          <IconSpark size={12} className="text-accent-deep" />
          <IconCheck size={12} className="text-warm-dark" />
        </OrbitingCircles>
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <FadeUp>
          <SectionLabel color="deep">Get started</SectionLabel>
          <h2 className="font-heading text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.02] tracking-heading-tight text-text-primary mb-6 text-balance">
            See Pastel on the kind of{" "}
            <em className="not-italic font-normal italic">
              <AuroraText
                colors={["#8DD0FF", "#C8A2FF", "#FFB8D9", "#FFCFA0", "#8DD0FF"]}
                speed={1.1}
              >
                company you&apos;re evaluating now.
              </AuroraText>
            </em>
          </h2>
          <p className="mx-auto max-w-xl text-lg text-text-secondary leading-relaxed mb-9">
            30-minute walkthrough. No generic deck, no filler. We&apos;ll show
            the live operating picture, the agent follow-up, and the playbooks
            on a deal context that looks like yours.
          </p>
          <Link href="/#contact" className="inline-flex">
            <ShimmerButton
              background="#14141C"
              shimmerColor="#C8A2FF"
              shimmerDuration="2.5s"
              className="magnetic px-8 py-4 text-base font-medium shadow-pastel"
            >
              <span className="inline-flex items-center gap-2">
                Book my walkthrough
                <IconArrowRight size={16} />
              </span>
            </ShimmerButton>
          </Link>
        </FadeUp>
      </div>
    </section>
  )
}

/* ─────────────── Page ─────────────── */

export function GovernancePageContent() {
  return (
    <main>
      <Hero />
      <Divider />
      <OperatingGraph />
      <Divider />
      <GovernanceStreams />
      <Divider />
      <FinancialTimeline />
      <Divider />
      <AgentsInAction />
      <Divider />
      <PlaybooksLibrary />
      <Divider />
      <Priorities />
      <Divider />
      <Security />
      <Divider />
      <GovernanceFAQ />
      <Divider />
      <ClosingCTA />
    </main>
  )
}
