import { type PropType, type PropValues, props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import { Button } from "./button"

import "../../../app/globals.css"

export const variantMap = {
  Primary: "default",
  Outline: "outline",
  Ghost: "ghost",
  Link: "link",
} as const

export const sizeMap = {
  Small: "sm",
  Medium: "default",
  Large: "lg",
  "Icon Only": "icon",
} as const

interface WebflowButtonProps {
  variant?: keyof typeof variantMap
  size?: keyof typeof sizeMap
  children?: string
  disabled?: boolean
  link?: PropValues[PropType.Link]
}

const WebflowButton: React.FC<WebflowButtonProps> = ({
  variant = "Primary",
  size = "Medium",
  children,
  disabled,
  link,
}) => {
  const mappedVariant = variantMap[variant]
  const mappedSize = sizeMap[size]

  if (link?.href) {
    return (
      <Button asChild variant={mappedVariant} size={mappedSize}>
        <a href={link.href} target={link.target}>
          {children}
        </a>
      </Button>
    )
  }

  return (
    <Button variant={mappedVariant} size={mappedSize} disabled={disabled}>
      {children}
    </Button>
  )
}

export default declareComponent(WebflowButton, {
  name: "Button",
  description: "A versatile button component with multiple variants and sizes",
  group: "Interaction",
  props: {
    variant: props.Variant({
      name: "Style",
      options: ["Primary", "Outline", "Ghost", "Link"],
      defaultValue: "Primary",
      tooltip: "The visual style of the button",
    }),
    size: props.Variant({
      name: "Size",
      options: ["Small", "Medium", "Large", "Icon Only"],
      defaultValue: "Medium",
      tooltip: "The size of the button",
    }),
    children: props.Text({
      name: "Label",
      defaultValue: "Button",
      tooltip: "The button text",
    }),
    disabled: props.Boolean({
      name: "Disabled",
      defaultValue: false,
      trueLabel: "Yes",
      falseLabel: "No",
      tooltip: "Prevents interaction when enabled",
    }),
    link: props.Link({
      name: "Link",
      tooltip: "Makes the button navigate to a URL when clicked",
    }),
  },
})
