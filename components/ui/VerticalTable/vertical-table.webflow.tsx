import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import { VerticalTable } from "./vertical-table"


interface WebflowVerticalTableProps {
  heading: string
  columns: number
  footer: string
  col1Header: string
  col2Header: string
  col3Header: string
  col4Header: string
  rows: React.ReactNode
}

const WebflowVerticalTable: React.FC<WebflowVerticalTableProps> = ({
  heading,
  columns,
  footer,
  col1Header,
  col2Header,
  col3Header,
  col4Header,
  rows,
}) => {
  return (
    <VerticalTable
      heading={heading}
      columns={columns}
      footer={footer}
      col1Header={col1Header}
      col2Header={col2Header}
      col3Header={col3Header}
      col4Header={col4Header}
    >
      {rows}
    </VerticalTable>
  )
}

export const propLabels = {
  heading: "Heading",
  columns: "Columns",
  footer: "Footer",
  col1Header: "Column 1 Header",
  col2Header: "Column 2 Header",
  col3Header: "Column 3 Header",
  col4Header: "Column 4 Header",
} as const

export default declareComponent(WebflowVerticalTable, {
  name: "Rich Text - Vertical Table",
  description: "A multi-column data table with header row and horizontal scroll on mobile",
  group: "Rich Text",
  props: {
    heading: props.Text({
      name: propLabels.heading,
      defaultValue: "Table heading",
      tooltip: "Optional heading displayed above the table",
    }),
    columns: props.Number({
      name: propLabels.columns,
      defaultValue: 4,
      min: 1,
      max: 4,
      decimals: 0,
      tooltip: "Number of columns to display (1–4)",
      group: "Layout",
    }),
    col1Header: props.Text({
      name: propLabels.col1Header,
      defaultValue: "Cookie Name",
      tooltip: "Header text for the first column",
      group: "Headers",
    }),
    col2Header: props.Text({
      name: propLabels.col2Header,
      defaultValue: "Purpose / Functionality",
      tooltip: "Header text for the second column",
      group: "Headers",
    }),
    col3Header: props.Text({
      name: propLabels.col3Header,
      defaultValue: "Policies & Links",
      tooltip: "Header text for the third column",
      group: "Headers",
    }),
    col4Header: props.Text({
      name: propLabels.col4Header,
      defaultValue: "Cookie Category",
      tooltip: "Header text for the fourth column",
      group: "Headers",
    }),
    footer: props.Text({
      name: propLabels.footer,
      tooltip: "Optional text displayed below the table rows",
    }),
    rows: props.Slot({
      name: "Rows",
      tooltip: "Add Rich Text - Vertical Table Row components here",
    }),
  },
})
