import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import type { ReactNode } from "react"
import { Section } from "./section"

import "../../../app/globals.css"
import { responsiveProps, responsiveStyles } from "@/lib/responsive-props"

export const variantMap = {
  White: "white",
  Chalk: "chalk",
  Moss: "moss",
} as const

export const propLabels = {
  variant: "Style",
  paddingTop: "Padding Top",
  paddingBottom: "Padding Bottom",
  heading: "Heading",
  showHeading: "Show Heading",
  text: "Text",
  showText: "Show Text",
} as const

interface WebflowSectionProps {
  heading?: string
  showHeading?: boolean
  text?: string
  showText?: boolean
  variant?: keyof typeof variantMap
  paddingTop?: number
  paddingTopTablet?: number
  paddingTopMobile?: number
  paddingBottom?: number
  paddingBottomTablet?: number
  paddingBottomMobile?: number
  content?: ReactNode
}

const WebflowSection: React.FC<WebflowSectionProps> = ({
  heading,
  showHeading = true,
  text,
  showText = false,
  variant = "White",
  paddingTop = 80,
  paddingTopTablet,
  paddingTopMobile,
  paddingBottom = 80,
  paddingBottomTablet,
  paddingBottomMobile,
  content,
}) => {
  const mappedVariant = variantMap[variant]

  return (
    <Section
      variant={mappedVariant}
      heading={showHeading ? heading : undefined}
      text={showText ? text : undefined}
      style={responsiveStyles({
        pt: [paddingTop, paddingTopTablet, paddingTopMobile],
        pb: [paddingBottom, paddingBottomTablet, paddingBottomMobile],
      })}
    >
      {content}
    </Section>
  )
}

export default declareComponent(WebflowSection, {
  name: "Section",
  description:
    "A full-width page section with heading, optional description text, and content area",
  group: "Layout",
  props: {
    heading: props.TextNode({
      name: "Heading",
      defaultValue: "Section heading goes here.",
      multiline: true,
      tooltip: "The section heading — editable directly on canvas",
    }),
    text: props.TextNode({
      name: "Text",
      defaultValue: "A brief description for this section.",
      multiline: true,
      tooltip: "Description text below the heading",
    }),
    showHeading: props.Visibility({
      name: "Show Heading",
      defaultValue: true,
      tooltip: "Toggle the section heading",
      group: "Visibility",
    }),
    showText: props.Visibility({
      name: "Show Text",
      defaultValue: false,
      tooltip: "Toggle the description text below the heading",
      group: "Visibility",
    }),
    variant: props.Variant({
      name: "Style",
      options: ["White", "Chalk", "Moss"],
      defaultValue: "White",
      tooltip: "Controls the section background and text colors",
    }),
    ...responsiveProps("paddingTop", props.Number, {
      name: "Padding Top",
      defaultValue: 80,
      min: 0,
      tooltip: "Top padding in pixels",
      group: "Spacing",
    }),
    ...responsiveProps("paddingBottom", props.Number, {
      name: "Padding Bottom",
      defaultValue: 80,
      min: 0,
      tooltip: "Bottom padding in pixels",
      group: "Spacing",
    }),
    content: props.Slot({
      name: "Content",
      tooltip: "The main content area — drop in any components",
    }),
  },
})
