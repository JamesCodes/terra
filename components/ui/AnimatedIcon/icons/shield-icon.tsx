import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import * as React from "react"

export default function ShieldIcon({
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

  const shieldGradientId = React.useId().replace(/:/g, "")

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
        "[data-reveal]",
        { attr: { height: 0 }, opacity: 1 },
        { attr: { height: 80 }, duration: speed, ease: "power2.out" },
      ).fromTo(
        "[data-tick]",
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: speed, ease: "power2.out" },
        "-=0.1",
      )
      if (loop) {
        tl.to("[data-reveal]", {
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
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-full"
      aria-hidden="true"
    >
      <g mask={`url(#${shieldGradientId}-mask)`}>
        <path
          d="M28.678 36.71L24.5703 39.1502C24.253 39.3388 23.8576 39.3372 23.5418 39.1461L19.4965 36.6986C13.651 33.1626 10.08 26.8269 10.08 19.9941V12.0565C10.08 11.5872 10.4064 11.181 10.8648 11.08L23.9014 8.2072C24.0425 8.1761 24.1887 8.17596 24.3299 8.20678L37.4969 11.0812C37.9562 11.1814 38.2836 11.5881 38.2836 12.0582V19.8266C38.2836 26.7551 34.6331 33.1703 28.6786 36.7104Z"
          fill={`url(#${shieldGradientId})`}
        />
      </g>
      <polyline
        data-tick
        points="18.5,23.5 22,27 29.5,19"
        className="stroke-background"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
        pathLength={100}
        strokeDasharray={100}
        strokeDashoffset={100}
      />
      <path
        d="M29.8261 39.788L24.5977 42.8937C24.2804 43.0823 23.8851 43.0807 23.5693 42.8896L18.419 39.7738C11.1566 35.381 6.72 27.5101 6.72 19.0216V8.966C6.72 8.49663 7.04644 8.09043 7.50481 7.98943L23.9436 4.36719C24.0847 4.3361 24.2309 4.33596 24.372 4.36677L40.9733 7.99063C41.4326 8.09088 41.76 8.49752 41.76 8.96762V18.8136C41.76 27.4209 37.2247 35.3906 29.8268 39.7884Z"
        className="stroke-accent"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        fill="none"
      />
      <defs>
        <linearGradient
          id={`${shieldGradientId}-reveal`}
          gradientUnits="objectBoundingBox"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0" stopColor="white" />
          <stop offset="0.5" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id={`${shieldGradientId}-mask`}>
          <rect
            data-reveal
            x="8"
            y="8"
            width="32"
            height={0}
            fill={`url(#${shieldGradientId}-reveal)`}
          />
        </mask>
        <linearGradient
          id={shieldGradientId}
          x1="24.1818"
          y1="8.16"
          x2="24.1818"
          y2="43.68"
          gradientUnits="userSpaceOnUse"
        >
          <stop className="[stop-color:var(--color-accent)]" />
          <stop offset="1" className="[stop-color:var(--color-background)]" />
        </linearGradient>
      </defs>
    </svg>
  )
}
