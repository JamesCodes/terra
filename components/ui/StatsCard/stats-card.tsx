import type * as React from "react"
import { cn } from "@/lib/utils"
import { tv, type VariantProps } from "tailwind-variants"

const statsCardVariants = tv({
  base: "flex flex-col justify-between rounded-2xl border border-accent/30 overflow-hidden",
  variants: {
    variant: {
      large:
        "h-[381px] bg-gradient-to-b from-accent/8 to-transparent p-8 text-primary-foreground",
      mini: "h-auto bg-gradient-to-b from-accent/8 to-transparent p-6 text-primary-foreground",
    },
  },
  defaultVariants: {
    variant: "large",
  },
})

interface StatsCardProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof statsCardVariants> {
  value: string
  description: string
}

function StatsCard({
  className,
  variant,
  value,
  description,
  ...props
}: StatsCardProps) {
  return (
    <div
      data-slot="stats-card"
      className={cn(statsCardVariants({ variant }), className)}
      {...props}
    >
      <p
        data-slot="stats-card-value"
        className={cn(
          "font-light tracking-tight",
          variant === "mini" ? "text-5xl" : "text-7xl",
        )}
      >
        {value}
      </p>
      <p
        data-slot="stats-card-description"
        className={cn(
          "font-medium leading-[20px]",
          variant === "mini" ? "text-sm mt-4" : "text-sm max-w-[184px]",
        )}
      >
        {description}
      </p>
    </div>
  )
}

export { StatsCard, statsCardVariants }
