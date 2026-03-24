import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import {
  iconMap,
  iconWebflowProps,
  modeMap,
} from "@/components/ui/AnimatedIcon/animated-icon.webflow"
import { createVariantMap } from "@/lib/utils"
import { FeatureContent, featuredContentVariants } from "./feature-content"

import "../../../app/globals.css"

type FeatureContentVariant = NonNullable<
  import("tailwind-variants").VariantProps<typeof featuredContentVariants>["variant"]
>

export const variantMap = createVariantMap<FeatureContentVariant>(
  featuredContentVariants.variants.variant,
  { imageLeft: "Image Left", imageRight: "Image Right" },
)

interface WebflowFeatureContentProps {
  variant?: keyof typeof variantMap
  title?: string
  description?: string
  icon?: string
  iconMode?: string
  iconSpeed?: number
  showIcon?: boolean
  image?: { src: string; alt?: string }
}

const WebflowFeatureContent: React.FC<WebflowFeatureContentProps> = ({
  variant = "Image Left",
  title,
  description,
  icon = "Target",
  iconMode = "Loop",
  iconSpeed = 5,
  showIcon = true,
  image,
}) => {
  const mappedVariant = variantMap[variant]

  return (
    <FeatureContent
      variant={mappedVariant}
      title={title}
      description={description}
      icon={showIcon ? iconMap[icon] : undefined}
      iconMode={modeMap[iconMode]}
      iconSpeed={iconSpeed}
      image={image}
    />
  )
}

export default declareComponent(WebflowFeatureContent, {
  name: "Feature Content",
  description: "A two-column feature section with title, description, icon, and image",
  group: "Content Blocks",
  props: {
    variant: props.Variant({
      name: "Layout",
      options: Object.keys(variantMap),
      defaultValue: Object.keys(variantMap)[0],
      tooltip: "Control image position relative to content",
    }),
    title: props.TextNode({
      name: "Title",
      defaultValue: "Feature title goes here",
      tooltip: "The feature heading",
      group: "Content",
    }),
    description: props.TextNode({
      name: "Description",
      defaultValue: "A brief description of this feature and its benefits.",
      multiline: true,
      tooltip: "The feature description text",
      group: "Content",
    }),
    ...iconWebflowProps("Content"),
    image: props.Image({
      name: "Image",
      tooltip: "The feature image",
      group: "Image",
    }),
  },
})
