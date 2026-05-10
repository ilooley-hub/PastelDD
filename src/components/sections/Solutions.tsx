import Link from "next/link"
import { RevealOnScroll } from "@/components/ui/RevealOnScroll"
import { SOLUTION_CARDS } from "@/lib/fixtures"

export function Solutions() {
  return (
    <section id="solutions" className="px-12 py-14">
      <RevealOnScroll>
        <h2
          className="display-headline"
          style={{ fontSize: "clamp(40px, 5vw, 72px)" }}
        >
          <span className="block">One intelligence layer.</span>
          <span className="block display-italic">Three entry points.</span>
        </h2>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {SOLUTION_CARDS.map((card) => (
            <Link
              key={card.number}
              href={card.href}
              className="group relative block rounded-[16px] border px-7 py-8 transition-all overflow-hidden"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#DEDBD2",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
              }}
            >
              <span
                aria-hidden
                className="bg-halo-linear pointer-events-none absolute left-0 right-0 top-0 h-[3px] opacity-0 transition-opacity group-hover:opacity-100"
              />
              <div className="font-mono text-[12px] tracking-[0.1em] text-fg-3">
                {card.number}
              </div>
              <h3
                className="mt-4 text-[28px] font-bold leading-tight text-fg-1"
                style={{
                  fontFamily: "var(--font-display), Georgia, serif",
                  fontVariationSettings: "'opsz' 40",
                  letterSpacing: "-0.02em",
                }}
              >
                {card.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.55] text-fg-2">
                {card.desc}
              </p>
              <div
                className="mt-6 text-[12px] font-semibold tracking-[-0.005em] transition-colors group-hover:text-fg-1"
                style={{ color: "#7B5BD6" }}
              >
                Learn more →
              </div>
            </Link>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  )
}
