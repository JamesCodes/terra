import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import { responsiveProps } from "@/lib/responsive-props"
import { createVariantMap } from "@/lib/utils"
import { type ChildVariant, Hero, type HeroVariant, heroVariants } from "./hero"

export const variantMap = createVariantMap<HeroVariant>(heroVariants.variants.variant)

export const childVariantMap = createVariantMap<ChildVariant>(heroVariants.variants.childVariant)

export const headlineSizeMap = createVariantMap<"large" | "small">(["large", "small"])

type EyebrowVariant = NonNullable<
  import("tailwind-variants").VariantProps<typeof heroVariants>["eyebrowVariant"]
>

export const eyebrowVariantMap = createVariantMap<EyebrowVariant>(
  heroVariants.variants.eyebrowVariant,
)

type ThemeVariant = NonNullable<
  import("tailwind-variants").VariantProps<typeof heroVariants>["theme"]
>

export const themeVariantMap = createVariantMap<ThemeVariant>(heroVariants.variants.theme)

export const propLabels = {
  variant: "Variant",
  childVariant: "Child Variant",
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
  theme: "Theme",
} as const

interface WebflowHeroProps {
  variant?: keyof typeof variantMap
  childVariant?: keyof typeof childVariantMap
  themeVariant?: keyof typeof themeVariantMap
  headlineSize?: keyof typeof headlineSizeMap
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
  height?: number
  heightTablet?: number
  heightMobile?: number
  imageSlot?: React.ReactNode
  children?: React.ReactNode
}

const WebflowHero: React.FC<WebflowHeroProps> = ({
  variant = "Default",
  childVariant = "Hidden",
  themeVariant,
  headlineSize = "Large",
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
  height,
  heightTablet,
  heightMobile,
  imageSlot,
  children,
}) => {
  const mappedVariant = variantMap[variant]
  const mappedChildVariant = childVariantMap[childVariant]
  const mappedThemeVariant = themeVariantMap[themeVariant ?? ""]
  const mappedHeadlineSize = headlineSizeMap[headlineSize]

  return (
    <Hero
      variant={mappedVariant}
      childVariant={mappedChildVariant}
      theme={mappedThemeVariant}
      headlineSize={mappedHeadlineSize}
      eyebrow={showEyebrow ? eyebrow : undefined}
      eyebrowVariant={eyebrowVariantMap[eyebrowVariant]}
      heading={heading}
      description={showDescription ? description : undefined}
      buttonLabel={showButton ? buttonLabel : undefined}
      buttonLink={buttonLink}
      imageSlot={showImage ? imageSlot : undefined}
      height={height}
      heightTablet={heightTablet}
      heightMobile={heightMobile}
    >
      {mappedChildVariant !== "hidden" ? children : undefined}
    </Hero>
  )
}

export default declareComponent(WebflowHero, {
  name: "Hero",
  description:
    "A full-width hero section with eyebrow, heading, description, CTA button, and optional image and children",
  group: "Sections",
  props: {
    variant: props.Variant({
      name: "Variant",
      options: Object.keys(variantMap),
      defaultValue: "Default",
      tooltip: "Hero layout — Default for homepage, Product for product pages",
    }),
    childVariant: props.Variant({
      name: "Child Variant",
      options: Object.keys(childVariantMap),
      defaultValue: "Hidden",
      tooltip: "The type of content that is added as a child of the Hero.",
      group: "Content",
    }),
    headlineSize: props.Variant({
      name: "Headline Size",
      options: Object.keys(headlineSizeMap),
      defaultValue: "Large",
      tooltip: "Controls the headline text size — Large (h1) or Small (h2)",
    }),
    themeVariant: props.Variant({
      name: "Theme",
      options: Object.keys(themeVariantMap),
      defaultValue: undefined,
      tooltip: "Determines the theme used for the Background variant",
    }),
    eyebrow: props.TextNode({
      name: "Eyebrow",
      defaultValue: "Meet ATLAS",
      tooltip: "Small text displayed above the heading",
      group: "Eyebrow",
    }),
    eyebrowVariant: props.Variant({
      name: "Eyebrow Style",
      options: Object.keys(eyebrowVariantMap),
      defaultValue: "Accent",
      tooltip: "Eyebrow text colour — Accent (terracotta) or White",
      group: "Eyebrow",
    }),
    showEyebrow: props.Visibility({
      name: "Show Eyebrow",
      defaultValue: false,
      tooltip: "Toggle eyebrow text visibility",
      group: "Eyebrow",
    }),
    heading: props.TextNode({
      name: "Heading",
      defaultValue: "Offensive security built for the AI era.",
      multiline: true,
      tooltip: "Main heading text",
      group: "Heading",
    }),
    description: props.TextNode({
      name: "Description",
      defaultValue: "Pentest at the pace of AI with Terra's continuous agentic platform.",
      multiline: true,
      tooltip: "Subtitle text below the heading",
      group: "Description",
    }),
    showDescription: props.Visibility({
      name: "Show Description",
      defaultValue: true,
      tooltip: "Toggle description visibility",
      group: "Description",
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
      group: "Button",
    }),
    showImage: props.Visibility({
      name: "Show Image",
      defaultValue: true,
      tooltip: "Toggle image area visibility",
      group: "Image",
    }),
    imageSlot: props.Slot({
      name: "Image",
      tooltip: "Content area for the hero image — compose your own image layout here",
      group: "Content",
    }),
    ...responsiveProps("height", props.Number, {
      name: "Height",
      defaultValue: 480,
      min: -1,
      tooltip: "Height in pixels",
      group: "Content",
    }),
    children: props.Slot({
      name: "Children",
      tooltip: "Content area additional children",
      group: "Content",
    }),
  },
})
