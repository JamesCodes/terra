import { type PropType, type PropValues, props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import { ImageCard } from "./image-card"


interface WebflowImageCardProps {
  image?: PropValues[PropType.Image]
  useAspectRatio?: boolean
  aspectRatio?: string
  title?: string
  showTitle?: boolean
}

const WebflowImageCard: React.FC<WebflowImageCardProps> = ({
  image,
  useAspectRatio = true,
  aspectRatio,
  title = "Location",
  showTitle = true,
}) => {
  return (
    <ImageCard
      image={image?.src ? { src: image.src, alt: image.alt } : undefined}
      useAspectRatio={useAspectRatio}
      aspectRatio={aspectRatio || undefined}
      title={title}
      showTitle={showTitle}
    />
  )
}

export default declareComponent(WebflowImageCard, {
  name: "Image Card",
  description: "A card with an image and an optional heading label",
  group: "Cards",
  props: {
    image: props.Image({
      name: "Image",
      tooltip: "The card image",
    }),
    useAspectRatio: props.Boolean({
      name: "Use Aspect Ratio",
      defaultValue: true,
      tooltip: "Constrain the image to a fixed aspect ratio",
    }),
    aspectRatio: props.Text({
      name: "Aspect Ratio",
      defaultValue: "1/1",
      tooltip: "CSS aspect ratio for the image container (e.g. 1/1, 3/2, 16/9)",
    }),
    title: props.TextNode({
      name: "Title",
      defaultValue: "Location",
      group: "Content",
      tooltip: "The card heading — editable on the canvas",
    }),
    showTitle: props.Visibility({
      name: "Show Title",
      defaultValue: true,
      group: "Content",
      tooltip: "Toggle the heading text",
    }),
  },
})
