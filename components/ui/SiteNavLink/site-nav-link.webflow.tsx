import { props } from "@webflow/data-types"
import { declareComponent, useWebflowContext } from "@webflow/react"
import type React from "react"
import { SiteNavLink } from "./site-nav-link"

import "../../../app/globals.css"

export const propLabels = {
  label: "Label",
  link: "Link",
  isGroup: "Group",
} as const

interface WebflowSiteNavLinkProps {
  visible: boolean
  label: string
  link: { href: string; target?: string }
  isGroup: boolean
  children: React.ReactNode
}

const WebflowSiteNavLink: React.FC<WebflowSiteNavLinkProps> = ({
  visible,
  label,
  link,
  isGroup,
  children,
}) => {
  const { mode } = useWebflowContext()

  if (!visible) {
    if (mode === "publish") return null

    return (
      <div style={{ opacity: 0.5 }} title="Hidden — will not appear on published site">
        <SiteNavLink label={label} href={link?.href} target={link?.target} isGroup={isGroup}>
          {children}
        </SiteNavLink>
      </div>
    )
  }

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
    visible: props.Visibility({
      name: "Visible",
      defaultValue: true,
      tooltip: "Show or hide this navigation link",
      group: "Trigger",
    }),
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
