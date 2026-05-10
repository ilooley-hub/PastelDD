"use client"

import { motion } from "framer-motion"
import { HaloCta, GhostCta } from "@/components/ui/Buttons"
import { OntologyAnim } from "@/components/sections/OntologyAnim"

export function Hero() {
  return (
    <section
      id="platform"
      className="relative overflow-hidden px-12"
      style={{
        minHeight: "82vh",
        paddingTop: 72,
        paddingBottom: 64,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ opacity: 0.85, transform: "translateX(14%)" }}
      >
        <OntologyAnim />
      </div>

      {/* Scrim — keeps the headline area readable while letting the animation breathe on the right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(248,247,244,0.92) 0%, rgba(248,247,244,0.85) 32%, rgba(248,247,244,0.45) 56%, rgba(248,247,244,0.05) 80%, rgba(248,247,244,0) 95%)",
        }}
      />

      <div className="relative z-10 max-w-[920px]">
        <h1
          className="display-headline-xl"
          style={{ fontSize: "clamp(44px, 8vw, 104px)", overflow: "visible" }}
        >
          {[
            { text: "Financial answers", italic: false },
            { text: "you can sign off on.", italic: true },
          ].map((line, i) => (
            <motion.span
              key={line.text}
              className={`block ${line.italic ? "display-italic" : ""}`}
              style={
                line.italic
                  ? { lineHeight: 1.18, paddingBottom: "0.22em" }
                  : undefined
              }
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2 + i * 0.08,
              }}
            >
              {line.text}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          className="mt-10 max-w-[640px] text-[18px] leading-[1.55] text-fg-2"
        >
          Pastel structures your financial reality into a single{" "}
          <span className="text-fg-1 font-semibold">verified ontology</span>{" "}
          you can interrogate, audit and act on.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
          className="mt-10 flex flex-wrap items-center gap-6"
        >
          <HaloCta href="#contact">Request access</HaloCta>
          <GhostCta href="#how-it-works">See how it works →</GhostCta>
        </motion.div>
      </div>
    </section>
  )
}
