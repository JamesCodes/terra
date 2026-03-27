import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import { StatementBlockItem } from "./statement-block-item"


export const propLabels = {
  heading: "Heading",
  description: "Description",
} as const

interface WebflowStatementBlockItemProps {
  heading?: string
  description?: string
}

const WebflowStatementBlockItem: React.FC<WebflowStatementBlockItemProps> = ({
  heading = "Our Vision",
  description = "Description text goes here.",
}) => {
  return <StatementBlockItem heading={heading} description={description} />
}

export default declareComponent(WebflowStatementBlockItem, {
  name: "Statement Block Item",
  description: "A heading + description row with a top divider, used inside Statement Block",
  group: "Content Blocks",
  props: {
    heading: props.Text({
      name: propLabels.heading,
      defaultValue: "Our Vision",
      tooltip: "Serif heading for this statement row",
    }),
    description: props.RichText({
      name: propLabels.description,
      defaultValue: "Description text goes here.",
      tooltip: "Body text for this statement row",
    }),
  },
})
