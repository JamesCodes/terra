import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import { responsiveProps } from "@/lib/responsive-props"
import { type ObjectAlign, StatementBlock } from "./statement-block"

import "../../../app/globals.css"

export const alignMap = {
  Top: "top",
  Center: "center",
  Bottom: "bottom",
} as const satisfies Record<string, ObjectAlign>

export const propLabels = {
  children: "Content",
  image: "Image",
  imageHeight: "Image Height",
  objectAlign: "Object Align",
} as const

interface WebflowStatementBlockProps {
  children?: React.ReactNode
  image?: { src: string; alt?: string }
  imageHeight?: number
  imageHeightTablet?: number
  imageHeightMobile?: number
  objectAlign?: keyof typeof alignMap
  objectAlignTablet?: string
  objectAlignMobile?: string
}

const WebflowStatementBlock: React.FC<WebflowStatementBlockProps> = ({
  children,
  image,
  imageHeight = 807,
  imageHeightTablet,
  imageHeightMobile,
  objectAlign = "Center",
  objectAlignTablet,
  objectAlignMobile,
}) => {
  const mapAlign = (value: string | undefined) =>
    value ? (alignMap[value as keyof typeof alignMap] ?? "center") : undefined

  return (
    <StatementBlock
      image={image}
      imageHeight={imageHeight}
      imageHeightTablet={imageHeightTablet}
      imageHeightMobile={imageHeightMobile}
      objectAlign={mapAlign(objectAlign)}
      objectAlignTablet={mapAlign(objectAlignTablet)}
      objectAlignMobile={mapAlign(objectAlignMobile)}
    >
      {children}
    </StatementBlock>
  )
}

export default declareComponent(WebflowStatementBlock, {
  name: "Statement Block",
  description: "A section with heading/description rows and a decorative image below",
  group: "Content Blocks",
  props: {
    children: props.Slot({
      name: propLabels.children,
      tooltip: "Statement Block Item instances",
    }),
    image: props.Image({
      name: propLabels.image,
      tooltip: "Decorative image displayed below the statement rows",
      group: "Image",
    }),
    ...responsiveProps("imageHeight", props.Number, {
      name: propLabels.imageHeight,
      defaultValue: 807,
      min: -1,
      group: "Image",
    }),
    ...responsiveProps("objectAlign", props.Variant, {
      name: propLabels.objectAlign,
      options: Object.keys(alignMap),
      defaultValue: "Center",
      group: "Image",
    }),
  },
})
