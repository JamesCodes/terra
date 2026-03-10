import { Slot } from "@radix-ui/react-slot"
import type * as React from "react"
import { tv, type VariantProps } from "tailwind-variants"

import { cn } from "@/lib/utils"

const buttonVariants = tv({
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  variants: {
    variant: {
      default: "bg-accent text-accent-foreground shadow-xs hover:bg-accent/90",
      outline: "border border-accent text-accent hover:bg-accent/10",
      ghost: "hover:bg-accent/10",
      link: "text-foreground font-medium hover:underline underline-offset-4",
    },
    size: {
      default: "h-11 px-6",
      sm: "h-9 px-5",
      lg: "h-12 px-8",
      icon: "size-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, class: className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
