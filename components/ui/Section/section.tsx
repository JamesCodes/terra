import SVG from "react-inlinesvg"
import { tv, type VariantProps } from "tailwind-variants"
import { SectionHeading } from "@/components/ui/SectionHeading/section-heading"
import { type ResponsiveProps, responsiveClass, responsiveStyles } from "@/lib/responsive-props"
import { cn } from "@/lib/utils"

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
        pattern: "text-[#f2e6ae]",
        textCardHeading: "var(--color-accent)",
      },
      white: { root: "bg-white text-obsidian", pattern: "" },
      moss: { root: "bg-moss text-chalk", pattern: "text-[#289664] opacity-20" },
      obsidian: { root: "bg-obsidian text-chalk", pattern: "text-granite opacity-45" },
      magma: { root: "bg-light-magma text-chalk", pattern: "text-[#6F2F1C] opacity-60" },
      sand: { root: "bg-sand text-foreground", pattern: "text-[#D4BF5E]" },
      terracotta: { root: "bg-dark-terracotta text-chalk", pattern: "text-[#e65c32]" },
    },
  },
  defaultVariants: {
    variant: "chalk",
  },
})

import type { HeadingLevel } from "@/components/ui/Heading/heading"
import type { SectionHeadingProps, TextAlign } from "@/components/ui/SectionHeading/section-heading"

type SectionVariant = "chalk" | "moss" | "obsidian" | "magma" | "sand" | "terracotta" | "white"

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
  textAlign?: TextAlign
  buttonText?: SectionHeadingProps["buttonText"]
  buttonLink?: SectionHeadingProps["buttonLink"]
  buttonVariant?: SectionHeadingProps["buttonVariant"]
  showDivider?: boolean
  fullBleedContents?: boolean
  pattern?: string
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
  textAlign = "center",
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
  pattern,
  showDivider = true,
  fullBleedContents = false,
  showPattern = false,
  fadePattern = true,
  children,
  ...props
}: SectionProps) {
  const { root, pattern: patternSlot, textCardHeading } = sectionVariants({ variant })

  return (
    <>
      <section
        data-slot="section"
        className={cn(root(), responsiveClass("pt", "pt"), responsiveClass("pb", "pb"), { [`flex flex-col ${responsiveClass("gap-y", "gap-y")}`]: fullBleedContents }, className)}
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
            textAlign={textAlign}
            buttonText={buttonText}
            buttonLink={buttonLink}
            buttonVariant={buttonVariant}
            variant={variant === "chalk" ? "light" : "dark"}
          />
          {!fullBleedContents && children}
        </div>
        {fullBleedContents && (
          <div className={`relative z-10 flex flex-col ${responsiveClass("gap-y", "gap-y")}`}>
            {children}
          </div>
        )}
        {showPattern && pattern?.endsWith(".svg") && (
          <div className={cn(patternSlot(), { "mask-t-from-0% mask-t-to-90%": fadePattern })}>
            <SVG
              src={pattern}
              className="absolute top-0 left-0 h-full w-full stroke-current"
              preProcessor={(svg: string) =>
                svg
                  .replace(/fill="(?!none)[^"]*"/g, "")
                  .replace(/stroke="(?!none)[^"]*"/g, 'stroke="currentColor"')
                  .replace(/preserveAspectRatio="[^"]*"/, "")
                  .replace("<svg", '<svg preserveAspectRatio="xMidYMid slice"')
              }
            />
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
