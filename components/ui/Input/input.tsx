import type * as React from "react"
import { tv, type VariantProps } from "tailwind-variants"

import { cn } from "@/lib/utils"

const inputVariants = tv({
  base: "flex w-full min-w-0 bg-transparent text-base outline-none transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  variants: {
    variant: {
      default:
        "h-9 rounded-md border border-input px-3 py-1 shadow-xs selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
      search:
        "h-8 border-border border-b pb-3 font-medium text-sm placeholder:text-muted-foreground/75 focus-visible:border-foreground [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
      inline:
        "h-12 rounded-full bg-background py-2 pr-2 pl-6 font-medium text-sm placeholder:text-foreground/75 focus-visible:ring-[3px] focus-visible:ring-ring/50",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

function Input({
  className,
  variant,
  type,
  ...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Input, inputVariants }
