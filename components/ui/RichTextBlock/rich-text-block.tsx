import type * as React from "react"
import { cn } from "@/lib/utils"

function RichTextBlock({
  title,
  subtitle,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  title?: string
  subtitle?: string
}) {
  return (
    <div
      data-slot="rich-text-block"
      className={cn("brand-grid w-richtext text-primary", className)}
      {...props}
    >
      <div className="col-span-full md:col-span-7 md:col-start-2 lg:col-span-10 lg:col-start-2">
        {title && (
          <h1
            data-slot="rich-text-title"
            className={cn("brand-h2", {
              "mb-6": subtitle,
              "mb-12": !subtitle,
            })}
          >
            {title}
          </h1>
        )}
        {subtitle && (
          <p data-slot="rich-text-subtitle" className="brand-caption mb-12 text-granite">
            {subtitle}
          </p>
        )}
        <div data-slot="rich-text-content w-richtext text-balance">{children}</div>
      </div>
    </div>
  )
}

export { RichTextBlock }
