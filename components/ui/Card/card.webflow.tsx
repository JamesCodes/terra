import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import type { ReactNode } from "react"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"

import "../../../app/globals.css"

interface WebflowCardProps {
  className?: string
  title?: string
  description?: string
  content?: ReactNode
  footerContent?: string
  showHeader?: boolean
  showContent?: boolean
  showFooter?: boolean
  showAction?: boolean
  actionContent?: string
}

const WebflowCard: React.FC<WebflowCardProps> = ({
  className,
  title,
  description,
  content,
  footerContent,
  showHeader = true,
  showContent = true,
  showFooter = false,
  showAction = false,
  actionContent,
}) => {
  return (
    <Card className={className}>
      {showHeader && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
          {showAction && actionContent && (
            <CardAction>{actionContent}</CardAction>
          )}
        </CardHeader>
      )}
      {showContent && content && <CardContent>{content}</CardContent>}
      {showFooter && footerContent && <CardFooter>{footerContent}</CardFooter>}
    </Card>
  )
}

export default declareComponent(WebflowCard, {
  name: "Card",
  description: "A container component for grouped content",
  group: "Layout",
  props: {
    className: props.Text({
      name: "Class Name",
      defaultValue: "",
      tooltip: "Additional Tailwind CSS classes",
    }),
    title: props.Text({
      name: "Title",
      defaultValue: "Card Title",
      group: "Header",
      tooltip: "The card heading text",
    }),
    description: props.Text({
      name: "Description",
      defaultValue: "Card description goes here.",
      group: "Header",
      tooltip: "The card description text",
    }),
    content: props.RichText({
      name: "Content",
      tooltip: "The main content of the card",
      defaultValue: "Card content goes here.",
      group: "Content",
    }),
    footerContent: props.Text({
      name: "Footer Content",
      defaultValue: "Footer content",
      group: "Footer",
      tooltip: "Text displayed in the card footer",
    }),
    actionContent: props.Text({
      name: "Action Content",
      defaultValue: "Action",
      group: "Header",
      tooltip: "Text for the header action button",
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
    showAction: props.Visibility({
      name: "Show Action",
      defaultValue: false,
      group: "Visibility",
      tooltip: "Toggle the header action button",
    }),
  },
})
