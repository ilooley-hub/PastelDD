"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 1500
    const startTime = performance.now()

    function animate(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, value])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

export function StatsRow() {
  const stats = [
    { number: 48, suffix: "h", label: "Average brief turnaround" },
    { number: 10, suffix: "x", label: "Faster than traditional DD" },
    { number: 100, suffix: "%", label: "Source-traceable findings" },
  ]

  return (
    <section className="relative bg-base py-24 noise">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[radial-gradient(ellipse,rgba(200,162,255,0.05)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="grid grid-cols-1 gap-12 sm:grid-cols-3"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group flex flex-col items-center text-center"
            >
              {/* Glow behind number */}
              <div className="relative">
                <div className="absolute inset-0 blur-2xl bg-accent/10 scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <span className="relative font-heading text-[56px] leading-none tracking-heading-tight gradient-text">
                  <AnimatedNumber value={stat.number} suffix={stat.suffix} />
                </span>
              </div>
              <span className="mt-3 text-sm text-text-secondary">
                {stat.label}
              </span>
              {/* Small accent line under */}
              <div className="mt-4 h-px w-12 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
