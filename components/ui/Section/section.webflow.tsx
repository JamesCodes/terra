import { type PropType, type PropValues, props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import type { ReactNode } from "react"
import { levelMap } from "@/components/ui/Heading/heading.webflow"
import { variantMap as buttonVariantMap } from "@/components/ui/Button/button.webflow"
import { headingTextProps, propLabels as headingPropLabels } from "@/components/ui/SectionHeading/section-heading.webflow"
import { Section } from "./section"

import "../../../app/globals.css"
import { responsiveProps } from "@/lib/responsive-props"

export const variantMap = {
  Chalk: "chalk",
  Moss: "moss",
  Obsidian: "obsidian",
  Magma: "magma",
} as const

export const propLabels = {
  ...headingPropLabels,
  variant: "Style",
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
  showDivider?: boolean
  showPattern?: boolean
  fadePattern?: boolean
  variant?: keyof typeof variantMap
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
  buttonVariant = "Primary",
  showButton = false,
  showDivider = true,
  showPattern = false,
  fadePattern = true,
  variant = "Chalk",
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
  const mappedHeadingLevel = levelMap[headingLevel]

  return (
    <Section
      variant={mappedVariant}
      label={showLabel ? label : undefined}
      heading={showHeading ? heading : undefined}
      headingLevel={mappedHeadingLevel}
      text={showText ? text : undefined}
      buttonText={showButton ? buttonText : undefined}
      buttonLink={buttonLink?.href ? { href: buttonLink.href, target: buttonLink.target } : undefined}
      buttonVariant={buttonVariantMap[buttonVariant]}
      showDivider={showDivider}
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
      group: "Visibility",
    }),
    showPattern: props.Visibility({
      name: "Show Pattern",
      defaultValue: false,
      tooltip: "Toggle the background pattern overlay",
      group: "Visibility",
    }),
    fadePattern: props.Visibility({
      name: "Fade Background",
      defaultValue: true,
      tooltip: "Apply a gradient mask to fade the pattern from bottom to top",
      group: "Visibility",
    }),
    variant: props.Variant({
      name: "Style",
      options: ["Chalk", "Moss", "Obsidian", "Magma"],
      defaultValue: "Chalk",
      tooltip: "Controls the section background and text colors",
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
