import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import * as React from "react"

export default function TrustworthyIcon({
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

      tl.to("[data-bubble-back]", {
        opacity: 1,
        duration: speed,
        ease: "power2.out",
      })
        .fromTo(
          "[data-tick-back]",
          { strokeDashoffset: 100 },
          { strokeDashoffset: 0, duration: speed, ease: "power2.out" },
          "-=0.1",
        )
        .to("[data-bubble-front]", {
          opacity: 1,
          duration: speed,
          ease: "power2.out",
        })
        .fromTo(
          "[data-tick-front]",
          { strokeDashoffset: 100 },
          { strokeDashoffset: 0, duration: speed, ease: "power2.out" },
          "-=0.1",
        )

      if (loop) {
        tl.to("[data-bubble-back], [data-bubble-front]", {
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
      viewBox="-4 0 108 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="70.24"
          y1="6.37"
          x2="70.24"
          y2="77.28"
          gradientUnits="userSpaceOnUse"
        >
          <stop className="[stop-color:var(--color-accent)]" />
          <stop offset="1" className="[stop-color:var(--color-background)]" />
        </linearGradient>
      </defs>
      <g data-bubble-back opacity={0}>
        <path
          d="M49.2 15.08C60.82 3.46 79.66 3.46 91.29 15.08 101.56 25.35 102.75 41.26 94.86 52.85L96.66 59.57C97.12 61.27 95.56 62.83 93.86 62.37L87.19 60.58C75.59 68.63 59.54 67.49 49.2 57.16 37.58 45.54 37.58 26.7 49.2 15.08Z"
          fill={`url(#${gradientId})`}
        />
        <polyline
          data-tick-back
          points="81.8,29.59 67.26,43.23 60.19,37.14"
          className="stroke-background"
          strokeWidth="4.55"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          pathLength={100}
          strokeDasharray={100}
          strokeDashoffset={100}
        />
      </g>
      <g data-bubble-front opacity={0}>
        <path
          d="M51.37 42.28C39.62 30.53 20.56 30.53 8.81 42.28-1.58 52.67-2.78 68.76 5.21 80.47L3.37 87.31C2.91 89.01 4.47 90.57 6.17 90.11L12.96 88.29C24.69 96.43 40.92 95.27 51.37 84.82 63.12 73.07 63.12 54.03 51.37 42.28Z"
          className="fill-background stroke-accent"
          strokeWidth="2"
        />
        <polyline
          data-tick-front
          points="39.71,57.35 26.7,69.86 20.37,64.27"
          className="stroke-accent"
          strokeWidth="4.55"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          pathLength={100}
          strokeDasharray={100}
          strokeDashoffset={100}
        />
      </g>
    </svg>
  )
}
