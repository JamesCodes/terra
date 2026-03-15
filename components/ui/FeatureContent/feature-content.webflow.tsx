import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import type { ReactNode } from "react"
import { FeatureContent } from "./feature-content"

import "../../../app/globals.css"

export const variantMap = {
  "Image Left": "imageLeft",
  "Image Right": "imageRight",
} as const

export const propLabels = {
  variant: "Layout",
  title: "Title",
  description: "Description",
  icon: "Icon",
  image: "Image",
} as const

interface WebflowFeatureContentProps {
  variant?: keyof typeof variantMap
  title?: string
  description?: string
  icon?: ReactNode
  image?: { src: string; alt?: string }
}

const WebflowFeatureContent: React.FC<WebflowFeatureContentProps> = ({
  variant = "Image Left",
  title,
  description,
  icon,
  image,
}) => {
  const mappedVariant = variantMap[variant]

  return (
    <FeatureContent
      variant={mappedVariant}
      title={title}
      description={description}
      icon={icon}
      image={image}
    />
  )
}

export default declareComponent(WebflowFeatureContent, {
  name: "Feature Content",
  description: "A two-column feature section with title, description, icon, and image",
  group: "Content Blocks",
  props: {
    variant: props.Variant({
      name: propLabels.variant,
      options: Object.keys(variantMap),
      defaultValue: Object.keys(variantMap)[0],
      tooltip: "Control image position relative to content",
    }),
    title: props.TextNode({
      name: propLabels.title,
      defaultValue: "Feature title goes here",
      tooltip: "The feature heading",
      group: "Content",
    }),
    description: props.TextNode({
      name: propLabels.description,
      defaultValue: "A brief description of this feature and its benefits.",
      multiline: true,
      tooltip: "The feature description text",
      group: "Content",
    }),
    icon: props.Slot({
      name: propLabels.icon,
      tooltip: "Icon or visual element displayed above the title",
      group: "Content",
    }),
    image: props.Image({
      name: propLabels.image,
      tooltip: "The feature image",
      group: "Image",
    }),
  },
})
