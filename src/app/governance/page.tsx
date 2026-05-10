import { Nav } from "@/components/layout/Nav"
import { Footer } from "@/components/layout/Footer"
import { PageHero } from "@/components/sections/PageHero"
import { PortfolioMonitor } from "@/components/sections/PortfolioMonitor"
import { CtaBlock } from "@/components/sections/CtaBlock"
import { RevealOnScroll } from "@/components/ui/RevealOnScroll"

function Divider() {
  return (
    <div className="px-12">
      <div className="section-divider" />
    </div>
  )
}

const MONTHLY_BEATS = [
  { day: "1", label: "Monthly close kicks off" },
  { day: "8", label: "First draft of management pack" },
  { day: "14", label: "Pack reviewed by leadership" },
  { day: "21", label: "Issue surfaces, too late to act" },
]

const LIVE_BEATS = [
  { time: "08:14", label: "Covenant headroom drift detected" },
  { time: "08:14", label: "Source documents auto-pulled" },
  { time: "08:15", label: "Alert routed to the right owner" },
  { time: "08:21", label: "Action taken before EOD" },
]

export default function GovernancePage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          lines={[
            { text: "Operations move continuously.", italic: false },
            { text: "Pastel watches in between.", italic: true },
          ]}
          subhead="Continuous monitoring across financial, operational, and contractual signals. Material changes surface the moment they occur, not at month-end."
        />
        <PortfolioMonitor />
        <Divider />

        <section className="px-12 py-14">
          <RevealOnScroll>
            <h2
              className="display-headline"
              style={{ fontSize: "clamp(36px, 4.5vw, 60px)" }}
            >
              <span className="block">Calendar cadence.</span>
              <span className="block display-italic">Or live signal.</span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div
              className="mt-10 grid grid-cols-1 gap-px md:grid-cols-2 rounded-[16px] overflow-hidden"
              style={{
                backgroundColor: "#ECEAE3",
                border: "1px solid #DEDBD2",
              }}
            >
              <div
                className="px-7 py-7"
                style={{ backgroundColor: "#FBFAF6" }}
              >
                <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-fg-3">
                  Without Pastel
                </div>
                <div
                  className="mt-2 text-[18px] font-medium text-fg-2"
                  style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                  }}
                >
                  Monthly cadence
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  {MONTHLY_BEATS.map((b, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 text-[13px]"
                    >
                      <span
                        className="shrink-0 num-tabular text-[11px] uppercase tracking-[0.1em] font-mono text-fg-3"
                        style={{ width: 56 }}
                      >
                        Day {b.day}
                      </span>
                      <span
                        className="flex-1 leading-snug font-medium"
                        style={{
                          color:
                            i === MONTHLY_BEATS.length - 1
                              ? "#C8333A"
                              : "#4A4858",
                        }}
                      >
                        {b.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-7 py-7" style={{ backgroundColor: "#FFFFFF" }}>
                <div className="text-[11px] uppercase tracking-[0.14em] font-semibold halo-text">
                  With Pastel
                </div>
                <div
                  className="mt-2 text-[18px] font-medium text-fg-2"
                  style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                  }}
                >
                  Continuous signal
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  {LIVE_BEATS.map((b, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 text-[13px]"
                    >
                      <span
                        className="shrink-0 num-tabular text-[11px] uppercase tracking-[0.1em] font-mono text-fg-3"
                        style={{ width: 56 }}
                      >
                        {b.time}
                      </span>
                      <span
                        className="flex-1 leading-snug font-medium"
                        style={{
                          color:
                            i === LIVE_BEATS.length - 1
                              ? "#1F8A5B"
                              : "#14131C",
                        }}
                      >
                        {b.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </section>

        <Divider />
        <CtaBlock />
      </main>
      <Footer />
    </>
  )
}
