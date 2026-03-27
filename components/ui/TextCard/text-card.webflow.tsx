import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import { TextCard } from "./text-card"


export const propLabels = {
  title: "Title",
  description: "Description",
} as const

export default declareComponent(TextCard, {
  name: "Text Card",
  description: "Simple card with a title and description, separated by a top border",
  group: "Cards",
  props: {
    title: props.TextNode({
      name: propLabels.title,
      defaultValue: "Onboard once",
      group: "Content",
      tooltip: "The card heading — editable on the canvas",
    }),
    description: props.TextNode({
      name: propLabels.description,
      defaultValue:
        "Terra agents learn in-step with your context and code, delivering continuous pentesting without the constant rescoping.",
      multiline: true,
      group: "Content",
      tooltip: "The card description — editable on the canvas",
    }),
  },
})
