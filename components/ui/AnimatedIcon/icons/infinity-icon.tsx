import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import * as React from "react"

export default function InfinityIcon({
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
