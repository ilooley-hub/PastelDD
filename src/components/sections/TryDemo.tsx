import type { ReactNode } from "react"
import { RevealOnScroll } from "@/components/ui/RevealOnScroll"
import { DemoCta } from "@/components/ui/Buttons"

// Inline promo band for the interactive demo (getpastel.ai/demo). Drops in
// between content sections to invite visitors to query Pastel themselves.
// Copy can be tailored per page via props; defaults work site-wide.

const SUGGESTED = [
  "What drove the EBITDA variance last quarter?",
  "How much cash runway is left?",
  "Top 5 expenses this month",
]

export function TryDemo({
  eyebrow = "Interactive demo · no signup",
  heading = (
    <>
      Don&apos;t take our word for it.{" "}
      <span className="display-italic">Ask the numbers yourself.</span>
    </>
  ),
  body = "Pick one of three sample client books and ask anything about the financials. Pastel answers from the data, with the chart to back it, in seconds.",
}: {
  eyebrow?: string
  heading?: ReactNode
  body?: string
}) {
  return (
    <section className="px-12 py-16">
      <div className="mx-auto max-w-[1080px]">
        <RevealOnScroll>
          <div
            className="relative overflow-hidden rounded-[20px] border"
            style={{
              borderColor: "#DEDBD2",
              backgroundColor: "#FFFFFF",
              boxShadow:
                "0 18px 40px rgba(20,19,28,0.06), inset 0 1px 0 rgba(255,255,255,0.6)",
            }}
          >
            {/* Atmospheric halo wash */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: `
                  radial-gradient(ellipse 55% 60% at 12% 20%, rgba(80,199,250,0.14) 0%, transparent 62%),
                  radial-gradient(ellipse 50% 55% at 88% 85%, rgba(196,167,231,0.18) 0%, transparent 62%)
                `,
              }}
            />
            {/* Hairline halo at top edge */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent 0%, rgba(123,91,214,0.45) 30%, rgba(80,199,250,0.45) 50%, rgba(255,211,176,0.45) 70%, transparent 100%)",
              }}
            />

            <div className="relative z-10 grid items-center gap-10 p-8 md:grid-cols-[5fr_6fr] md:gap-14 md:p-12">
              {/* Copy */}
              <div>
                <div className="mb-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-fg-3">
                  <span
                    aria-hidden
                    className="inline-block h-1.5 w-1.5 rounded-full bg-halo-linear"
                  />
                  {eyebrow}
                </div>
                <h2
                  className="display-headline"
                  style={{ fontSize: "clamp(30px, 3.6vw, 44px)" }}
                >
                  {heading}
                </h2>
                <p className="mt-5 max-w-[440px] text-[16px] leading-[1.6] text-fg-2">
                  {body}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <DemoCta variant="halo">Try the live demo →</DemoCta>
                  <span className="text-[12px] text-fg-3">
                    Runs on real analysis. No login.
                  </span>
                </div>
              </div>

              {/* Mock query interface */}
              <div
                className="rounded-[14px] border p-5"
                style={{
                  borderColor: "#ECEAE3",
                  backgroundColor: "#FBFAF6",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)",
                }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-fg-3">
                    Sample books
                  </div>
                  <span
                    className="rounded-[3px] bg-halo-linear px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em]"
                    style={{ color: "#1A1228" }}
                  >
                    3 datasets
                  </span>
                </div>

                {/* Client tabs */}
                <div className="flex gap-1.5">
                  {["SaaS Inc.", "Agency Co.", "Retail Ltd."].map((c, i) => (
                    <span
                      key={c}
                      className="rounded-[7px] border px-2.5 py-1.5 text-[11px] font-medium"
                      style={{
                        backgroundColor: i === 0 ? "#FFFFFF" : "transparent",
                        borderColor: i === 0 ? "#C4A7E7" : "#ECEAE3",
                        color: i === 0 ? "#14131C" : "#76737F",
                        boxShadow:
                          i === 0
                            ? "0 1px 2px rgba(123,91,214,0.12)"
                            : "none",
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>

                {/* Query bar */}
                <div
                  className="mt-3 flex items-center gap-2 rounded-[10px] border bg-white px-3 py-2.5"
                  style={{ borderColor: "#DEDBD2" }}
                >
                  <span className="flex-1 truncate text-[13px] text-fg-2">
                    What drove the change in gross margin last quarter?
                  </span>
                  <span
                    className="inline-flex h-7 shrink-0 items-center rounded-[7px] bg-halo-linear px-3 text-[12px] font-semibold"
                    style={{ color: "#1A1228" }}
                  >
                    Ask
                  </span>
                </div>

                {/* Suggested questions */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {SUGGESTED.map((q) => (
                    <span
                      key={q}
                      className="rounded-full border px-2.5 py-1 text-[11px] text-fg-2"
                      style={{
                        borderColor: "#ECEAE3",
                        backgroundColor: "#FFFFFF",
                      }}
                    >
                      {q}
                    </span>
                  ))}
                </div>

                {/* Answer hint with mini chart */}
                <div
                  className="mt-3 rounded-[10px] border bg-white p-3.5"
                  style={{ borderColor: "#ECEAE3" }}
                >
                  <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-fg-3">
                    Answer · cited
                  </div>
                  <div className="mt-1.5 text-[12px] leading-[1.5] text-fg-2">
                    Gross margin rose 3.2pts, driven mainly by lower cloud
                    hosting cost as a share of revenue.
                  </div>
                  <div className="mt-3 flex items-end gap-1.5" aria-hidden>
                    {[38, 52, 44, 61, 70, 66].map((h, i) => (
                      <span
                        key={i}
                        className="flex-1 rounded-[2px]"
                        style={{
                          height: h,
                          background:
                            i === 5
                              ? "linear-gradient(to top, #7B5BD6, #C4A7E7)"
                              : "#E6E2D8",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
