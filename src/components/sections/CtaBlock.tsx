"use client"

import { useState } from "react"
import { RevealOnScroll } from "@/components/ui/RevealOnScroll"

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mnjlvlyz"

export function CtaBlock() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json().catch(() => null)
        setError(
          data?.errors?.[0]?.message ||
            "Something went wrong. Please try again."
        )
      }
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-12"
      style={{ paddingTop: 72, paddingBottom: 72 }}
    >
      {/* Layered atmospheric background — soft mesh gradients, no orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 60% 55% at 18% 28%, rgba(80,199,250,0.18) 0%, transparent 65%),
            radial-gradient(ellipse 55% 50% at 82% 72%, rgba(196,167,231,0.22) 0%, transparent 65%),
            radial-gradient(ellipse 70% 50% at 50% 110%, rgba(255,233,184,0.16) 0%, transparent 60%)
          `,
        }}
      />
      {/* Subtle dot grid for technical texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(20,19,28,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 70% 70% at center, rgba(0,0,0,0.55) 0%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at center, rgba(0,0,0,0.55) 0%, transparent 78%)",
        }}
      />
      {/* Hairline gradient halo, top edge — quiet brand cue */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, rgba(123,91,214,0.35) 30%, rgba(80,199,250,0.35) 50%, rgba(255,211,176,0.35) 70%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-[1080px] items-center gap-12 md:grid-cols-[5fr_6fr] md:gap-16">
        <div>
          <RevealOnScroll delay={0.05}>
            <h2
              className="display-headline"
              style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
            >
              Run Pastel on your last close.
              <br />
              <span className="display-italic">See what slipped through.</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="mt-6 max-w-[460px] text-[17px] leading-[1.6] text-fg-2">
              A 20-minute walkthrough. We run Pastel against a sample data
              room and show you the kind of findings it surfaces, cited line
              by line. No commitment.
            </p>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={0.15}>
          <div
            className="relative rounded-[16px] p-8 md:p-10"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #DEDBD2",
              boxShadow:
                "0 18px 40px rgba(20,19,28,0.08), 0 4px 8px rgba(20,19,28,0.04), inset 0 1px 0 rgba(255,255,255,0.6)",
            }}
          >
            {/* Halo accent stripe along top edge */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-6 top-0 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent 0%, rgba(123,91,214,0.55) 30%, rgba(80,199,250,0.55) 70%, transparent 100%)",
              }}
            />
            {submitted ? (
              <div className="py-6 text-center">
                <div
                  className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: "#F1EFE9",
                    border: "1px solid #DEDBD2",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#14131C"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3
                  className="mb-2 text-[22px] font-semibold"
                  style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    color: "#14131C",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Thanks. We&apos;ll be in touch.
                </h3>
                <p className="text-[14px] text-fg-2">
                  A founder will reach out within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-fg-3"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Jane Smith"
                    className="w-full rounded-[8px] border bg-white px-4 py-3 text-[14px] text-fg-1 placeholder:text-fg-3 transition-colors focus:outline-none"
                    style={{ borderColor: "#DEDBD2" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#14131C")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#DEDBD2")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-fg-3"
                  >
                    Work email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="jane@fund.com"
                    className="w-full rounded-[8px] border bg-white px-4 py-3 text-[14px] text-fg-1 placeholder:text-fg-3 transition-colors focus:outline-none"
                    style={{ borderColor: "#DEDBD2" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#14131C")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#DEDBD2")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-fg-3"
                  >
                    Company / Fund
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    autoComplete="organization"
                    placeholder="Acme Capital"
                    className="w-full rounded-[8px] border bg-white px-4 py-3 text-[14px] text-fg-1 placeholder:text-fg-3 transition-colors focus:outline-none"
                    style={{ borderColor: "#DEDBD2" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#14131C")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#DEDBD2")}
                  />
                </div>

                {error && (
                  <p
                    role="alert"
                    className="text-[13px]"
                    style={{ color: "#B23A3A" }}
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-halo-linear mt-1 inline-flex h-[48px] items-center justify-center rounded-[8px] text-[14px] font-semibold tracking-[-0.005em] transition-[filter] hover:[filter:saturate(1.15)_brightness(1.02)] disabled:cursor-not-allowed disabled:opacity-70"
                  style={{
                    color: "#1A1228",
                    boxShadow:
                      "0 1px 2px rgba(20,19,28,0.06), inset 0 1px 0 rgba(255,255,255,0.5)",
                  }}
                >
                  {submitting ? "Submitting…" : "Request access"}
                </button>

                <p className="text-[11px] leading-[1.5] text-fg-3">
                  By submitting you agree to be contacted about Pastel. No
                  spam, no list.
                </p>
              </form>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
