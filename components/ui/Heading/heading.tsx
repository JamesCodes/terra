import * as React from "react"
import { tv, type VariantProps } from "tailwind-variants"

import { cn } from "@/lib/utils"

const headingVariants = tv({
  base: "font-serif tracking-tight",
  variants: {
    level: {
      1: "text-5xl leading-[1.05] font-medium md:text-7xl md:leading-[1.06]",
      2: "text-[32px] leading-[1.25] font-medium md:text-5xl md:leading-[1.4]",
      3: "text-2xl leading-[1.33] font-medium md:text-[32px] md:leading-[1.25]",
      4: "text-xl leading-[1.33] font-medium md:text-2xl md:leading-[1.33]",
    },
  },
  defaultVariants: {
    level: 1,
  },
})

type HeadingLevel = 1 | 2 | 3 | 4

interface HeadingProps extends React.ComponentProps<"h1">, VariantProps<typeof headingVariants> {
  level?: HeadingLevel
}

function Heading({ className, level = 1, ...props }: HeadingProps) {
  const Tag = `h${level}` as const

  return (
    <Tag
      data-slot="heading"
      className={cn(headingVariants({ level, class: className }))}
      {...props}
    />
  )
}

export { Heading, headingVariants }
