import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import * as React from "react"

export default function SafeIcon({
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

      tl.to("[data-lock]", {
        opacity: 1,
        duration: speed,
        ease: "power2.out",
      })
        .set("[data-ring]", { opacity: 1 })
        .fromTo(
          "[data-ring]",
          { strokeDashoffset: 100 },
          { strokeDashoffset: 0, duration: speed * 1.2, ease: "power2.out" },
        )
        .fromTo(
          "[data-tick]",
          { strokeDashoffset: 100 },
          { strokeDashoffset: 0, duration: speed, ease: "power2.out" },
          `<+=${speed * 1.2 * 0.3}`,
        )

      if (loop) {
        tl.to("[data-ring], [data-lock]", {
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
      viewBox="0 0 100 100"
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
      <circle
        data-ring
        cx="50"
        cy="50"
        r="49"
        className="stroke-accent"
        strokeWidth="2"
        opacity={0}
        pathLength={100}
        strokeDasharray={102}
        strokeDashoffset={100}
      />
      <g data-lock opacity={0}>
        <rect
          x="29.66"
          y="41.94"
          width="40.69"
          height="30.58"
          rx="3.18"
          fill={`url(#${gradientId})`}
        />
        <path
          d="M38.29 42.59V35.21C38.29 28.74 43.53 23.50 50.00 23.50C56.47 23.50 61.72 28.74 61.72 35.21V42.59"
          className="stroke-accent"
          strokeWidth="1.59"
          strokeLinejoin="round"
          fill="none"
        />
        <polyline
          data-tick
          points="58.66,51.63 47.02,62.83 41.35,57.83"
          className="stroke-background"
          strokeWidth="2.78"
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
