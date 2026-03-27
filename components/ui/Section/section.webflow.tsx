import { type PropType, type PropValues, props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import type { ReactNode } from "react"
import { variantMap as buttonVariantMap } from "@/components/ui/Button/button.webflow"
import { levelMap } from "@/components/ui/Heading/heading.webflow"
import type { TextAlign } from "@/components/ui/SectionHeading/section-heading"
import {
  propLabels as headingPropLabels,
  headingTextProps,
} from "@/components/ui/SectionHeading/section-heading.webflow"
import { responsiveProps } from "@/lib/responsive-props"
import { createVariantMap } from "@/lib/utils"
import { Section, type SectionVariant, sectionVariants } from "./section"

export const variantMap = createVariantMap<SectionVariant>(sectionVariants.variants.variant)
export const textAlignMap = createVariantMap<TextAlign>(["left", "center", "right"])

export const propLabels = {
  ...headingPropLabels,
  variant: "Style",
  textAlign: "Text Align",
  gap: "Gap",
  paddingTop: "Padding Top",
  paddingBottom: "Padding Bottom",
} as const

interface WebflowSectionProps {
  label?: string
  showLabel?: boolean
  heading?: string
  headingLevel?: Exclude<keyof typeof levelMap, "Heading 1">
  showHeading?: boolean
  text?: string
  showText?: boolean
  buttonText?: string
  buttonLink?: PropValues[PropType.Link]
  buttonVariant?: keyof typeof buttonVariantMap
  showButton?: boolean
  textAlign?: keyof typeof textAlignMap
  showDivider?: boolean
  pattern?: PropValues[PropType.Image]
  showPattern?: boolean
  fadePattern?: boolean
  variant?: keyof typeof variantMap
  fullBleedContents?: boolean
  gap?: number
  gapTablet?: number
  gapMobile?: number
  paddingTop?: number
  paddingTopTablet?: number
  paddingTopMobile?: number
  paddingBottom?: number
  paddingBottomTablet?: number
  paddingBottomMobile?: number
  content?: ReactNode
}

const WebflowSection: React.FC<WebflowSectionProps> = ({
  label,
  showLabel = false,
  heading,
  headingLevel = "Heading 2",
  showHeading = true,
  text,
  showText = false,
  buttonText,
  buttonLink,
  buttonVariant = "Default",
  showButton = false,
  textAlign = "Center",
  pattern,
  showDivider = true,
  showPattern = false,
  fadePattern = true,
  variant = "Chalk",
  fullBleedContents = false,
  gap = 80,
  gapTablet,
  gapMobile,
  paddingTop = 80,
  paddingTopTablet,
  paddingTopMobile,
  paddingBottom = 80,
  paddingBottomTablet,
  paddingBottomMobile,
  content,
}) => {
  const mappedVariant = variantMap[variant]
  const mappedTextAlign = textAlignMap[textAlign]
  const mappedHeadingLevel = levelMap[headingLevel]

  return (
    <Section
      variant={mappedVariant}
      label={showLabel ? label : undefined}
      heading={showHeading ? heading : undefined}
      headingLevel={mappedHeadingLevel}
      text={showText ? text : undefined}
      textAlign={mappedTextAlign}
      buttonText={showButton ? buttonText : undefined}
      buttonLink={
        buttonLink?.href ? { href: buttonLink.href, target: buttonLink.target } : undefined
      }
      buttonVariant={buttonVariantMap[buttonVariant]}
      pattern={pattern?.src}
      showDivider={showDivider}
      fullBleedContents={fullBleedContents}
      showPattern={showPattern}
      fadePattern={fadePattern}
      gap={gap}
      gapTablet={gapTablet}
      gapMobile={gapMobile}
      paddingTop={paddingTop}
      paddingTopTablet={paddingTopTablet}
      paddingTopMobile={paddingTopMobile}
      paddingBottom={paddingBottom}
      paddingBottomTablet={paddingBottomTablet}
      paddingBottomMobile={paddingBottomMobile}
    >
      {content}
    </Section>
  )
}

export default declareComponent(WebflowSection, {
  name: "Section",
  description:
    "A full-width page section with heading, optional description text, and content area",
  group: "Sections",
  props: {
    ...headingTextProps,
    showDivider: props.Visibility({
      name: "Show Divider",
      defaultValue: true,
      tooltip: "Toggle the bottom divider line",
    }),
    fullBleedContents: props.Boolean({
      name: "Full Bleed Contents",
      defaultValue: false,
      trueLabel: "On",
      falseLabel: "Off",
      tooltip: "Allow contents to extend beyond the container to viewport edges",
      group: "Spacing",
    }),
    pattern: props.Image({
      name: "Pattern",
      tooltip: "Background pattern overlay (SVG only — colors inherit from the section style)",
      group: "Pattern",
    }),
    showPattern: props.Visibility({
      name: "Show Pattern",
      defaultValue: false,
      tooltip: "Toggle the background pattern overlay",
      group: "Pattern",
    }),
    fadePattern: props.Visibility({
      name: "Fade Pattern",
      defaultValue: true,
      tooltip: "Apply a gradient mask to fade the pattern from bottom to top",
      group: "Pattern",
    }),
    variant: props.Variant({
      name: "Style",
      options: Object.keys(variantMap),
      defaultValue: Object.keys(variantMap)[0],
      tooltip: "Controls the section background and text colors",
    }),
    textAlign: props.Variant({
      name: "Text Align",
      options: Object.keys(textAlignMap),
      defaultValue: "Center",
      tooltip: "Text alignment for the section heading and description",
    }),
    ...responsiveProps("gap", props.Number, {
      name: "Gap",
      defaultValue: [80, 64, 48],
      min: -1,
      tooltip: "Vertical gap between section content in pixels",
      group: "Spacing",
    }),
    ...responsiveProps("paddingTop", props.Number, {
      name: "Padding Top",
      defaultValue: 80,
      min: -1,
      tooltip: "Top padding in pixels",
      group: "Spacing",
    }),
    ...responsiveProps("paddingBottom", props.Number, {
      name: "Padding Bottom",
      defaultValue: 80,
      min: -1,
      tooltip: "Bottom padding in pixels",
      group: "Spacing",
    }),
    content: props.Slot({
      name: "Content",
      tooltip: "The main content area — drop in any components",
    }),
  },
})
