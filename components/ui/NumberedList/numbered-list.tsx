import * as React from "react"
import { Heading } from "@/components/ui/Heading/heading"
import { cn } from "@/lib/utils"

interface NumberedListItemProps extends React.ComponentProps<"div"> {
  number: number
  title: string
  description: string
}

function NumberedListItem({
  className,
  number,
  title,
  description,
  ...props
}: NumberedListItemProps) {
  return (
    <div
      data-slot="numbered-list-item"
      className={cn(
        "grid grid-cols-[auto_1fr] gap-x-4 border-t border-border pt-8 pb-12 md:grid-cols-8 md:gap-x-5",
        className,
      )}
      {...props}
    >
      <span
        data-slot="numbered-list-number"
        className="row-span-2 font-sans text-[80px] font-extralight leading-[72px] text-primary md:col-span-2"
      >
        {number}
      </span>
      <Heading level={4} data-slot="numbered-list-title" className="md:col-span-6 md:col-start-3">
        {title}
      </Heading>
      <p
        data-slot="numbered-list-description"
        className="mt-6 text-lg leading-8 tracking-[-0.36px] text-primary md:col-span-6 md:col-start-3"
      >
        {description}
      </p>
    </div>
  )
}

export { NumberedListItem }
