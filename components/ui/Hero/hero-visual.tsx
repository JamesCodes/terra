import { useGSAP } from "@gsap/react"
import { useWebflowContext } from "@webflow/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowDown, ArrowUp, Minus } from "lucide-react"
import * as React from "react"
import { cn } from "tailwind-variants"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const findings = [
  {
    color: "#D13415",
    count: 5,
    label: "Critical Findings",
    badgeBg: "#FEEBE7",
    badgeBorder: "#FDBDAF",
    badgeText: "#D13415",
    Icon: ArrowUp,
    change: "15%",
  },
  {
    color: "#F2750E",
    count: 3,
    label: "High Findings",
    badgeBg: "#E6F6EB",
    badgeBorder: "#ADDDC0",
    badgeText: "#218358",
    Icon: ArrowDown,
    change: "8%",
  },
  {
    color: "#FFDB4E",
    count: 8,
    label: "Medium Findings",
    badgeBg: "#E6F6EB",
    badgeBorder: "#ADDDC0",
    badgeText: "#218358",
    Icon: ArrowDown,
    change: "4%",
  },
  {
    color: "#218358",
    count: 9,
    label: "Low Findings",
    badgeBg: "#F0F0F0",
    badgeBorder: "#E0E0E0",
    badgeText: "#646464",
    Icon: Minus,
    change: "0%",
  },
]

