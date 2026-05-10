"use client"

import dynamic from "next/dynamic"
import { RevealOnScroll } from "@/components/ui/RevealOnScroll"

const DataFlow = dynamic(
  () => import("@/components/sections/DataFlow").then((m) => m.DataFlow),
  { ssr: false }
)

export function Ingestion() {
  return (
    <section className="px-12 py-14">
      <div className="grid items-center gap-12 md:grid-cols-[5fr_7fr] md:gap-16">
        <RevealOnScroll>
          <h2
            className="display-headline"
            style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
          >
            Contracts, ERP, CRM, inboxes.{" "}
            <span className="display-italic">
              One financial graph the CFO can sign off on.
            </span>
          </h2>
          <p className="mt-6 max-w-[520px] text-[17px] leading-[1.6] text-fg-2">
            Pastel ingests structured records from your ERP and CRM, every
            clause from your contracts, and the conversations buried in email
            and chat. We resolve the same entity across every source, reconcile
            contradictions, and assemble it all into one unified ontology:
            counterparties, obligations, cash movements, and the context behind
            every decision.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <DataFlow />
        </RevealOnScroll>
      </div>
    </section>
  )
}
