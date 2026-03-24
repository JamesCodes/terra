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
  showCtaOnStuck?: boolean
  showLinkedin?: boolean
  linkedinLink?: { href: string; target?: string }
  showYoutube?: boolean
  youtubeLink?: { href: string; target?: string }
  stuckText?: string
}

const WebflowSiteNav: React.FC<WebflowSiteNavProps> = ({
  announcementBar,
  logoLink,
  navLinks,
  panelDescription,
  ctaLabel = "Book a Demo",
  ctaLink,
  showCta = false,
  showCtaOnStuck = false,
  showLinkedin,
  linkedinLink,
  showYoutube,
  youtubeLink,
  stuckText,
}) => {
  const ctaVisible = showCta || showCtaOnStuck
  return (
    <SiteNav
      announcementBar={announcementBar}
      logoHref={logoLink?.href || "/"}
      navLinks={navLinks}
      panelDescription={panelDescription}
      showCta={showCta}
      showCtaOnStuck={showCtaOnStuck}
      ctaLabel={ctaVisible ? ctaLabel : undefined}
      ctaHref={ctaVisible ? ctaLink?.href || "#" : undefined}
      ctaTarget={ctaLink?.target}
      showLinkedin={showLinkedin}
      linkedinHref={linkedinLink?.href}
      linkedinTarget={linkedinLink?.target}
      showYoutube={showYoutube}
      youtubeHref={youtubeLink?.href}
      youtubeTarget={youtubeLink?.target}
      stuckText={stuckText}
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
    stuckText: props.Text({
      name: "Stuck Text",
      tooltip: "Text shown next to the icon when the nav is in its stuck (scrolled) position",
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
    showCtaOnStuck: props.Visibility({
      name: "Show CTA on Stuck",
      defaultValue: false,
      tooltip: "Show the CTA button when the nav is in its stuck (scrolled) position",
      group: "CTA",
    }),
    showYoutube: props.Visibility({
      name: "Show YouTube",
      defaultValue: false,
      group: "Social",
    }),
    youtubeLink: props.Link({
      name: "YouTube Link",
      tooltip: "YouTube channel URL",
      group: "Social",
    }),
    showLinkedin: props.Visibility({
      name: "Show LinkedIn",
      defaultValue: false,
      group: "Social",
    }),
    linkedinLink: props.Link({
      name: "LinkedIn Link",
      tooltip: "LinkedIn profile URL",
      group: "Social",
    }),
  },
})
