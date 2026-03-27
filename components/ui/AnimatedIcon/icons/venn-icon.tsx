import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import * as React from "react"

export default function VennIcon({
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
  const spreadDuration = duration * 0.3
  const fadeDuration = duration * 0.2
  const holdDuration = duration * 0.2

  const offsets = [
    { x: -9.92, y: 0 },
    { x: 0, y: 9.92 },
    { x: 0, y: -9.92 },
    { x: 9.92, y: 0 },
  ]

  useGSAP(
    () => {
      if (!active) return

      const circles = gsap.utils.toArray<Element>("[data-circle]")
      circles.forEach((circle, i) => {
        gsap.set(circle, { x: offsets[i].x, y: offsets[i].y })
      })
      gsap.set("[data-gradient]", { opacity: 0 })
      gsap.set("[data-group]", { rotation: -90, svgOrigin: "24 24" })

      const tl = gsap.timeline({ repeat: loop ? -1 : 0, paused })
      tlRef.current = tl

      const spreadLabel = "spread"
      tl.to(
        "[data-circle]",
        { x: 0, y: 0, duration: spreadDuration, ease: "power2.out" },
        spreadLabel,
      )
      tl.to(
        "[data-group]",
        {
          rotation: 0,
          duration: spreadDuration,
          ease: "power2.out",
          svgOrigin: "24 24",
        },
        spreadLabel,
      )
      tl.to(
        "[data-gradient]",
        { opacity: 1, duration: spreadDuration, ease: "power2.out" },
        spreadLabel,
      )

      tl.to({}, { duration: holdDuration })

      if (loop) {
        const collapseLabel = "collapse"
        tl.to(
          "[data-circle]",
          {
            x: (i: number) => offsets[i].x,
            y: (i: number) => offsets[i].y,
            duration: spreadDuration,
            ease: "power2.in",
          },
          collapseLabel,
        )
        tl.to(
          "[data-group]",
          {
            rotation: 90,
            duration: spreadDuration,
            ease: "power2.in",
            svgOrigin: "24 24",
          },
          collapseLabel,
        )
        tl.to(
          "[data-gradient]",
          { opacity: 0, duration: spreadDuration, ease: "power2.in" },
          collapseLabel,
        )

        tl.set("[data-group]", { rotation: -90, svgOrigin: "24 24" })

        tl.to({}, { duration: holdDuration })
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
      <defs>
        <linearGradient
          id="venn-grad-v"
          x1="33.92"
          y1="9.92"
          x2="33.92"
          y2="42.49"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--color-accent)" />
          <stop offset="1" stopColor="var(--color-background)" />
        </linearGradient>
      </defs>
      <g data-group>
        <circle data-circle data-gradient cx="33.92" cy="24" r="14.08" fill="url(#venn-grad-v)" />
        <circle
          data-circle
          cx="24"
          cy="14.08"
          r="13.33"
          className="stroke-accent"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <circle
          data-circle
          cx="24"
          cy="33.92"
          r="13.33"
          className="stroke-accent"
          strokeWidth="1.5"
        />
        <circle
          data-circle
          cx="14.08"
          cy="24"
          r="13.33"
          className="stroke-accent"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  )
}
