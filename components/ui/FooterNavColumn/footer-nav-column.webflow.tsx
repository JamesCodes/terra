import { props } from "@webflow/data-types"
import { declareComponent, useWebflowContext } from "@webflow/react"
import type React from "react"
import { FooterNavColumn } from "./footer-nav-column"


interface WebflowFooterNavColumnProps {
  visible: boolean
  label: string
  directLink: boolean
  children?: React.ReactNode
}

const WebflowFooterNavColumn: React.FC<WebflowFooterNavColumnProps> = ({
  visible,
  label,
  directLink,
  children,
}) => {
  const { mode } = useWebflowContext()
  let className: string | undefined

  if (!visible) {
    if (mode === "publish") return null
    else className = "opacity-50"
  }

  return (
    <FooterNavColumn label={label} directLink={directLink} className={className}>
      {children}
    </FooterNavColumn>
  )
}

export default declareComponent(WebflowFooterNavColumn, {
  name: "Footer - Nav Column",
  description: "A category column for the footer with expandable sub-links on mobile",
  group: "Navigation",
  props: {
    visible: props.Visibility({
      name: "Visible",
      defaultValue: true,
      tooltip: "Show or hide this footer column",
      group: "Category",
    }),
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
