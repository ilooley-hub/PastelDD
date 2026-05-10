"use client"

import { motion } from "framer-motion"
import { HaloCta, GhostCta } from "@/components/ui/Buttons"
import { HaloOrb } from "@/components/ui/HaloOrb"

export function PageHero({
  lines,
  subhead,
  primaryHref = "#contact",
  primaryLabel = "Request access",
  ghostHref,
  ghostLabel,
}: {
  lines: { text: string; italic?: boolean }[]
  subhead?: string
  primaryHref?: string
  primaryLabel?: string
  ghostHref?: string
  ghostLabel?: string
}) {
  return (
    <section
      className="relative overflow-hidden px-12"
      style={{ paddingTop: 72, paddingBottom: 56 }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute hidden md:block"
        style={{ right: -100, top: -60 }}
      >
        <HaloOrb size={440} />
      </div>

      <div className="relative z-10 max-w-[820px]">
        <h1
          className="display-headline-xl"
          style={{ fontSize: "clamp(44px, 7.5vw, 96px)" }}
        >
          {lines.map((line, i) => (
            <motion.span
              key={line.text}
              className={`block ${line.italic ? "display-italic" : ""}`}
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

        {subhead && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.5,
            }}
            className="mt-8 max-w-[560px] text-[17px] leading-[1.55] text-fg-2"
          >
            {subhead}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.75 }}
          className="mt-10 flex flex-wrap items-center gap-6"
        >
          <HaloCta href={primaryHref}>{primaryLabel}</HaloCta>
          {ghostHref && ghostLabel && (
            <GhostCta href={ghostHref}>{ghostLabel}</GhostCta>
          )}
        </motion.div>
      </div>
    </section>
  )
}
