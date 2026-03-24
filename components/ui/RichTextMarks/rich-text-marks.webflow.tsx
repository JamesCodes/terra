import { declareComponent } from "@webflow/react"
import { RichTextMarks } from "./rich-text-marks"

import "../../../app/globals.css"

export default declareComponent(RichTextMarks, {
  name: "Rich Text Marks",
  description:
    "Transforms bracket markup in rich text into HTML spans with classes, IDs, or attributes",
  group: "Utilities",
  options: { ssr: false },
})
