import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import { PageTransition } from "./page-transition"


export default declareComponent(PageTransition, {
  name: "Page Transition",
  description: "Fades the page out when navigating to another page",
  group: "Elements",
  options: { ssr: false },
  props: {
    duration: props.Number({
      name: "Duration",
      defaultValue: 0.3,
      min: 0.1,
      max: 2,
      decimals: 1,
      tooltip: "Fade-out duration in seconds",
    }),
  },
})
