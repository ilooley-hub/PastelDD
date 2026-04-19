"use client"

import { FadeUp } from "./motion"
import { GradientOrbs } from "./visual-effects"
import { SectionLabel, DotGrid } from "./decorations"

export interface LegalSection {
  id: string
  title: string
  body: React.ReactNode
}

interface LegalPageProps {
  eyebrow: string
  title: string
  lead: string
  lastUpdated: string
  sections: LegalSection[]
}

export function LegalPage({
  eyebrow,
  title,
  lead,
  lastUpdated,
  sections,
}: LegalPageProps) {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-base pt-36 pb-20 grain">
        <GradientOrbs variant="default" />
        <DotGrid color="rgba(124, 58, 237, 0.04)" size={32} dotSize={1} />

        <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8">
          <FadeUp>
            <SectionLabel>{eyebrow}</SectionLabel>
            <h1 className="font-heading text-[clamp(2.25rem,4.5vw,3.25rem)] leading-[1.05] tracking-heading-tight text-text-primary mb-5">
              {title}
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mb-5">
              {lead}
            </p>
            <p className="text-[12px] uppercase tracking-[2px] text-text-tertiary">
              Last updated · {lastUpdated}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Body */}
      <section className="relative overflow-hidden bg-surface py-24 grain">
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
            {/* TOC */}
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <p className="text-[10px] uppercase tracking-[2px] text-text-tertiary mb-4">
                  On this page
                </p>
                <ul className="space-y-2.5 border-l border-pastel-border pl-4">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="block text-[13px] text-text-secondary leading-snug transition-colors hover:text-accent"
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Prose */}
            <article className="max-w-[720px]">
              {sections.map((s, i) => (
                <FadeUp key={s.id} delay={i * 0.03}>
                  <section
                    id={s.id}
                    className="scroll-mt-32 mb-12 last:mb-0"
                  >
                    <h2 className="font-heading text-2xl text-text-primary mb-4 leading-snug">
                      {s.title}
                    </h2>
                    <div className="space-y-4 text-[15px] leading-relaxed text-text-secondary legal-prose">
                      {s.body}
                    </div>
                  </section>
                </FadeUp>
              ))}
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}
