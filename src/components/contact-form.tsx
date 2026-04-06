"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { FadeUp } from "./motion"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <main className="relative bg-base">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(200,162,255,0.06)_0%,transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-xl px-6 pt-32 pb-24 lg:px-8">
        <FadeUp>
          <div className="text-center mb-12">
            <p className="text-xs font-medium uppercase tracking-[2px] text-accent mb-4">
              Get started
            </p>
            <h1 className="font-heading text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] tracking-heading text-white mb-4">
              Request a demo
            </h1>
            <p className="text-base text-text-secondary">
              We typically respond within 24 hours.
            </p>
          </div>

          {isSubmitted ? (
            <div className="rounded-2xl border border-accent/20 bg-surface p-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 border border-accent/20 mb-5 mx-auto">
                <svg
                  className="h-6 w-6 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="font-heading text-xl text-white mb-2">
                Thank you
              </h2>
              <p className="text-sm text-text-secondary">
                We&apos;ll be in touch within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-text-secondary mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full rounded-xl border border-pastel-border bg-surface px-4 py-3 text-white placeholder:text-text-tertiary focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all"
                  placeholder="Jane Smith"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-text-secondary mb-2"
                >
                  Business email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full rounded-xl border border-pastel-border bg-surface px-4 py-3 text-white placeholder:text-text-tertiary focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all"
                  placeholder="jane@fund.com"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-text-secondary mb-2"
                >
                  Company / Fund name
                </label>
                <input
                  type="text"
                  id="company"
                  required
                  className="w-full rounded-xl border border-pastel-border bg-surface px-4 py-3 text-white placeholder:text-text-tertiary focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all"
                  placeholder="Acme Capital"
                />
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-text-secondary mb-2"
                >
                  Role
                </label>
                <input
                  type="text"
                  id="role"
                  required
                  className="w-full rounded-xl border border-pastel-border bg-surface px-4 py-3 text-white placeholder:text-text-tertiary focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all"
                  placeholder="Managing Director"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-text-secondary mb-2"
                >
                  Message{" "}
                  <span className="text-text-tertiary font-normal">
                    (optional)
                  </span>
                </label>
                <textarea
                  id="message"
                  rows={3}
                  className="w-full rounded-xl border border-pastel-border bg-surface px-4 py-3 text-white placeholder:text-text-tertiary focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all resize-none"
                  placeholder="Tell us about your use case..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-medium text-[#08080C] transition-all duration-300 hover:bg-[#D4B3FF] hover:shadow-[0_0_30px_rgba(200,162,255,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#08080C]/30 border-t-[#08080C]" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Request a demo
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          )}
        </FadeUp>
      </div>
    </main>
  )
}
