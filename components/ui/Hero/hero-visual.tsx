import { useGSAP } from "@gsap/react"
import { useWebflowContext } from "@webflow/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowDown, ArrowUp, Minus } from "lucide-react"
import * as React from "react"
import { cn } from "tailwind-variants"
import TerraIcon from "@/components/icons/terra-icon.svg"
import { AnimatedIcon } from "@/components/ui/AnimatedIcon/animated-icon"

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
          clearProps: "transform",
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
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div
          className={cn(
            "absolute rounded-full bg-[#6b1a00] blur-[90px]",
            "bottom-0 left-0 size-83 -translate-x-1/2 translate-y-1/2",
            "md:right-0 md:left-auto md:translate-x-1/2",
            "lg:size-105",
          )}
        />
      </div>

      <div data-depth="0.5" className="absolute inset-0">
        <div
          className={cn(
            "absolute items-center gap-4 rounded-3xl bg-magma",
            "top-12 -left-3 flex w-55.5 p-5",
            "md:top-30 md:left-20 md:w-71.5",
            "lg:top-12 lg:left-53 lg:w-86 lg:p-7",
          )}
        >
          <AnimatedIcon icon="target" speed={9.5} />
          <div className="flex flex-col justify-center">
            <p className="font-medium text-primary-foreground text-xs lg:text-sm">
              Signals Received
            </p>
            <p className="shrink font-medium text-[40px] text-chalk leading-tight lg:text-5xl">
              148
            </p>
          </div>
        </div>
      </div>

      <div data-depth="2.5" className="absolute inset-0">
        <div
          className={cn(
            "gradient-border-diagonal absolute rounded-3xl bg-glass shadow-2xl",
            "top-32 left-6.5 h-62.5 w-97.5",
            "md:top-54 md:left-1/2 md:h-72.5 md:w-102 md:-translate-x-1/2",
            "lg:top-35 lg:h-87 lg:w-122.5",
          )}
        >
          <div className="absolute top-0 left-0 h-full w-full p-10">
            <h3 className="font-medium text-[32px] text-chalk">Findings</h3>
            <span className="mt-2 inline-block rounded-full bg-chalk px-3 py-1.5 font-medium text-obsidian text-xs">
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
                  <span className="font-semibold text-neutral">{f.count}</span>
                  <span className="ml-1 text-neutral">{f.label}</span>
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
            "gradient-border-pill absolute flex items-center gap-3 rounded-full bg-glass shadow-2xl",
            "top-71.5 -left-4 w-48 p-2",
            "md:top-34 md:-right-7 md:left-auto md:w-60 md:px-3 md:py-2.5",
            "lg:top-12 lg:-right-12 lg:w-71",
          )}
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent">
            <div className="size-6">
              <TerraIcon />
            </div>
          </div>
          <span className="grow font-medium text-chalk text-sm md:text-center md:text-xl">
            Explore Terrain
          </span>
        </div>
      </div>
    </div>
  )
}

export { HeroVisual }
