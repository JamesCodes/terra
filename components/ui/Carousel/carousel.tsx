import { ArrowLeft, ArrowRight } from "lucide-react"
import type * as React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import ArrowIcon from "@/components/icons/arrow.svg"
import { type ResponsiveProps, responsiveClass, responsiveStyles } from "@/lib/responsive-props"
import { cn } from "@/lib/utils"

interface CarouselProps
  extends React.ComponentProps<"div">,
    ResponsiveProps<{
      gap: number
      contentsMaxHeight: number
      itemWidth: number
    }> {
  useContentsMaxHeight?: boolean
  useItemWidth?: boolean
}

function Carousel({
  children,
  className,
  gap = 16,
  gapTablet,
  gapMobile,
  useContentsMaxHeight = false,
  contentsMaxHeight = 334,
  contentsMaxHeightTablet,
  contentsMaxHeightMobile,
  useItemWidth = false,
  itemWidth = 320,
  itemWidthTablet,
  itemWidthMobile,
  style,
  ...props
}: CarouselProps) {
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
    const resizeObserver = new ResizeObserver(updateScrollState)
    resizeObserver.observe(el)
    const mutationObserver = new MutationObserver(updateScrollState)
    mutationObserver.observe(el, { childList: true, subtree: true })
    let polls = 0
    const interval = setInterval(() => {
      polls++
      updateScrollState()
      if (el.scrollWidth > el.clientWidth || polls >= 20) {
        clearInterval(interval)
      }
    }, 100)
    return () => {
      resizeObserver.disconnect()
      mutationObserver.disconnect()
      clearInterval(interval)
    }
  }, [updateScrollState])

  const getItems = useCallback((): HTMLElement[] => {
    const el = scrollRef.current
    if (!el) return []
    const items: HTMLElement[] = []
    const collect = (parent: Element) => {
      const children =
        parent instanceof HTMLSlotElement ? parent.assignedElements() : Array.from(parent.children)
      for (const child of children) {
        const htmlEl = child as HTMLElement
        if (htmlEl.offsetWidth > 0) {
          items.push(htmlEl)
        } else {
          if (htmlEl.shadowRoot) {
            collect(htmlEl.shadowRoot as unknown as Element)
          }
          collect(child)
        }
      }
    }
    collect(el)
    return items
  }, [])

  const scroll = useCallback(
    (direction: number) => {
      const el = scrollRef.current
      if (!el) return
      const items = getItems()
      const containerRect = el.getBoundingClientRect()
      const padLeft = parseFloat(getComputedStyle(el).paddingLeft) || 0
      const visibleLeft = containerRect.left + padLeft
      const visibleRight = containerRect.right

      if (direction > 0) {
        const firstVisible = items.find(
          (item) => item.getBoundingClientRect().right > visibleLeft + 1,
        )
        if (firstVisible) {
          const nextItem = items[items.indexOf(firstVisible) + 1]
          if (nextItem) {
            const targetLeft = nextItem.getBoundingClientRect().left
            el.scrollTo({ left: el.scrollLeft + (targetLeft - visibleLeft), behavior: "smooth" })
          }
        }
      } else {
        const target = [...items]
          .reverse()
          .find((item) => item.getBoundingClientRect().left < visibleLeft - 1)
        if (target) {
          const itemLeft = target.getBoundingClientRect().left
          el.scrollTo({ left: el.scrollLeft + (itemLeft - visibleLeft), behavior: "smooth" })
        } else {
          el.scrollTo({ left: 0, behavior: "smooth" })
        }
      }
    },
    [getItems],
  )

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
      data-slot="carousel"
      className={cn("flex flex-col gap-10 lg:gap-25", className)}
      {...props}
    >
      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        className={cn(
          `grid grid-flow-col overflow-x-auto [scrollbar-width:none] ${useItemWidth ? responsiveClass("auto-cols", "item-w") : "auto-cols-max"} ${responsiveClass("gap", "gap")} ${useContentsMaxHeight ? responsiveClass("h", "contents-max-h") : ""}`,
          "container-bleed-padding",
          {
            "grid-rows-[minmax(0,1fr)] overflow-y-hidden": useContentsMaxHeight,
          },
        )}
        style={{
          ...responsiveStyles({
            gap: [gap, gapTablet, gapMobile, "px"],
            ...(useContentsMaxHeight
              ? {
                  "contents-max-h": [
                    contentsMaxHeight,
                    contentsMaxHeightTablet,
                    contentsMaxHeightMobile,
                    "px",
                  ] as const,
                }
              : undefined),
            ...(useItemWidth
              ? { "item-w": [itemWidth, itemWidthTablet, itemWidthMobile, "px"] as const }
              : undefined),
          }),
          ...style,
        }}
      >
        {children}
      </div>
      <div className={cn("container-bleed-padding", { invisible: !canScroll })}>
        <div className="flex w-3/4 items-center gap-10 md:w-1/3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Scroll left"
              className="group/btn flex size-11 cursor-pointer items-center justify-center"
            >
              <ArrowIcon className="size-4 rotate-180 text-primary transition-all group-hover/btn:-translate-x-0.5 group-hover/btn:scale-110" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Scroll right"
              className="group/btn flex size-11 cursor-pointer items-center justify-center"
            >
              <ArrowIcon className="size-4 text-primary transition-all group-hover/btn:translate-x-0.5 group-hover/btn:scale-110" />
            </button>
          </div>
          <div
            ref={trackRef}
            onPointerDown={handleTrackPointerDown}
            className="relative h-0.5 flex-1 cursor-pointer overflow-hidden rounded-full bg-border"
          >
            <div
              className="absolute top-0 h-full rounded-full bg-primary"
              style={{ width: `${scrollState.thumbWidth}%`, left: `${scrollState.thumbOffset}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export { Carousel }
