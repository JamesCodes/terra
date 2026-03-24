import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import {
  AnimatedIcon,
  type AnimationMode,
  animationModes,
  iconVariants,
  sizeVariants,
} from "./animated-icon"
import { booleanArg, numberArg, selectArg } from "@/lib/storybook"
import { createVariantMap } from "@/lib/utils"

import "../../../app/globals.css"

export const iconMap = createVariantMap<(typeof iconVariants)[number]>(iconVariants)

export const sizeMap = createVariantMap<(typeof sizeVariants)[number]>(sizeVariants, {
  sm: "Small",
  lg: "Large",
})

export const modeMap = createVariantMap<(typeof animationModes)[number]>(animationModes)

interface WebflowAnimatedIconProps {
  icon?: keyof typeof iconMap
  size?: keyof typeof sizeMap
  mode?: keyof typeof modeMap
  speed?: number
}

const WebflowAnimatedIcon: React.FC<WebflowAnimatedIconProps> = ({
  icon = "Target",
  size = "Large",
  mode = "Loop",
  speed = 5,
}) => {
  const mappedIcon = iconMap[icon]
  const mappedSize = sizeMap[size]
  const mappedMode = modeMap[mode] as AnimationMode

  return <AnimatedIcon icon={mappedIcon} size={mappedSize} mode={mappedMode} speed={speed} />
}

export function iconWebflowProps(group?: string) {
  return {
    showIcon: props.Visibility({
      name: "Show Icon",
      defaultValue: true,
      group,
      tooltip: "Toggle the icon",
    }),
    icon: props.Variant({
      name: "Icon",
      options: Object.keys(iconMap),
      defaultValue: "Target",
      group,
      tooltip: "Choose the icon shape",
    }),
    iconMode: props.Variant({
      name: "Animation",
      options: Object.keys(modeMap),
      defaultValue: "Loop",
      group,
      tooltip: "Loop continuously, reveal on scroll, or animate on hover",
    }),
    iconSpeed: props.Number({
      name: "Speed",
      defaultValue: 5,
      min: 1,
      max: 10,
      decimals: 0,
      group,
      tooltip: "Animation speed — higher is faster",
    }),
  }
}

export function iconArgTypes() {
  return {
    showIcon: booleanArg("Show Icon"),
    icon: selectArg("Icon", iconMap),
    iconMode: selectArg("Animation", modeMap),
    iconSpeed: numberArg("Speed", { min: 1, max: 10, step: 1 }),
  }
}

export default declareComponent(WebflowAnimatedIcon, {
  name: "Animated Icon",
  description: "Animated SVG icons",
  group: "Media",
  props: {
    icon: props.Variant({
      name: "Icon",
      options: Object.keys(iconMap),
      defaultValue: "Target",
      tooltip: "Choose the icon shape",
    }),
    size: props.Variant({
      name: "Size",
      options: Object.keys(sizeMap),
      defaultValue: "Medium",
      tooltip: "Icon size",
    }),
    mode: props.Variant({
      name: "Animation",
      options: Object.keys(modeMap),
      defaultValue: "Loop",
      tooltip: "Loop continuously, reveal on scroll, or animate on hover",
    }),
    speed: props.Number({
      name: "Speed",
      defaultValue: 5,
      min: 1,
      max: 10,
      decimals: 0,
      tooltip: "Animation speed — higher is faster",
    }),
  },
})
