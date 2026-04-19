import {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type FC,
} from "react"

import { cn } from "@/lib/utils"

export interface AnimatedShinyTextProps extends ComponentPropsWithoutRef<"span"> {
  shimmerWidth?: number
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 100,
  ...props
}) => {
  return (
    <span
      style={
        {
          "--shiny-width": `${shimmerWidth}px`,
          backgroundSize: `var(--shiny-width) 100%`,
          backgroundPosition: "0 0",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "linear-gradient(to right, transparent, rgba(0,0,0,0.8) 50%, transparent)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        } as CSSProperties
      }
      className={cn("animate-shiny-text mx-auto max-w-md", className)}
      {...props}
    >
      {children}
    </span>
  )
}
