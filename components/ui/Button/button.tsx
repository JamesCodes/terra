import { Slot } from "@radix-ui/react-slot"
import type * as React from "react"
import { tv, type VariantProps } from "tailwind-variants"

import { cn } from "@/lib/utils"

const buttonVariants = tv({
  base: "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-semibold text-sm outline-none transition-all disabled:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  variants: {
    theme: {
      default: "",
      dark: "bg-obsidian",
    },
    variant: {
      default:
        "interacting rounded-full bg-accent text-accent-foreground shadow-xs active:bg-magma disabled:bg-disabled",
      outline:
        "interacting rounded-full border border-accent text-accent active:border-dark-terracotta active:text-dark-terracotta disabled:border-0 disabled:bg-disabled disabled:text-chalk",
      ghost: "",
      link: "font-medium text-foreground underline-offset-4 hover:underline",
      nav: "nav-indicator flex cursor-pointer items-center gap-1.5 whitespace-nowrap font-medium text-foreground [&>span]:relative [&>span]:block lg:hover:[&>span]:after:-bottom-2 lg:[&>span]:hover:after:bg-accent",
      filter:
        "interacting rounded-full border border-[#A6A5A4] text-foreground active:border-dark-terracotta active:text-dark-terracotta disabled:border-0 disabled:bg-disabled disabled:text-chalk",
      pagination: "size-10 rounded-full text-sm hover:bg-sand/50",
    },
    size: {
      default: "h-12.5 px-6",
      sm: "h-9 px-5",
      md: "h-10 px-5",
      lg: "h-12 px-8",
      icon: "size-10",
      link: "",
    },
    state: {
      default: "",
      active: "lg:[&>span]:after:-bottom-2 lg:[&>span]:after:bg-accent",
    },
  },
  compoundVariants: [
    {
      variant: "filter",
      state: "active",
      className: "pointer-events-none border-foreground bg-foreground text-background",
    },
    {
      variant: "pagination",
      state: "active",
      className: "bg-sand",
    },
  ],
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
  state,
  theme = "default",
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, state, theme, class: className }))}
      {...(variant === "pagination" ? { "fs-list-element": "page-button" } : {})}
      {...props}
    />
  )
}

export type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>
export type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>
export type ButtonState = NonNullable<VariantProps<typeof buttonVariants>["state"]>

export { Button, buttonVariants }
