import { RevealOnScroll } from "@/components/ui/RevealOnScroll"
import { PortfolioCard } from "@/components/ui/PortfolioCard"
import { PORTFOLIO_COMPANIES } from "@/lib/fixtures"

export function PortfolioMonitor() {
  return (
    <section className="px-12 py-14">
      <RevealOnScroll>
        <h2
          className="display-headline"
          style={{ fontSize: "clamp(40px, 5vw, 72px)" }}
        >
          <span className="block">Continuous portfolio monitoring.</span>
          <span className="block display-italic">Alerts before the monthly pack.</span>
        </h2>
        <p className="mt-6 max-w-[600px] text-[17px] leading-[1.6] text-fg-2">
          Pastel monitors every portfolio company continuously. Early warning
          signals surface before they appear in the monthly pack.
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO_COMPANIES.map((c) => (
            <PortfolioCard key={c.name} company={c} />
          ))}
        </div>
      </RevealOnScroll>
    </section>
  )
}
