import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import * as React from "react"

export default function ChartIcon({
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

      tl.addLabel("reveal")
        .fromTo(
          "[data-ring]",
          { strokeDashoffset: 100 },
          { strokeDashoffset: 0, duration: speed * 1.2, ease: "power2.out" },
          "reveal",
        )
        .fromTo(
          "[data-bar-1]",
          { attr: { y: 35.1, height: 0 } },
          { attr: { y: 25.16, height: 9.94 }, duration: speed, ease: "power2.out" },
          "reveal",
        )
        .fromTo(
          "[data-bar-2]",
          { attr: { y: 35.1, height: 0 } },
          { attr: { y: 19, height: 16.1 }, duration: speed, ease: "power2.out" },
          `reveal+=${speed * 0.4}`,
        )
        .fromTo(
          "[data-line]",
          { strokeDashoffset: 100 },
          { strokeDashoffset: 0, duration: speed * 1.8, ease: "power2.out" },
          "reveal",
        )
        .to("[data-dot-1]", { opacity: 1, duration: speed * 0.3 }, "reveal")
        .to("[data-dot-2]", { opacity: 1, duration: speed * 0.3 }, `reveal+=${speed * 0.5}`)
        .to("[data-dot-3]", { opacity: 1, duration: speed * 0.3 }, `reveal+=${speed * 1}`)

      if (loop) {
        tl.to("[data-ring], [data-bar-1], [data-bar-2], [data-line], [data-dot-1], [data-dot-2], [data-dot-3]", {
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
      viewBox="0 0 49 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={`${gradientId}-1`}
          x1="19.74"
          y1="25.16"
          x2="19.74"
          y2="37.7"
          gradientUnits="userSpaceOnUse"
        >
          <stop className="[stop-color:var(--color-accent)]" />
          <stop offset="1" className="[stop-color:var(--color-background)]" />
        </linearGradient>
        <linearGradient
          id={`${gradientId}-2`}
          x1="28.74"
          y1="19"
          x2="28.74"
          y2="37.3"
          gradientUnits="userSpaceOnUse"
        >
          <stop className="[stop-color:var(--color-accent)]" />
          <stop offset="1" className="[stop-color:var(--color-background)]" />
        </linearGradient>
      </defs>
      <circle
        data-ring
        cx="24.24"
        cy="24"
        r="23"
        className="stroke-accent"
        strokeWidth="2"
        fill="none"
        pathLength={100}
        strokeDasharray={102}
        strokeDashoffset={100}
      />
      <rect data-bar-1 x="15.24" y={35.1} width="9" height={0} fill={`url(#${gradientId}-1)`} />
      <rect data-bar-2 x="24.24" y={35.1} width="9" height={0} fill={`url(#${gradientId}-2)`} />
      <path
        data-line
        d="M13.75 21.1L22.54 11.49L35.07 14.89"
        className="stroke-accent"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        pathLength={100}
        strokeDasharray={100}
        strokeDashoffset={100}
      />
      <circle data-dot-1 cx="13.44" cy="21.37" r="1.87" className="fill-accent" opacity={0} />
      <circle data-dot-2 cx="22.37" cy="11.65" r="1.87" className="fill-accent" opacity={0} />
      <circle data-dot-3 cx="35.04" cy="14.81" r="1.87" className="fill-accent" opacity={0} />
    </svg>
  )
}
