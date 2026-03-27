import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import { RichTextBlock } from "./rich-text-block"


interface WebflowRichTextBlockProps {
  title: string
  showTitle: boolean
  subtitle: string
  showSubtitle: boolean
  content: React.ReactNode
}

const WebflowRichTextBlock: React.FC<WebflowRichTextBlockProps> = ({
  title,
  showTitle,
  subtitle,
  showSubtitle,
  content,
}) => {
  return (
    <RichTextBlock
      title={showTitle ? title : undefined}
      subtitle={showSubtitle ? subtitle : undefined}
    >
      {content}
    </RichTextBlock>
  )
}

export const propLabels = {
  title: "Title",
  showTitle: "Show Title",
  subtitle: "Subtitle",
  showSubtitle: "Show Subtitle",
} as const

export default declareComponent(WebflowRichTextBlock, {
  name: "Rich Text - Block",
  description:
    "Styled rich text content for long-form pages like privacy policies, terms of service, and legal documents",
  group: "Rich Text",
  props: {
    title: props.Text({
      name: propLabels.title,
      defaultValue: "Page Title",
      tooltip: "The page heading displayed above the content",
      group: "Header",
    }),
    showTitle: props.Visibility({
      name: propLabels.showTitle,
      defaultValue: true,
      group: "Header",
    }),
    subtitle: props.Text({
      name: propLabels.subtitle,
      defaultValue: "Last updated January 1, 2025",
      tooltip: "Secondary text below the title, e.g. a date or description",
      group: "Header",
    }),
    showSubtitle: props.Visibility({
      name: propLabels.showSubtitle,
      defaultValue: true,
      group: "Header",
    }),
    content: props.RichText({
      name: "Content",
      tooltip: "The main rich text content area",
      group: "Content",
    }),
  },
})
