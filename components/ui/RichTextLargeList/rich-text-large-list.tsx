import type * as React from "react"
import { cn } from "@/lib/utils"

function RichTextLargeList({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="rich-text-large-list"
      className={cn("brand-grid list-none", className)}
      {...props}
    >
      <ul
        className={cn(
          "col-span-full flex list-none flex-col gap-8 md:col-span-7 md:col-start-2 lg:col-span-10 lg:col-start-2",
        )}
      >
        {children}
      </ul>
    </div>
  )
}

export { RichTextLargeList }
