import type * as React from "react"
import { cn } from "@/lib/utils"

interface VerticalTableRowProps extends React.ComponentProps<"div"> {
  columns?: number
  col1: string
  col2?: string
  col3?: string
  col4?: string
}

function VerticalTableRow({
  columns = 4,
  col1,
  col2,
  col3,
  col4,
  className,
  ...props
}: VerticalTableRowProps) {
  const cells = [col1, col2, col3, col4].slice(0, columns)

  return (
    <div
      data-slot="vertical-table-row"
      className={cn("flex border-border border-t", className)}
      {...props}
    >
      {cells.map((cell, i) => (
        <div
          key={i}
          className={cn(
            "w-30 shrink-0 overflow-clip p-4 lg:w-auto lg:min-w-0 lg:flex-1 lg:px-8 lg:py-6",
            { "border-border border-r": i < cells.length - 1 },
          )}
        >
          <p className="brand-body2 text-primary">{cell}</p>
        </div>
      ))}
    </div>
  )
}

export { VerticalTableRow }
