import { type PropType, type PropValues, props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import { iconMap } from "@/components/ui/AnimatedIcon/animated-icon.webflow"
import { FeatureCard } from "./feature-card"

import "../../../app/globals.css"

export const layoutMap = {
  Large: "large",
  Small: "small",
} as const

export const imagePositionMap = {
  Top: "top",
  Bottom: "bottom",
} as const

const featureIconMap = {
  None: undefined,
  ...iconMap,
} as const

interface WebflowFeatureCardProps {
  layout?: keyof typeof layoutMap
  imagePosition?: keyof typeof imagePositionMap
  label?: string
  title?: string
  description?: string
  image?: PropValues[PropType.Image]
  icon?: keyof typeof featureIconMap
  showImage?: boolean
  showLabel?: boolean
}

const WebflowFeatureCard: React.FC<WebflowFeatureCardProps> = ({
  layout = "Large",
  imagePosition = "Bottom",
  label,
  title = "Feature Title",
  description = "Feature description.",
  image,
  icon = "None",
  showImage = true,
  showLabel = true,
}) => {
  const mappedLayout = layoutMap[layout]
  const mappedImagePosition = imagePositionMap[imagePosition]

  return (
    <FeatureCard
      variant={mappedLayout}
      imagePosition={mappedImagePosition}
      label={showLabel ? label : undefined}
      title={title}
      description={description}
      image={showImage && image?.src ? { src: image.src, alt: image.alt } : undefined}
      icon={featureIconMap[icon]}
    />
  )
}

export default declareComponent(WebflowFeatureCard, {
  name: "Feature Card",
  description:
    "A card highlighting a product feature with icon, label, title, description, and optional image",
  group: "Cards",
  props: {
    layout: props.Variant({
      name: "Layout",
      options: ["Large", "Small"],
      defaultValue: "Large",
      tooltip: "Larger cards should be used when an image is required.",
    }),
    imagePosition: props.Variant({
      name: "Image Position",
      options: ["Top", "Bottom"],
      defaultValue: "Bottom",
      tooltip: "Position the image above or below the text content",
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
    icon: props.Variant({
      name: "Icon",
      options: Object.keys(featureIconMap),
      defaultValue: "None",
      group: "Media",
      tooltip: "Animated icon displayed above the title",
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
