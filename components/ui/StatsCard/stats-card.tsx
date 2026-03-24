import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import * as React from "react"
import { cn } from "@/lib/utils"

gsap.registerPlugin(useGSAP, SplitText)

function useInView(ref: React.RefObject<Element | null>) {
  const [inView, setInView] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])

  return inView
}

interface StatsCardProps extends React.ComponentProps<"div"> {
  value: string
  suffix?: string
  description?: string
}

function StatsCard({ className, value, suffix, description, ...props }: StatsCardProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const valueRef = React.useRef<HTMLSpanElement>(null)
  const suffixRef = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(containerRef)

  const numericTarget = Number.parseFloat(value)
  const isNumeric = !Number.isNaN(numericTarget)
  const isInteger = isNumeric && Number.isInteger(numericTarget)

  useGSAP(
    () => {
      if (!inView || !isNumeric) return
      if (!valueRef.current || !suffixRef.current) return

      const tl = gsap.timeline()

      valueRef.current.textContent = "0"

      const suffixSplit = new SplitText(suffixRef.current, { type: "chars" })
      gsap.set(suffixSplit.chars, { opacity: 0 })

      tl.to(
        { val: 0 },
        {
          val: numericTarget,
          duration: 1.6,
          ease: "power2.out",
          snap: isInteger ? { val: 1 } : undefined,
          onUpdate() {
            if (!valueRef.current) return
            const current = isInteger
              ? Math.round(this.targets()[0].val)
              : this.targets()[0].val.toFixed(1)
            valueRef.current.textContent = String(current)
          },
          onComplete() {
            if (!valueRef.current) return
            valueRef.current.textContent = value
          },
        },
      )

      tl.to(
        suffixSplit.chars,
        {
          opacity: 1,
          stagger: 0.03,
          duration: 0.4,
          ease: "power2.out",
          onComplete() {
            suffixSplit.revert()
          },
        },
        "-=0.2",
      )
    },
    { scope: containerRef, dependencies: [inView] },
  )

  return (
    <div
      ref={containerRef}
      data-slot="stats-card"
      className={cn(
        "gradient-border relative flex flex-1 gap-9 overflow-clip rounded-2xl border-primary-foreground/20 px-6 py-8 text-primary-foreground backdrop-blur-[3px]",
        "max-md:items-center max-md:pr-4",
        "md:aspect-110/137 md:flex-col md:justify-between lg:aspect-35/38",
        className,
      )}
      {...props}
    >
      <p
        data-slot="stats-card-value"
        className="relative whitespace-nowrap font-light text-[40px] tracking-[-2%] max-md:w-[30%] lg:text-[70px]"
      >
        <span className="invisible" aria-hidden="true">
          {value}
          <span className="text-[32px] lg:text-[50px]">{suffix}</span>
        </span>
        <span className="absolute top-0 left-0">
          <span ref={valueRef}>{value}</span>
          <span ref={suffixRef} className="text-[32px] lg:text-[50px]">
            {suffix}
          </span>
        </span>
      </p>
      <p data-slot="stats-card-description" className="brand-body2 text-balance lg:max-w-60">
        {description}
      </p>
    </div>
  )
}

export { StatsCard }
