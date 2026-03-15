import type * as React from "react"
import { cn } from "@/lib/utils"

interface StatsCardProps extends React.ComponentProps<"div"> {
  value: string
  suffix?: string
  description?: string
}

function StatsCard({ className, value, suffix, description, ...props }: StatsCardProps) {
  return (
    <div
      data-slot="stats-card"
      className={cn(
        "gradient-border relative flex flex-1 gap-9 overflow-clip rounded-2xl border-primary-foreground/20 px-6 py-8 text-primary-foreground backdrop-blur-[3px]",
        "max-md:items-center max-md:pr-4",
        "md:aspect-110/137 md:flex-col md:justify-between lg:aspect-35/38",
        className,
      )}
      {...props}
    >
      <p
        data-slot="stats-card-value"
        className="font-light text-[40px] tracking-[-2%] lg:text-[70px]"
      >
        {value}
        <span className="text-[32px] lg:text-[50px]">{suffix}</span>
      </p>
      <p data-slot="stats-card-description" className="brand-body2 text-balance lg:max-w-60">
        {description}
      </p>
    </div>
  )
}

export { StatsCard }
