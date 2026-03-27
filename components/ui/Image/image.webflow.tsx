import { type PropType, type PropValues, props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import { Image } from "./image"


interface WebflowImageProps {
  image?: PropValues[PropType.Image]
  className?: string
}

const WebflowImage: React.FC<WebflowImageProps> = ({ image, className }) => {
  if (!image?.src) return null

  return <Image src={image.src} alt={image.alt} className={className} />
}

export default declareComponent(WebflowImage, {
  name: "Image",
  description: "A simple image component for use standalone or inside slots",
  group: "Media",
  props: {
    image: props.Image({
      name: "Image",
      tooltip: "Select an image asset",
    }),
    className: props.Text({
      name: "CSS Classes",
      tooltip: "Additional Tailwind classes for sizing (e.g. h-8 w-auto)",
    }),
  },
})
