import { type PropType, type PropValues, props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import { Navbar } from "./navbar"

import "../../../app/globals.css"

interface WebflowNavbarProps {
  variant?: string
  brand?: React.ReactNode
  logoLink?: PropValues[PropType.Link]
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
  ctaLabel?: string
  ctaLink?: PropValues[PropType.Link]
  showCta?: boolean
}

const WebflowNavbar: React.FC<WebflowNavbarProps> = ({
  variant = "light",
  brand,
  logoLink,
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
  ctaLabel = "Book a Demo",
  ctaLink,
  showCta = true,
}) => {
  const links = [
    showLink1 && {
      label: link1Label,
      href: link1?.href || "#",
      target: link1?.target,
    },
    showLink2 && {
      label: link2Label,
      href: link2?.href || "#",
      target: link2?.target,
    },
    showLink3 && {
      label: link3Label,
      href: link3?.href || "#",
      target: link3?.target,
    },
    showLink4 && {
      label: link4Label,
      href: link4?.href || "#",
      target: link4?.target,
    },
    showLink5 && {
      label: link5Label,
      href: link5?.href || "#",
      target: link5?.target,
    },
  ].filter(Boolean) as { label: string; href: string; target?: string }[]

  return (
    <Navbar
      variant={variant as "light" | "dark"}
      logo={brand}
      logoHref={logoLink?.href || "/"}
      links={links}
      ctaLabel={showCta ? ctaLabel : undefined}
      ctaHref={showCta ? ctaLink?.href || "#" : undefined}
      ctaTarget={ctaLink?.target}
    />
  )
}

export const variantMap: Record<string, string> = {
  Light: "light",
  Dark: "dark",
}

export default declareComponent(WebflowNavbar, {
  name: "Navbar",
  description:
    "Navigation bar with brand slot, nav links, and CTA button with responsive mobile menu.",
  group: "Navigation",
  props: {
    variant: props.Variant({
      name: "Variant",
      options: ["light", "dark"],
      defaultValue: "light",
      tooltip: "Light or dark color scheme",
      group: "Style",
    }),
    brand: props.Slot({
      name: "Brand",
      tooltip: "Drop your logo or brand element here",
      group: "Brand",
    }),
    logoLink: props.Link({
      name: "Brand Link",
      tooltip: "Where the brand navigates to",
      group: "Brand",
    }),
    link1Label: props.Text({
      name: "Link 1 Label",
      defaultValue: "Product",
      tooltip: "Text for the first nav link",
      group: "Link 1",
    }),
    link1: props.Link({
      name: "Link 1 URL",
      tooltip: "URL for the first nav link",
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
      tooltip: "Text for the second nav link",
      group: "Link 2",
    }),
    link2: props.Link({
      name: "Link 2 URL",
      tooltip: "URL for the second nav link",
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
      tooltip: "Text for the third nav link",
      group: "Link 3",
    }),
    link3: props.Link({
      name: "Link 3 URL",
      tooltip: "URL for the third nav link",
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
      tooltip: "Text for the fourth nav link",
      group: "Link 4",
    }),
    link4: props.Link({
      name: "Link 4 URL",
      tooltip: "URL for the fourth nav link",
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
      tooltip: "Text for the fifth nav link",
      group: "Link 5",
    }),
    link5: props.Link({
      name: "Link 5 URL",
      tooltip: "URL for the fifth nav link",
      group: "Link 5",
    }),
    showLink5: props.Visibility({
      name: "Show Link 5",
      defaultValue: true,
      group: "Link 5",
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
      defaultValue: true,
      group: "CTA",
    }),
  },
})
