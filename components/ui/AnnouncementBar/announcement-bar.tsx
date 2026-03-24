import { ChevronLeft, ChevronRight, X } from "lucide-react"
import * as React from "react"
import { Button } from "@/components/ui/Button/button"
import { cn } from "@/lib/utils"

interface Announcement {
  text: string
  href?: string
  target?: string
}

interface AnnouncementBarProps {
  announcements: Announcement[]
  autoRotate?: boolean
  rotateInterval?: number
  dismissible?: boolean
  className?: string
}

type Direction = "left" | "right"

const STORAGE_KEY = "announcement-bar-dismissed"

function AnnouncementBar({
  announcements,
  autoRotate = false,
  rotateInterval = 30,
  dismissible = false,
  className,
}: AnnouncementBarProps) {
  const [index, setIndex] = React.useState(0)
  const [direction, setDirection] = React.useState<Direction>("right")
  const [isAnimating, setIsAnimating] = React.useState(false)
  const [displayIndex, setDisplayIndex] = React.useState(0)
  const [dismissed, setDismissed] = React.useState(() => {
    if (typeof window === "undefined") return false
    return sessionStorage.getItem(STORAGE_KEY) === "true"
  })

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

  function dismiss() {
    sessionStorage.setItem(STORAGE_KEY, "true")
    setDismissed(true)
  }

  const current = announcements[displayIndex]
  if (!current || dismissed) return null

  const exiting = isAnimating && displayIndex !== index
  const entering = isAnimating && displayIndex === index

  return (
    <div
      data-slot="announcement-bar"
      className={cn(
        "flex w-full items-center text-balance bg-primary py-2 font-medium text-[12px] text-primary-foreground leading-[150%] tracking-[-0.12px]",
        // "translate-y-0 opacity-100 transition-all duration-1000",
        // "starting:-translate-y-full starting:opacity-0 delay-500",
        className,
      )}
    >
      <div className="container flex items-center">
        {canCycle && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => cycle("left")}
            className="size-6 opacity-50 hover:bg-transparent hover:opacity-100"
            aria-label="Previous announcement"
          >
            <ChevronLeft className="size-6" />
          </Button>
        )}

        <div
          className={cn(
            "relative flex flex-1 items-center justify-center transition-all duration-200 ease-in-out",
            {
              "translate-x-4 opacity-0": exiting && direction === "right",
              "-translate-x-4 opacity-0": exiting && direction === "left",
              "animate-slide-in-left": entering && direction === "right",
              "animate-slide-in-right": entering && direction === "left",
              "translate-x-0 opacity-100": !isAnimating,
            },
          )}
        >
          <span className="text-center">
            {current.href ? (
              <a
                href={current.href}
                target={current.target}
                className="contents transition-opacity hover:opacity-80"
              >
                {current.text}
              </a>
            ) : (
              current.text
            )}
          </span>
          {dismissible && (
            <Button
              variant="ghost"
              size="icon"
              onClick={dismiss}
              className="absolute right-0 size-6 opacity-50 hover:bg-transparent hover:opacity-100"
              aria-label="Dismiss announcement bar"
            >
              <X className="size-5" />
            </Button>
          )}
        </div>

        {canCycle && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => cycle("right")}
            className="size-6 opacity-50 hover:bg-transparent hover:opacity-100"
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
