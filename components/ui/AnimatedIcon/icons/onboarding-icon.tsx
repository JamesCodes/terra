import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import * as React from "react"

export default function OnboardingIcon({
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

      tl.to("[data-left]", {
        opacity: 1,
        duration: speed,
        ease: "sine.in",
      })
        .to(
          "[data-right]",
          {
            opacity: 1,
            duration: speed,
            ease: "sine.in",
          },
          "<0.1",
        )
        .to(
          "[data-center]",
          {
            opacity: 1,
            duration: speed,
            ease: "sine.in",
          },
          ">-0.2",
        )
        .fromTo(
          "[data-badge]",
          { scale: 0, transformOrigin: "center center" },
          {
            scale: 1,
            duration: speed,
            ease: "back.out(1.7)",
          },
        )
        .fromTo(
          "[data-tick]",
          { strokeDashoffset: 100 },
          { strokeDashoffset: 0, duration: speed, ease: "power2.out" },
          "-=0.1",
        )

      if (loop) {
        tl.to("[data-left], [data-right], [data-center], [data-badge]", {
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
      viewBox="0 0 35.63 48.58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={`${gradientId}-body`}
          x1="17.92"
          y1="19.37"
          x2="17.92"
          y2="54.34"
          gradientUnits="userSpaceOnUse"
        >
          <stop className="[stop-color:var(--color-accent)]" />
          <stop offset="1" className="[stop-color:var(--color-background)]" />
        </linearGradient>
        <linearGradient
          id={`${gradientId}-head`}
          x1="17.92"
          y1="19.38"
          x2="17.92"
          y2="53.39"
          gradientUnits="userSpaceOnUse"
        >
          <stop className="[stop-color:var(--color-accent)]" />
          <stop offset="1" className="[stop-color:var(--color-background)]" />
        </linearGradient>
      </defs>

      {/* Left person */}
      <g data-left opacity={0}>
        <path
          d="M10.3 35.96C15.61 35.96 19.94 40.16 20.16 45.42H0.43C0.65 40.16 4.98 35.96 10.3 35.96Z"
          className="fill-accent stroke-accent"
          strokeWidth="0.84"
        />
        <circle
          cx="10.3"
          cy="29.71"
          r="5.99"
          className="fill-accent stroke-accent"
          strokeWidth="0.84"
        />
      </g>

      {/* Right person */}
      <g data-right opacity={0}>
        <path
          d="M25.34 35.96C30.65 35.96 34.98 40.16 35.2 45.42H15.47C15.69 40.16 20.02 35.96 25.34 35.96Z"
          className="fill-accent stroke-accent"
          strokeWidth="0.84"
        />
        <circle
          cx="25.33"
          cy="29.71"
          r="5.99"
          className="fill-accent stroke-accent"
          strokeWidth="0.84"
        />
      </g>

      {/* Center person (gradient, larger) */}
      <g data-center opacity={0}>
        <path
          d="M17.92 19.37C22.72 19.37 26.61 23.26 26.61 28.06 26.61 31.15 25 33.86 22.58 35.4 28.01 37.32 31.89 42.49 31.89 48.57H3.95C3.95 42.49 7.83 37.32 13.25 35.4 10.83 33.86 9.22 31.15 9.22 28.06 9.22 23.26 13.11 19.37 17.92 19.37Z"
          fill={`url(#${gradientId}-body)`}
        />
        <path
          d="M17.91 40.95L14.98 35.57H20.94L17.91 40.95Z"
          className="fill-background"
        />
        <path
          d="M17.96 39.73L19.77 48.58H16.08L17.96 39.73Z"
          className="fill-background"
        />
        <circle cx="17.92" cy="28.07" r="8.7" fill={`url(#${gradientId}-head)`} />
      </g>

      {/* Checkmark badge */}
      <g data-badge style={{ transformOrigin: "17.96px 7.68px" }}>
        <path
          d="M12.53 2.25C15.53-0.75 20.39-0.75 23.39 2.25 26.4 5.25 26.4 10.12 23.39 13.12 20.39 16.11 15.53 16.12 12.53 13.12 9.53 10.12 9.53 5.25 12.53 2.25Z"
          className="fill-accent"
        />
        <polyline
          data-tick
          points="21.5,5.69 17.07,9.85 14.91,7.99"
          className="stroke-background"
          strokeWidth="2"
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
