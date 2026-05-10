import type { Finding } from "@/lib/fixtures"
import { SeverityTag } from "./SeverityTag"

const IMPACT_TONE = {
  red: {
    bg: "rgba(200,51,58,0.06)",
    color: "#C8333A",
    border: "rgba(200,51,58,0.20)",
  },
  amber: {
    bg: "rgba(181,120,26,0.06)",
    color: "#B5781A",
    border: "rgba(181,120,26,0.20)",
  },
}

export function FindingCard({ finding }: { finding: Finding }) {
  const impact = IMPACT_TONE[finding.impactTone]
  return (
    <div className="card-surface card-surface-hover rounded-[10px] p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-fg-3">
          {finding.module}
        </div>
        <SeverityTag severity={finding.severity} />
      </div>
      <h3
        className="mt-4 text-[20px] leading-snug font-bold text-fg-1"
        style={{
          fontFamily: "var(--font-display), Georgia, serif",
          fontVariationSettings: "'opsz' 40",
          letterSpacing: "-0.015em",
        }}
      >
        {finding.title}
      </h3>
      <p className="mt-3 text-[14px] leading-[1.6] text-fg-2">
        {finding.body}
      </p>
      <div
        className="mt-5 inline-flex items-center rounded-[6px] border px-3 py-1.5 text-[12px] font-semibold"
        style={{
          backgroundColor: impact.bg,
          color: impact.color,
          borderColor: impact.border,
        }}
      >
        {finding.impact}
      </div>
      <div className="mt-3 text-[11px] text-fg-3 font-mono">
        Source: {finding.source}
      </div>
    </div>
  )
}
