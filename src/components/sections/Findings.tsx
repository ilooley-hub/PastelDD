"use client"

import { useState } from "react"
import { RevealOnScroll } from "@/components/ui/RevealOnScroll"
import { SeverityTag } from "@/components/ui/SeverityTag"
import { FindingCard } from "@/components/ui/FindingCard"
import {
  FINDINGS,
  FINDING_TABS,
  FINDING_SUMMARY,
  type Category,
} from "@/lib/fixtures"

type TabValue = "All" | Category

export function Findings() {
  const [tab, setTab] = useState<TabValue>("All")
  const filtered =
    tab === "All" ? FINDINGS : FINDINGS.filter((f) => f.category === tab)

  return (
    <section className="px-12 py-14">
      <RevealOnScroll>
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="text-[14px] font-bold text-fg-1"
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontVariationSettings: "'opsz' 30",
            }}
          >
            {FINDING_SUMMARY.total}
          </span>
          <SeverityTag severity="high" count={FINDING_SUMMARY.highCount} />
          <SeverityTag severity="medium" count={FINDING_SUMMARY.mediumCount} />
          <SeverityTag severity="low" count={FINDING_SUMMARY.lowCount} />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {FINDING_TABS.map((t) => {
            const active = tab === t.value
            return (
              <button
                key={t.value}
                onClick={() => setTab(t.value as TabValue)}
                className="rounded-[6px] border px-3.5 py-1.5 text-[12px] font-semibold transition-colors"
                style={{
                  borderColor: active ? "#7B5BD6" : "#DEDBD2",
                  color: active ? "#7B5BD6" : "#4A4858",
                  backgroundColor: active
                    ? "rgba(123,91,214,0.06)"
                    : "transparent",
                }}
              >
                {t.label}
              </button>
            )
          })}
        </div>

        <div className="mt-7 flex flex-col gap-4">
          {filtered.length === 0 ? (
            <div
              className="card-surface rounded-[10px] p-6 text-[13px] text-fg-3"
            >
              No findings in this category yet.
            </div>
          ) : (
            filtered.map((f) => <FindingCard key={f.id} finding={f} />)
          )}
        </div>
      </RevealOnScroll>
    </section>
  )
}
