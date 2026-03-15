import { lazy } from "react"
import { tv, type VariantProps } from "tailwind-variants"
import { SectionHeading } from "@/components/ui/SectionHeading/section-heading"
import { type ResponsiveProps, responsiveClass, responsiveStyles } from "@/lib/responsive-props"
import { cn } from "@/lib/utils"

const BgPattern = lazy(() => import("./bg-pattern.svg"))

const sectionVariants = tv({
  slots: {
    root: "relative w-full",
    pattern:
      "absolute top-0 left-0 h-full w-full [&>svg]:absolute [&>svg]:top-0 [&>svg]:left-0 [&>svg]:h-full [&>svg]:w-full",
    textCardHeading: "",
  },
  variants: {
    variant: {
      chalk: {
        root: "bg-background text-primary",
        pattern: "text-sand",
        textCardHeading: "var(--color-accent)",
      },
      moss: { root: "bg-moss text-chalk", pattern: "text-[#289664]" },
      obsidian: { root: "bg-obsidian text-chalk", pattern: "text-granite" },
      magma: { root: "bg-light-magma text-chalk", pattern: "text-[#6F2F1C] opacity-60" },
    },
  },
  defaultVariants: {
    variant: "chalk",
  },
})

import type { HeadingLevel } from "@/components/ui/Heading/heading"
import type { SectionHeadingProps } from "@/components/ui/SectionHeading/section-heading"

type SectionVariant = "chalk" | "moss" | "obsidian" | "magma"

interface SectionProps
  extends React.ComponentProps<"section">,
    VariantProps<typeof sectionVariants>,
    ResponsiveProps<{
      gap: number
      paddingTop: number
      paddingBottom: number
    }> {
  label?: string
  heading?: string
  headingLevel?: HeadingLevel
  text?: string
  buttonText?: SectionHeadingProps["buttonText"]
  buttonLink?: SectionHeadingProps["buttonLink"]
  buttonVariant?: SectionHeadingProps["buttonVariant"]
  showDivider?: boolean
  showPattern?: boolean
  fadePattern?: boolean
}

function Section({
  className,
  style,
  variant = "chalk",
  label,
  heading,
  headingLevel = 2,
  text,
  buttonText,
  buttonLink,
  buttonVariant,
  gap = 80,
  gapTablet = 64,
  gapMobile = 48,
  paddingTop = 80,
  paddingTopTablet = -1,
  paddingTopMobile = -1,
  paddingBottom = 80,
  paddingBottomTablet = -1,
  paddingBottomMobile = -1,
  showDivider = true,
  showPattern = false,
  fadePattern = true,
  children,
  ...props
}: SectionProps) {
  const { root, pattern, textCardHeading } = sectionVariants({ variant })

  console.log({ h3: textCardHeading() })

  return (
    <>
      <section
        data-slot="section"
        className={cn(root(), responsiveClass("pt", "pt"), responsiveClass("pb", "pb"), className)}
        style={{
          ...responsiveStyles({
            "gap-y": [gap, gapTablet, gapMobile, "px"],
            pt: [paddingTop, paddingTopTablet, paddingTopMobile, "px"],
            pb: [paddingBottom, paddingBottomTablet, paddingBottomMobile, "px"],
          }),
          ...{
            "--text-card-heading": textCardHeading(),
          },
          ...style,
        }}
        {...props}
      >
        <div
          className={cn(
            `container relative z-10 flex flex-col ${responsiveClass("gap-y", "gap-y")}`,
          )}
        >
          <SectionHeading
            label={label}
            heading={heading}
            headingLevel={headingLevel}
            text={text}
            buttonText={buttonText}
            buttonLink={buttonLink}
            buttonVariant={buttonVariant}
            variant={variant === "chalk" ? "light" : "dark"}
          />
          {children}
        </div>
        {showPattern && (
          <div className={cn(pattern(), { "mask-t-from-0% mask-t-to-90%": fadePattern })}>
            <BgPattern />
          </div>
        )}
      </section>
      {showDivider && (
        <div className="container px-10">
          <div className="border-b" />
        </div>
      )}
    </>
  )
}

export { Section, sectionVariants }
export type { SectionVariant }
