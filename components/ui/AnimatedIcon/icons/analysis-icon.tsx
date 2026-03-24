import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import * as React from "react"

export default function AnalysisIcon({
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
  const gradientId = React.useId().replace(/:/g, "")
  const cellDuration = duration * 0.12

  useGSAP(
    () => {
      if (!active) return

      const tl = gsap.timeline({ repeat: loop ? -1 : 0, paused })
      tlRef.current = tl

      const cells = gsap.utils.toArray<Element>("[data-cell]")
      cells.forEach((cell, i) => {
        tl.to(cell, { opacity: 1, duration: cellDuration, ease: "sine.in" }, i * cellDuration * 0.4)
      })

      if (loop) {
        tl.to("[data-cell]", {
          opacity: 0,
          duration: cellDuration,
          ease: "sine.out",
          delay: 1,
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
      viewBox="0 0 101 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop className="[stop-color:var(--color-accent)]" />
          <stop offset="1" className="[stop-color:var(--color-background)]" />
        </linearGradient>
      </defs>
      <g transform="translate(50.5, 50.5) scale(0.9) translate(-50.5, -50.5)">
        <rect
          data-cell
          x="1"
          y="1"
          width="27.29"
          height="27.29"
          className="stroke-accent"
          strokeWidth="2"
          opacity={0}
        />
        <rect
          data-cell
          x="36.15"
          y="1"
          width="27.29"
          height="27.29"
          className="stroke-accent"
          strokeWidth="2"
          opacity={0}
        />
        <rect
          data-cell
          x="71.3"
          y="1"
          width="27.29"
          height="27.29"
          className="stroke-accent"
          strokeWidth="2"
          opacity={0}
        />
        <rect
          data-cell
          x="1"
          y="36.15"
          width="27.29"
          height="27.29"
          className="stroke-accent"
          strokeWidth="2"
          opacity={0}
        />
        <rect
          data-cell
          x="36.15"
          y="36.15"
          width="29.29"
          height="29.29"
          fill={`url(#${gradientId})`}
          opacity={0}
        />
        <rect
          data-cell
          x="71.3"
          y="36.15"
          width="29.29"
          height="29.29"
          fill={`url(#${gradientId})`}
          opacity={0}
        />
        <rect
          data-cell
          x="1"
          y="71.3"
          width="27.29"
          height="27.29"
          className="stroke-accent"
          strokeWidth="2"
          opacity={0}
        />
        <rect
          data-cell
          x="36.15"
          y="71.3"
          width="29.29"
          height="29.29"
          fill={`url(#${gradientId})`}
          opacity={0}
        />
        <rect
          data-cell
          x="71.3"
          y="71.3"
          width="29.29"
          height="29.29"
          fill={`url(#${gradientId})`}
          opacity={0}
        />
      </g>
    </svg>
  )
}
