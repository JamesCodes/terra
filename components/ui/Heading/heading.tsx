import { tv, type VariantProps } from "tailwind-variants"

import { cn } from "@/lib/utils"

const headingVariants = tv({
  base: "font-serif tracking-tight",
  variants: {
    level: {
      1: "brand-h1",
      2: "brand-h2",
      3: "brand-h3",
      4: "brand-h4",
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
