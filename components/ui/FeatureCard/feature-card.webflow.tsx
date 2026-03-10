import { type PropType, type PropValues, props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import type { ReactNode } from "react"
import { FeatureCard } from "./feature-card"

import "../../../app/globals.css"

export const layoutMap = {
  Large: "large",
  Grid: "grid",
} as const

interface WebflowFeatureCardProps {
  layout?: keyof typeof layoutMap
  label?: string
  title?: string
  description?: string
  image?: PropValues[PropType.Image]
  icon?: ReactNode
  showImage?: boolean
  showLabel?: boolean
}

const WebflowFeatureCard: React.FC<WebflowFeatureCardProps> = ({
  layout = "Grid",
  label,
  title = "Feature Title",
  description = "Feature description.",
  image,
  icon,
  showImage = true,
  showLabel = true,
}) => {
  const mappedLayout = layoutMap[layout]

  return (
    <FeatureCard
      variant={mappedLayout}
      label={showLabel ? label : undefined}
      title={title}
      description={description}
      image={showImage && image?.src ? { src: image.src, alt: image.alt } : undefined}
      icon={icon}
    />
  )
}

export default declareComponent(WebflowFeatureCard, {
  name: "Feature Card",
  description:
    "A card highlighting a product feature with icon, label, title, description, and optional image",
  group: "Data Display",
  props: {
    layout: props.Variant({
      name: "Layout",
      options: ["Grid", "Large"],
      defaultValue: "Grid",
      tooltip: "Grid for small icon cards, Large for side-by-side with image",
    }),
    label: props.Text({
      name: "Label",
      defaultValue: "Always-on",
      group: "Content",
      tooltip: "Accent-colored label above the title (e.g. Always-on, On-demand)",
    }),
    showLabel: props.Visibility({
      name: "Show Label",
      defaultValue: true,
      group: "Content",
      tooltip: "Toggle the accent label",
    }),
    title: props.TextNode({
      name: "Title",
      defaultValue: "Feature Title",
      group: "Content",
      tooltip: "The feature heading — editable on the canvas",
    }),
    description: props.TextNode({
      name: "Description",
      defaultValue: "Feature description goes here.",
      multiline: true,
      group: "Content",
      tooltip: "The feature description — editable on the canvas",
    }),
    icon: props.Slot({
      name: "Icon",
      group: "Media",
      tooltip: "Drop in an icon or image for the grid variant",
    }),
    image: props.Image({
      name: "Image",
      group: "Media",
      tooltip: "Screenshot or visual for the large variant",
    }),
    showImage: props.Visibility({
      name: "Show Image",
      defaultValue: true,
      group: "Media",
      tooltip: "Toggle the image",
    }),
  },
})
