import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import { CTACard } from "./cta-card"

import "../../../app/globals.css"

export const variantMap = {
  Moss: "moss",
  Magma: "magma",
} as const

export const propLabels = {
  variant: "Style",
  title: "Title",
  description: "Description",
  buttonLabel: "Button Label",
} as const

interface WebflowCTACardProps {
  variant?: keyof typeof variantMap
  title?: string
  description?: string
  buttonLabel?: string
  link?: { href: string; target?: string }
}

const WebflowCTACard: React.FC<WebflowCTACardProps> = ({
  variant = "Moss",
  title,
  description,
  buttonLabel,
  link,
}) => {
  const mappedVariant = variantMap[variant]

  return (
    <CTACard
      variant={mappedVariant}
      title={title}
      description={description}
      buttonLabel={buttonLabel}
      href={link?.href}
      target={link?.target}
    />
  )
}

export default declareComponent(WebflowCTACard, {
  name: "CTA Card",
  description: "A call-to-action card with title, description, and button link",
  group: "Cards",
  props: {
    variant: props.Variant({
      name: "Style",
      options: ["Moss", "Magma"],
      defaultValue: "Moss",
      tooltip: "Background color — Moss (green) or Magma (dark brown)",
    }),
    title: props.TextNode({
      name: "Title",
      defaultValue: "Careers",
      tooltip: "Card heading text",
    }),
    description: props.RichText({
      name: "Description",
      tooltip: "Card body text — supports formatted content",
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
