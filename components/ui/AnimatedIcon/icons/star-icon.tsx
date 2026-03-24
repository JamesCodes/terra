import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import * as React from "react"

export default function StarIcon({
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

      tl.fromTo(
        "[data-circle]",
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: speed * 1.2, ease: "power2.out" },
      ).fromTo(
        "[data-star]",
        { scale: 0, opacity: 1, svgOrigin: "24.6 23.05" },
        { scale: 1, duration: speed, ease: "back.out(1.7)" },
        `-=${speed * 0.5}`,
      )

      if (loop) {
        tl.to("[data-circle], [data-star]", {
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
      viewBox="0 0 48.49 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
      className="size-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="24.6"
          y1="8.62"
          x2="24.6"
          y2="49.79"
          gradientUnits="userSpaceOnUse"
        >
          <stop className="[stop-color:var(--color-accent)]" />
          <stop offset="1" className="[stop-color:var(--color-background)]" />
        </linearGradient>
      </defs>
      <path
        data-circle=""
        d="M24.2422 1C37.0881 1 47.4844 11.3069 47.4844 24C47.4844 36.6931 37.0881 47 24.2422 47C11.3964 46.9999 1 36.693 1 24C1 11.307 11.3964 1.00013 24.2422 1Z"
        className="stroke-accent"
        strokeWidth="2"
        fill="none"
        pathLength={100}
        strokeDasharray={102}
        strokeDashoffset={100}
      />
      <path
        data-star=""
        d="M24.6017 8.62198L30.5191 16.4572L39.7994 19.6637L34.1763 27.7127L33.9944 37.5296L24.6017 34.669L15.2091 37.5296L15.0272 27.7127L9.40409 19.6637L18.6844 16.4572L24.6017 8.62198Z"
        fill={`url(#${gradientId})`}
        opacity={0}
      />
    </svg>
  )
}
