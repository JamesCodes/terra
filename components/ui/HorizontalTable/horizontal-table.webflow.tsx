import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import { HorizontalTable } from "./horizontal-table"


interface WebflowHorizontalTableProps {
  heading: string
  footer: string
  rows: React.ReactNode
}

const WebflowHorizontalTable: React.FC<WebflowHorizontalTableProps> = ({
  heading,
  footer,
  rows,
}) => {
  return (
    <HorizontalTable heading={heading} footer={footer}>
      {rows}
    </HorizontalTable>
  )
}

export const propLabels = {
  heading: "Heading",
  footer: "Footer",
} as const

export default declareComponent(WebflowHorizontalTable, {
  name: "Rich Text - Horizontal Table",
  description: "A two-column table for key-value pair content like cookie policies",
  group: "Rich Text",
  props: {
    heading: props.Text({
      name: propLabels.heading,
      defaultValue: "Table heading",
      tooltip: "Optional heading displayed above the table",
    }),
    footer: props.Text({
      name: propLabels.footer,
      tooltip: "Optional text displayed below the table rows",
    }),
    rows: props.Slot({
      name: "Rows",
      tooltip: "Add Rich Text - Horizontal Table Row components here",
    }),
  },
})
