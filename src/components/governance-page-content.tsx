"use client"

import { ArrowRight, BarChart3, Activity, Sparkles } from "lucide-react"
import Link from "next/link"
import { FadeUp, StaggerContainer, StaggerItem } from "./motion"
import { Divider } from "./divider"

const pillars = [
  {
    icon: BarChart3,
    title: "Continuous Financial Auditing",
    description:
      "Ongoing AI review of financial statements across your portfolio. Automatic anomaly detection, trend analysis, and compliance gap flagging.",
    color: "text-accent",
  },
  {
    icon: Activity,
    title: "Operational Monitoring",
    description:
      "Track KPIs, vendor performance, headcount changes, and process metrics. Get alerts when operational indicators shift outside expected ranges.",
    color: "text-accent-deep",
  },
  {
    icon: Sparkles,
    title: "Out-of-Scope Services",
    description:
      "Custom AI-powered analysis for specific needs. Ad-hoc financial deep dives, vendor due diligence, and targeted operational assessments.",
    color: "text-warm-dark",
  },
]

export function GovernancePageContent() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-base pt-32 pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(139,92,246,0.06)_0%,transparent_50%)]" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <FadeUp>
            <p className="text-xs font-medium uppercase tracking-[2px] text-accent-deep mb-4">
              Portfolio Governance
            </p>
            <h1 className="font-heading text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.08] tracking-heading-tight text-white mb-6">
              Your portfolio,{" "}
              <em className="text-accent-deep">continuously monitored.</em>
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed mb-10">
              After the deal closes, Pastel keeps watching. AI-powered financial
              auditing and operational monitoring that flags issues before they
              become problems.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full border border-pastel-border px-8 py-4 text-base font-medium text-text-secondary transition-all duration-300 hover:border-accent-deep/50 hover:text-white"
            >
              Learn more
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </FadeUp>
        </div>
      </section>

      <Divider />

      {/* Three Pillars */}
      <section className="bg-base py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <StaggerContainer
            staggerDelay={0.15}
            className="grid gap-6 lg:grid-cols-3"
          >
            {pillars.map((pillar) => (
              <StaggerItem key={pillar.title}>
                <div className="h-full rounded-2xl border border-pastel-border bg-surface p-8 transition-all duration-500 hover:border-pastel-border-hover hover:bg-surface-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-pastel-border bg-base mb-6">
                    <pillar.icon className={`h-5 w-5 ${pillar.color}`} />
                  </div>
                  <h3 className="font-heading text-xl text-white mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {pillar.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </main>
  )
}
