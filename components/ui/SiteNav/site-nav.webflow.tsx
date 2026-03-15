import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import { SiteNav } from "./site-nav"

import "../../../app/globals.css"

interface WebflowSiteNavProps {
  announcementBar?: React.ReactNode
  brand?: React.ReactNode
  logoLink?: { href: string; target?: string }
  navLinks?: React.ReactNode
  panelDescription?: string
  ctaLabel?: string
  ctaLink?: { href: string; target?: string }
  showCta?: boolean
}

const WebflowSiteNav: React.FC<WebflowSiteNavProps> = ({
  announcementBar,
  logoLink,
  navLinks,
  panelDescription,
  ctaLabel = "Book a Demo",
  ctaLink,
  showCta = false,
}) => {
  return (
    <SiteNav
      announcementBar={announcementBar}
      logoHref={logoLink?.href || "/"}
      navLinks={navLinks}
      panelDescription={panelDescription}
      showCta={showCta}
      ctaLabel={showCta ? ctaLabel : undefined}
      ctaHref={showCta ? ctaLink?.href || "#" : undefined}
      ctaTarget={ctaLink?.target}
    />
  )
}

export default declareComponent(WebflowSiteNav, {
  name: "Site Nav",
  description:
    "Site Navigation with brand slot, link slots, and CTA button with responsive mobile menu.",
  group: "Navigation",
  props: {
    announcementBar: props.Slot({
      name: "Announcement Bar",
      tooltip: "Drop an announcement bar component here to display above the nav",
      group: "Announcement Bar",
    }),
    logoLink: props.Link({
      name: "Brand Link",
      tooltip: "Where the brand navigates to",
      group: "Brand",
    }),
    navLinks: props.Slot({
      name: "Nav Links",
      tooltip: "Drop Site Nav Link components here",
      group: "Navigation",
    }),
    panelDescription: props.Text({
      name: "Panel Description",
      defaultValue: "Be the first to experience the future of security.",
      tooltip: "Description shown in dropdown panels alongside the link label",
      group: "Panel",
    }),
    ctaLabel: props.Text({
      name: "CTA Label",
      defaultValue: "Book a Demo",
      tooltip: "Text for the call-to-action button",
      group: "CTA",
    }),
    ctaLink: props.Link({
      name: "CTA Link",
      tooltip: "URL for the call-to-action button",
      group: "CTA",
    }),
    showCta: props.Visibility({
      name: "Show CTA",
      defaultValue: false,
      group: "CTA",
    }),
  },
})
