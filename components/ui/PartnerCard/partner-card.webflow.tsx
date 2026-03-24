import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import { PartnerCard } from "./partner-card"

import "../../../app/globals.css"

export const propLabels = {
  label: "Label",
} as const

export default declareComponent(PartnerCard, {
  name: "Partner Card",
  description: "A partner badge card with partner image, label, and Terra logo",
  group: "Cards",
  props: {
    image: props.Image({
      name: "Partner Image",
      tooltip: "The partner badge or logo image",
    }),
    label: props.Text({
      name: propLabels.label,
      defaultValue: "AI Software Competency\nSecurity Software Competency",
      tooltip: "The partner competency or certification label",
    }),
  },
})
