import { useWebflowContext } from "@webflow/react"
import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface TocEntry {
  id: string
  text: string
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

function gatherHeadings(): TocEntry[] {
  const headings = document.querySelectorAll<HTMLHeadingElement>(".w-richtext h2")
  const entries: TocEntry[] = []

  headings.forEach((h2) => {
    const text = h2.textContent?.trim() || ""
    if (!text) return

    if (!h2.id) {
      h2.id = slugify(text)
    }

    entries.push({ id: h2.id, text })
  })

  return entries
}

export function TableOfContents() {
  const { mode } = useWebflowContext()
  const isDesigning = mode === "design" || mode === "edit" || mode === "build"

  const [entries, setEntries] = useState<TocEntry[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileVisible, setMobileVisible] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const headingElementsRef = useRef<Map<string, IntersectionObserverEntry>>(new Map())

  if (isDesigning) {
    return (
      <div
        style={{
          padding: "16px",
          borderRadius: "8px",
          backgroundColor: "#f5f5f4",
          fontFamily: "monospace",
          fontSize: "12px",
          lineHeight: "1.6",
          color: "#44403c",
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: "4px", fontSize: "13px" }}>
          Table of Contents
        </div>
        <span style={{ color: "#78716c" }}>
          Automatically populated from H2 headings after publishing
        </span>
      </div>
    )
  }

  const updateActiveId = useCallback(() => {
    const visibleEntries = Array.from(headingElementsRef.current.values()).filter(
      (entry) => entry.isIntersecting,
    )

    if (visibleEntries.length > 0) {
      const sorted = visibleEntries.sort(
        (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
      )
      setActiveId(sorted[0].target.id)
    }
  }, [])

  useEffect(() => {
    const tocEntries = gatherHeadings()
    setEntries(tocEntries)

    if (tocEntries.length === 0) return

    if (tocEntries[0]) {
      setActiveId(tocEntries[0].id)
    }

    observerRef.current = new IntersectionObserver(
      (intersectionEntries) => {
        for (const entry of intersectionEntries) {
          headingElementsRef.current.set(entry.target.id, entry)
        }
        updateActiveId()
      },
      {
        rootMargin: `-${parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-height") || "80")}px 0px -60% 0px`,
      },
    )

    for (const tocEntry of tocEntries) {
      const el = document.getElementById(tocEntry.id)
      if (el) observerRef.current.observe(el)
    }

    return () => {
      observerRef.current?.disconnect()
      headingElementsRef.current.clear()
    }
  }, [updateActiveId])

  const mobileOpenRef = useRef(false)
  mobileOpenRef.current = mobileOpen

  useEffect(() => {
    let lastScrollY = window.scrollY
    const scrollThreshold = 5

    const onScroll = () => {
      const scrollY = window.scrollY
      const delta = scrollY - lastScrollY
      lastScrollY = scrollY

      if (mobileOpenRef.current) setMobileOpen(false)

      if (scrollY <= 100) {
        setMobileVisible(false)
        return
      }

      if (delta > scrollThreshold) {
        setMobileVisible(true)
      } else if (delta < -scrollThreshold) {
        setMobileVisible(false)
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleClick = (id: string) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (!el) return

    const navHeight = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--nav-height") || "80",
    )
    const y = el.getBoundingClientRect().top + window.scrollY - navHeight - 64
    window.scrollTo({ top: y, behavior: "smooth" })
  }

  if (entries.length === 0) return null

  return (
    <>
      <div
        data-slot="toc-overlay"
        className={cn(
          "fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 lg:hidden",
          { "opacity-100": mobileOpen, "pointer-events-none opacity-0": !mobileOpen },
        )}
        onClick={() => setMobileOpen(false)}
      />
      <nav
        data-slot="table-of-contents"
        className={cn(
          "text-sm max-lg:fixed max-lg:inset-x-0 max-lg:top-(--nav-height,80px) max-lg:z-40 max-lg:border-border max-lg:border-b max-lg:bg-background max-lg:px-5 max-lg:transition-transform max-lg:duration-300",
          { "max-lg:-translate-y-full": !mobileVisible },
        )}
      >
        <button
          type="button"
          data-slot="toc-toggle"
          className="flex w-full items-center justify-between py-6 text-foreground lg:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span>Table of Contents</span>
          <svg
            className={cn("size-4 transition-transform duration-300", {
              "rotate-180": mobileOpen,
            })}
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <p className="brand-body2 border-border border-y py-8 text-granite/75 max-md:hidden">
          Table of contents
        </p>

        <div
          data-slot="toc-list-wrapper"
          className={cn(
            "grid transition-[grid-template-rows] duration-300 lg:grid-rows-[1fr]",
            { "max-lg:grid-rows-[1fr]": mobileOpen, "max-lg:grid-rows-[0fr]": !mobileOpen },
          )}
        >
          <ul data-slot="toc-list" className="flex flex-col overflow-hidden">
            {entries.map((entry, i) => (
              <li key={entry.id}>
                <button
                  type="button"
                  onClick={() => handleClick(entry.id)}
                  className={cn(
                    "brand-body2 w-full rounded-md py-4 text-left font-semibold transition-colors",
                    {
                      "text-accent": activeId === entry.id,
                      "text-muted-foreground hover:text-foreground": activeId !== entry.id,
                      "mb-4 border-border border-b py-8 max-md:pt-4": i === 0,
                      "mt-4 border-border border-t py-8": i === entries.length - 1,
                    },
                  )}
                >
                  {entry.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}
