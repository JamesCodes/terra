import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import { createVariantMap } from "@/lib/utils"
import { ColorCard, colorCardVariants } from "./color-card"

import "../../../app/globals.css"

type ColorCardVariant = NonNullable<
  import("tailwind-variants").VariantProps<typeof colorCardVariants>["variant"]
>

export const variantMap = createVariantMap<ColorCardVariant>(colorCardVariants.variants.variant)

export const propLabels = {
  variant: "Style",
  title: "Title",
  description: "Description",
  showButton: "Show Button",
  buttonLabel: "Button Label",
} as const

interface WebflowColorCardProps {
  variant?: keyof typeof variantMap
  title?: string
  description?: string
  showButton?: boolean
  buttonLabel?: string
  link?: { href: string; target?: string }
}

const WebflowColorCard: React.FC<WebflowColorCardProps> = ({
  variant = "Moss",
  title,
  description,
  showButton = true,
  buttonLabel,
  link,
}) => {
  const mappedVariant = variantMap[variant]

  return (
    <ColorCard
      variant={mappedVariant}
      title={title}
      description={description}
      showButton={showButton}
      buttonLabel={buttonLabel}
      href={link?.href}
      target={link?.target}
    />
  )
}

export default declareComponent(WebflowColorCard, {
  name: "Color Card",
  description: "A colored card with title, description, and optional button link",
  group: "Cards",
  props: {
    variant: props.Variant({
      name: "Style",
      options: Object.keys(variantMap),
      defaultValue: Object.keys(variantMap)[0],
      tooltip: "Background color — Moss (green), Magma (dark brown), or Terracotta (orange-red)",
    }),
    title: props.TextNode({
      name: "Title",
      defaultValue: "Careers",
      tooltip: "Card heading text",
      multiline: true,
    }),
    description: props.RichText({
      name: "Description",
      tooltip: "Card body text — supports formatted content",
    }),
    showButton: props.Visibility({
      name: "Show Button",
      defaultValue: true,
      tooltip: "Show or hide the CTA button",
    }),
    buttonLabel: props.Text({
      name: "Button Label",
      defaultValue: "Learn More",
      tooltip: "Text displayed on the CTA button",
    }),
    link: props.Link({
      name: "Button Link",
      tooltip: "Where the CTA button links to",
    }),
  },
})
