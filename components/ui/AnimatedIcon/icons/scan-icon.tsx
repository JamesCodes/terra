import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import * as React from "react"

export default function ScanIcon({
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
      <foreignObject data-rotate x="12" y="12" width="76" height="76">
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
