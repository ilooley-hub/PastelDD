"use client"

import { useEffect, useRef } from "react"

/**
 * A soft pastel orb that follows the cursor with elastic lag.
 * Renders nothing on touch devices and gracefully bows out if reduced-motion.
 */
export function CursorOrb() {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    const isTouch = window.matchMedia("(pointer: coarse)").matches
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (isTouch || reduce) return

    const el = ref.current
    if (!el) return

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let cx = mx
    let cy = my
    let raf = 0

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }

    const tick = () => {
      cx += (mx - cx) * 0.12
      cy += (my - cy) * 0.12
      el.style.transform = `translate3d(${cx - 140}px, ${cy - 140}px, 0)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener("mousemove", onMove)
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[1] h-[280px] w-[280px] rounded-full opacity-60 mix-blend-multiply"
      style={{
        background:
          "radial-gradient(circle, rgba(200,162,255,0.28) 0%, rgba(255,184,217,0.14) 35%, rgba(255,207,160,0.06) 60%, transparent 75%)",
        filter: "blur(20px)",
        willChange: "transform",
      }}
    />
  )
}
