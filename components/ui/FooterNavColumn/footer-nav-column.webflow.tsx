import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import { FooterNavColumn } from "./footer-nav-column"

import "../../../app/globals.css"

interface WebflowFooterNavColumnProps {
  label: string
  directLink: boolean
  children?: React.ReactNode
}

const WebflowFooterNavColumn: React.FC<WebflowFooterNavColumnProps> = ({
  label,
  directLink,
  children,
}) => {
  return (
    <FooterNavColumn label={label} directLink={directLink}>
      {children}
    </FooterNavColumn>
  )
}

export default declareComponent(WebflowFooterNavColumn, {
  name: "Footer - Nav Column",
  description: "A category column for the footer with expandable sub-links on mobile",
  group: "Navigation",
  props: {
    label: props.Text({
      name: "Category Label",
      defaultValue: "Products",
      tooltip: "Category header text",
      group: "Category",
    }),
    directLink: props.Boolean({
      name: "Direct Link",
      defaultValue: false,
      tooltip:
        "Skip accordion on mobile — use when the column has a single link that should be tappable directly",
      trueLabel: "Direct link",
      falseLabel: "Accordion",
      group: "Category",
    }),
    children: props.Slot({
      name: "Links",
      tooltip: "Drop link elements here",
      group: "Links",
    }),
  },
})
