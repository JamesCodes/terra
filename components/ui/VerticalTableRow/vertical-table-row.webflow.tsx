import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import { VerticalTableRow } from "./vertical-table-row"

import "../../../app/globals.css"

interface WebflowVerticalTableRowProps {
  columns: number
  col1: string
  col2: string
  col3: string
  col4: string
}

const WebflowVerticalTableRow: React.FC<WebflowVerticalTableRowProps> = ({
  columns,
  col1,
  col2,
  col3,
  col4,
}) => {
  return <VerticalTableRow columns={columns} col1={col1} col2={col2} col3={col3} col4={col4} />
}

export const propLabels = {
  columns: "Columns",
  col1: "Column 1",
  col2: "Column 2",
  col3: "Column 3",
  col4: "Column 4",
} as const

export default declareComponent(WebflowVerticalTableRow, {
  name: "Rich Text - Vertical Table Row",
  description: "A data row within a Vertical Table with four cell values",
  group: "Rich Text",
  props: {
    columns: props.Number({
      name: propLabels.columns,
      defaultValue: 4,
      min: 1,
      max: 4,
      decimals: 0,
      tooltip: "Number of columns to display (must match the parent table)",
    }),
    col1: props.Text({
      name: propLabels.col1,
      defaultValue: "Google",
      tooltip: "Text content for the first column",
    }),
    col2: props.Text({
      name: propLabels.col2,
      defaultValue: "Data Analytics",
      tooltip: "Text content for the second column",
    }),
    col3: props.Text({
      name: propLabels.col3,
      defaultValue: "https://policies.google.com/privacy",
      tooltip: "Text content for the third column",
    }),
    col4: props.Text({
      name: propLabels.col4,
      defaultValue: "Performance and Analytics cookies",
      tooltip: "Text content for the fourth column",
    }),
  },
})
