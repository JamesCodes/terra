import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import { RichTextLargeList } from "./rich-text-large-list"

import "../../../app/globals.css"

interface WebflowRichTextLargeListProps {
  items: React.ReactNode
}

const WebflowRichTextLargeList: React.FC<WebflowRichTextLargeListProps> = ({ items }) => {
  return <RichTextLargeList>{items}</RichTextLargeList>
}

export default declareComponent(WebflowRichTextLargeList, {
  name: "Rich Text - Large List",
  description: "A semantic list wrapper for Rich Text Large List Items",
  group: "Rich Text",
  props: {
    items: props.Slot({
      name: "Items",
      tooltip: "Add Rich Text - Large List Item components here",
    }),
  },
})
