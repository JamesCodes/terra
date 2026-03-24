import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import * as React from "react"

export default function NoiseIcon({
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
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-full"
      aria-hidden="true"
    >
      <g clipPath="url(#noise-clip)">
        <circle
          data-ring
          cx="50"
          cy="49.3"
          r="29.5"
          className="stroke-accent"
          strokeWidth="2"
          fill="none"
          opacity={0}
        />
        <circle
          data-ring
          cx="50"
          cy="49.91"
          r="39.91"
          className="stroke-accent"
          strokeWidth="2"
          fill="none"
          opacity={0}
        />
        <circle
          data-ring
          cx="50"
          cy="50"
          r="49"
          className="stroke-accent"
          strokeWidth="2"
          fill="none"
          opacity={0}
        />
        <g data-dot>
          <path
            d="M54.41 42.31L45.59 58.48"
            className="stroke-accent"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M60.91 58.48L67.99 49.81 60.91 41.52"
            className="stroke-accent"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M39.09 41.52L32.01 50.20 39.09 58.48"
            className="stroke-accent"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </g>
      <defs>
        <clipPath id="noise-clip">
          <rect width="100" height="100" rx="50" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
