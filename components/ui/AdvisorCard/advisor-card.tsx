import type * as React from "react"
import { ItemFrame } from "@/components/ui/ItemFrame/item-frame"
import { cn } from "@/lib/utils"

interface AdvisorCardProps extends React.ComponentProps<"div"> {
  name: string
  role?: string
}

function AdvisorCard({ className, name, role, ...props }: AdvisorCardProps) {
  return (
    <ItemFrame
      data-slot="advisor-card"
      className={cn("flex w-full flex-col gap-1 md:gap-2", className)}
      {...props}
    >
      <p className="font-serif text-base text-primary leading-5 md:text-lg">{name}</p>
      {role && <p className="text-granite text-sm leading-5">{role}</p>}
    </ItemFrame>
  )
}

export { AdvisorCard }
