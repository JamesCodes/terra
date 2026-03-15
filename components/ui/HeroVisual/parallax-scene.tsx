import { useGSAP } from "@gsap/react"
import { useWebflowContext } from "@webflow/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import * as React from "react"
import { cn } from "tailwind-variants"

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface ParallaxSceneProps extends React.ComponentProps<"div"> {
  maxOffset?: number
  scrollOffset?: number
  entranceDelay?: number
  entranceDuration?: number
  entranceStagger?: number
  children: React.ReactNode
}

function ParallaxScene({
  maxOffset = 10,
  scrollOffset = 12,
  entranceDelay = 0.5,
  entranceDuration = 0.8,
  entranceStagger = 0.15,
  className,
  children,
  ...rest
}: ParallaxSceneProps) {
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

      const sorted = Array.from(layers).sort(
        (a, b) =>
          (Number(a.getAttribute("data-depth")) || 1) - (Number(b.getAttribute("data-depth")) || 1),
      )
      const innerEls = sorted.map((layer) => layer.children[0])
      gsap.fromTo(
        innerEls,
        { y: 30, opacity: 0 },
        {
          delay: entranceDelay,
          y: 0,
          opacity: 1,
          duration: entranceDuration,
          ease: "power2.out",
          stagger: entranceStagger,
          clearProps: "transform",
        },
      )

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
    <div
      ref={containerRef}
      className={cn("relative mx-auto h-full w-full origin-top lg:block", className)}
      {...rest}
    >
      {children}
    </div>
  )
}

export { ParallaxScene }
export type { ParallaxSceneProps }
