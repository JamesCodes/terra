import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import * as React from "react"

export default function ComplianceIcon({
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

      for (let i = 1; i <= 5; i++) {
        tl.fromTo(
          `[data-line-${i}]`,
          { strokeDashoffset: 100 },
          { strokeDashoffset: 0, duration: speed, ease: "power2.out" },
          `lines+=${(i - 1) * speed * 0.3}`,
        )
      }

      tl.fromTo(
        "[data-circle]",
        { scale: 0, opacity: 1, svgOrigin: "38.7 38.7" },
        { scale: 1, duration: speed, ease: "back.out(1.7)" },
        `lines+=${4 * speed * 0.3}`,
      ).fromTo(
        "[data-tick]",
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: speed * 0.8, ease: "power2.out" },
        ">-0.1",
      )

      if (loop) {
        tl.to(
          "[data-line-1], [data-line-2], [data-line-3], [data-line-4], [data-line-5], [data-circle], [data-tick]",
          {
            opacity: 0,
            duration: speed,
            ease: "power2.in",
            delay: 2,
          },
        )
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
      overflow="visible"
      className="size-full"
      aria-hidden="true"
    >
      <defs>
        {[1, 2, 3].map((i) => (
          <linearGradient
            key={i}
            id={`${gradientId}-${i}`}
            x1="2.42"
            y1="0"
            x2="45.75"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop className="[stop-color:var(--color-accent)]" />
            <stop offset="1" className="[stop-color:var(--color-background)]" />
          </linearGradient>
        ))}
        {[4, 5].map((i) => (
          <linearGradient
            key={i}
            id={`${gradientId}-${i}`}
            x1="2.42"
            y1="0"
            x2="22.9"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop className="[stop-color:var(--color-accent)]" />
            <stop offset="1" className="[stop-color:var(--color-background)]" />
          </linearGradient>
        ))}
      </defs>
      <g>
        <path
          data-line-1=""
          d="M45.75 4.79H2.42"
          stroke={`url(#${gradientId}-1)`}
          strokeWidth="4.85"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={100}
          strokeDashoffset={100}
        />
        <path
          data-line-2=""
          d="M45.75 14.48H2.42"
          stroke={`url(#${gradientId}-2)`}
          strokeWidth="4.85"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={100}
          strokeDashoffset={100}
        />
        <path
          data-line-3=""
          d="M45.75 24.18H2.42"
          stroke={`url(#${gradientId}-3)`}
          strokeWidth="4.85"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={100}
          strokeDashoffset={100}
        />
        <path
          data-line-4=""
          d="M22.9 33.88H2.42"
          stroke={`url(#${gradientId}-4)`}
          strokeWidth="4.85"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={100}
          strokeDashoffset={100}
        />
        <path
          data-line-5=""
          d="M22.9 44.3H2.42"
          stroke={`url(#${gradientId}-5)`}
          strokeWidth="4.85"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={100}
          strokeDashoffset={100}
        />
        <path
          data-circle=""
          d="M32.12 32.13C35.75 28.5 41.64 28.5 45.27 32.13 48.9 35.76 48.9 41.65 45.27 45.28 41.64 48.91 35.75 48.91 32.12 45.28 28.49 41.65 28.49 35.76 32.12 32.13Z"
          className="fill-accent"
          opacity={0}
        />
        <polyline
          data-tick=""
          points="42.97,36.02 37.23,41.4 34.44,39"
          className="stroke-background"
          strokeWidth="1.45"
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
