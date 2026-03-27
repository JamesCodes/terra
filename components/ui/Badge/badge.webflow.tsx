import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import { Badge } from "./badge"


export default declareComponent(Badge, {
  name: "Badge",
  description: "A small pill-shaped label for tags and categories",
  group: "Elements",
  props: {
    children: props.Text({
      name: "Label",
      defaultValue: "Featured",
      tooltip: "The badge text",
    }),
  },
})
