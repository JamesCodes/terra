import type * as React from "react"
import { cn } from "@/lib/utils"

interface HorizontalTableRowProps extends Omit<React.ComponentProps<"div">, "content"> {
  label: string
  content: React.ReactNode
}

function HorizontalTableRow({ label, content, className, ...props }: HorizontalTableRowProps) {
  return (
    <div data-slot="horizontal-table-row" className={cn("flex", className)} {...props}>
      <div
        data-slot="horizontal-table-label"
        className="w-35 shrink-0 self-stretch overflow-clip border-border border-r p-4 lg:w-100 lg:px-8 lg:py-6"
      >
        <p className="brand-body2 font-bold text-primary">{label}</p>
      </div>
      <div
        data-slot="horizontal-table-content"
        className="brand-body2 min-w-0 flex-1 overflow-clip p-4 text-primary lg:px-8 lg:py-6"
      >
        {content}
      </div>
    </div>
  )
}

export { HorizontalTableRow }
