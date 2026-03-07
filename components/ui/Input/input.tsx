import type * as React from "react"
import { tv, type VariantProps } from "tailwind-variants"

import { cn } from "@/lib/utils"

const inputVariants = tv({
  base: "flex w-full min-w-0 bg-transparent text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  variants: {
    variant: {
      default:
        "h-9 rounded-md border border-input px-3 py-1 shadow-xs placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
      search:
        "h-8 border-b border-border pb-3 text-sm font-medium placeholder:text-muted-foreground/75 focus-visible:border-foreground [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
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
