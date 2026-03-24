import type * as React from "react"
import { ItemFrame } from "@/components/ui/ItemFrame/item-frame"
import { cn } from "@/lib/utils"

interface TextCardProps extends React.ComponentProps<"div"> {
  title: string
  description: string
}

function TextCard({ className, title, description, ...props }: TextCardProps) {
  return (
    <ItemFrame data-slot="text-card" className={cn("self-stretch", className)} {...props}>
      <div className="flex w-full flex-col gap-4 border-current/20 border-t pt-4 lg:max-w-[90%] lg:pt-5">
        <h3 className="brand-h4 text-(--text-card-heading)">{title}</h3>
        <p className="brand-body2 w-richtext text-balance lg:pr-[10%]">{description}</p>
      </div>
    </ItemFrame>
  )
}

export { TextCard }
