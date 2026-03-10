import type React from "react"
import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import { Hero } from "./hero"

import "../../../app/globals.css"

export const themeMap = {
  Dark: "dark",
  Light: "light",
  Accent: "accent",
} as const

export const propLabels = {
  theme: "Theme",
  eyebrow: "Eyebrow",
  showEyebrow: "Show Eyebrow",
  heading: "Heading",
  description: "Description",
  showDescription: "Show Description",
  buttonLabel: "Button Label",
  showButton: "Show Button",
} as const

interface WebflowHeroProps {
  theme?: keyof typeof themeMap
  eyebrow?: string
  showEyebrow?: boolean
  heading?: string
  description?: string
  showDescription?: boolean
  buttonLabel?: string
  buttonLink?: { href: string; target?: string }
  showButton?: boolean
  backgroundImage?: { src: string; alt?: string }
  visual?: React.ReactNode
}

const WebflowHero: React.FC<WebflowHeroProps> = ({
  theme = "Dark",
  eyebrow,
  showEyebrow = false,
  heading,
  description,
  showDescription = true,
  buttonLabel,
  buttonLink,
  showButton = true,
  backgroundImage,
  visual,
}) => {
  return (
    <Hero
      theme={themeMap[theme]}
      eyebrow={showEyebrow ? eyebrow : undefined}
      heading={heading}
      description={showDescription ? description : undefined}
      buttonLabel={showButton ? buttonLabel : undefined}
      buttonLink={buttonLink}
      backgroundImage={backgroundImage}
    >
      {visual}
    </Hero>
  )
}

export default declareComponent(WebflowHero, {
  name: "Hero",
  description:
    "A full-width hero section with eyebrow, heading, description, CTA button, and optional background image with visual slot",
  group: "Layout",
  props: {
    theme: props.Variant({
      name: "Theme",
      options: ["Dark", "Light", "Accent"],
      defaultValue: "Dark",
      tooltip:
        "Dark: deep brown background, Light: chalk background, Accent: terracotta background",
    }),
    eyebrow: props.TextNode({
      name: "Eyebrow",
      defaultValue: "Meet ATLAS",
      tooltip: "Small text displayed above the heading",
      group: "Content",
    }),
    showEyebrow: props.Visibility({
      name: "Show Eyebrow",
      defaultValue: false,
      tooltip: "Toggle eyebrow text visibility",
      group: "Visibility",
    }),
    heading: props.TextNode({
      name: "Heading",
      defaultValue: "Offensive security built for the AI era.",
      multiline: true,
      tooltip: "Main heading text",
      group: "Content",
    }),
    description: props.TextNode({
      name: "Description",
      defaultValue: "Pentest at the pace of AI with Terra's continuous agentic platform.",
      multiline: true,
      tooltip: "Subtitle text below the heading",
      group: "Content",
    }),
    showDescription: props.Visibility({
      name: "Show Description",
      defaultValue: true,
      tooltip: "Toggle description visibility",
      group: "Visibility",
    }),
    buttonLabel: props.Text({
      name: "Button Label",
      defaultValue: "Book a Demo",
      tooltip: "CTA button text",
      group: "Button",
    }),
    buttonLink: props.Link({
      name: "Button Link",
      tooltip: "CTA button link destination",
      group: "Button",
    }),
    showButton: props.Visibility({
      name: "Show Button",
      defaultValue: true,
      tooltip: "Toggle CTA button visibility",
      group: "Visibility",
    }),
    backgroundImage: props.Image({
      name: "Background Image",
      tooltip: "Image displayed in the visual canvas area",
      group: "Visual",
    }),
    visual: props.Slot({
      name: "Visual",
      tooltip: "Content area for decorative elements overlaid on the background image",
      group: "Visual",
    }),
  },
})
