import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import { RichTextLargeListItem } from "./rich-text-large-list-item"

import "../../../app/globals.css"

interface WebflowRichTextLargeListItemProps {
  heading: string
  showNumber: boolean
  number: string
  content: React.ReactNode
}

const WebflowRichTextLargeListItem: React.FC<WebflowRichTextLargeListItemProps> = ({
  heading,
  showNumber,
  number,
  content,
}) => {
  return (
    <RichTextLargeListItem
      heading={heading}
      number={showNumber ? number : undefined}
      content={content}
    />
  )
}

export const propLabels = {
  heading: "Heading",
  showNumber: "Show Number",
  number: "Number",
} as const

export default declareComponent(WebflowRichTextLargeListItem, {
  name: "Rich Text - Large List Item",
  description: "A numbered list item with a heading and rich text content, for legal pages",
  group: "Rich Text",
  props: {
    heading: props.Text({
      name: propLabels.heading,
      defaultValue: "Your consent",
      tooltip: "The heading for this list item",
    }),
    showNumber: props.Visibility({
      name: propLabels.showNumber,
      defaultValue: true,
      tooltip: "Show or hide the number prefix",
    }),
    number: props.Text({
      name: propLabels.number,
      defaultValue: "01",
      tooltip: "The number displayed alongside the heading",
    }),
    content: props.RichText({
      name: "Content",
      tooltip: "The rich text content body",
    }),
  },
})
