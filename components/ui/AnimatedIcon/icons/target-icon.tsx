import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import * as React from "react"

export default function TargetIcon({
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
