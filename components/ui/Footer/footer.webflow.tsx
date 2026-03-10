import React from "react"
import { type PropType, type PropValues, props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import { Footer } from "./footer"

import "../../../app/globals.css"

interface WebflowFooterProps {
  badges?: React.ReactNode
  symbol?: React.ReactNode
  link1Label?: string
  link1?: PropValues[PropType.Link]
  showLink1?: boolean
  link2Label?: string
  link2?: PropValues[PropType.Link]
  showLink2?: boolean
  link3Label?: string
  link3?: PropValues[PropType.Link]
  showLink3?: boolean
  link4Label?: string
  link4?: PropValues[PropType.Link]
  showLink4?: boolean
  link5Label?: string
  link5?: PropValues[PropType.Link]
  showLink5?: boolean
  youtubeLink?: PropValues[PropType.Link]
  showYoutube?: boolean
  linkedinLink?: PropValues[PropType.Link]
  showLinkedin?: boolean
  legal1Label?: string
  legal1?: PropValues[PropType.Link]
  showLegal1?: boolean
  legal2Label?: string
  legal2?: PropValues[PropType.Link]
  showLegal2?: boolean
  legal3Label?: string
  legal3?: PropValues[PropType.Link]
  showLegal3?: boolean
  legal4Label?: string
  legal4?: PropValues[PropType.Link]
  showLegal4?: boolean
  copyright?: string
}

const WebflowFooter: React.FC<WebflowFooterProps> = ({
  badges,
  symbol,
  link1Label = "Product",
  link1,
  showLink1 = true,
  link2Label = "About Us",
  link2,
  showLink2 = true,
  link3Label = "Stories",
  link3,
  showLink3 = true,
  link4Label = "Resources",
  link4,
  showLink4 = true,
  link5Label = "Partners",
  link5,
  showLink5 = true,
  youtubeLink,
  showYoutube = true,
  linkedinLink,
  showLinkedin = true,
  legal1Label = "DPA",
  legal1,
  showLegal1 = true,
  legal2Label = "Privacy Policy",
  legal2,
  showLegal2 = true,
  legal3Label = "SLA",
  legal3,
  showLegal3 = true,
  legal4Label = "Terms of Service",
  legal4,
  showLegal4 = true,
  copyright,
}) => {
  const navLinks = [
    showLink1 && { label: link1Label, href: link1?.href || "#", target: link1?.target },
    showLink2 && { label: link2Label, href: link2?.href || "#", target: link2?.target },
    showLink3 && { label: link3Label, href: link3?.href || "#", target: link3?.target },
    showLink4 && { label: link4Label, href: link4?.href || "#", target: link4?.target },
    showLink5 && { label: link5Label, href: link5?.href || "#", target: link5?.target },
  ].filter(Boolean) as { label: string; href: string; target?: string }[]

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

  const legalLinks = [
    showLegal1 && { label: legal1Label, href: legal1?.href || "#", target: legal1?.target },
    showLegal2 && { label: legal2Label, href: legal2?.href || "#", target: legal2?.target },
    showLegal3 && { label: legal3Label, href: legal3?.href || "#", target: legal3?.target },
    showLegal4 && { label: legal4Label, href: legal4?.href || "#", target: legal4?.target },
  ].filter(Boolean) as { label: string; href: string; target?: string }[]

  return (
    <Footer
      badges={badges}
      symbol={symbol}
      navLinks={navLinks}
      socialLinks={socialLinks}
      legalLinks={legalLinks}
      copyright={copyright}
    />
  )
}

export default declareComponent(WebflowFooter, {
  name: "Footer",
  description:
    "Site footer with nav links, badges, social icons, legal links, and decorative symbol.",
  group: "Navigation",
  props: {
    badges: props.Slot({
      name: "Badges",
      tooltip: "Drop certification badges or trust signals here",
      group: "Badges",
    }),
    symbol: props.Slot({
      name: "Symbol",
      tooltip: "Drop a decorative symbol or graphic here",
      group: "Symbol",
    }),
    link1Label: props.Text({
      name: "Link 1 Label",
      defaultValue: "Product",
      group: "Link 1",
    }),
    link1: props.Link({
      name: "Link 1 URL",
      group: "Link 1",
    }),
    showLink1: props.Visibility({
      name: "Show Link 1",
      defaultValue: true,
      group: "Link 1",
    }),
    link2Label: props.Text({
      name: "Link 2 Label",
      defaultValue: "About Us",
      group: "Link 2",
    }),
    link2: props.Link({
      name: "Link 2 URL",
      group: "Link 2",
    }),
    showLink2: props.Visibility({
      name: "Show Link 2",
      defaultValue: true,
      group: "Link 2",
    }),
    link3Label: props.Text({
      name: "Link 3 Label",
      defaultValue: "Stories",
      group: "Link 3",
    }),
    link3: props.Link({
      name: "Link 3 URL",
      group: "Link 3",
    }),
    showLink3: props.Visibility({
      name: "Show Link 3",
      defaultValue: true,
      group: "Link 3",
    }),
    link4Label: props.Text({
      name: "Link 4 Label",
      defaultValue: "Resources",
      group: "Link 4",
    }),
    link4: props.Link({
      name: "Link 4 URL",
      group: "Link 4",
    }),
    showLink4: props.Visibility({
      name: "Show Link 4",
      defaultValue: true,
      group: "Link 4",
    }),
    link5Label: props.Text({
      name: "Link 5 Label",
      defaultValue: "Partners",
      group: "Link 5",
    }),
    link5: props.Link({
      name: "Link 5 URL",
      group: "Link 5",
    }),
    showLink5: props.Visibility({
      name: "Show Link 5",
      defaultValue: true,
      group: "Link 5",
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
    legal1Label: props.Text({
      name: "Legal 1 Label",
      defaultValue: "DPA",
      group: "Legal 1",
    }),
    legal1: props.Link({
      name: "Legal 1 URL",
      group: "Legal 1",
    }),
    showLegal1: props.Visibility({
      name: "Show Legal 1",
      defaultValue: true,
      group: "Legal 1",
    }),
    legal2Label: props.Text({
      name: "Legal 2 Label",
      defaultValue: "Privacy Policy",
      group: "Legal 2",
    }),
    legal2: props.Link({
      name: "Legal 2 URL",
      group: "Legal 2",
    }),
    showLegal2: props.Visibility({
      name: "Show Legal 2",
      defaultValue: true,
      group: "Legal 2",
    }),
    legal3Label: props.Text({
      name: "Legal 3 Label",
      defaultValue: "SLA",
      group: "Legal 3",
    }),
    legal3: props.Link({
      name: "Legal 3 URL",
      group: "Legal 3",
    }),
    showLegal3: props.Visibility({
      name: "Show Legal 3",
      defaultValue: true,
      group: "Legal 3",
    }),
    legal4Label: props.Text({
      name: "Legal 4 Label",
      defaultValue: "Terms of Service",
      group: "Legal 4",
    }),
    legal4: props.Link({
      name: "Legal 4 URL",
      group: "Legal 4",
    }),
    showLegal4: props.Visibility({
      name: "Show Legal 4",
      defaultValue: true,
      group: "Legal 4",
    }),
    copyright: props.Text({
      name: "Copyright",
      defaultValue: "© 2026 Terra. All rights reserved.",
      tooltip: "Copyright notice text",
      group: "Legal",
    }),
  },
})
