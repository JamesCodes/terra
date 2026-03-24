import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import * as React from "react"

export default function SupportIcon({
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
  const speed = duration * 0.15

  useGSAP(
    () => {
      if (!active) return

      const tl = gsap.timeline({
        repeat: loop ? -1 : 0,
        repeatDelay: loop ? 1 : 0,
        paused,
      })
      tlRef.current = tl

      tl.to("[data-star]", {
        opacity: 1,
        duration: speed,
        ease: "sine.in",
      })
        .fromTo(
          "[data-arc]",
          { strokeDashoffset: 200 },
          { strokeDashoffset: 0, duration: speed * 2, ease: "power2.out" },
        )
        .to(
          "[data-ear]",
          {
            opacity: 1,
            duration: speed,
            ease: "sine.in",
            stagger: 0.15,
          },
          "-=0.3",
        )
        .fromTo(
          "[data-mic]",
          { scale: 0, svgOrigin: "32.99 42.09" },
          {
            scale: 1,
            duration: speed,
            ease: "back.out(1.7)",
            svgOrigin: "32.99 42.09",
          },
          "-=0.2",
        )

      if (loop) {
        tl.to("[data-arc], [data-ear], [data-star], [data-mic]", {
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
      viewBox="0 0 48.29 45.51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-full"
      aria-hidden="true"
    >
      {/* Headset arc */}
      <path
        data-arc
        d="M2.84 22.38C2.84 10.57 12.42 1 24.23 1 36.04 1 45.61 10.57 45.61 22.38 45.61 31.17 40.31 38.71 32.74 42"
        className="stroke-accent"
        strokeWidth="2"
        pathLength={200}
        strokeDasharray={200}
        strokeDashoffset={200}
      />

      {/* Left earpiece */}
      <rect
        data-ear
        x="1"
        y="17.69"
        width="5.07"
        height="12.25"
        rx="2.53"
        className="fill-background stroke-accent"
        strokeWidth="2"
        opacity={0}
      />

      {/* Right earpiece */}
      <rect
        data-ear
        x="42.22"
        y="17.69"
        width="5.07"
        height="12.25"
        rx="2.53"
        className="fill-background stroke-accent"
        strokeWidth="2"
        opacity={0}
      />

      {/* Center asterisk/compass */}
      <g data-star transform="translate(14.47 13.08)" opacity={0}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.07 2.93C7.45 2 7.65 1 7.65 0H14.29C14.29 1.88 13.92 3.73 13.2 5.47 12.92 6.14 12.59 6.79 12.22 7.41 12.1 7.6 12.35 7.86 12.55 7.76 14.61 6.64 16.96 6.06 19.35 6.06V12.7C17.32 12.7 15.36 13.49 13.92 14.92 12.72 16.12 11.96 17.68 11.74 19.35H5.08C5.23 17.07 5.94 14.86 7.11 12.92 7.23 12.73 6.98 12.47 6.78 12.57 6.36 12.8 5.92 13.01 5.47 13.2 3.73 13.92 1.88 14.29 0 14.29V7.65C1 7.65 2 7.45 2.93 7.07 3.86 6.68 4.7 6.12 5.41 5.41 6.12 4.7 6.68 3.86 7.07 2.93Z"
          className="fill-accent"
        />
      </g>

      {/* Mic dot */}
      <circle
        data-mic
        cx="32.99"
        cy="42.09"
        r="2.42"
        className="fill-background stroke-accent"
        strokeWidth="2"
      />
    </svg>
  )
}
