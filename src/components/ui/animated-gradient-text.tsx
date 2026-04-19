import { type ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

export interface AnimatedGradientTextProps extends ComponentPropsWithoutRef<"div"> {
  speed?: number
  colorFrom?: string
  colorTo?: string
}

export function AnimatedGradientText({
  children,
  className,
  speed = 1,
  colorFrom = "#7C3AED",
  colorTo = "#C8A2FF",
  ...props
}: AnimatedGradientTextProps) {
  return (
    <span
      style={
        {
          backgroundImage: `linear-gradient(to right, ${colorFrom}, ${colorTo}, ${colorFrom})`,
          backgroundSize: `${speed * 300}% 100%`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          animation: "gradient-shift 6s ease infinite",
        } as React.CSSProperties
      }
      className={cn("inline", className)}
      {...props}
    >
      {children}
    </span>
  )
}
