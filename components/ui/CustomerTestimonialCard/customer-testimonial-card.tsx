import type * as React from "react"
import { cn } from "@/lib/utils"
import { TestimonialCard } from "@/components/ui/TestimonialCard/testimonial-card"

interface CustomerTestimonialCardProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  logo: { src: string; alt?: string }
  testimonial: string
  name: string
  position: string
}

function CustomerTestimonialCard({
  logo,
  className,
  ...props
}: CustomerTestimonialCardProps) {
  return (
    <TestimonialCard
      className={cn("lg:p-10", className)}
      header={
        <div className="h-8">
          <img
            src={logo.src}
            alt={logo.alt ?? ""}
            className="h-full w-auto"
          />
        </div>
      }
      {...props}
    />
  )
}

export { CustomerTestimonialCard }
export type { CustomerTestimonialCardProps }
