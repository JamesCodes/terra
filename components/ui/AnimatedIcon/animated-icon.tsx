import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import * as React from "react"
import { tv, type VariantProps } from "tailwind-variants"
import { cn } from "@/lib/utils"

gsap.registerPlugin(useGSAP)

function useInView(ref: React.RefObject<Element | null>, enabled: boolean) {
  const [inView, setInView] = React.useState(false)

  React.useEffect(() => {
    if (!enabled) return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [enabled, ref])

  return inView
}

const animatedIconVariants = tv({
  base: "inline-flex items-center justify-center max-md:self-center",
  variants: {
    size: {
      sm: "size-12",
      lg: "size-16 md:size-16 lg:size-25",
    },
  },
  defaultVariants: {
    size: "lg",
  },
})

const iconComponents = {
  analysis: React.lazy(() => import("./icons/analysis-icon")),
  audit: React.lazy(() => import("./icons/audit-icon")),
  chart: React.lazy(() => import("./icons/chart-icon")),
  compliance: React.lazy(() => import("./icons/compliance-icon")),
  governable: React.lazy(() => import("./icons/governable-icon")),
  infinity: React.lazy(() => import("./icons/infinity-icon")),
  market: React.lazy(() => import("./icons/market-icon")),
  noise: React.lazy(() => import("./icons/noise-icon")),
  onboarding: React.lazy(() => import("./icons/onboarding-icon")),
  safe: React.lazy(() => import("./icons/safe-icon")),
  scan: React.lazy(() => import("./icons/scan-icon")),
  shield: React.lazy(() => import("./icons/shield-icon")),
  star: React.lazy(() => import("./icons/star-icon")),
  support: React.lazy(() => import("./icons/support-icon")),
  target: React.lazy(() => import("./icons/target-icon")),
  trustworthy: React.lazy(() => import("./icons/trustworthy-icon")),
  venn: React.lazy(() => import("./icons/venn-icon")),
}

type IconVariant = keyof typeof iconComponents

const sizeVariants = Object.keys(animatedIconVariants.variants.size) as SizeVariant[]
type SizeVariant = keyof typeof animatedIconVariants.variants.size

const animationModes = ["loop", "reveal", "hover"] as const
type AnimationMode = (typeof animationModes)[number]

const iconVariants = Object.keys(iconComponents) as IconVariant[]

interface AnimatedIconProps
  extends Omit<React.ComponentProps<"div">, "children">,
    VariantProps<typeof animatedIconVariants> {
  icon: IconVariant
  mode?: AnimationMode
  speed?: number
}

function AnimatedIcon({
  className,
  icon,
  size,
  mode = "loop",
  speed = 5,
  ...props
}: AnimatedIconProps) {
  const IconComponent = iconComponents[icon]
  const duration = 11 - speed
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = React.useState(false)
  const inView = useInView(containerRef, mode === "reveal")

  const active = mode === "loop" || (mode === "reveal" && inView) || mode === "hover"
  const loop = mode === "loop" || mode === "hover"
  const paused = mode === "hover" && !hovered

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: just a nice animation, not a link
    <div
      ref={containerRef}
      data-slot="animated-icon"
      className={cn(animatedIconVariants({ size }), className)}
      onMouseEnter={mode === "hover" ? () => setHovered(true) : undefined}
      onMouseLeave={mode === "hover" ? () => setHovered(false) : undefined}
      {...props}
    >
      <React.Suspense fallback={null}>
        <IconComponent active={active} loop={loop} duration={duration} paused={paused} />
      </React.Suspense>
    </div>
  )
}

export {
  AnimatedIcon,
  animatedIconVariants,
  animationModes,
  iconVariants,
  sizeVariants,
  type AnimationMode,
  type IconVariant,
  type SizeVariant,
}
