"use client"

/**
 * The Pastel logo — uses /logo.svg with the wordmark.
 */

export function PastelOrb({
  size = 40,
  className = "",
}: {
  size?: number
  className?: string
  glow?: boolean
  animated?: boolean
}) {
  return (
    <img
      src="/logo.png"
      alt="Pastel"
      width={size}
      height={size}
      className={className}
      aria-hidden
    />
  )
}

export function PastelLogo({
  size = 32,
  className = "",
  showWordmark = true,
}: {
  size?: number
  className?: string
  showWordmark?: boolean
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <PastelOrb size={size} />
      {showWordmark && (
        <span
          className="font-sans font-medium text-text-primary leading-none"
          style={{ fontSize: size * 0.72, letterSpacing: "-0.01em" }}
        >
          Pastel
        </span>
      )}
    </span>
  )
}
