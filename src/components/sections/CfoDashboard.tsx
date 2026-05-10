"use client"

import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { RevealOnScroll } from "@/components/ui/RevealOnScroll"
import { KpiCard } from "@/components/ui/KpiCard"
import { CFO_KPIS, CFO_EMPLOYEES } from "@/lib/fixtures"

const CfoBillingChart = dynamic(
  () =>
    import("@/components/charts/CfoBillingChart").then(
      (m) => m.CfoBillingChart
    ),
  { ssr: false }
)
const HeadcountChart = dynamic(
  () =>
    import("@/components/charts/HeadcountChart").then((m) => m.HeadcountChart),
  { ssr: false }
)

const TEAM_COLOR = {
  Gush: "#7B5BD6",
  Nitzan: "#1F8A5B",
} as const

export function CfoDashboard() {
  return (
    <section className="px-12 py-14">
      <RevealOnScroll>
        <h2
          className="display-headline"
          style={{ fontSize: "clamp(40px, 5vw, 72px)" }}
        >
          <span className="block">Live client intelligence.</span>
          <span className="block display-italic">Always current, always cited.</span>
        </h2>
        <p className="mt-6 max-w-[600px] text-[17px] leading-[1.6] text-fg-2">
          Every client gets a live financial dashboard. Billing, hours,
          headcount, and anomalies without manual reconciliation.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <div
          className="mt-10 rounded-[10px] border p-5"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#DEDBD2",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
          }}
        >
          <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-fg-3">
            Client overview · 1st Protect
          </div>

          <div
            className="mt-4 grid grid-cols-2 gap-px md:grid-cols-4 rounded-[8px] overflow-hidden"
            style={{ backgroundColor: "#ECEAE3", border: "1px solid #ECEAE3" }}
          >
            {CFO_KPIS.map((k) => (
              <KpiCard key={k.label} kpi={k} />
            ))}
          </div>

          <div className="mt-5 h-[180px] md:h-[170px]">
            <CfoBillingChart />
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div
              className="rounded-[10px] border p-5"
              style={{ backgroundColor: "#FBFAF6", borderColor: "#ECEAE3" }}
            >
              <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-fg-3">
                Hours by employee
              </div>
              <div className="mt-4 flex flex-col gap-3">
                {CFO_EMPLOYEES.map((e) => (
                  <div
                    key={e.name}
                    className="flex items-center gap-4 text-[12px]"
                  >
                    <div
                      className="shrink-0 text-fg-1 font-medium"
                      style={{ width: 100 }}
                    >
                      {e.name}
                    </div>
                    <div
                      className="relative h-[6px] flex-1 overflow-hidden rounded-full"
                      style={{ backgroundColor: "#ECEAE3" }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${e.pct}%` }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{
                          duration: 0.9,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: TEAM_COLOR[e.team] }}
                      />
                    </div>
                    <div
                      className="shrink-0 num-tabular text-fg-3"
                      style={{ width: 44, textAlign: "right" }}
                    >
                      {e.hours}h
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-[10px] border p-5"
              style={{ backgroundColor: "#FBFAF6", borderColor: "#ECEAE3" }}
            >
              <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-fg-3">
                Active employees per month
              </div>
              <div className="mt-4 h-[140px] md:h-[120px]">
                <HeadcountChart />
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}
