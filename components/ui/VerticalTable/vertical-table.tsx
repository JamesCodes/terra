import { ArrowLeft, ArrowRight } from "lucide-react"
import type * as React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface VerticalTableProps extends React.ComponentProps<"div"> {
  heading?: string
  columns?: number
  footer?: string
  col1Header: string
  col2Header?: string
  col3Header?: string
  col4Header?: string
}

function VerticalTable({
  heading,
  columns = 4,
  footer,
  col1Header,
  col2Header,
  col3Header,
  col4Header,
  children,
  className,
  ...props
}: VerticalTableProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScroll, setCanScroll] = useState(false)
  const [scrollState, setScrollState] = useState({ thumbWidth: 100, thumbOffset: 0 })

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    setCanScroll(maxScroll > 0)
    if (maxScroll <= 0) {
      setScrollState({ thumbWidth: 100, thumbOffset: 0 })
      return
    }
    const thumbWidth = (el.clientWidth / el.scrollWidth) * 100
    const scrollRatio = el.scrollLeft / maxScroll
    const thumbOffset = scrollRatio * (100 - thumbWidth)
    setScrollState({ thumbWidth, thumbOffset })
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateScrollState()
    const observer = new ResizeObserver(updateScrollState)
    observer.observe(el)
    return () => observer.disconnect()
  }, [updateScrollState])

  const scroll = useCallback((direction: number) => {
    scrollRef.current?.scrollBy({ left: direction * 120, behavior: "smooth" })
  }, [])

  const trackRef = useRef<HTMLDivElement>(null)

  const handleTrackPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current
    const track = trackRef.current
    if (!el || !track) return

    e.preventDefault()
    track.setPointerCapture(e.pointerId)

    const maxScroll = el.scrollWidth - el.clientWidth
    if (maxScroll <= 0) return

    const scrollToPosition = (clientX: number) => {
      const rect = track.getBoundingClientRect()
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
      el.scrollLeft = ratio * maxScroll
    }

    scrollToPosition(e.clientX)

    const onMove = (ev: PointerEvent) => scrollToPosition(ev.clientX)
    const onUp = () => {
      track.removeEventListener("pointermove", onMove)
      track.removeEventListener("pointerup", onUp)
    }

    track.addEventListener("pointermove", onMove)
    track.addEventListener("pointerup", onUp)
  }, [])

  return (
    <div
      data-slot="vertical-table"
      className={cn("flex flex-col gap-10 pb-5 lg:gap-15 lg:pl-16", className)}
      {...props}
    >
      {heading && <p className="brand-body1 text-primary">{heading}</p>}
      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        className="overflow-x-auto overflow-y-hidden rounded-2xl border border-border [scrollbar-width:none]"
      >
        <div className="min-w-120">
          <div className="flex bg-border">
            {[col1Header, col2Header, col3Header, col4Header].slice(0, columns).map((header, i) => (
              <div
                key={i}
                className={cn(
                  "w-30 shrink-0 overflow-clip px-3.5 py-4 lg:w-auto lg:min-w-0 lg:flex-1 lg:px-8 lg:py-6",
                  { "border-border border-r": i < columns - 1 },
                )}
              >
                <p className="brand-body2 font-bold text-primary">{header}</p>
              </div>
            ))}
          </div>
          {children}
        </div>
      </div>
      <div className={cn("flex items-center gap-10", { hidden: !canScroll })}>
        <div className="flex items-center gap-6">
          <button type="button" onClick={() => scroll(-1)} aria-label="Scroll left">
            <ArrowLeft className="size-4 text-primary" />
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label="Scroll right">
            <ArrowRight className="size-4 text-primary" />
          </button>
        </div>
        <div
          ref={trackRef}
          onPointerDown={handleTrackPointerDown}
          className="relative h-0.5 flex-1 cursor-pointer overflow-hidden rounded-full bg-border"
        >
          <div
            className="absolute top-0 h-full rounded-full bg-primary transition-[left] duration-150"
            style={{ width: `${scrollState.thumbWidth}%`, left: `${scrollState.thumbOffset}%` }}
          />
        </div>
      </div>

      {footer && (
        <div data-slot="vertical-table-footer" className="border-border">
          <p className="brand-body1 text-primary">{footer}</p>
        </div>
      )}
    </div>
  )
}

export { VerticalTable }
