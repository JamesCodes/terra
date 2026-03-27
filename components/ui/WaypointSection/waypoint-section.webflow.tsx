import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import { WaypointSection } from "./waypoint-section"


export default declareComponent(WaypointSection, {
  name: "Waypoint Section",
  description: "A page section that registers with the navbar for waypoint-style navigation.",
  group: "Sections",
  props: {
    waypointId: props.Text({
      name: "Section ID",
      defaultValue: "overview",
      tooltip: "Unique identifier for this section",
    }),
    waypointLabel: props.Text({
      name: "Nav Label",
      defaultValue: "Overview",
      tooltip: "Label shown in the navbar waypoint navigation",
    }),
    waypointOrder: props.Number({
      name: "Order",
      defaultValue: 0,
      min: 0,
      max: 99,
      tooltip: "Sort order in the navbar (lower numbers appear first)",
    }),
    children: props.Slot({
      name: "Content",
    }),
  },
  options: {
    ssr: false,
  },
})
