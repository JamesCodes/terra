import type * as React from "react"
import { cn } from "@/lib/utils"

interface TestimonialCardProps extends React.ComponentProps<"div"> {
  header: React.ReactNode
  testimonial: string
  name: string
  position: string
}

function TestimonialCard({
  className,
  header,
  testimonial,
  name,
  position,
  ...props
}: TestimonialCardProps) {
  return (
    <div
      data-slot="testimonial-card"
      className={cn(
        "card-shadow-light flex h-full flex-col justify-between gap-8 overflow-clip rounded-3xl border border-obsidian/20 px-6 py-8",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-6">
        {header}
        <p className="brand-body2 text-granite">{testimonial}</p>
      </div>
      <div className="brand-body2 flex flex-col gap-2">
        <p className="font-semibold text-terracotta">{name}</p>
        <p className="text-granite">{position}</p>
      </div>
    </div>
  )
}

export { TestimonialCard }
export type { TestimonialCardProps }
