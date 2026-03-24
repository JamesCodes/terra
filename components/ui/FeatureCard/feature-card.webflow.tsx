import { type PropType, type PropValues, props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import {
  iconMap,
  iconWebflowProps,
  modeMap,
} from "@/components/ui/AnimatedIcon/animated-icon.webflow"
import { createVariantMap } from "@/lib/utils"
import { FeatureCard, imagePositionVariants, layoutVariants } from "./feature-card"

import "../../../app/globals.css"

export const layoutMap = createVariantMap<(typeof layoutVariants)[number]>(layoutVariants)

export const imagePositionMap = createVariantMap<(typeof imagePositionVariants)[number]>(imagePositionVariants)

interface WebflowFeatureCardProps {
  layout?: keyof typeof layoutMap
  imagePosition?: keyof typeof imagePositionMap
  label?: string
  title?: string
  description?: string
  image?: PropValues[PropType.Image]
  icon?: string
  iconMode?: string
  iconSpeed?: number
  showIcon?: boolean
  showImage?: boolean
  showLabel?: boolean
  showText?: boolean
  showDividers?: boolean
  showSlot?: boolean
  children?: React.ReactNode
}

const WebflowFeatureCard: React.FC<WebflowFeatureCardProps> = ({
  layout = "Large",
  imagePosition = "Bottom",
  label,
  title = "Feature Title",
  description = "Feature description.",
  image,
  icon = "Target",
  iconMode = "Loop",
  iconSpeed = 5,
  showIcon = true,
  showImage = true,
  showLabel = true,
  showText = true,
  showDividers = false,
  showSlot = false,
  children,
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
      showText={showText}
      showDividers={showDividers}
      image={showImage && image?.src ? { src: image.src, alt: image.alt } : undefined}
      icon={showIcon ? iconMap[icon] : undefined}
      iconMode={modeMap[iconMode]}
      iconSpeed={iconSpeed}
      showSlot={showSlot}
    >
      {children}
    </FeatureCard>
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
      options: Object.keys(layoutMap),
      defaultValue: "Large",
      tooltip: "Larger cards should be used when an image is required.",
    }),
    imagePosition: props.Variant({
      name: "Image Position",
      options: Object.keys(imagePositionMap),
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
    showText: props.Visibility({
      name: "Show Text",
      defaultValue: true,
      group: "Content",
      tooltip: "Toggle the title and description",
    }),
    showDividers: props.Visibility({
      name: "Show Dividers",
      defaultValue: false,
      tooltip: "Toggle vertical dividers on the left and right edges",
    }),
    ...iconWebflowProps("Media"),
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
    children: props.Slot({
      name: "Slot",
      group: "Media",
      tooltip: "Nest components in the image area of the card",
    }),
    showSlot: props.Visibility({
      name: "Show Slot",
      defaultValue: false,
      group: "Media",
      tooltip: "Toggle the slot content area (renders where the image is)",
    }),
  },
})
