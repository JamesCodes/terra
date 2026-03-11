import { useGSAP } from "@gsap/react"
import { useWebflowContext } from "@webflow/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowDown, ArrowUp, Minus } from "lucide-react"
import * as React from "react"

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

      const container = containerRef.current!
      const maxOffset = 10
      const scrollOffset = 12

      // Entrance animation — back to front (lowest depth first)
      const sorted = Array.from(layers).sort(
        (a, b) =>
          (Number(a.getAttribute("data-depth")) || 1) - (Number(b.getAttribute("data-depth")) || 1),
      )
      const innerEls = sorted.map((layer) => layer.children[0].children[0])
      gsap.fromTo(
        innerEls,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15,
        },
      )

      // Mouse parallax
      const onMove = (e: MouseEvent) => {
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
    <div ref={containerRef} className="relative mx-auto hidden w-[56rem] aspect-[133/60] lg:block">
      {/* Blur glow */}
      <div className="absolute left-[22%] top-[30%] h-[40%] w-[30%] rounded-full bg-[#6b1a00] blur-[90px]" />

      {/* Signals Card */}
      <div data-depth="0.5" className="absolute inset-0">
        <div className="relative w-full h-full">
          <div className="flex -my-10 ml-20 w-[344px] items-center gap-4 rounded-3xl bg-[#260700] p-7">
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
            <div>
              <p className="text-sm font-medium text-primary-foreground">Signals Received</p>
              <p className="text-5xl font-medium text-[#FBFAF5]">148</p>
            </div>
          </div>
        </div>
      </div>

      {/* Findings Panel */}
      <div data-depth="2.5" className="absolute inset-0">
        {/* Outer gradient card */}
        <div className="relative w-full h-full flex justify-center items pt-10">
          <div
            className="gradient-border-diagonal w-[490px] h-[348px] rounded-3xl shadow-2xl backdrop-blur-2xl backdrop-saturate-90"
            // style={{ height: "61.4%" }}
          >
            <div className="absolute w-full h-full left-0 top-0 p-10">
              <h3 className="text-[32px] font-medium text-[#FBFAF5]">Findings</h3>
              <span className="mt-2 inline-block font-medium rounded-full bg-[#F0EBD4] px-3 py-1.5 text-xs text-[#12110D]">
                Past 30 days
              </span>
            </div>

            <div className="relative w-full h-full flex flex-col justify-center items-end -right-10 gap-3">
              {/* Finding rows */}
              {findings.map((f, i) => (
                <div
                  key={f.label}
                  className="flex relative items-center gap-3 rounded-xl bg-white px-4 shadow-md w-[294px] h-[54px]"
                >
                  <div
                    className="size-5 shrink-0 rounded-full"
                    style={{ backgroundColor: f.color }}
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-sm font-semibold text-[#202020]">{f.count}</span>
                    <span className="ml-1 text-sm text-[#202020]">{f.label}</span>
                  </div>
                  <div
                    className="flex shrink-0 items-center gap-1 rounded-full border px-2 absolute -right-6"
                    style={{ backgroundColor: f.badgeBg, borderColor: f.badgeBorder }}
                  >
                    <f.Icon size={20} style={{ color: f.badgeText }} />
                    <span className="text-lg font-medium" style={{ color: f.badgeText }}>
                      {f.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Explore Terrain Button */}
      <div data-depth="4" className="absolute inset-0">
        <div className="relative w-full h-full flex flex-col items-end">
          <div className="gradient-border-pill flex w-[285px] -mr-30 -mt-18 items-center gap-3 rounded-full px-3 py-2.5 shadow-2xl backdrop-blur-xl backdrop-saturate-90">
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
            <span className="text-xl grow font-medium text-center text-[#FBFAF5]">
              Explore Terrain
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export { HeroVisual }
