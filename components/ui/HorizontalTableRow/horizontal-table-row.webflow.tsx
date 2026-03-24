import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import { HorizontalTableRow } from "./horizontal-table-row"

import "../../../app/globals.css"

interface WebflowHorizontalTableRowProps {
  label: string
  content: React.ReactNode
}

const WebflowHorizontalTableRow: React.FC<WebflowHorizontalTableRowProps> = ({
  label,
  content,
}) => {
  return <HorizontalTableRow label={label} content={content} />
}

export const propLabels = {
  label: "Label",
} as const

export default declareComponent(WebflowHorizontalTableRow, {
  name: "Rich Text - Horizontal Table Row",
  description: "A row within a Horizontal Table with a bold label and description content",
  group: "Rich Text",
  props: {
    label: props.Text({
      name: propLabels.label,
      defaultValue: "Cookie type",
      tooltip: "The bold label text in the left column",
    }),
    content: props.TextNode({
      name: "Content",
      tooltip: "The description content in the right column",
      multiline: true,
    }),
  },
})
