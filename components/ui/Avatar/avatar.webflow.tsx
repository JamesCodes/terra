import { type PropType, type PropValues, props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

import "../../../app/globals.css"

interface WebflowAvatarProps {
  image?: PropValues[PropType.Image]
  fallbackText?: string
  showFallback?: boolean
}

const WebflowAvatar: React.FC<WebflowAvatarProps> = ({
  image,
  fallbackText = "AB",
  showFallback = true,
}) => {
  return (
    <Avatar>
      {image?.src && <AvatarImage src={image.src} alt={image.alt} />}
      {showFallback && <AvatarFallback>{fallbackText}</AvatarFallback>}
    </Avatar>
  )
}

export default declareComponent(WebflowAvatar, {
  name: "Avatar",
  description: "An avatar component with image and fallback support",
  group: "Data Display",
  props: {
    image: props.Image({
      name: "Image",
      tooltip: "The avatar image to display",
    }),
    fallbackText: props.Text({
      name: "Fallback Text",
      defaultValue: "AB",
      tooltip: "Text shown when no image is available (typically initials)",
    }),
    showFallback: props.Visibility({
      name: "Show Fallback",
      defaultValue: true,
      tooltip: "Show fallback text when image is unavailable",
    }),
  },
})
