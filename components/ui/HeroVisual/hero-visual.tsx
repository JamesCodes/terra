import type { ReactElement } from "react"
import { HomeVisual } from "@/components/ui/HeroVisual/variants/home"
import { PlatformVisual } from "@/components/ui/HeroVisual/variants/platform"
import { PortalVisual } from "@/components/ui/HeroVisual/variants/portal"
import { ParallaxScene } from "./parallax-scene"

type HeroVisualVariant = "home" | "platform" | "portal"

interface HeroVisualProps {
  variant?: HeroVisualVariant
}

const variantComponents: Record<HeroVisualVariant, () => ReactElement> = {
  home: HomeVisual,
  platform: PlatformVisual,
  portal: PortalVisual,
}

function HeroVisual({ variant = "home" }: HeroVisualProps) {
  if (!variantComponents[variant]) return null
  return <ParallaxScene>{variantComponents[variant]()}</ParallaxScene>
}

export { HeroVisual, variantComponents }
export type { HeroVisualVariant, HeroVisualProps }
