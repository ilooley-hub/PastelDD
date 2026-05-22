"use client"

import { useState } from "react"
import { FadeUp } from "./motion"
import { IconArrowRight, IconCheck } from "./icons"
import { PastelOrb } from "./pastel-logo"
import { Meteors } from "./ui/meteors"
import { Ripple } from "./ui/ripple"

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch("https://formspree.io/f/mnjlvlyz", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        const data = await response.json().catch(() => null)
        setError(
          data?.errors?.[0]?.message ||
            "Something went wrong. Please try again."
        )
      }
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-base py-32 grain"
    >
      {/* Soft floating orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-10 -left-20 w-[480px] h-[480px] rounded-full animate-float-slow"
          style={{
            background:
              "radial-gradient(circle, rgba(141,208,255,0.32) 0%, rgba(200,162,255,0.18) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-0 -right-20 w-[460px] h-[460px] rounded-full animate-float-slower"
          style={{
            background:
              "radial-gradient(circle, rgba(255,184,217,0.32) 0%, rgba(255,207,160,0.18) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Ripple effect centered behind the headline */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-[600px] w-[600px]">
          <Ripple
            mainCircleSize={120}
            mainCircleOpacity={0.18}
            numCircles={6}
          />
        </div>
        {/* Meteors */}
        <Meteors number={14} angle={235} />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-center">
          {/* Left: Pitch */}
          <FadeUp>
            <div className="relative">
              <div className="absolute -top-12 -left-8 opacity-80">
                <PastelOrb size={80} animated />
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-[3px] text-accent mb-5 relative">
                Get started
              </p>
              <h2 className="font-heading text-[clamp(2.5rem,5vw,3.75rem)] leading-[0.98] tracking-heading-tight text-text-primary mb-6">
                See your first
                <br />
                <em className="gradient-text not-italic font-normal italic">
                  brief in 48 hours.
                </em>
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed max-w-md mb-8">
                Tell us about your fund and the type of deals you run. We&apos;ll
                walk you through Pastel with a real data room.
              </p>
              <div className="flex flex-col gap-3 text-sm text-text-secondary">
                {[
                  "30-minute walkthrough with a founder",
                  "Run on a sample data room",
                  "Custom pricing for your fund",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/10 border border-accent/20">
                      <IconCheck size={12} className="text-accent" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Right: Form card */}
          <FadeUp delay={0.15}>
            <div className="relative rounded-3xl border border-pastel-border bg-white p-8 lg:p-10 shadow-pastel-lg">
              {isSubmitted ? (
                <div className="py-8 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 border border-accent/20 mb-5 mx-auto">
                    <IconCheck size={22} className="text-accent" />
                  </div>
                  <h3 className="font-heading text-2xl text-text-primary mb-2">
                    Thank you
                  </h3>
                  <p className="text-sm text-text-secondary">
                    We&apos;ll be in touch within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-medium text-text-secondary mb-2 uppercase tracking-wider"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full rounded-xl border border-pastel-border bg-base px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15 transition-all"
                      placeholder="Jane Smith"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-medium text-text-secondary mb-2 uppercase tracking-wider"
                    >
                      Business email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full rounded-xl border border-pastel-border bg-base px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15 transition-all"
                      placeholder="jane@fund.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-xs font-medium text-text-secondary mb-2 uppercase tracking-wider"
                    >
                      Company / Fund
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      className="w-full rounded-xl border border-pastel-border bg-base px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15 transition-all"
                      placeholder="Acme Capital"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-600" role="alert">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group magnetic w-full flex items-center justify-center gap-2 rounded-full bg-text-primary px-8 py-4 text-base font-medium text-white transition-all duration-300 hover:bg-accent hover:shadow-pastel disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Request a demo
                        <IconArrowRight
                          size={16}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
