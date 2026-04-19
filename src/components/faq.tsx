"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { GradientOrbs } from "./visual-effects"
import { SectionLabel } from "./decorations"

const ease = [0.25, 0.1, 0.25, 1] as const

const faqs: { question: string; answer: string }[] = [
  {
    question: "What types of documents does Pastel ingest?",
    answer:
      "Pastel handles financial statements, operational reports, cap tables, contracts, compliance documentation, and more. We support PDF, Excel, Word, and common data room formats. Simply connect your VDR or upload documents directly.",
  },
  {
    question: "How does source traceability work?",
    answer:
      "Every finding in a Pastel brief links back to the exact document, page, and paragraph it was derived from. Click any claim to see the original source material. This gives your investment committee full confidence in the analysis and a complete audit trail.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. Pastel is SOC 2 compliant and built with enterprise security from day one. Your data is encrypted at rest and in transit, never used to train models, and isolated per engagement. We can also deploy within your infrastructure for maximum control.",
  },
  {
    question: "Does Pastel replace my deal team?",
    answer:
      "No. Pastel augments your team. Think of it as giving every analyst the bandwidth of a full diligence shop. Your team still makes the investment decisions; Pastel handles the time-intensive document analysis and structuring so they can focus on judgment and strategy.",
  },
  {
    question: "What does a Pastel brief cover?",
    answer:
      "A standard brief includes financial analysis (revenue, margins, cash flow, working capital), operational review (team, customers, technology, processes), risk scoring across key dimensions, and executive summary with flagged items. Legal and compliance modules are coming Q4 2026.",
  },
  {
    question: "How is Pastel different from ChatGPT or other AI tools?",
    answer:
      "General-purpose AI tools aren't built for diligence. Pastel uses specialized multi-agent workflows trained on institutional DD standards, produces structured briefs (not chat responses), traces every claim to its source, and is designed for how PE firms actually evaluate deals.",
  },
  {
    question: "Can I ask follow-up questions about the brief?",
    answer:
      "Yes. Every Pastel brief is fully queryable. Ask questions in plain language like \"What's the customer concentration risk?\" or \"Show me the EBITDA bridge\", and get sourced answers instantly. It's like having the analyst who wrote the brief available 24/7.",
  },
]

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05, ease }}
      className="border-b border-pastel-border/60 last:border-0"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-6 text-left transition-colors hover:text-accent"
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-text-primary group-hover:text-accent">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease }}
          className="shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-text-tertiary" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-sm leading-relaxed text-text-secondary max-w-2xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="relative overflow-hidden bg-base py-32 grain">
      <GradientOrbs variant="default" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mx-auto max-w-2xl text-center mb-16"
        >
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="font-heading text-[clamp(2rem,4vw,2.75rem)] leading-tight tracking-heading text-text-primary text-balance">
            Questions we hear{" "}
            <em className="gradient-text not-italic font-normal italic">
              most often.
            </em>
          </h2>
        </motion.div>

        {/* FAQ items */}
        <div className="rounded-2xl border border-pastel-border bg-surface px-6 sm:px-8 shadow-pastel">
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
