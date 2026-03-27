import type * as React from "react"
import { Badge } from "@/components/ui/Badge/badge"
import { TestimonialCard } from "@/components/ui/TestimonialCard/testimonial-card"

interface CareerTestimonialCardProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  department: string
  testimonial: string
  name: string
  position: string
}

function CareerTestimonialCard({
  department,
  ...props
}: CareerTestimonialCardProps) {
  return (
    <TestimonialCard
      header={<Badge className="w-fit">{department}</Badge>}
      {...props}
    />
  )
}

export { CareerTestimonialCard }
export type { CareerTestimonialCardProps }
