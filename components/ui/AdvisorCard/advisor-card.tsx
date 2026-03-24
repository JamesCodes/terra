import type * as React from "react"
import { ItemFrame } from "@/components/ui/ItemFrame/item-frame"
import { cn } from "@/lib/utils"

interface AdvisorCardProps extends React.ComponentProps<"div"> {
  name: string
  role?: string
  href?: string
  target?: string
}

function AdvisorCard({ className, name, role, href, target, ...props }: AdvisorCardProps) {
  return (
    <ItemFrame
      data-slot="advisor-card"
      className={cn("flex w-full flex-col gap-1 md:gap-2", className)}
      {...props}
    >
      <p className={cn("brand-h5", { "transition-colors hover:text-accent": href })}>
        {href ? (
          <a href={href} target={target}>
            {name}
          </a>
        ) : (
          name
        )}
      </p>
      {role && <p className="brand-caption text-granite">{role}</p>}
    </ItemFrame>
  )
}

export { AdvisorCard }
