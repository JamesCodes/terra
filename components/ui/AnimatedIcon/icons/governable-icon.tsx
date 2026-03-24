import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import * as React from "react"

const BOLT_OFFSET_MID = 8.13
const BOLT_OFFSET_FAR = 15.54

export default function GovernableIcon({
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

      const speed = duration * 0.2
      const tl = gsap.timeline({
        repeat: loop ? -1 : 0,
        repeatDelay: loop ? 1 : 0,
        paused,
      })
      tlRef.current = tl

      gsap.set("[data-bolt-mid]", { x: -BOLT_OFFSET_MID })
      gsap.set("[data-bolt-far]", { x: -BOLT_OFFSET_FAR })

      tl.addLabel("slide")
        .to("[data-bolt-far]", { x: 0, duration: speed, ease: "power2.out" }, "slide")
        .to(
          "[data-bolt-mid]",
          { x: 0, duration: speed, ease: "power2.out" },
          `slide+=${speed * 0.15}`,
        )

      if (loop) {
        tl.addLabel("retract", `+=${2}`)
          .to(
            "[data-bolt-mid]",
            { x: -BOLT_OFFSET_MID, duration: speed, ease: "power2.in" },
            "retract",
          )
          .to(
            "[data-bolt-far]",
            { x: -BOLT_OFFSET_FAR, duration: speed, ease: "power2.in" },
            `retract+=${speed * 0.15}`,
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
      className="size-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="21.89"
          y1="3.89"
          x2="21.89"
          y2="44.1"
          gradientUnits="userSpaceOnUse"
        >
          <stop className="[stop-color:var(--color-accent)]" />
          <stop offset="1" className="[stop-color:var(--color-background)]" />
        </linearGradient>
      </defs>
      {/* Back: outline bolt */}
      <path
        data-bolt-far
        d="M30.4443 21.6718C30.4443 22.5002 31.1159 23.1718 31.9443 23.1718H40.4032C41.5692 23.1718 42.2893 24.4439 41.6893 25.4437L30.9346 43.365C30.1518 44.6694 28.1484 44.1144 28.1484 42.5931V26.2343C28.1484 25.4059 27.4768 24.7343 26.6484 24.7343H18.1951C17.0279 24.7343 16.3079 23.4599 16.9104 22.4601L27.6595 4.62141C28.4439 3.31964 30.4443 3.87575 30.4443 5.39559V21.6718Z"
        className="stroke-accent"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Middle: gradient bolt */}
      <path
        data-bolt-mid
        d="M23.0361 21.6718C23.0361 22.5002 23.7077 23.1718 24.5361 23.1718H32.995C34.1609 23.1718 34.8811 24.4439 34.2811 25.4437L23.5264 43.365C22.7436 44.6694 20.7402 44.1144 20.7402 42.5931V26.2343C20.7402 25.4059 20.0686 24.7343 19.2402 24.7343H10.7869C9.61972 24.7343 8.89974 23.4599 9.50215 22.4601L20.2513 4.62141C21.0357 3.31964 23.0361 3.87575 23.0361 5.39559V21.6718Z"
        fill={`url(#${gradientId})`}
      />
      {/* Front: solid bolt */}
      <path
        d="M14.9042 21.6715C14.9042 22.4999 15.5758 23.1715 16.4042 23.1715H24.8631C26.0291 23.1715 26.7493 24.4435 26.1493 25.4433L15.3945 43.3646C14.6117 44.6691 12.6083 44.1141 12.6083 42.5928V26.234C12.6083 25.4055 11.9368 24.734 11.1083 24.734H2.65508C1.48787 24.734 0.767889 23.4595 1.3703 22.4598L12.1195 4.62107C12.9039 3.3193 14.9042 3.8754 14.9042 5.39524V21.6715Z"
        className="fill-accent"
      />
    </svg>
  )
}
