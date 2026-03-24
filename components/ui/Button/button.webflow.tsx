import { type PropType, type PropValues, props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import { createVariantMap } from "@/lib/utils"
import { Button, type ButtonSize, type ButtonState, type ButtonVariant, buttonVariants } from "./button"

import "../../../app/globals.css"

export const variantMap = createVariantMap<ButtonVariant>(buttonVariants.variants.variant)

export const stateMap = createVariantMap<ButtonState>(buttonVariants.variants.state)

export const sizeMap = createVariantMap<ButtonSize>(buttonVariants.variants.size, {
  sm: "Small",
  md: "Medium",
  lg: "Large",
  icon: "Icon Only",
})

interface WebflowButtonProps {
  variant?: keyof typeof variantMap
  size?: keyof typeof sizeMap
  state?: keyof typeof stateMap
  children?: string
  disabled?: boolean
  link?: PropValues[PropType.Link]
}

const WebflowButton: React.FC<WebflowButtonProps> = ({
  variant = "Default",
  size = "Default",
  state = "Default",
  children,
  disabled,
  link,
}) => {
  const mappedVariant = variantMap[variant]
  const mappedSize = sizeMap[size]
  const mappedState = stateMap[state]

  if (link?.href) {
    return (
      <Button asChild variant={mappedVariant} size={mappedSize} state={mappedState}>
        <a href={link.href} target={link.target}>
          {children}
        </a>
      </Button>
    )
  }

  return (
    <Button variant={mappedVariant} size={mappedSize} state={mappedState} disabled={disabled}>
      {children}
    </Button>
  )
}

export default declareComponent(WebflowButton, {
  name: "Button",
  description: "A versatile button component with multiple variants and sizes",
  group: "Elements",
  props: {
    variant: props.Variant({
      name: "Style",
      options: Object.keys(variantMap),
      defaultValue: Object.keys(variantMap)[0],
      tooltip: "The visual style of the button",
    }),
    size: props.Variant({
      name: "Size",
      options: Object.keys(sizeMap),
      defaultValue: Object.keys(sizeMap)[0],
      tooltip: "The size of the button",
    }),
    state: props.Variant({
      name: "State",
      options: Object.keys(stateMap),
      defaultValue: Object.keys(stateMap)[0],
      tooltip: "The interactive state of the button",
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
