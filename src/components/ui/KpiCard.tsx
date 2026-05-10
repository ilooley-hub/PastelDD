import type { Kpi } from "@/lib/fixtures"

const VALUE_TONE = {
  default: "#14131C",
  amber: "#B5781A",
  red: "#C8333A",
}
const SUB_TONE = {
  default: "#76737F",
  amber: "#B5781A",
  red: "#C8333A",
}

export function KpiCard({ kpi }: { kpi: Kpi }) {
  return (
    <div
      className="px-5 py-4"
      style={{
        backgroundColor: "#FFFFFF",
        borderTop: kpi.featured ? "2px solid transparent" : undefined,
        backgroundImage: kpi.featured
          ? "linear-gradient(#FFFFFF, #FFFFFF), linear-gradient(112deg, #50C7FA 0%, #93C3FF 22%, #C4A7E7 42%, #E3C6FF 58%, #FFD3B0 78%, #FFE9B8 100%)"
          : undefined,
        backgroundOrigin: kpi.featured ? "border-box" : undefined,
        backgroundClip: kpi.featured ? "padding-box, border-box" : undefined,
      }}
    >
      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-3">
        {kpi.label}
      </div>
      <div
        className="mt-2 text-[26px] font-bold leading-none num-tabular"
        style={{
          color: VALUE_TONE[kpi.valueTone ?? "default"],
          fontFamily: "var(--font-display), Georgia, serif",
          fontVariationSettings: "'opsz' 40",
          letterSpacing: "-0.02em",
        }}
      >
        {kpi.value}
      </div>
      <div
        className="mt-2 text-[11px]"
        style={{ color: SUB_TONE[kpi.subTone ?? "default"] }}
      >
        {kpi.sub}
      </div>
    </div>
  )
}
