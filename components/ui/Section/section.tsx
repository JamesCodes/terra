import { tv, type VariantProps } from "tailwind-variants"

import { Heading } from "@/components/ui/Heading/heading"
import { cn } from "@/lib/utils"

const sectionVariants = tv({
  base: "w-full",
  variants: {
    variant: {
      white: "bg-card text-primary",
      chalk: "bg-background text-primary",
      moss: "bg-[#133224] text-[#fbfaf5]",
    },
  },
  defaultVariants: {
    variant: "white",
  },
})

type SectionVariant = "white" | "chalk" | "moss"

interface SectionProps
  extends React.ComponentProps<"section">,
    VariantProps<typeof sectionVariants> {
  heading?: string
  text?: string
  paddingTop?: number
  paddingBottom?: number
}

function Section({
  className,
  style,
  variant = "white",
  heading,
  text,
  paddingTop = 80,
  paddingBottom = 80,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      data-slot="section"
      className={cn(
        sectionVariants({ variant }),
        "pt-[calc(var(--pt)*1px)] max-lg:pt-[calc(var(--pt-tablet)*1px)] max-md:pt-[calc(var(--pt-mobile)*1px)] pb-[calc(var(--pb)*1px)] max-lg:pb-[calc(var(--pb-tablet)*1px)] max-md:pb-[calc(var(--pb-mobile)*1px)]",
        className,
      )}
      style={
        {
          "--pt": paddingTop,
          "--pt-tablet": paddingTop,
          "--pt-mobile": paddingTop,
          "--pb": paddingBottom,
          "--pb-tablet": paddingBottom,
          "--pb-mobile": paddingBottom,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <div className="container flex flex-col md:gap-6">
        {(heading || text) && (
          <div className="flex flex-col items-center gap-4 text-center">
            {heading && <Heading level={2}>{heading}</Heading>}
            {text && (
              <p
                className={cn("md:basis-8/12 text-lg leading-normal", {
                  "text-[#3c3c3c]": variant !== "moss",
                })}
              >
                {text}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}

export { Section, sectionVariants }
export type { SectionVariant }
