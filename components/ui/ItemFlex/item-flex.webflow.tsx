import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import { responsiveProps } from "@/lib/responsive-props"
import { ItemFlex } from "./item-flex"

import "../../../app/globals.css"

export default declareComponent(ItemFlex, {
  name: "Item Flex",
  description: "A flexible container that distributes child items with consistent sizing",
  group: "Layout",
  props: {
    children: props.Slot({
      name: "Items",
      tooltip: "Drop in child items or components",
    }),
    ...responsiveProps("itemMaxWidth", props.Number, {
      name: "Item Max Width",
      tooltip: "Max width for each item",
      min: -1,
      group: "Item Sizing",
    }),
    itemMaxWidthUnit: props.Variant({
      name: "Max Width Unit",
      options: ["px", "%"],
      defaultValue: "px",
      tooltip: "Unit for the max width values",
      group: "Item Sizing",
    }),
    useAspectRatio: props.Boolean({
      name: "Use Aspect Ratio",
      defaultValue: true,
      trueLabel: "On",
      falseLabel: "Off",
      tooltip: "Enable or disable the aspect ratio constraint",
      group: "Item Sizing",
    }),
    ...responsiveProps("itemAspectRatio", props.Text, {
      name: "Item Aspect Ratio",
      tooltip: "Aspect ratio for each item (e.g. 5/3, 16/9)",
      group: "Item Sizing",
    }),
    ...responsiveProps("gap", props.Number, {
      name: "Gap",
      defaultValue: 16,
      min: -1,
      max: 100,
      tooltip: "Gap between items in pixels",
      group: "Spacing",
    }),
    ...responsiveProps("paddingTop", props.Number, {
      name: "Padding Top",
      defaultValue: 0,
      min: -1,
      max: 200,
      tooltip: "Top padding in pixels",
      group: "Spacing",
    }),
    ...responsiveProps("paddingBottom", props.Number, {
      name: "Padding Bottom",
      defaultValue: 0,
      min: -1,
      max: 200,
      tooltip: "Bottom padding in pixels",
      group: "Spacing",
    }),
  },
})
