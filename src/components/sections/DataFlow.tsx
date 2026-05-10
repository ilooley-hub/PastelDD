"use client"

import { motion } from "framer-motion"
import {
  FileText,
  Database,
  Users,
  Mail,
  MessageCircle,
  FolderLock,
} from "lucide-react"

type Source = {
  id: string
  label: string
  icon: typeof FileText
  iconBg: string
  iconColor: string
  particleColor: string
  xPct: number
}

const SOURCES: Source[] = [
  {
    id: "contracts",
    label: "Contracts",
    icon: FileText,
    iconBg: "rgba(80,199,250,0.14)",
    iconColor: "#1F8AC2",
    particleColor: "#50C7FA",
    xPct: 8,
  },
  {
    id: "erp",
    label: "ERP",
    icon: Database,
    iconBg: "rgba(167,223,216,0.22)",
    iconColor: "#1F8A5B",
    particleColor: "#A7DFD8",
    xPct: 25,
  },
  {
    id: "crm",
    label: "CRM",
    icon: Users,
    iconBg: "rgba(255,233,184,0.36)",
    iconColor: "#B5781A",
    particleColor: "#FFE9B8",
    xPct: 42,
  },
  {
    id: "email",
    label: "Email",
    icon: Mail,
    iconBg: "rgba(255,211,176,0.32)",
    iconColor: "#C26A3A",
    particleColor: "#FFD3B0",
    xPct: 58,
  },
  {
    id: "vdr",
    label: "VDR",
    icon: FolderLock,
    iconBg: "rgba(244,164,181,0.18)",
    iconColor: "#B95A75",
    particleColor: "#F4A4B5",
    xPct: 75,
  },
  {
    id: "tribal",
    label: "Tribal Knowledge",
    icon: MessageCircle,
    iconBg: "rgba(196,167,231,0.20)",
    iconColor: "#7B5BD6",
    particleColor: "#C4A7E7",
    xPct: 92,
  },
]

const STAGE_W = 800
const STAGE_H = 140
const STEM_BOTTOM_X = STAGE_W / 2

function SourcePill({ source, index }: { source: Source; index: number }) {
  const Icon = source.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div
        className="group inline-flex items-center gap-2.5 rounded-full px-3.5 py-2"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #DEDBD2",
          boxShadow:
            "0 1px 2px rgba(20,19,28,0.04), inset 0 1px 0 rgba(255,255,255,0.8)",
        }}
      >
        <span
          className="inline-flex items-center justify-center rounded-md"
          style={{
            width: 26,
            height: 26,
            backgroundColor: source.iconBg,
          }}
        >
          <Icon size={14} color={source.iconColor} strokeWidth={2.2} />
        </span>
        <span className="text-[12.5px] font-semibold tracking-[-0.005em] text-fg-1 whitespace-nowrap">
          {source.label}
        </span>
        <motion.span
          aria-hidden
          className="ml-1 inline-block rounded-full"
          style={{
            width: 5,
            height: 5,
            backgroundColor: source.particleColor,
            boxShadow: `0 0 6px ${source.particleColor}`,
          }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            delay: index * 0.25,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  )
}

function Particle({
  source,
  delay,
  duration,
  size,
}: {
  source: Source
  delay: number
  duration: number
  size: number
}) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 35% 35%, ${source.particleColor}, ${source.particleColor}99)`,
        boxShadow: `0 0 ${size * 1.8}px ${source.particleColor}80`,
        left: `${source.xPct}%`,
        top: "0%",
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }}
      animate={{
        left: [
          `${source.xPct}%`,
          `${source.xPct + (50 - source.xPct) * 0.45}%`,
          `${source.xPct + (50 - source.xPct) * 0.8}%`,
          "50%",
        ],
        top: ["0%", "45%", "80%", "100%"],
        opacity: [0, 0.95, 1, 0.85, 0],
        scale: [0.4, 1, 1, 0.6, 0.3],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: [0.16, 1, 0.3, 1],
        times: [0, 0.4, 0.75, 1],
      }}
    />
  )
}

function PulseRing({ delay, size }: { delay: number; size: number }) {
  return (
    <motion.div
      aria-hidden
      className="absolute pointer-events-none rounded-full"
      style={{
        left: "50%",
        top: "50%",
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        border: "1px solid rgba(196,167,231,0.55)",
      }}
      animate={{
        scale: [0.55, 1.5],
        opacity: [0.55, 0],
      }}
      transition={{
        duration: 2.6,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  )
}

export function DataFlow() {
  return (
    <div className="relative mx-auto w-full max-w-[680px]">
      {/* Subtle label above the source row */}
      <div className="mb-4 flex items-center justify-center gap-3">
        <span
          aria-hidden
          className="h-px w-10"
          style={{
            background:
              "linear-gradient(to right, transparent, #DEDBD2 80%, #DEDBD2)",
          }}
        />
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-fg-3">
          Sources
        </span>
        <span
          aria-hidden
          className="h-px w-10"
          style={{
            background:
              "linear-gradient(to left, transparent, #DEDBD2 80%, #DEDBD2)",
          }}
        />
      </div>

      {/* Source pills */}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {SOURCES.map((s, i) => (
          <SourcePill key={s.id} source={s} index={i} />
        ))}
      </div>

      {/* Converging stems + traveling particles */}
      <div className="relative mt-8 h-32 sm:h-40">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            {SOURCES.map((s) => (
              <linearGradient
                key={`grad-${s.id}`}
                id={`stem-${s.id}`}
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
                gradientUnits="objectBoundingBox"
              >
                <stop
                  offset="0%"
                  stopColor={s.particleColor}
                  stopOpacity="0.15"
                />
                <stop
                  offset="60%"
                  stopColor={s.particleColor}
                  stopOpacity="0.55"
                />
                <stop
                  offset="100%"
                  stopColor={s.particleColor}
                  stopOpacity="0.85"
                />
              </linearGradient>
            ))}
          </defs>
          {SOURCES.map((s, i) => {
            const x1 = (s.xPct / 100) * STAGE_W
            return (
              <motion.line
                key={s.id}
                x1={x1}
                y1={0}
                x2={STEM_BOTTOM_X}
                y2={STAGE_H}
                stroke={`url(#stem-${s.id})`}
                strokeWidth={1.4}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 1,
                  delay: 0.2 + i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            )
          })}
        </svg>

        {SOURCES.map((s, sourceIdx) =>
          [0, 1, 2].map((wave) => (
            <Particle
              key={`${s.id}-${wave}`}
              source={s}
              delay={wave * 1.9 + sourceIdx * 0.4}
              duration={5.2 + ((sourceIdx * 13) % 7) / 5}
              size={6 + ((sourceIdx * 7 + wave * 3) % 6)}
            />
          ))
        )}
      </div>

      {/* Pastel orb with pulse rings */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex justify-center"
      >
        <div className="relative" style={{ width: 168, height: 168 }}>
          <PulseRing delay={0} size={148} />
          <PulseRing delay={0.85} size={148} />
          <PulseRing delay={1.7} size={148} />

          <motion.div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              inset: -46,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(196,167,231,0.42) 0%, rgba(80,199,250,0.22) 45%, transparent 75%)",
              filter: "blur(14px)",
            }}
            animate={{ scale: [1, 1.14, 1], opacity: [0.65, 1, 0.65] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/query-orb.png"
            alt=""
            draggable={false}
            style={{
              width: 168,
              height: 168,
              objectFit: "contain",
              userSelect: "none",
              position: "relative",
              display: "block",
            }}
          />
        </div>
      </motion.div>

    </div>
  )
}
