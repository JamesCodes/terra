import { useEffect, useState } from "react"
import { Button } from "@/components/ui/Button/button"

interface LoadMoreProps {
  loadMoreText?: string
  showArchive?: boolean
  viewArchiveText?: string
  pageSize?: number
  link?: { href: string; target?: string }
  targetSelector?: string
}

function LoadMore({
  loadMoreText = "Load More",
  showArchive = true,
  viewArchiveText = "View Archive",
  pageSize = 6,
  link,
  targetSelector,
}: LoadMoreProps) {
  const [visibleCount, setVisibleCount] = useState(pageSize)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    if (!targetSelector) return
    const items = document.querySelectorAll(targetSelector)
    setTotalCount(items.length)

    items.forEach((item, index) => {
      if (item instanceof HTMLElement) {
        item.style.display = index < visibleCount ? "" : "none"
      }
    })
  }, [targetSelector, visibleCount])

  const allVisible = visibleCount >= totalCount

  if (!targetSelector || totalCount === 0) return null
  if (allVisible && !showArchive) return null

  if (allVisible && showArchive && link?.href) {
    return (
      <Button asChild variant="outline">
        <a href={link.href} target={link.target}>
          {viewArchiveText}
        </a>
      </Button>
    )
  }

  return (
    <Button onClick={() => setVisibleCount((prev) => prev + pageSize)} className="mx-auto">
      {loadMoreText}
    </Button>
  )
}

export { LoadMore, type LoadMoreProps }
