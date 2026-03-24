import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import { absoluteFillDecorator } from "@/lib/webflow"
import { createVariantMap } from "@/lib/utils"
import { type HeroVisualVariant, HeroVisual, variantComponents } from "./hero-visual"

import "../../../app/globals.css"

export const variantMap = createVariantMap<HeroVisualVariant>(variantComponents)

type variantMapType = keyof typeof variantMap

export const propLabels = {
  variant: "Visual",
} as const

const WebflowHeroVisual: React.FC<{ variant: variantMapType }> = ({ variant }) => (
  <HeroVisual variant={variantMap[variant]} />
)

export default declareComponent(WebflowHeroVisual, {
  name: "Hero Visual",
  description:
    "Decorative floating dashboard cards with mouse and scroll parallax. Drop into the Hero visual slot.",
  group: "Sections",
  props: {
    variant: props.Variant({
      name: propLabels.variant,
      options: Object.keys(variantMap),
      defaultValue: "home",
    }),
  },
  decorators: [absoluteFillDecorator],
  options: {
    ssr: false,
  },
})
