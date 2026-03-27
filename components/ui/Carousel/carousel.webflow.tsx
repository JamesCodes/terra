import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import { type ResponsiveProps, responsiveProps } from "@/lib/responsive-props"
import { Carousel } from "./carousel"


interface WebflowCarouselProps
  extends ResponsiveProps<{
    gap: number
    contentsMaxHeight: number
    itemWidth: number
  }> {
  children: React.ReactNode
  useContentsMaxHeight?: boolean
  useItemWidth?: boolean
}

const WebflowCarousel: React.FC<WebflowCarouselProps> = ({ children, ...responsivePropsValues }) => {
  return <Carousel {...responsivePropsValues}>{children}</Carousel>
}

export const propLabels = {
  gap: "Gap",
  useContentsMaxHeight: "Use Contents Max Height",
  contentsMaxHeight: "Contents Max Height",
  useItemWidth: "Use Item Width",
  itemWidth: "Item Width",
} as const

export default declareComponent(WebflowCarousel, {
  name: "Carousel",
  description: "A horizontally scrollable carousel with arrow navigation and scrollbar",
  group: "Media",
  props: {
    ...responsiveProps("gap", props.Number, {
      name: propLabels.gap,
      defaultValue: 16,
      min: -1,
      tooltip: "Gap between items in pixels",
      group: "Spacing",
    }),
    useContentsMaxHeight: props.Boolean({
      name: propLabels.useContentsMaxHeight,
      defaultValue: false,
      trueLabel: "On",
      falseLabel: "Off",
      tooltip: "Enable a fixed height for the carousel contents",
      group: "Sizing",
    }),
    ...responsiveProps("contentsMaxHeight", props.Number, {
      name: propLabels.contentsMaxHeight,
      min: -1,
      tooltip: "Maximum height of the carousel contents in pixels",
      group: "Spacing",
    }),
    useItemWidth: props.Boolean({
      name: propLabels.useItemWidth,
      defaultValue: false,
      trueLabel: "On",
      falseLabel: "Off",
      tooltip: "Enable fixed item widths",
      group: "Sizing",
    }),
    ...responsiveProps("itemWidth", props.Number, {
      name: propLabels.itemWidth,
      defaultValue: 320,
      min: -1,
      tooltip: "Width of each carousel item in pixels",
      group: "Sizing",
    }),
    children: props.Slot({
      name: "Content",
      tooltip: "Add content to the carousel",
    }),
  },
})
