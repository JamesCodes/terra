import type * as React from "react"
import { cn } from "@/lib/utils"

type StatsCardVariant = "large" | "mini"

interface StatsCardProps extends React.ComponentProps<"div"> {
  variant?: StatsCardVariant
  value: string
  suffix?: string
  description?: string
}

function StatsCard({
  className,
  variant = "large",
  value,
  suffix,
  description,
  ...props
}: StatsCardProps) {
  return (
    <div
      data-slot="stats-card"
      className={cn(
        "flex flex-col text-primary-foreground",
        {
          "border-t border-primary-foreground/20 gap-4 pt-6 md:relative md:justify-between md:overflow-clip md:rounded-2xl md:border-t-0 md:p-8 md:h-70 lg:h-95 md:gap-0 md:gradient-border":
            variant === "large",
          "h-auto rounded-2xl border border-accent/30 p-6": variant === "mini",
        },
        className,
      )}
      {...props}
    >
      <p
        data-slot="stats-card-value"
        className={cn("font-light tracking-tight", {
          "text-[56px] leading-12.5 md:text-7xl md:leading-none": variant === "large",
          "text-5xl": variant === "mini",
        })}
      >
        {value}
        <span className="text-[40px] md:text-[56px]">{suffix}</span>
      </p>
      <p
        data-slot="stats-card-description"
        className={cn("font-medium text-sm leading-5", {
          "max-w-67.5 md:max-w-46": variant === "large",
          "mt-4": variant === "mini",
        })}
      >
        {description}
      </p>
    </div>
  )
}

export { StatsCard, type StatsCardVariant }
