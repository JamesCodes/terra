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
  base: "inline-flex items-center justify-center",
  variants: {
    size: {
      sm: "size-10",
      md: "size-12",
      lg: "size-16",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

type IconVariant = "target" | "infinity" | "half-circle" | "shield"
type AnimationMode = "loop" | "reveal" | "hover"

interface AnimatedIconProps
  extends Omit<React.ComponentProps<"div">, "children">,
    VariantProps<typeof animatedIconVariants> {
  icon: IconVariant
  mode?: AnimationMode
  speed?: number
}

function TargetIcon({
  active,
  loop,
  duration,
  paused,
}: {
  active: boolean
  loop: boolean
  duration: number
  paused: boolean
}) {
  const svgRef = React.useRef<SVGSVGElement>(null)
  const tlRef = React.useRef<gsap.core.Timeline | null>(null)
  const ringDuration = duration * 0.3

  useGSAP(
    () => {
      if (!active) return

      const tl = gsap.timeline({ repeat: loop ? -1 : 0, paused })
      tlRef.current = tl

      tl.to("[data-dot]", {
        opacity: 0.4,
        duration: ringDuration,
        ease: "sine.inOut",
      }).to("[data-dot]", {
        opacity: 1,
        duration: ringDuration,
        ease: "sine.inOut",
      })

      gsap.utils.toArray<Element>("[data-ring]").forEach((ring, i) => {
        const offset = ringDuration + i * ringDuration * 0.4
        tl.to(ring, { opacity: 1, duration: ringDuration + 0.35, ease: "sine.in" }, offset)
        if (loop) {
          tl.to(ring, { opacity: 0, duration: ringDuration + 0.35, ease: "sine.out" }, `>`)
        }
      })

      if (!paused) tl.play()
    },
    {
      scope: svgRef,
      dependencies: [active, duration, loop],
      revertOnUpdate: true,
    },
  )

  React.useEffect(() => {
    if (!tlRef.current) return
    if (paused) tlRef.current.pause()
    else tlRef.current.play()
  }, [paused])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-full"
      aria-hidden="true"
    >
      <g clipPath="url(#target-clip)">
        <circle data-dot cx="24.24" cy="24.24" r="6" className="fill-accent" />
        <circle
          data-ring
          cx="24"
          cy="24.48"
          r="11.375"
          className="stroke-accent"
          strokeWidth="1.25"
          fill="none"
          opacity={0}
        />
        <circle
          data-ring
          cx="24.24"
          cy="24.24"
          r="17.375"
          className="stroke-accent"
          strokeWidth="1.25"
          fill="none"
          opacity={0}
        />
        <circle
          data-ring
          cx="24"
          cy="24.24"
          r="23.375"
          className="stroke-accent"
          strokeWidth="1.25"
          fill="none"
          opacity={0}
        />
      </g>
      <defs>
        <clipPath id="target-clip">
          <rect width="48" height="48" rx="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

function InfinityIcon({
  active,
  loop,
  duration,
  paused,
}: {
  active: boolean
  loop: boolean
  duration: number
  paused: boolean
}) {
  const svgRef = React.useRef<SVGSVGElement>(null)
  const tweenRef = React.useRef<gsap.core.Tween | null>(null)
  const gradientId = React.useId().replace(/:/g, "")

  useGSAP(
    () => {
      if (!active) return

      const pathEl = svgRef.current?.querySelector("[data-path]") as SVGPathElement | null
      const gradientEl = svgRef.current?.querySelector("[data-gradient]")
      if (!pathEl || !gradientEl) return

      const totalLength = pathEl.getTotalLength()
      const crossA = svgRef.current?.querySelector("[data-cross-a]")
      const crossB = svgRef.current?.querySelector("[data-cross-b]")
      let showCrossA = true

      const proxy = { progress: 0 }
      tweenRef.current = gsap.to(proxy, {
        progress: 1,
        duration,
        repeat: loop ? -1 : 0,
        ease: "none",
        paused,
        onUpdate: () => {
          const point = pathEl.getPointAtLength(proxy.progress * totalLength)
          gradientEl.setAttribute("cx", String(point.x))
          gradientEl.setAttribute("cy", String(point.y))

          if (showCrossA && point.x < 5) showCrossA = false
          else if (!showCrossA && point.x > 95) showCrossA = true

          if (crossA) crossA.setAttribute("opacity", showCrossA ? "1" : "0")
          if (crossB) crossB.setAttribute("opacity", showCrossA ? "0" : "1")
        },
      })

      if (!paused) tweenRef.current.play()
    },
    {
      scope: svgRef,
      dependencies: [active, duration, loop],
      revertOnUpdate: true,
    },
  )

  React.useEffect(() => {
    if (!tweenRef.current) return
    if (paused) tweenRef.current.pause()
    else tweenRef.current.play()
  }, [paused])

  const infinityPath =
    "M76.8534 69.9999C87.982 69.9999 97.0023 61.0462 97.0023 49.9999C97.0023 38.9536 87.982 29.9999 76.8534 29.9999C53.6738 29.9999 46.6473 69.9999 23.1513 69.9999C12.0227 69.9999 3.00233 61.0462 3.00233 49.9999C3.00233 38.9536 12.0227 29.9999 23.1513 29.9999C47.9819 29.9999 51.9883 69.9999 76.8534 69.9999Z"

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={`${gradientId}-cross-a`}
          gradientUnits="userSpaceOnUse"
          x1="37.5"
          y1="35.4"
          x2="63"
          y2="65"
        >
          <stop offset="0" className="[stop-color:var(--color-accent)]" stopOpacity="0" />
          <stop offset="0.15" className="[stop-color:var(--color-accent)]" />
          <stop offset="0.85" className="[stop-color:var(--color-accent)]" />
          <stop offset="1" className="[stop-color:var(--color-accent)]" stopOpacity="0" />
        </linearGradient>
        <radialGradient
          data-gradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          cx="50"
          cy="50"
          r="20"
        >
          <stop offset="0" stopColor="white" stopOpacity="0.75" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>

        <linearGradient
          id={`${gradientId}-cross-b`}
          gradientUnits="userSpaceOnUse"
          x1="63"
          y1="35.4"
          x2="37.5"
          y2="65"
        >
          <stop offset="0" className="[stop-color:var(--color-accent)]" stopOpacity="0" />
          <stop offset="0.15" className="[stop-color:var(--color-accent)]" />
          <stop offset="0.85" className="[stop-color:var(--color-accent)]" />
          <stop offset="1" className="[stop-color:var(--color-accent)]" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        data-path
        d={infinityPath}
        className="stroke-accent"
        strokeWidth="3"
        strokeMiterlimit="10"
        fill="none"
      />
      <path
        d={infinityPath}
        stroke={`url(#${gradientId})`}
        strokeWidth="3"
        strokeMiterlimit="10"
        fill="none"
      />
      <path
        data-cross-a
        d="M37.5 35.39C47.09 43.18 53.29 57.48 63.01 65.03"
        stroke={`url(#${gradientId}-cross-a)`}
        strokeWidth="3"
        strokeMiterlimit="10"
        fill="none"
      />
      <path
        data-cross-b
        d="M63.01 35.39C53.70 42.95 46.84 56.63 37.5 64.34"
        stroke={`url(#${gradientId}-cross-b)`}
        strokeWidth="3"
        strokeMiterlimit="10"
        fill="none"
        opacity="0"
      />
    </svg>
  )
}

function HalfCircleIcon({
  active,
  loop,
  duration,
  paused,
}: {
  active: boolean
  loop: boolean
  duration: number
  paused: boolean
}) {
  const svgRef = React.useRef<SVGSVGElement>(null)
  const tweenRef = React.useRef<gsap.core.Tween | null>(null)

  useGSAP(
    () => {
      if (!active) return

      tweenRef.current = gsap.to("[data-rotate]", {
        rotation: 360,
        duration: duration,
        repeat: loop ? -1 : 0,
        ease: "none",
        svgOrigin: "50 50",
        paused,
      })

      if (!paused) tweenRef.current.play()
    },
    {
      scope: svgRef,
      dependencies: [active, duration, loop],
      revertOnUpdate: true,
    },
  )

  React.useEffect(() => {
    if (!tweenRef.current) return
    if (paused) tweenRef.current.pause()
    else tweenRef.current.play()
  }, [paused])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-full"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="49.5" className="stroke-accent" fill="none" />
      <foreignObject
        data-rotate
        x="12"
        y="12"
        width="76"
        height="76"
        clipPath="circle(50% at 50% 50%)"
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background:
              "conic-gradient(from 90deg, var(--color-background) 0deg, var(--color-background) 55deg, var(--color-accent) 360deg)",
            borderRadius: "50%",
          }}
        />
      </foreignObject>
    </svg>
  )
}

