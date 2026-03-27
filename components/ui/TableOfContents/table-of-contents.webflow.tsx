import { declareComponent } from "@webflow/react"
import { TableOfContents } from "./table-of-contents"


export default declareComponent(TableOfContents, {
  name: "Table of Contents",
  description:
    "Auto-generates a navigable table of contents from H2 headings in rich text blocks",
  group: "Utilities",
  options: { ssr: false },
})
