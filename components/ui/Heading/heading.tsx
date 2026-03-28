import { tv, type VariantProps } from "tailwind-variants"

import { cn } from "@/lib/utils"

const headingVariants = tv({
  variants: {
    level: {
      1: "brand-h1",
      2: "brand-h2",
      3: "brand-h3",
      4: "brand-h4",
      5: "brand-h5",
      6: "brand-h6",
      7: "brand-h7",
      adaptive: "brand-adaptive-heading",
    },
  },
  defaultVariants: {
    level: 1,
  },
})

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | "adaptive"

interface HeadingProps extends React.ComponentProps<"h1">, VariantProps<typeof headingVariants> {
  level?: HeadingLevel
}

function Heading({ className, level = 1, ...props }: HeadingProps) {
  const numericLevel = level === "adaptive" ? 1 : Math.min(level, 6)
  const Tag = `h${numericLevel}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

  return (
    <Tag
      data-slot="heading"
      className={cn(headingVariants({ level, class: className }))}
      {...props}
    />
  )
}

export { Heading, headingVariants }
export type { HeadingLevel }
