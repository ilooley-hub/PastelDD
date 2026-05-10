"use client"

import { motion } from "framer-motion"
import { RevealOnScroll } from "@/components/ui/RevealOnScroll"

export type Step = { title: string; body: string }

export function CapabilityTimeline({
  headlinePrimary,
  headlineItalic,
  steps,
}: {
  headlinePrimary: string
  headlineItalic: string
  steps: Step[]
}) {
  return (
    <section className="px-12 py-14">
      <RevealOnScroll>
        <h2
          className="display-headline"
          style={{ fontSize: "clamp(36px, 4.5vw, 60px)" }}
        >
          <span className="block">{headlinePrimary}</span>
          <span className="block display-italic">{headlineItalic}</span>
        </h2>
      </RevealOnScroll>

      <div className="relative mt-12">
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-[16px] top-2 h-[calc(100%-1rem)] w-px origin-top"
          style={{ backgroundColor: "#DEDBD2" }}
        />
        <div className="flex flex-col gap-10">
          {steps.map((s, i) => (
            <RevealOnScroll key={s.title} delay={0.1 + i * 0.05}>
              <div className="relative pl-14">
                <div
                  className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full font-mono text-[11px] font-bold"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #DEDBD2",
                    color: "#7B5BD6",
                    boxShadow: "0 1px 2px rgba(20,19,28,0.04)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3
                  className="text-[24px] font-bold leading-tight text-fg-1"
                  style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontVariationSettings: "'opsz' 40",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.title}
                </h3>
                <p className="mt-3 max-w-[720px] text-[16px] leading-[1.6] text-fg-2">
                  {s.body}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
