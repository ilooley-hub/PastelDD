"use client"

import { Marquee } from "./ui/marquee"
import { PastelOrb } from "./pastel-logo"

const categories = [
  "Mid-Market PE",
  "Family Offices",
  "Growth Equity",
  "Venture Debt",
  "Search Funds",
  "Sponsor Finance",
  "Independent Sponsors",
  "Continuation Vehicles",
]

export function TrustBar() {
  return (
    <section className="relative bg-base py-14 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="text-center text-text-tertiary uppercase text-[10px] tracking-[3px] font-semibold mb-6">
          Built for
        </p>

        {/* Edge fade masks */}
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-32 bg-gradient-to-r from-base to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-32 bg-gradient-to-l from-base to-transparent" />

          <Marquee className="[--duration:50s] [--gap:3rem]" pauseOnHover>
            {categories.map((cat) => (
              <div
                key={cat}
                className="flex items-center gap-3 text-base text-text-secondary"
              >
                <PastelOrb size={18} glow={false} />
                <span className="font-heading tracking-tight">{cat}</span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
