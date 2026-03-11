import { declareComponent } from "@webflow/react"
import { HeroVisual } from "./hero-visual"

import "../../../app/globals.css"

export default declareComponent(HeroVisual, {
  name: "Hero Visual",
  description:
    "Decorative floating dashboard cards with mouse and scroll parallax. Drop into the Hero visual slot.",
  group: "Visual",
  props: {},
  options: {
    ssr: false,
  },
})
