import { type PropType, type PropValues, props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import { ClientLogo } from "./client-logo"

import "../../../app/globals.css"

interface WebflowClientLogoProps {
  logo?: PropValues[PropType.Image]
  className?: string
}

const WebflowImage: React.FC<WebflowClientLogoProps> = ({ logo, className }) => {
  if (!logo?.src) return null

  return <ClientLogo src={logo.src} alt={logo.alt} className={className} />
}

export default declareComponent(WebflowImage, {
  name: "Client Logo",
  description: "A Client Logo, ideally an SVG.",
  group: "Media",
  props: {
    logo: props.Image({
      name: "Logo",
      tooltip: "Select a Client Logo",
    }),
    className: props.Text({
      name: "CSS Classes",
      tooltip: "Additional Tailwind classes for sizing (e.g. h-8 w-auto)",
    }),
  },
})
