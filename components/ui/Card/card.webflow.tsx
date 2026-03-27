import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import type { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"


interface WebflowCardProps {
  title?: string
  description?: string
  content?: ReactNode
  footerContent?: ReactNode
  showHeader?: boolean
  showContent?: boolean
  showFooter?: boolean
}

const WebflowCard: React.FC<WebflowCardProps> = ({
  title,
  description,
  content,
  footerContent,
  showHeader = true,
  showContent = true,
  showFooter = false,
}) => {
  return (
    <Card>
      {showHeader && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      {showContent && <CardContent>{content}</CardContent>}
      {showFooter && <CardFooter>{footerContent}</CardFooter>}
    </Card>
  )
}

export default declareComponent(WebflowCard, {
  name: "Card",
  description: "A container component for grouped content with header, body, and footer sections",
  group: "Cards",
  props: {
    title: props.TextNode({
      name: "Title",
      defaultValue: "Card Title",
      group: "Header",
      tooltip: "The card heading text — editable directly on the canvas",
    }),
    description: props.TextNode({
      name: "Description",
      defaultValue: "Card description goes here.",
      multiline: true,
      group: "Header",
      tooltip: "The card description text — editable directly on the canvas",
    }),
    content: props.Slot({
      name: "Content",
      group: "Content",
      tooltip: "The main content area — drop in any components",
    }),
    footerContent: props.Slot({
      name: "Footer",
      group: "Footer",
      tooltip: "The footer area — drop in buttons, links, or other components",
    }),
    showHeader: props.Visibility({
      name: "Show Header",
      defaultValue: true,
      group: "Visibility",
      tooltip: "Toggle the card header section",
    }),
    showContent: props.Visibility({
      name: "Show Content",
      defaultValue: true,
      group: "Visibility",
      tooltip: "Toggle the card content section",
    }),
    showFooter: props.Visibility({
      name: "Show Footer",
      defaultValue: false,
      group: "Visibility",
      tooltip: "Toggle the card footer section",
    }),
  },
})
