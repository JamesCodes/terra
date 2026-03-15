import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import { CTABanner } from "./cta-banner"

import "../../../app/globals.css"
import { responsiveProps } from "@/lib/responsive-props"

export const themeMap = {
  Light: "light",
  Dark: "dark",
} as const

export const backgroundSizeMap = {
  Cover: "cover",
  Contain: "contain",
} as const

export const backgroundPositionMap = {
  Center: "center",
  Top: "top",
  Bottom: "bottom",
  Left: "left",
  Right: "right",
  "Top Left": "top left",
  "Top Right": "top right",
  "Bottom Left": "bottom left",
  "Bottom Right": "bottom right",
} as const

interface WebflowCTABannerProps {
  theme?: keyof typeof themeMap
  heading?: string
  description?: string
  placeholder?: string
  backgroundImage?: { src: string; alt?: string }
  backgroundSize?: keyof typeof backgroundSizeMap
  backgroundPosition?: keyof typeof backgroundPositionMap
  backgroundPositionMobile?: keyof typeof backgroundPositionMap
  height?: number
  heightTablet?: number
  heightMobile?: number
}

const WebflowCTABanner: React.FC<WebflowCTABannerProps> = ({
  theme = "Light",
  heading,
  description,
  placeholder,
  backgroundImage,
  backgroundSize = "Cover",
  backgroundPosition = "Center",
  backgroundPositionMobile,
  height,
  heightTablet,
  heightMobile,
}) => {
  const mappedTheme = themeMap[theme]

  return (
    <CTABanner
      theme={mappedTheme}
      heading={heading}
      description={description}
      placeholder={placeholder}
      backgroundImage={backgroundImage}
      backgroundSize={backgroundSizeMap[backgroundSize]}
      backgroundPosition={backgroundPositionMap[backgroundPosition]}
      backgroundPositionMobile={
        backgroundPositionMobile ? backgroundPositionMap[backgroundPositionMobile] : undefined
      }
      height={height}
      heightTablet={heightTablet}
      heightMobile={heightMobile}
    />
  )
}

export default declareComponent(WebflowCTABanner, {
  name: "CTA Banner",
  description:
    "A full-width call-to-action section with heading, subtitle, email input, and decorative background image",
  group: "Sections",
  props: {
    theme: props.Variant({
      name: "Theme",
      options: ["Light", "Dark"],
      defaultValue: "Light",
      tooltip: "Light for sand background, Dark for dark brown background",
    }),
    heading: props.TextNode({
      name: "Heading",
      defaultValue: "Be the first to experience the future of security.",
      multiline: true,
      tooltip: "Main heading text",
    }),
    description: props.TextNode({
      name: "Description",
      defaultValue:
        "Secure your spot and join dozens of security teams that already enjoy the future of pentesting.",
      multiline: true,
      tooltip: "Subtitle text below the heading",
    }),
    placeholder: props.Text({
      name: "Placeholder",
      defaultValue: "Email address",
      tooltip: "Placeholder text for the email input",
    }),
    backgroundImage: props.Image({
      name: "Background Image",
      tooltip: "Decorative background image (e.g., desert dunes)",
      group: "Background",
    }),
    backgroundSize: props.Variant({
      name: "Background Size",
      options: ["Cover", "Contain"],
      defaultValue: "Cover",
      tooltip: "How the background image fills the section",
      group: "Background",
    }),
    backgroundPosition: props.Variant({
      name: "Background Position",
      options: [
        "Center",
        "Top",
        "Bottom",
        "Left",
        "Right",
        "Top Left",
        "Top Right",
        "Bottom Left",
        "Bottom Right",
      ],
      defaultValue: "Center",
      tooltip: "Background image alignment (desktop/tablet)",
      group: "Background",
    }),
    backgroundPositionMobile: props.Variant({
      name: "Background Position (Mobile)",
      options: [
        "Center",
        "Top",
        "Bottom",
        "Left",
        "Right",
        "Top Left",
        "Top Right",
        "Bottom Left",
        "Bottom Right",
      ],
      defaultValue: "Center",
      tooltip: "Background image alignment on mobile. Defaults to desktop value if not set.",
      group: "Background",
    }),
    ...responsiveProps("height", props.Number, {
      name: "Height",
      tooltip: "Section height in pixels",
      group: "Size",
    }),
  },
})
