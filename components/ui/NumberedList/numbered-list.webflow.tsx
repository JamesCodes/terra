import type React from "react"
import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import { NumberedListItem } from "./numbered-list"

import "../../../app/globals.css"

interface WebflowNumberedListItemProps {
  number?: number
  title?: string
  description?: string
}

const WebflowNumberedListItem: React.FC<WebflowNumberedListItemProps> = ({
  number = 1,
  title = "Item Title",
  description = "Item description goes here.",
}) => {
  return <NumberedListItem number={number} title={title} description={description} />
}

export default declareComponent(WebflowNumberedListItem, {
  name: "Numbered List Item",
  description:
    "A numbered list item with a large styled number, title, and description. Stack multiple instances to build a numbered list.",
  group: "Data Display",
  props: {
    number: props.Number({
      name: "Number",
      defaultValue: 1,
      min: 1,
      max: 99,
      decimals: 0,
      group: "Content",
      tooltip: "The display number for this item",
    }),
    title: props.TextNode({
      name: "Title",
      defaultValue: "Item Title",
      group: "Content",
      tooltip: "The item heading — editable on the canvas",
    }),
    description: props.TextNode({
      name: "Description",
      defaultValue: "Item description goes here.",
      multiline: true,
      group: "Content",
      tooltip: "The item description — editable on the canvas",
    }),
  },
})
