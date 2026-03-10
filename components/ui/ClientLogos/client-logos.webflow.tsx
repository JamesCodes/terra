import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import { ClientLogos } from "./client-logos"

import "../../../app/globals.css"

export default declareComponent(ClientLogos, {
  name: "Client Logos",
  description: "A horizontal row of client/partner logos",
  group: "Data Display",
  props: {
    children: props.Slot({
      name: "Logos",
      tooltip: "Drop in logo images or components",
    }),
  },
})
