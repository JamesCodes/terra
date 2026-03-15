import React from "react"
import { type PropType, type PropValues, props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import { Footer } from "./footer"

import "../../../app/globals.css"

interface WebflowFooterProps {
  navColumns?: React.ReactNode
  badges?: React.ReactNode
  legalLinks?: React.ReactNode
  youtubeLink?: PropValues[PropType.Link]
  showYoutube?: boolean
  linkedinLink?: PropValues[PropType.Link]
  showLinkedin?: boolean
  copyright?: string
}

const WebflowFooter: React.FC<WebflowFooterProps> = ({
  navColumns,
  badges,
  legalLinks,
  youtubeLink,
  showYoutube = true,
  linkedinLink,
  showLinkedin = true,
  copyright,
}) => {
  const socialLinks = [
    showYoutube && {
      platform: "youtube" as const,
      href: youtubeLink?.href || "#",
      target: youtubeLink?.target,
    },
    showLinkedin && {
      platform: "linkedin" as const,
      href: linkedinLink?.href || "#",
      target: linkedinLink?.target,
    },
  ].filter(Boolean) as { platform: "youtube" | "linkedin"; href: string; target?: string }[]

  return (
    <Footer
      navColumns={navColumns}
      badges={badges}
      legalLinks={legalLinks}
      socialLinks={socialLinks}
      copyright={copyright}
    />
  )
}

export default declareComponent(WebflowFooter, {
  name: "Footer",
  description: "Site footer with nav columns, badges, social icons, and legal links.",
  group: "Navigation",
  props: {
    navColumns: props.Slot({
      name: "Nav Columns",
      tooltip: "Drop Footer - Nav Column components here",
      group: "Navigation",
    }),
    badges: props.Slot({
      name: "Badges",
      tooltip: "Drop certification badges or trust signals here",
      group: "Badges",
    }),
    legalLinks: props.Slot({
      name: "Legal Links",
      tooltip: "Drop Site Link components for legal links here",
      group: "Legal",
    }),
    youtubeLink: props.Link({
      name: "YouTube URL",
      tooltip: "Link to YouTube channel",
      group: "Social",
    }),
    showYoutube: props.Visibility({
      name: "Show YouTube",
      defaultValue: true,
      group: "Social",
    }),
    linkedinLink: props.Link({
      name: "LinkedIn URL",
      tooltip: "Link to LinkedIn profile",
      group: "Social",
    }),
    showLinkedin: props.Visibility({
      name: "Show LinkedIn",
      defaultValue: true,
      group: "Social",
    }),
    copyright: props.Text({
      name: "Copyright",
      defaultValue: "© 2026 Terra. All rights reserved.",
      tooltip: "Copyright notice text",
      group: "Legal",
    }),
  },
})
