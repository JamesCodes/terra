import type * as React from "react"
import { cn } from "@/lib/utils"

function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "brand-caption inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-[#F0EBD4]/50 px-3 py-1.5 font-semibold text-foreground",
        className,
      )}
      {...props}
    />
  )
}

export { Badge }
