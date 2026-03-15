import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import { Hero } from "./hero"

import "../../../app/globals.css"

export const variantMap = {
  Default: "default",
  Product: "product",
} as const

export const headlineSizeMap = {
  Large: "large",
  Small: "small",
} as const

export const eyebrowVariantMap = {
  Accent: "accent",
  White: "white",
} as const

export const propLabels = {
  variant: "Variant",
  headlineSize: "Headline Size",
  eyebrow: "Eyebrow",
  eyebrowVariant: "Eyebrow Style",
  showEyebrow: "Show Eyebrow",
  heading: "Heading",
  description: "Description",
  showDescription: "Show Description",
  buttonLabel: "Button Label",
  showButton: "Show Button",
  showImage: "Show Image",
} as const

interface WebflowHeroProps {
  variant?: string
  headlineSize?: string
  eyebrow?: string
  eyebrowVariant?: keyof typeof eyebrowVariantMap
  showEyebrow?: boolean
  heading?: string
  description?: string
  showDescription?: boolean
  buttonLabel?: string
  buttonLink?: { href: string; target?: string }
  showButton?: boolean
  showImage?: boolean
  image?: { src: string; alt?: string }
  visual?: React.ReactNode
}

const WebflowHero: React.FC<WebflowHeroProps> = ({
  variant,
  headlineSize,
  eyebrow,
  eyebrowVariant = "Accent",
  showEyebrow = false,
  heading,
  description,
  showDescription = true,
  buttonLabel,
  buttonLink,
  showButton = true,
  showImage = true,
  image,
  visual,
}) => {
  const mappedVariant =
    (variantMap[variant as keyof typeof variantMap] as "default" | "product") ?? "default"
  const mappedHeadlineSize =
    (headlineSizeMap[headlineSize as keyof typeof headlineSizeMap] as "large" | "small") ?? "large"

  return (
    <Hero
      variant={mappedVariant}
      headlineSize={mappedHeadlineSize}
      eyebrow={showEyebrow ? eyebrow : undefined}
      eyebrowVariant={eyebrowVariantMap[eyebrowVariant]}
      heading={heading}
      description={showDescription ? description : undefined}
      buttonLabel={showButton ? buttonLabel : undefined}
      buttonLink={buttonLink}
      image={showImage ? image : undefined}
    >
      {visual}
    </Hero>
  )
}

export default declareComponent(WebflowHero, {
  name: "Hero",
  description:
    "A full-width hero section with eyebrow, heading, description, CTA button, and optional background image with visual slot",
  group: "Sections",
  props: {
    variant: props.Variant({
      name: "Variant",
      options: Object.keys(variantMap),
      defaultValue: "Default",
      tooltip: "Hero layout — Default for homepage, Product for product pages",
      group: "Layout",
    }),
    headlineSize: props.Variant({
      name: "Headline Size",
      options: Object.keys(headlineSizeMap),
      defaultValue: "Large",
      tooltip: "Controls the headline text size — Large (h1) or Small (h2)",
      group: "Layout",
    }),
    eyebrow: props.TextNode({
      name: "Eyebrow",
      defaultValue: "Meet ATLAS",
      tooltip: "Small text displayed above the heading",
      group: "Content",
    }),
    eyebrowVariant: props.Variant({
      name: "Eyebrow Style",
      options: Object.keys(eyebrowVariantMap),
      defaultValue: "Accent",
      tooltip: "Eyebrow text colour — Accent (terracotta) or White",
      group: "Layout",
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
    showImage: props.Visibility({
      name: "Show Image",
      defaultValue: true,
      tooltip: "Toggle image visibility",
      group: "Visibility",
    }),
    image: props.Image({
      name: "Image",
      tooltip: "Image displayed in the visual canvas area",
      group: "Visual",
    }),
    visual: props.Slot({
      name: "Visual",
      tooltip: "Content area for decorative elements overlaid on the image",
      group: "Visual",
    }),
  },
})
