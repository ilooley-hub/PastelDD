"use client"

import { ArrowRight, FileText, BarChart3, Settings, Scale } from "lucide-react"
import Link from "next/link"
import { FadeUp, StaggerContainer, StaggerItem } from "./motion"
import { Divider } from "./divider"

const briefSections = [
  {
    icon: BarChart3,
    title: "Financial Analysis",
    items: [
      "Revenue quality and sustainability analysis",
      "Earnings normalization and EBITDA adjustments",
      "Working capital deep dive",
      "Debt structure and covenant review",
      "Cash flow modeling and projections validation",
      "Historical financial trend analysis",
    ],
    note: "All sourced directly from data room documents.",
    color: "accent",
  },
  {
    icon: Settings,
    title: "Operational Review",
    items: [
      "Vendor and supplier concentration analysis",
      "Key person dependency mapping",
      "Process maturity and automation assessment",
      "Technology stack evaluation",
      "Headcount efficiency and organizational structure review",
      "Operational risk scoring",
    ],
    note: "Built from operational documentation and management reports.",
    color: "accent-deep",
  },
  {
    icon: Scale,
    title: "Legal & Compliance",
    items: [
      "Contract review and obligation mapping",
      "IP portfolio assessment",
      "Regulatory risk analysis",
      "Compliance gap identification",
    ],
    note: "Coming Q4 2026.",
    color: "text-tertiary",
    comingSoon: true,
  },
]

const aiSteps = [
  {
    title: "Multi-agent system",
    description:
      "Specialized AI agents for financial analysis, operational review, and risk scoring work in parallel.",
  },
  {
    title: "Document understanding",
    description:
      "Reads PDFs, spreadsheets, presentations, and unstructured text.",
  },
  {
    title: "Cross-referencing",
    description:
      "Automatically connects data points across hundreds of documents.",
  },
  {
    title: "Source tracing",
    description:
      "Every output links back to the specific document and page.",
  },
]

export function DDPageContent() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-base pt-32 pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(200,162,255,0.06)_0%,transparent_50%)]" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <FadeUp>
            <p className="text-xs font-medium uppercase tracking-[2px] text-accent mb-4">
              The DD Brief
            </p>
            <h1 className="font-heading text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.08] tracking-heading-tight text-white mb-6">
              Financial and operational diligence,{" "}
              <em className="text-accent">automated.</em>
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed mb-10">
              Pastel reads your entire data room and delivers a comprehensive DD
              brief in 48 hours. Every finding is queryable. Every claim is
              traceable to its source.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-medium text-[#08080C] transition-all duration-300 hover:bg-[#D4B3FF] hover:shadow-[0_0_30px_rgba(200,162,255,0.3)]"
            >
              Request a demo
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </FadeUp>
        </div>
      </section>

      <Divider />

      {/* What's in the Brief */}
      <section className="bg-base py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeUp className="mx-auto max-w-2xl text-center mb-16">
            <p className="text-xs font-medium uppercase tracking-[2px] text-accent mb-4">
              What&apos;s in the brief
            </p>
            <h2 className="font-heading text-[clamp(2rem,4vw,2.5rem)] leading-tight tracking-heading text-white">
              Institutional-grade <em className="text-accent">analysis.</em>
            </h2>
          </FadeUp>

          <StaggerContainer staggerDelay={0.15} className="grid gap-6 lg:grid-cols-3">
            {briefSections.map((section) => (
              <StaggerItem key={section.title}>
                <div className={`h-full rounded-2xl border ${section.comingSoon ? "border-pastel-border/50 opacity-70" : "border-pastel-border"} bg-surface p-8 transition-colors duration-500 hover:bg-surface-2`}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-pastel-border bg-base mb-6">
                    <section.icon className={`h-5 w-5 ${section.color === "accent" ? "text-accent" : section.color === "accent-deep" ? "text-accent-deep" : "text-text-tertiary"}`} />
                  </div>
                  <h3 className="font-heading text-xl text-white mb-4">
                    {section.title}
                    {section.comingSoon && (
                      <span className="ml-2 inline-flex rounded-full bg-text-tertiary/10 px-2 py-0.5 text-[10px] text-text-tertiary border border-text-tertiary/20 align-middle">
                        Q4 2026
                      </span>
                    )}
                  </h3>
                  <ul className="space-y-2.5 mb-4">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-text-secondary"
                      >
                        <FileText className="h-3.5 w-3.5 mt-0.5 text-text-tertiary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-text-tertiary italic">
                    {section.note}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <Divider />

      {/* How the AI Works */}
      <section className="bg-base py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <FadeUp className="mx-auto max-w-2xl text-center mb-16">
            <p className="text-xs font-medium uppercase tracking-[2px] text-accent mb-4">
              Under the hood
            </p>
            <h2 className="font-heading text-[clamp(2rem,4vw,2.5rem)] leading-tight tracking-heading text-white">
              How the <em className="text-accent">AI</em> works.
            </h2>
          </FadeUp>

          <StaggerContainer staggerDelay={0.12} className="grid gap-px rounded-2xl bg-pastel-border overflow-hidden sm:grid-cols-2">
            {aiSteps.map((step) => (
              <StaggerItem key={step.title}>
                <div className="bg-surface p-8 h-full transition-colors duration-500 hover:bg-surface-2">
                  <h3 className="font-heading text-lg text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {step.description}
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
