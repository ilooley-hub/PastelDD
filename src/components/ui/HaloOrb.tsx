// Decorative halo orb. CSS-only — no image, no canvas. Drifts gently.
// Use as a hero decoration in place of the old particle canvas.
export function HaloOrb({
  size = 380,
  className,
  blur = 0.6,
  glow = true,
  style,
}: {
  size?: number
  className?: string
  blur?: number
  glow?: boolean
  style?: React.CSSProperties
}) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: size,
        height: size,
        ...style,
      }}
    >
      {glow && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: -size * 0.25,
            borderRadius: "50%",
            backgroundImage:
              "radial-gradient(circle, rgba(196,167,231,0.45) 0%, rgba(80,199,250,0.18) 40%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />
      )}
      <div
        className="bg-halo-radial animate-halo-drift"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "47% 53% 51% 49% / 49% 47% 53% 51%",
          filter: `blur(${blur}px)`,
          boxShadow:
            "0 0 80px rgba(196,167,231,0.35), 0 0 140px rgba(80,199,250,0.18)",
        }}
      />
    </div>
  )
}

// Tiny halo orb — the navbar / favicon-style mark.
export function HaloMark({ size = 22 }: { size?: number }) {
  return (
    <span
      aria-hidden
      className="bg-halo-radial inline-block"
      style={{
        width: size,
        height: size,
        borderRadius: "47% 53% 51% 49% / 49% 47% 53% 51%",
        boxShadow: "0 0 12px rgba(196,167,231,0.5)",
      }}
    />
  )
}
