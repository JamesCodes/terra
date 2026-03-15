import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import { AnimatedIcon, type AnimationMode } from "./animated-icon"

import "../../../app/globals.css"

export const iconMap = {
  Target: "target",
  Infinity: "infinity",
  "Half Circle": "half-circle",
  Shield: "shield",
} as const

export const sizeMap = {
  Small: "sm",
  Medium: "md",
  Large: "lg",
} as const

export const modeMap = {
  Loop: "loop",
  Reveal: "reveal",
  Hover: "hover",
} as const

interface WebflowAnimatedIconProps {
  icon?: keyof typeof iconMap
  size?: keyof typeof sizeMap
  mode?: keyof typeof modeMap
  speed?: number
}

const WebflowAnimatedIcon: React.FC<WebflowAnimatedIconProps> = ({
  icon = "Target",
  size = "Medium",
  mode = "Loop",
  speed = 5,
}) => {
  const mappedIcon = iconMap[icon]
  const mappedSize = sizeMap[size]
  const mappedMode = modeMap[mode] as AnimationMode

  return <AnimatedIcon icon={mappedIcon} size={mappedSize} mode={mappedMode} speed={speed} />
}

export default declareComponent(WebflowAnimatedIcon, {
  name: "Animated Icon",
  description: "Terracotta animated SVG icons — target, infinity, half-circle, and shield variants",
  group: "Media",
  props: {
    icon: props.Variant({
      name: "Icon",
      options: ["Target", "Infinity", "Half Circle", "Shield"],
      defaultValue: "Target",
      tooltip: "Choose the icon shape",
    }),
    size: props.Variant({
      name: "Size",
      options: ["Small", "Medium", "Large"],
      defaultValue: "Medium",
      tooltip: "Icon size — Small (40px), Medium (48px), Large (64px)",
    }),
    mode: props.Variant({
      name: "Animation",
      options: ["Loop", "Reveal", "Hover"],
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
