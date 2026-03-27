import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import { CheckCard } from "./check-card"


export const propLabels = {
  text: "Text",
} as const

export default declareComponent(CheckCard, {
  name: "Check Card",
  description: "Card with a check icon and descriptive text",
  group: "Cards",
  props: {
    text: props.TextNode({
      name: propLabels.text,
      defaultValue: "Expand pentesting coverage without increasing headcount.",
      multiline: true,
      group: "Content",
      tooltip: "The card text — editable on the canvas",
    }),
  },
})
