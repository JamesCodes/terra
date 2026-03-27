import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import type { ReactNode } from "react"
import { AccordionItem } from "./accordion"


export const propLabels = {
  title: "Title",
  group: "Group",
  defaultOpen: "Default Open",
} as const

interface WebflowAccordionProps {
  title?: string
  content?: ReactNode
  group?: string
  defaultOpen?: boolean
}

const WebflowAccordion: React.FC<WebflowAccordionProps> = ({
  title,
  content,
  group,
  defaultOpen,
}) => {
  return (
    <AccordionItem title={title} group={group} defaultOpen={defaultOpen}>
      {content}
    </AccordionItem>
  )
}

export default declareComponent(WebflowAccordion, {
  name: "Accordion Item",
  description:
    "An expandable/collapsible content section. Items in the same group auto-close each other.",
  group: "Elements",
  props: {
    title: props.TextNode({
      name: propLabels.title,
      defaultValue: "Accordion title",
      group: "Content",
      tooltip: "The heading text — editable on the canvas",
    }),
    content: props.RichText({
      name: "Content",
      group: "Content",
      tooltip: "The expandable body content",
    }),
    group: props.Text({
      name: propLabels.group,
      defaultValue: "default",
      group: "Behaviour",
      tooltip:
        "Items sharing the same group name will auto-close when another opens. Use different group names for independent accordion sets.",
    }),
    defaultOpen: props.Boolean({
      name: propLabels.defaultOpen,
      defaultValue: false,
      trueLabel: "Open",
      falseLabel: "Closed",
      group: "Behaviour",
      tooltip: "Whether this item starts expanded on page load",
    }),
  },
})
