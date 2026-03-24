import type * as React from "react"
import { cn } from "@/lib/utils"

interface RichTextLargeListItemProps extends Omit<React.ComponentProps<"li">, "content"> {
  heading: string
  number?: string
  content: React.ReactNode
}

function RichTextLargeListItem({
  heading,
  number,
  content,
  className,
  ...props
}: RichTextLargeListItemProps) {
  return (
    <li
      data-slot="rich-text-large-list-item"
      className={cn("flex flex-col gap-4.5 lg:gap-10", className)}
      {...props}
    >
      <h3 data-slot="rich-text-large-list-item-heading" className="brand-h3 text-primary">
        {number && `${number}. `}
        {heading}
      </h3>
      <div
        data-slot="rich-text-large-list-item-content"
        className="w-richtext text-primary lg:pl-16"
      >
        {content}
      </div>
    </li>
  )
}

export { RichTextLargeListItem }
