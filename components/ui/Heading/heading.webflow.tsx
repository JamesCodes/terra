import React from "react"
import { Heading } from "./heading"
import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"

import "../../../app/globals.css"

export const levelMap = {
  "Heading 1": 1,
  "Heading 2": 2,
  "Heading 3": 3,
  "Heading 4": 4,
  "Heading 5": 5,
  "Heading 6": 6,
  "Heading 7": 7,
} as const


interface WebflowHeadingProps {
  children: string
  level: keyof typeof levelMap
}

const WebflowHeading: React.FC<WebflowHeadingProps> = ({ children, level }) => {
  const mappedLevel = levelMap[level]

  return <Heading level={mappedLevel}>{children}</Heading>
}

export default declareComponent(WebflowHeading, {
  name: "Heading",
  description: "A semantic heading with seven levels (h1-h7) and matching typography",
  group: "Content Blocks",
  props: {
    children: props.TextNode({
      name: "Text",
      tooltip: "The heading text — editable directly on canvas",
      multiline: true,
    }),
    level: props.Variant({
      name: "Level",
      options: [
        "Heading 1",
        "Heading 2",
        "Heading 3",
        "Heading 4",
        "Heading 5",
        "Heading 6",
        "Heading 7",
      ],
      defaultValue: "Heading 1",
      tooltip: "The heading level (h1-h7) — controls tag and size",
    }),
  },
})
