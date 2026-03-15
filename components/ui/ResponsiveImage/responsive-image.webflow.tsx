import { type PropType, type PropValues, props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import { ResponsiveImage } from "./responsive-image"

import "../../../app/globals.css"

interface WebflowResponsiveImageProps {
  image?: PropValues[PropType.Image]
  className?: string
}

const WebflowResponsiveImage: React.FC<WebflowResponsiveImageProps> = ({ image, className }) => {
  if (!image?.src) return null

  return <ResponsiveImage src={image.src} alt={image.alt} className={className} />
}

export default declareComponent(WebflowResponsiveImage, {
  name: "Responsive Image",
  description: "A responsive image with SVG inline rendering support.",
  group: "Media",
  props: {
    image: props.Image({
      name: "Image",
      tooltip: "Select an image",
    }),
    className: props.Text({
      name: "CSS Classes",
      tooltip: "Additional Tailwind classes for sizing (e.g. h-8 w-auto)",
    }),
  },
})
