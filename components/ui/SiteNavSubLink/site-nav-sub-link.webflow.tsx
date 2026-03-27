import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import { SiteNavSubLink } from "./site-nav-sub-link"


export const propLabels = {
  label: "Label",
} as const

interface WebflowSiteNavSubLinkProps {
  label: string
  image: { src: string; alt?: string }
  link: { href: string; target?: string }
}

const WebflowSiteNavSubLink: React.FC<WebflowSiteNavSubLinkProps> = ({ label, image, link }) => {
  return (
    <SiteNavSubLink
      image={image?.src ? { src: image.src, alt: image.alt } : undefined}
      label={label}
      href={link?.href}
      target={link?.target}
    />
  )
}

export default declareComponent(WebflowSiteNavSubLink, {
  name: "Site Nav - Sub Link",
  description: "Child link within a Site Nav Link",
  group: "Navigation",
  props: {
    label: props.Text({
      name: propLabels.label,
      defaultValue: "Terra Platform™",
      tooltip: "Link label text",
    }),
    image: props.Image({
      name: "Image",
      tooltip: "Link image",
    }),
    link: props.Link({
      name: "Link",
      tooltip: "Link destination URL",
    }),
  },
})
