import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import { SiteNavLink } from "./site-nav-link"

import "../../../app/globals.css"

export const propLabels = {
  label: "Label",
  link: "Link",
  isGroup: "Group",
} as const

interface WebflowSiteNavLinkProps {
  label: string
  link: { href: string; target?: string }
  isGroup: boolean
  children: React.ReactNode
}

const WebflowSiteNavLink: React.FC<WebflowSiteNavLinkProps> = ({
  label,
  link,
  isGroup,
  children,
}) => {
  return (
    <SiteNavLink label={label} href={link?.href} target={link?.target} isGroup={isGroup}>
      {children}
    </SiteNavLink>
  )
}

export default declareComponent(WebflowSiteNavLink, {
  name: "Site Nav - Link",
  description: "Navigation link with optional dropdown panel containing card links",
  group: "Navigation",
  props: {
    label: props.Text({
      name: propLabels.label,
      defaultValue: "Products",
      tooltip: "Navigation link label",
      group: "Trigger",
    }),
    link: props.Link({
      name: propLabels.link,
      tooltip: "Link destination (for plain links without dropdown)",
      group: "Trigger",
    }),
    isGroup: props.Boolean({
      name: propLabels.isGroup,
      defaultValue: false,
      tooltip: "Enable to show a dropdown panel with sub-links",
      group: "Trigger",
    }),
    children: props.Slot({
      name: "Sub Links",
      tooltip: "Drop Site Navigation - Sub Link components here",
    }),
  },
})
