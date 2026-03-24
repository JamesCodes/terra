import type * as React from "react"
import { cn } from "@/lib/utils"

interface HorizontalTableProps extends React.ComponentProps<"div"> {
  heading?: string
  footer?: string
}

function HorizontalTable({ heading, footer, className, children, ...props }: HorizontalTableProps) {
  return (
    <div
      data-slot="horizontal-table"
      className={cn("flex flex-col gap-10 lg:gap-15 lg:pl-16", className)}
      {...props}
    >
      {heading && <p className="brand-body1 text-primary">{heading}</p>}
      <div className="divide-y divide-border overflow-clip rounded-2xl border border-border">
        {children}
        {footer && (
          <div data-slot="horizontal-table-footer" className="p-4 lg:px-8 lg:py-6">
            <p className="brand-body2 text-primary">{footer}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export { HorizontalTable }
