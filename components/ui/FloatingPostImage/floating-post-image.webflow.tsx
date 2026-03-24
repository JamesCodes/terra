import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import { FloatingPostImage } from "./floating-post-image"

import "../../../app/globals.css"

interface WebflowFloatingPostImageProps {
  label?: string
}

const WebflowFloatingPostImage: React.FC<WebflowFloatingPostImageProps> = ({
  label = "Read Article",
}) => {
  return <FloatingPostImage label={label} />
}

export default declareComponent(WebflowFloatingPostImage, {
  name: "Floating Post Image",
  description:
    "A floating image card that follows the cursor when hovering over Blog Post Card (list variant) items. Place alongside the blog list.",
  group: "Cards",
  options: { ssr: false },
  props: {
    label: props.Text({
      name: "Label",
      defaultValue: "Read Article",
      tooltip: "Text shown on the floating button overlay",
    }),
  },
})
