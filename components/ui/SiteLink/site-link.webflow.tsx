import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import { SiteLink } from "./site-link"


interface WebflowSiteLinkProps {
  label: string
  link: { href: string; target?: string }
}

const WebflowSiteLink: React.FC<WebflowSiteLinkProps> = ({ label, link }) => {
  return <SiteLink label={label} href={link?.href} target={link?.target} />
}

export default declareComponent(WebflowSiteLink, {
  name: "Site Link",
  description: "A generic link styled by its parent context via CSS variables",
  group: "Navigation",
  props: {
    label: props.Text({
      name: "Label",
      defaultValue: "Link",
      tooltip: "Link label text",
    }),
    link: props.Link({
      name: "Link",
      tooltip: "Link destination URL",
    }),
  },
})
