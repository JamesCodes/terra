import { declareComponent } from "@webflow/react"
import { props } from "@webflow/data-types"
import { absoluteFillDecorator } from "@/lib/webflow"
import { HeroVisual } from "./hero-visual"

import "../../../app/globals.css"

export const variantMap = {
  Dashboard: "Dashboard",
  VariantB: "VariantB",
  VariantC: "VariantC",
} as const

export const propLabels = {
  variant: "Visual",
} as const

export default declareComponent(HeroVisual, {
  name: "Hero Visual",
  description:
    "Decorative floating dashboard cards with mouse and scroll parallax. Drop into the Hero visual slot.",
  group: "Sections",
  props: {
    variant: props.Variant({
      name: propLabels.variant,
      options: Object.keys(variantMap),
      defaultValue: "Dashboard",
    }),
  },
  decorators: [absoluteFillDecorator],
  options: {
    ssr: false,
  },
})
