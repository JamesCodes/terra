import { type PropType, type PropValues, props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import { variantMap as buttonVariantMap } from "@/components/ui/Button/button.webflow"
import { levelMap } from "@/components/ui/Heading/heading.webflow"
import { createVariantMap } from "@/lib/utils"
import { SectionHeading } from "./section-heading"


export const variantMap = createVariantMap<"light" | "dark">(["light", "dark"])

export const propLabels = {
  variant: "Style",
  label: "Label",
  showLabel: "Show Label",
  headingLevel: "Heading Level",
  heading: "Heading",
  showHeading: "Show Heading",
  text: "Text",
  showText: "Show Text",
  buttonText: "Button Text",
  buttonVariant: "Button Style",
  showButton: "Show Button",
} as const

interface WebflowSectionHeadingProps {
  label?: string
  showLabel?: boolean
  heading?: string
  headingLevel?: keyof typeof levelMap
  showHeading?: boolean
  text?: string
  showText?: boolean
  buttonText?: string
  buttonLink?: PropValues[PropType.Link]
  buttonVariant?: keyof typeof buttonVariantMap
  showButton?: boolean
  variant?: keyof typeof variantMap
}

const WebflowSectionHeading: React.FC<WebflowSectionHeadingProps> = ({
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
  variant = "Light",
}) => {
  return (
    <SectionHeading
      label={showLabel ? label : undefined}
      heading={showHeading ? heading : undefined}
      headingLevel={levelMap[headingLevel]}
      text={showText ? text : undefined}
      buttonText={showButton ? buttonText : undefined}
      buttonLink={
        buttonLink?.href ? { href: buttonLink.href, target: buttonLink.target } : undefined
      }
      buttonVariant={buttonVariantMap[buttonVariant]}
      variant={variantMap[variant]}
    />
  )
}

export const headingTextProps = {
  label: props.TextNode({
    name: "Label",
    defaultValue: "Label",
    tooltip: "Eyebrow label above the heading",
    group: "Label",
  }),
  showLabel: props.Visibility({
    name: "Show Label",
    defaultValue: false,
    tooltip: "Toggle the eyebrow label",
    group: "Label",
  }),
  heading: props.TextNode({
    name: "Heading",
    defaultValue: "Section heading goes here.",
    multiline: true,
    tooltip: "The section heading — editable directly on canvas",
    group: "Heading",
  }),
  headingLevel: props.Variant({
    name: "Heading Level",
    options: Object.keys(levelMap),
    defaultValue: "Heading 2",
    tooltip: "The heading size level",
    group: "Heading",
  }),
  showHeading: props.Visibility({
    name: "Show Heading",
    defaultValue: true,
    tooltip: "Toggle the heading",
    group: "Heading",
  }),
  text: props.TextNode({
    name: "Text",
    defaultValue: "A brief description for this section.",
    multiline: true,
    tooltip: "Description text below the heading",
    group: "Text",
  }),
  showText: props.Visibility({
    name: "Show Text",
    defaultValue: false,
    tooltip: "Toggle the description text",
    group: "Text",
  }),
  buttonText: props.Text({
    name: "Button Text",
    defaultValue: "Learn More",
    tooltip: "Text for the section heading button",
    group: "Button",
  }),
  buttonLink: props.Link({
    name: "Button Link",
    tooltip: "URL the button navigates to",
    group: "Button",
  }),
  buttonVariant: props.Variant({
    name: "Button Style",
    options: Object.keys(buttonVariantMap).filter((k) => k !== "Ghost"),
    defaultValue: "Default",
    tooltip: "Visual style of the button",
    group: "Button",
  }),
  showButton: props.Visibility({
    name: "Show Button",
    defaultValue: false,
    tooltip: "Toggle the button below the heading text",
    group: "Button",
  }),
} as const

export default declareComponent(WebflowSectionHeading, {
  name: "Section Heading",
  description:
    "A centered heading and description text block for use within native Webflow sections",
  group: "Sections",
  props: {
    ...headingTextProps,
    variant: props.Variant({
      name: "Style",
      options: Object.keys(variantMap),
      defaultValue: Object.keys(variantMap)[0],
      tooltip: "Light for chalk backgrounds, Dark for moss/obsidian/magma backgrounds",
    }),
  },
})
