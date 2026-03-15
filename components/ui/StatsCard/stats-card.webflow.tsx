import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import { StatsCard } from "./stats-card"

import "../../../app/globals.css"

export const propLabels = {
  value: "Value",
  suffix: "Suffix",
  description: "Description",
} as const

interface WebflowStatsCardProps {
  value?: string
  suffix?: string
  description?: string
}

const WebflowStatsCard: React.FC<WebflowStatsCardProps> = ({
  value = "100",
  suffix = "%",
  description = "Description text",
}) => {
  return <StatsCard value={value} description={description} suffix={suffix} />
}

export default declareComponent(WebflowStatsCard, {
  name: "Stats Card",
  description: "A stat highlight card with a large number and description",
  group: "Cards",
  props: {
    value: props.TextNode({
      name: propLabels.value,
      defaultValue: "100%",
      tooltip: "The stat value — editable on the canvas",
    }),
    suffix: props.TextNode({
      name: propLabels.suffix,
      defaultValue: "%",
      tooltip: "The stat suffix — editable on the canvas",
    }),
    description: props.TextNode({
      name: propLabels.description,
      defaultValue: "Description of this statistic.",
      multiline: true,
      tooltip: "Explanation of the stat — editable on the canvas",
    }),
  },
})
