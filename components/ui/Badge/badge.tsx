import * as React from "react"
import { cn } from "@/lib/utils"

function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-secondary/50 px-3 py-1.5 text-xs font-medium text-primary whitespace-nowrap shrink-0",
        className,
      )}
      {...props}
    />
  )
}

export { Badge }
