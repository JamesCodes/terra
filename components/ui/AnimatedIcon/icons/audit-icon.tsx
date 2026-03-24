import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import * as React from "react"

export default function AuditIcon({
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

      tl.addLabel("lines")

      for (let i = 1; i <= 3; i++) {
        tl.fromTo(
          `[data-line-${i}]`,
          { strokeDashoffset: 100 },
          { strokeDashoffset: 0, duration: speed, ease: "power2.out" },
          `lines+=${(i - 1) * speed * 0.3}`,
        )
      }

      tl.fromTo(
        "[data-circle]",
        { scale: 0, opacity: 1, svgOrigin: "36.34 31.24" },
        { scale: 1, duration: speed, ease: "back.out(1.7)" },
        `lines+=${2 * speed * 0.3}`,
      ).fromTo(
        "[data-tick]",
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: speed * 0.8, ease: "power2.out" },
        ">-0.1",
      )

      if (loop) {
        tl.to("[data-outline], [data-line-1], [data-line-2], [data-line-3], [data-circle], [data-tick]", {
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
      viewBox="0 0 48.6 50.09"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
      className="size-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="36.34"
          y1="18.98"
          x2="36.34"
          y2="50.59"
          gradientUnits="userSpaceOnUse"
        >
          <stop className="[stop-color:var(--color-accent)]" />
          <stop offset="1" className="[stop-color:var(--color-background)]" />
        </linearGradient>
      </defs>
      <rect
        data-outline
        x="1"
        y="1"
        width="36.61"
        height="48.09"
        rx="3.01"
        className="stroke-accent"
        strokeWidth="2"
      />
      <path
        data-line-1=""
        d="M6.59 7.04H27.49"
        className="stroke-accent"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray={100}
        strokeDashoffset={100}
      />
      <path
        data-line-2=""
        d="M6.59 12.18H27.49"
        className="stroke-accent"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray={100}
        strokeDashoffset={100}
      />
      <path
        data-line-3=""
        d="M6.59 17.31H17.04"
        className="stroke-accent"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray={100}
        strokeDashoffset={100}
      />
      <path
        data-circle=""
        d="M27.68 22.57C32.46 17.79 40.23 17.79 45.01 22.57 49.8 27.36 49.8 35.12 45.01 39.9 40.23 44.69 32.46 44.69 27.68 39.9 22.89 35.12 22.89 27.36 27.68 22.57Z"
        fill={`url(#${gradientId})`}
        opacity={0}
      />
      <polyline
        data-tick=""
        points="41.12,28.55 35.13,34.17 32.22,31.66"
        className="stroke-background"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        pathLength={100}
        strokeDasharray={100}
        strokeDashoffset={100}
      />
    </svg>
  )
}
