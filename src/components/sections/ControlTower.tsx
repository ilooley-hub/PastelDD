"use client"

import dynamic from "next/dynamic"
import { RevealOnScroll } from "@/components/ui/RevealOnScroll"
import { KpiCard } from "@/components/ui/KpiCard"
import { CONTROL_TOWER_KPIS } from "@/lib/fixtures"

const WaterfallChart = dynamic(
  () =>
    import("@/components/charts/WaterfallChart").then((m) => m.WaterfallChart),
  { ssr: false }
)
const BookingsChart = dynamic(
  () =>
    import("@/components/charts/BookingsChart").then((m) => m.BookingsChart),
  { ssr: false }
)

function LegendSwatch({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-[11px] text-fg-3">
      <span
        className="inline-block h-[8px] w-[8px] rounded-[2px]"
        style={{ backgroundColor: color }}
      />
      {label}
    </div>
  )
}

export function ControlTower() {
  return (
    <section className="px-12 py-14">
      <RevealOnScroll>
        <h2
          className="display-headline"
          style={{ fontSize: "clamp(40px, 5vw, 72px)" }}
        >
          <span className="block">Every metric. Every adjustment.</span>
          <span className="block display-italic">Live, in one diligence view.</span>
        </h2>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <div
          className="mt-10 grid grid-cols-2 gap-px md:grid-cols-4 rounded-[10px] overflow-hidden"
          style={{ backgroundColor: "#ECEAE3", border: "1px solid #DEDBD2" }}
        >
          {CONTROL_TOWER_KPIS.map((k) => (
            <KpiCard key={k.label} kpi={k} />
          ))}
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.2}>
        <div
          className="mt-4 rounded-[10px] border p-5"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#DEDBD2",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
          }}
        >
          <div className="text-[12px] text-fg-3 font-semibold uppercase tracking-[0.12em]">
            EBITDA adjustment bridge (QoE) · Quality of bookings analysis
          </div>
          <div className="mt-4 grid gap-5 md:grid-cols-[1.1fr_1fr]">
            <div>
              <div className="h-[220px] md:h-[200px]">
                <WaterfallChart />
              </div>
              <div className="mt-3 flex flex-wrap gap-4">
                <LegendSwatch color="#7B5BD6" label="Reported / Adjusted" />
                <LegendSwatch color="#1F8A5B" label="Add-backs" />
                <LegendSwatch color="#C8333A" label="Deductions" />
              </div>
            </div>
            <div>
              <div className="h-[220px] md:h-[200px]">
                <BookingsChart />
              </div>
              <div className="mt-3 flex flex-wrap gap-4">
                <LegendSwatch color="#7B5BD6" label="Bookings ($M)" />
                <LegendSwatch color="#C8333A" label="Conversion (%)" />
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}
