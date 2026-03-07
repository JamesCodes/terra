import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button/button"

interface Announcement {
  text: string
  href?: string
  target?: string
}

interface AnnouncementBarProps {
  announcements: Announcement[]
  autoRotate?: boolean
  rotateInterval?: number
  className?: string
}

type Direction = "left" | "right"

function AnnouncementBar({
  announcements,
  autoRotate = false,
  rotateInterval = 30,
  className,
}: AnnouncementBarProps) {
  const [index, setIndex] = React.useState(0)
  const [direction, setDirection] = React.useState<Direction>("right")
  const [isAnimating, setIsAnimating] = React.useState(false)
  const [displayIndex, setDisplayIndex] = React.useState(0)

  const canCycle = announcements.length > 1

  function cycle(dir: Direction) {
    if (isAnimating || !canCycle) return
    setDirection(dir)
    setIsAnimating(true)

    const nextIndex =
      dir === "right"
        ? (index + 1) % announcements.length
        : (index - 1 + announcements.length) % announcements.length

    setIndex(nextIndex)
  }

  React.useEffect(() => {
    if (!isAnimating) {
      setDisplayIndex(index)
      return
    }

    const timer = setTimeout(() => {
      setDisplayIndex(index)
      const enterTimer = setTimeout(() => {
        setIsAnimating(false)
      }, 200)
      return () => clearTimeout(enterTimer)
    }, 200)

    return () => clearTimeout(timer)
  }, [isAnimating, index])

  React.useEffect(() => {
    if (!canCycle || !autoRotate) return
    const timer = setInterval(() => cycle("right"), rotateInterval * 1000)
    return () => clearInterval(timer)
  })

  const current = announcements[displayIndex]
  if (!current) return null

  const exiting = isAnimating && displayIndex !== index
  const entering = isAnimating && displayIndex === index

  return (
    <div
      data-slot="announcement-bar"
      className={cn(
        "flex h-10 w-full items-center bg-primary text-[12px] font-medium leading-6 tracking-[-0.12px] text-primary-foreground",
        className,
      )}
    >
      <div className="container flex items-center">
        {canCycle && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => cycle("left")}
            className="size-6 opacity-50 hover:opacity-100 hover:bg-transparent"
            aria-label="Previous announcement"
          >
            <ChevronLeft className="size-6" />
          </Button>
        )}
        <span
          className={cn(
            "flex-1 text-center transition-all duration-200 ease-in-out",
            {
              "translate-x-4 opacity-0": exiting && direction === "right",
              "-translate-x-4 opacity-0": exiting && direction === "left",
              "animate-slide-in-left": entering && direction === "right",
              "animate-slide-in-right": entering && direction === "left",
              "translate-x-0 opacity-100": !isAnimating,
            },
          )}
        >
          {current.href ? (
            <a
              href={current.href}
              target={current.target}
              className="hover:opacity-80 transition-opacity"
            >
              {current.text}
            </a>
          ) : (
            current.text
          )}
        </span>
        {canCycle && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => cycle("right")}
            className="size-6 opacity-50 hover:opacity-100 hover:bg-transparent"
            aria-label="Next announcement"
          >
            <ChevronRight className="size-6" />
          </Button>
        )}
      </div>
    </div>
  )
}

export { AnnouncementBar, type Announcement }
