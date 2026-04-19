"use client"

import { motion } from "framer-motion"

const ease = [0.25, 0.1, 0.25, 1] as const

/* ============================================================
   Sparkline - small line chart with glow
============================================================ */
export function Sparkline({
  data = [12, 18, 14, 22, 19, 28, 24, 32, 38, 35, 44, 52],
  color = "#7C3AED",
  width = 200,
  height = 60,
  fill = true,
  animate = true,
}: {
  data?: number[]
  color?: string
  width?: number
  height?: number
  fill?: boolean
  animate?: boolean
}) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const stepX = width / (data.length - 1)

  const points = data.map((v, i) => ({
    x: i * stepX,
    y: height - ((v - min) / range) * (height - 8) - 4,
  }))

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ")

  const fillPath = `${linePath} L ${width} ${height} L 0 ${height} Z`

  const id = `sparkline-${color.replace("#", "")}`

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="overflow-visible"
    >
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <filter id={`${id}-glow`}>
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {fill && (
        <motion.path
          d={fillPath}
          fill={`url(#${id}-fill)`}
          initial={animate ? { opacity: 0 } : false}
          whileInView={animate ? { opacity: 1 } : undefined}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      )}

      <motion.path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#${id}-glow)`}
        initial={animate ? { pathLength: 0 } : false}
        whileInView={animate ? { pathLength: 1 } : undefined}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease }}
      />

      {/* End dot */}
      <motion.circle
        cx={points[points.length - 1].x}
        cy={points[points.length - 1].y}
        r="3"
        fill={color}
        filter={`url(#${id}-glow)`}
        initial={animate ? { scale: 0 } : false}
        whileInView={animate ? { scale: 1 } : undefined}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 1.4 }}
      />
    </svg>
  )
}

/* ============================================================
   Donut chart with center label
============================================================ */
export function Donut({
  value = 87,
  size = 100,
  strokeWidth = 8,
  color = "#7C3AED",
  label,
}: {
  value?: number
  size?: number
  strokeWidth?: number
  color?: string
  label?: string
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference
  const id = `donut-${Math.random().toString(36).slice(2, 8)}`

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5B21B6" />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E8E5DC"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-heading text-lg text-text-primary leading-none">
          {value}
          <span className="text-sm">%</span>
        </span>
        {label && (
          <span className="text-[9px] text-text-tertiary uppercase tracking-wider mt-0.5">
            {label}
          </span>
        )}
      </div>
    </div>
  )
}

/* ============================================================
   Animated Bar chart
============================================================ */
export function BarChart({
  data,
  height = 100,
}: {
  data: { label: string; value: number; color?: string }[]
  height?: number
}) {
  const max = Math.max(...data.map((d) => d.value))

  return (
    <div className="flex items-end gap-2.5" style={{ height }}>
      {data.map((d, i) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full flex-1 flex items-end">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${(d.value / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 + i * 0.08, ease }}
              className="w-full rounded-t-md"
              style={{
                background: `linear-gradient(to top, ${
                  d.color ?? "#8B5CF6"
                }60, ${d.color ?? "#C8A2FF"}cc)`,
              }}
            />
          </div>
          <span className="text-[9px] text-text-tertiary uppercase tracking-wider">
            {d.label}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ============================================================
   Risk Gauge - semicircle
============================================================ */
export function RiskGauge({
  value = 35,
  label = "Risk Score",
}: {
  value?: number
  label?: string
}) {
  const size = 140
  const strokeWidth = 10
  const radius = (size - strokeWidth) / 2
  const cy = size / 2
  const semi = Math.PI * radius

  // Color based on value
  const color =
    value < 33 ? "#10B981" : value < 66 ? "#F59E0B" : "#EF4444"

  const offset = semi - (value / 100) * semi

  return (
    <div className="relative inline-flex flex-col items-center">
      <svg width={size} height={size / 2 + 10} viewBox={`0 0 ${size} ${size / 2 + 10}`}>
        <path
          d={`M ${strokeWidth / 2} ${cy} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${cy}`}
          fill="none"
          stroke="#E8E5DC"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <motion.path
          d={`M ${strokeWidth / 2} ${cy} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${cy}`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={semi}
          initial={{ strokeDashoffset: semi }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease }}
          style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
        />
      </svg>
      <div className="absolute top-[55%] left-1/2 -translate-x-1/2 text-center">
        <span className="font-heading text-2xl text-text-primary">{value}</span>
        <p className="text-[10px] text-text-tertiary uppercase tracking-wider mt-0.5">
          {label}
        </p>
      </div>
    </div>
  )
}

/* ============================================================
   Animated number ticker
============================================================ */
export function MetricCard({
  label,
  value,
  delta,
  positive = true,
  sparkline,
}: {
  label: string
  value: string
  delta?: string
  positive?: boolean
  sparkline?: number[]
}) {
  return (
    <div className="rounded-xl border border-pastel-border bg-base/50 p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] text-text-tertiary uppercase tracking-[1.5px] font-medium">
          {label}
        </span>
        {delta && (
          <span
            className={`text-[10px] font-medium ${
              positive ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {positive ? "↑" : "↓"} {delta}
          </span>
        )}
      </div>
      <p className="font-heading text-xl text-text-primary">{value}</p>
      {sparkline && (
        <div className="mt-2">
          <Sparkline
            data={sparkline}
            color={positive ? "#10B981" : "#EF4444"}
            width={120}
            height={28}
            fill={false}
          />
        </div>
      )}
    </div>
  )
}
