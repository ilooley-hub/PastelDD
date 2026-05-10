"use client"

import { useEffect, useRef } from "react"

type Node = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  bornAt: number
}

export function ParticleCanvas({
  className,
  count = 22,
  opacity = 1,
  connectDistance = 150,
}: {
  className?: string
  count?: number
  opacity?: number
  connectDistance?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0
    let nodes: Node[] = []
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const start = performance.now()

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const seed = () => {
      const rect = canvas.getBoundingClientRect()
      nodes = Array.from({ length: count }).map((_, i) => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: 1.5 + Math.random() * 2.5,
        bornAt: start + (i / count) * 2000,
      }))
    }

    const draw = (t: number) => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      // edges first
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        const aFade = Math.min(1, Math.max(0, (t - a.bornAt) / 600))
        if (aFade <= 0) continue
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const bFade = Math.min(1, Math.max(0, (t - b.bornAt) / 600))
          if (bFade <= 0) continue
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist > connectDistance) continue
          const lineAlpha =
            (1 - dist / connectDistance) * 0.14 * aFade * bFade * opacity
          ctx.strokeStyle = `rgba(200,162,255,${lineAlpha})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      // nodes
      for (const n of nodes) {
        const fade = Math.min(1, Math.max(0, (t - n.bornAt) / 600))
        if (fade <= 0) continue
        ctx.fillStyle = `rgba(200,162,255,${0.32 * fade * opacity})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()

        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > rect.width) n.vx *= -1
        if (n.y < 0 || n.y > rect.height) n.vy *= -1
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    seed()
    raf = requestAnimationFrame(draw)
    const onResize = () => {
      resize()
      seed()
    }
    window.addEventListener("resize", onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
    }
  }, [count, connectDistance, opacity])

  return <canvas ref={canvasRef} className={className} />
}
