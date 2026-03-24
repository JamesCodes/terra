import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import * as React from "react"

export default function MarketIcon({
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
  const id = React.useId().replace(/:/g, "")

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

      tl.to("[data-ring]", { opacity: 1, duration: speed, ease: "power2.out" })
        .addLabel("globe")
        .to("[data-fill]", { opacity: 1, duration: speed, ease: "power2.out" }, "globe")
        .to(
          "[data-continent]",
          {
            strokeDashoffset: 0,
            duration: speed * 2,
            ease: "power2.out",
            stagger: speed * 0.3,
          },
          `globe+=${speed * 0.5}`,
        )
        .addLabel("arrow", `>-=${speed * 0.5}`)
        .to("[data-arrow]", { opacity: 1, duration: speed * 0.6, ease: "power2.out" }, "arrow")

      if (loop) {
        tl.to(
          "[data-ring], [data-fill], [data-continent], [data-arrow]",
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
      viewBox="-5.23 -5.23 58.69 58.69"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={`${id}-grad`}
          x1="24.11"
          y1="8.41"
          x2="24.11"
          y2="39.82"
          gradientUnits="userSpaceOnUse"
        >
          <stop className="[stop-color:var(--color-accent)]" />
          <stop offset="1" className="[stop-color:var(--color-background)]" />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <rect width="48.23" height="48.23" rx="24.11" />
        </clipPath>
        <mask id={`${id}-mask`} maskUnits="userSpaceOnUse" x="8" y="8" width="32" height="32">
          <ellipse cx="24.11" cy="24.11" rx="15.7" ry="15.7" fill={`url(#${id}-grad)`} />
        </mask>
      </defs>

      {/* Globe */}
      <g clipPath={`url(#${id}-clip)`}>
        <circle
          data-ring
          cx="24.11"
          cy="24.11"
          r="23.36"
          className="stroke-accent"
          strokeWidth="1.5"
          opacity={0}
        />
        <ellipse
          data-fill
          cx="24.11"
          cy="24.11"
          rx="15.7"
          ry="15.7"
          fill={`url(#${id}-grad)`}
          opacity={0}
        />
        <g mask={`url(#${id}-mask)`}>
          <path
            data-continent
            d="M9.3 17.9L12.9 21.36 16.24 26.11 21.76 27.01 18.35 23.68 19.32 21.36H22.41L25.74 17 23.05 14.94 23.95 12.24 27.8 11.6"
            className="stroke-background"
            strokeWidth="0.96"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={100}
            strokeDasharray={100}
            strokeDashoffset={100}
          />
          <path
            data-continent
            d="M35.72 13.15L35.21 16.79 35.72 19.1 37.83 20.72 40.07 21.44"
            className="stroke-background"
            strokeWidth="0.96"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={100}
            strokeDasharray={100}
            strokeDashoffset={100}
          />
          <path
            data-continent
            d="M29.35 25.51L36.2 26.32 39.09 31.28 36.2 36.87 30.25 38.67 27.19 35.25 24.57 31.28 25.38 27.13 29.35 25.51Z"
            className="stroke-background"
            strokeWidth="0.96"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={100}
            strokeDasharray={100}
            strokeDashoffset={100}
          />
        </g>
      </g>

      {/* Arrow */}
      <g data-arrow transform="translate(36.77, 2.93)" opacity={0}>
        <circle
          cx="8.34"
          cy="8.34"
          r="8.34"
          className="fill-accent"
        />
        <g transform="translate(3.97, 4.54)">
          <path
            d="M0.34 3.8L8.61 3.8"
            className="stroke-background"
            strokeWidth="0.68"
            strokeLinecap="round"
          />
          <path
            d="M5.32 0.34L8.74 3.8L5.32 7.26"
            className="stroke-background"
            strokeWidth="0.68"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  )
}