function HeroVisual() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { interactive } = useWebflowContext()

  useGSAP(
    () => {
      if (!interactive) return

      const layers = containerRef.current?.querySelectorAll("[data-depth]")
      if (!layers) return

      const quickSets = Array.from(layers).map((el) => {
        const depth = Number(el.getAttribute("data-depth")) || 1
        return {
          x: gsap.quickTo(el, "x", { duration: 0.6, ease: "power2.out" }),
          y: gsap.quickTo(el, "y", { duration: 0.6, ease: "power2.out" }),
          depth,
        }
      })

      const container = containerRef.current
      const maxOffset = 10
      const scrollOffset = 12

      // Entrance animation — back to front (lowest depth first)
      const sorted = Array.from(layers).sort(
        (a, b) =>
          (Number(a.getAttribute("data-depth")) || 1) - (Number(b.getAttribute("data-depth")) || 1),
      )
      const innerEls = sorted.map((layer) => layer.children[0])
      gsap.fromTo(
        innerEls,
        { y: 30, opacity: 0 },
        {
          delay: 0.5,
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15,
        },
      )

      // Mouse parallax
      const onMove = (e: MouseEvent) => {
        if (!container) return
        const rect = container.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2)))
        const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2)))
        for (const qs of quickSets) {
          qs.x(-nx * maxOffset * qs.depth)
          qs.y(-ny * maxOffset * qs.depth * 0.5)
        }
      }

      window.addEventListener("mousemove", onMove)

      // Scroll parallax
      for (const layer of layers) {
        const depth = Number(layer.getAttribute("data-depth")) || 1
        gsap.fromTo(
          layer,
          { yPercent: scrollOffset * depth },
          {
            yPercent: -scrollOffset * depth,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        )
      }

      return () => {
        window.removeEventListener("mousemove", onMove)
      }
    },
    { scope: containerRef, dependencies: [interactive], revertOnUpdate: true },
  )

  return (
    <div ref={containerRef} className="relative mx-auto h-full w-full origin-top lg:block">
      <div className="absolute top-[30%] left-[22%] h-[40%] w-[30%] rounded-full bg-[#6b1a00] blur-[90px]" />

      <div data-depth="0.5" className="absolute inset-0">
        <div
          className={cn(
            "absolute items-center gap-4 rounded-3xl bg-[#260700]",
            "top-12 -left-3 flex w-55.5 p-5",
            "md:top-30 md:left-20 md:w-71.5",
            "lg:top-12 lg:left-53 lg:w-86 lg:p-7",
          )}
        >
          <svg
            viewBox="0 0 78 78"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 shrink-0"
            aria-hidden="true"
          >
            <circle cx="39" cy="39" r="10" fill="#E65C32" />
            <circle
              cx="39"
              cy="39"
              r="18.375"
              stroke="#E65C32"
              strokeOpacity={0.6}
              strokeWidth={1.25}
            />
            <circle
              cx="39"
              cy="39"
              r="28.375"
              stroke="#E65C32"
              strokeOpacity={0.3}
              strokeWidth={1.25}
            />
            <circle
              cx="39"
              cy="39"
              r="38.375"
              stroke="#E65C32"
              strokeOpacity={0.1}
              strokeWidth={1.25}
            />
          </svg>
          <div className="flex flex-col justify-center">
            <p className="font-medium text-primary-foreground text-xs lg:text-sm">
              Signals Received
            </p>
            <p className="shrink font-medium text-[#FBFAF5] text-[40px] leading-tight lg:text-5xl">
              148
            </p>
          </div>
        </div>
      </div>

      <div data-depth="2.5" className="absolute inset-0">
        <div
          className={cn(
            "gradient-border-diagonal absolute rounded-3xl shadow-2xl backdrop-blur-2xl backdrop-saturate-90",
            "top-32 left-6.5 h-62.5 w-97.5",
            "md:top-54 md:left-1/2 md:h-72.5 md:w-102 md:-translate-x-1/2",
            "lg:top-35 lg:h-87 lg:w-122.5",
          )}
        >
          <div className="absolute top-0 left-0 h-full w-full p-10">
            <h3 className="font-medium text-[#FBFAF5] text-[32px]">Findings</h3>
            <span className="mt-2 inline-block rounded-full bg-[#F0EBD4] px-3 py-1.5 font-medium text-[#12110D] text-xs">
              Past 30 days
            </span>
          </div>

          <div className="absolute left-1/2 flex h-full w-full flex-col justify-center gap-2 md:gap-3">
            {findings.map((f) => (
              <div
                key={f.label}
                className="relative flex h-11 w-73.5 items-center gap-3 rounded-lg bg-white px-4 shadow-md md:h-13.5 md:rounded-xl"
              >
                <div
                  className="size-4 shrink-0 rounded-full md:size-5"
                  style={{ backgroundColor: f.color }}
                />
                <div className="min-w-0 flex-1 text-xs md:text-sm">
                  <span className="font-semibold text-[#202020]">{f.count}</span>
                  <span className="ml-1 text-[#202020]">{f.label}</span>
                </div>
                <div
                  className="absolute -right-6 flex shrink-0 items-center gap-1 rounded-full border px-2"
                  style={{ backgroundColor: f.badgeBg, borderColor: f.badgeBorder }}
                >
                  <f.Icon size={20} style={{ color: f.badgeText }} />
                  <span className="font-medium text-lg" style={{ color: f.badgeText }}>
                    {f.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Explore Terrain Button */}
      <div data-depth="4" className="absolute inset-0">
        <div
          className={cn(
            "gradient-border-pill absolute flex items-center gap-3 rounded-full shadow-2xl backdrop-blur-xl backdrop-saturate-90",
            "top-71.5 -left-4 w-48 p-2",
            "md:top-34 md:-right-7 md:left-auto md:w-60 md:px-3 md:py-2.5",
            "lg:top-12 lg:-right-12 lg:w-71",
          )}
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#E65C32]">
            <svg
              viewBox="903 116 26 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6"
              aria-hidden="true"
            >
              <path
                fill="white"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M912.037 120.329a8.7 8.7 0 0 0 .662-3.329h7.546a16.23 16.23 0 0 1-2.356 8.424c-.133.219.151.517.376.395 2.349-1.267 5.018-1.927 7.735-1.927v7.545c-2.307 0-4.541.896-6.172 2.527a8.7 8.7 0 0 0-2.476 5.036h-7.579a16.24 16.24 0 0 1 2.316-7.309c.133-.22-.15-.517-.376-.396q-.729.394-1.496.712a16.3 16.3 0 0 1-6.217 1.236v-7.545a8.7 8.7 0 0 0 6.151-2.548 8.7 8.7 0 0 0 1.886-2.821"
              />
            </svg>
          </div>
          <span className="grow md:text-center font-medium text-[#FBFAF5] text-sm md:text-xl">
            Explore Terrain
          </span>
        </div>
      </div>
    </div>
  )
}

export { HeroVisual }
