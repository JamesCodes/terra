import * as React from "react"
import { tv, type VariantProps } from "tailwind-variants"

const headingVariants = tv({
  base: "font-serif tracking-tight",
  variants: {
    level: {
      1: "text-5xl font-bold",
      2: "text-4xl font-bold",
      3: "text-3xl font-semibold",
      4: "text-2xl font-semibold",
    },
  },
  defaultVariants: {
    level: 1,
  },
})

type HeadingLevel = 1 | 2 | 3 | 4

interface HeadingProps
  extends React.ComponentProps<"h1">,
    VariantProps<typeof headingVariants> {
  level?: HeadingLevel
}

function Heading({ className, level = 1, ...props }: HeadingProps) {
  const Tag = `h${level}` as const

  return (
    <Tag
      data-slot="heading"
      className={headingVariants({ level, class: className })}
      {...props}
    />
  )
}

export { Heading, headingVariants }
