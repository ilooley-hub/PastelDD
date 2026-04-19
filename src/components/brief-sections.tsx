"use client"

import { motion } from "framer-motion"
import { FadeUp, StaggerContainer, StaggerItem } from "./motion"
import { SectionLabel } from "./decorations"
import { DotPattern } from "./ui/dot-pattern"
import { cn } from "@/lib/utils"
import {
  IconChart,
  IconOps,
  IconShield,
  IconBrief,
  IconClock,
} from "./icons"

const briefSections = [
  {
    icon: IconChart,
    label: "Financial",
    title: "Financial Analysis",
    items: [
      "Revenue quality and sustainability",
      "Earnings normalization and EBITDA adjustments",
      "Working capital deep dive",
      "Debt structure and covenant review",
      "Cash flow modeling and projection validation",
      "Historical financial trend analysis",
    ],
    note: "Sourced directly from data room documents.",
    accent: "from-[#A7D8FF] via-[#C8A2FF] to-[#FFB8D9]",
  },
  {
    icon: IconOps,
    label: "Operational",
    title: "Operational Review",
    items: [
      "Vendor and supplier concentration",
      "Key person dependency mapping",
      "Process maturity assessment",
      "Technology stack evaluation",
      "Headcount efficiency review",
      "Operational risk scoring",
    ],
    note: "Built from operational documentation and management reports.",
    accent: "from-[#C8A2FF] via-[#FFB8D9] to-[#FFCFA0]",
  },
  {
    icon: IconShield,
    label: "Legal",
    title: "Legal & Compliance",
    items: [
      "Contract review and obligation mapping",
      "IP portfolio assessment",
      "Regulatory risk analysis",
      "Compliance gap identification",
    ],
    note: "Coming Q4 2026.",
    accent: "from-[#FFCFA0] via-[#FFB8D9] to-[#C8A2FF]",
    comingSoon: true,
  },
]

export function BriefSections() {
  return (
    <section id="dd" className="relative overflow-hidden bg-base py-32 grain">
      {/* Glowing dot pattern background */}
      <DotPattern
        glow
        width={28}
        height={28}
        cr={0.9}
        className={cn(
          "text-accent/40",
          "[mask-image:radial-gradient(ellipse_at_center,white_25%,transparent_75%)]"
        )}
      />

      {/* Soft background orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-20 right-0 w-[700px] h-[700px] rounded-full animate-float-slow"
          style={{
            background:
              "radial-gradient(circle, rgba(200,162,255,0.30) 0%, rgba(255,184,217,0.18) 40%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <FadeUp className="mx-auto max-w-2xl text-center mb-20">
          <SectionLabel>What&apos;s in the brief</SectionLabel>
          <h2 className="font-heading text-[clamp(2.25rem,4.5vw,3.25rem)] leading-[0.98] tracking-heading-tight text-text-primary text-balance">
            Institutional-grade
            <br />
            <em className="gradient-text not-italic font-normal italic">
              analysis.
            </em>
          </h2>
          <p className="mt-6 text-text-secondary text-lg max-w-xl mx-auto">
            Every Pastel brief covers the analytical work that takes a typical
            DD team three weeks to assemble.
          </p>
        </FadeUp>

        <StaggerContainer
          staggerDelay={0.15}
          className="grid gap-5 lg:grid-cols-3"
        >
          {briefSections.map((section) => (
            <StaggerItem key={section.title}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className={`group relative h-full rounded-3xl border border-pastel-border bg-white p-8 transition-shadow duration-500 hover:shadow-pastel-lg ${
                  section.comingSoon ? "opacity-80" : ""
                }`}
              >
                {/* Top gradient bar */}
                <div
                  className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r ${section.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Icon with gradient background */}
                <div className="relative mb-6 inline-flex">
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${section.accent} opacity-30 blur-md`}
                  />
                  <div
                    className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${section.accent}`}
                  >
                    <section.icon size={22} className="text-white" />
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[2px] text-accent">
                    {section.label}
                  </span>
                  {section.comingSoon && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-warm/20 px-2 py-0.5 text-[9px] text-warm-dark font-medium border border-warm-dark/20">
                      <IconClock size={9} />
                      Q4 2026
                    </span>
                  )}
                </div>
                <h3 className="font-heading text-2xl text-text-primary mb-5">
                  {section.title}
                </h3>
                <ul className="space-y-2.5 mb-5">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[13px] leading-relaxed text-text-secondary"
                    >
                      <IconBrief
                        size={14}
                        className="mt-0.5 text-accent/60 shrink-0"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-text-tertiary italic pt-4 border-t border-pastel-border">
                  {section.note}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