function ShieldIcon({
  active,
  loop,
  duration,
  paused,
}: {
  active: boolean
  loop: boolean
  duration: number
  paused: boolean
}) {
  const svgRef = React.useRef<SVGSVGElement>(null)
  const tlRef = React.useRef<gsap.core.Timeline | null>(null)

  const shieldGradientId = React.useId().replace(/:/g, "")

  useGSAP(
    () => {
      if (!active) return

      const speed = duration * 0.15
      const tl = gsap.timeline({
        repeat: loop ? -1 : 0,
        repeatDelay: loop ? 1 : 0,
        paused,
      })
      tlRef.current = tl

      tl.fromTo(
        "[data-reveal]",
        { attr: { height: 0 }, opacity: 1 },
        { attr: { height: 80 }, duration: speed, ease: "power2.out" },
      ).fromTo(
        "[data-tick]",
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: speed, ease: "power2.out" },
        "-=0.1",
      )
      if (loop) {
        tl.to("[data-reveal]", {
          opacity: 0,
          duration: speed,
          ease: "power2.in",
          delay: 2,
        })
      }

      if (!paused) tl.play()
    },
    {
      scope: svgRef,
      dependencies: [active, duration, loop],
      revertOnUpdate: true,
    },
  )

  React.useEffect(() => {
    if (!tlRef.current) return
    if (paused) tlRef.current.pause()
    else tlRef.current.play()
  }, [paused])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-full"
      aria-hidden="true"
    >
      <g mask={`url(#${shieldGradientId}-mask)`}>
        <path
          d="M28.678 36.71L24.5703 39.1502C24.253 39.3388 23.8576 39.3372 23.5418 39.1461L19.4965 36.6986C13.651 33.1626 10.08 26.8269 10.08 19.9941V12.0565C10.08 11.5872 10.4064 11.181 10.8648 11.08L23.9014 8.2072C24.0425 8.1761 24.1887 8.17596 24.3299 8.20678L37.4969 11.0812C37.9562 11.1814 38.2836 11.5881 38.2836 12.0582V19.8266C38.2836 26.7551 34.6331 33.1703 28.6786 36.7104Z"
          fill={`url(#${shieldGradientId})`}
        />
      </g>
      <polyline
        data-tick
        points="18.5,23.5 22,27 29.5,19"
        className="stroke-background"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
        pathLength={100}
        strokeDasharray={100}
        strokeDashoffset={100}
      />
      <path
        d="M29.8261 39.788L24.5977 42.8937C24.2804 43.0823 23.8851 43.0807 23.5693 42.8896L18.419 39.7738C11.1566 35.381 6.72 27.5101 6.72 19.0216V8.966C6.72 8.49663 7.04644 8.09043 7.50481 7.98943L23.9436 4.36719C24.0847 4.3361 24.2309 4.33596 24.372 4.36677L40.9733 7.99063C41.4326 8.09088 41.76 8.49752 41.76 8.96762V18.8136C41.76 27.4209 37.2247 35.3906 29.8268 39.7884Z"
        className="stroke-accent"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        fill="none"
      />
      <defs>
        <linearGradient
          id={`${shieldGradientId}-reveal`}
          gradientUnits="objectBoundingBox"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0" stopColor="white" />
          <stop offset="0.5" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id={`${shieldGradientId}-mask`}>
          <rect
            data-reveal
            x="8"
            y="8"
            width="32"
            height={0}
            fill={`url(#${shieldGradientId}-reveal)`}
          />
        </mask>
        <linearGradient
          id={shieldGradientId}
          x1="24.1818"
          y1="8.16"
          x2="24.1818"
          y2="43.68"
          gradientUnits="userSpaceOnUse"
        >
          <stop className="[stop-color:var(--color-accent)]" />
          <stop offset="1" className="[stop-color:var(--color-background)]" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const iconComponents: Record<
  IconVariant,
  React.FC<{
    active: boolean
    loop: boolean
    duration: number
    paused: boolean
  }>
> = {
  target: TargetIcon,
  infinity: InfinityIcon,
  "half-circle": HalfCircleIcon,
  shield: ShieldIcon,
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
      <IconComponent active={active} loop={loop} duration={duration} paused={paused} />
    </div>
  )
}

export { AnimatedIcon, animatedIconVariants, type AnimationMode, type IconVariant }
