"use client"

import { useGSAP } from "@gsap/react"
import { useWebflowContext } from "@webflow/react"
import gsap from "gsap"
import { Menu, X } from "lucide-react"
import * as React from "react"
import TerraLogo from "@/components/icons/terra-logo.svg"
import { Button } from "@/components/ui/Button/button"
import type { NavMeasureDetail } from "@/lib/nav-link-events"
import { NAV_LINK_EVENTS } from "@/lib/nav-link-events"
import { cn } from "@/lib/utils"
import type { WaypointIdDetail, WaypointRegisterDetail } from "@/lib/waypoint-events"
import { WAYPOINT_EVENTS } from "@/lib/waypoint-events"

interface WaypointItem {
  id: string
  label: string
  order: number
  element: HTMLElement
}

interface SiteNavProps {
  className?: string
  logoHref?: string
  navLinks?: React.ReactNode
  panelDescription?: string
  showCta?: boolean
  ctaLabel?: string
  ctaHref?: string
  ctaTarget?: string
  announcementBar?: React.ReactNode
}

function SiteNav({
  className,
  logoHref = "/",
  navLinks,
  panelDescription,
  showCta,
  ctaLabel,
  ctaHref,
  ctaTarget,
  announcementBar,
}: SiteNavProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [spacerHeight, setSpacerHeight] = React.useState<number>(0)
  const [waypoints, setWaypoints] = React.useState<WaypointItem[]>([])
  const [activeWaypointId, setActiveWaypointId] = React.useState<string | null>(null)
  const fixedRef = React.useRef<HTMLDivElement>(null)
  const navRowRef = React.useRef<HTMLDivElement>(null)
  const announcementRef = React.useRef<HTMLDivElement>(null)
  const linksRef = React.useRef<HTMLDivElement>(null)
  const waypointLinksRef = React.useRef<HTMLDivElement>(null)
  const menuRef = React.useRef<HTMLDivElement>(null)
  const menuTweenRef = React.useRef<gsap.core.Tween | null>(null)
  const menuWasOpenRef = React.useRef(false)
  const intersectingRef = React.useRef<Set<string>>(new Set())
  const { mode } = useWebflowContext()
  const isDesigning = mode === "design" || mode === "edit" || mode === "build"

  const hasNavLinks = React.Children.count(navLinks) > 0

  const handleMobileToggle = React.useCallback(() => {
    setMobileOpen((prev) => {
      if (prev) {
        window.dispatchEvent(new CustomEvent(NAV_LINK_EVENTS.CLOSE_ALL))
      }
      return !prev
    })
  }, [])

  React.useEffect(() => {
    const menu = menuRef.current
    if (!menu) return

    menuTweenRef.current?.kill()

    if (mobileOpen) {
      menuWasOpenRef.current = true
      gsap.set(menu, { display: "flex", opacity: 0, y: -8 })
      menuTweenRef.current = gsap.to(menu, {
        opacity: 1,
        y: 0,
        duration: 0.25,
        ease: "power2.out",
      })
    } else if (menuWasOpenRef.current) {
      menuWasOpenRef.current = false
      menuTweenRef.current = gsap.to(menu, {
        opacity: 0,
        y: -8,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(menu, { clearProps: "display,opacity,y" })
        },
      })
    }

    return () => {
      menuTweenRef.current?.kill()
    }
  }, [mobileOpen])

  React.useEffect(() => {
    const el = fixedRef.current
    if (!el) return

    const ro = new ResizeObserver(() => {
      setSpacerHeight(el.offsetHeight)
    })
    ro.observe(el)

    return () => ro.disconnect()
  }, [])

  React.useEffect(() => {
    const onMeasureNav = (e: Event) => {
      const detail = (e as CustomEvent<NavMeasureDetail>).detail
      const row = navRowRef.current
      if (row) {
        detail.rowBottom = row.getBoundingClientRect().bottom
      }
      detail.description = panelDescription
      detail.showCta = showCta
      detail.ctaLabel = ctaLabel
      detail.ctaHref = ctaHref
      detail.ctaTarget = ctaTarget
    }

    window.addEventListener(NAV_LINK_EVENTS.MEASURE_NAV, onMeasureNav)
    return () => window.removeEventListener(NAV_LINK_EVENTS.MEASURE_NAV, onMeasureNav)
  }, [panelDescription, showCta, ctaLabel, ctaHref, ctaTarget])

  React.useEffect(() => {
    const onRegister = (e: Event) => {
      const { id, label, order, element } = (e as CustomEvent<WaypointRegisterDetail>).detail
      setWaypoints((prev) => {
        const filtered = prev.filter((wp) => wp.id !== id)
        return [...filtered, { id, label, order, element }].sort((a, b) => a.order - b.order)
      })
    }

    const onUnregister = (e: Event) => {
      const { id } = (e as CustomEvent<WaypointIdDetail>).detail
      setWaypoints((prev) => prev.filter((wp) => wp.id !== id))
      intersectingRef.current.delete(id)
      setActiveWaypointId((prev) => (prev === id ? null : prev))
    }

    const onEnter = (e: Event) => {
      const { id } = (e as CustomEvent<WaypointIdDetail>).detail
      intersectingRef.current.add(id)
      setActiveWaypointId(id)
    }

    const onLeave = (e: Event) => {
      const { id } = (e as CustomEvent<WaypointIdDetail>).detail
      intersectingRef.current.delete(id)
      setActiveWaypointId((prev) => {
        if (prev !== id) return prev
        const remaining = intersectingRef.current
        if (remaining.size === 0) return null
        return Array.from(remaining).pop() ?? null
      })
    }

    window.addEventListener(WAYPOINT_EVENTS.REGISTER, onRegister)
    window.addEventListener(WAYPOINT_EVENTS.UNREGISTER, onUnregister)
    window.addEventListener(WAYPOINT_EVENTS.ENTER, onEnter)
    window.addEventListener(WAYPOINT_EVENTS.LEAVE, onLeave)

    return () => {
      window.removeEventListener(WAYPOINT_EVENTS.REGISTER, onRegister)
      window.removeEventListener(WAYPOINT_EVENTS.UNREGISTER, onUnregister)
      window.removeEventListener(WAYPOINT_EVENTS.ENTER, onEnter)
      window.removeEventListener(WAYPOINT_EVENTS.LEAVE, onLeave)
    }
  }, [])

  const scrollToWaypoint = (wp: WaypointItem) => {
    const navbarHeight = fixedRef.current?.offsetHeight ?? 80
    const y = wp.element.getBoundingClientRect().top + window.scrollY - navbarHeight
    window.scrollTo({ top: y, behavior: "smooth" })
  }

  useGSAP(
    () => {
      if (isDesigning) return

      const fixed = fixedRef.current
      const links = linksRef.current
      const announcement = announcementRef.current
      const waypointLinks = waypointLinksRef.current

      const isLg = window.matchMedia("(min-width: 1024px)").matches

      const setY = fixed ? gsap.quickSetter(fixed, "y", "px") : null
      const setOpacity = isLg && links ? gsap.quickSetter(links, "opacity") : null
      const setWaypointOpacity =
        isLg && waypointLinks ? gsap.quickSetter(waypointLinks, "opacity") : null

      const onScroll = () => {
        const scrollY = window.scrollY
        const announcementHeight = announcement?.offsetHeight ?? 0

        if (setY) {
          setY(-Math.min(scrollY, announcementHeight))
        }

        const linkProgress = Math.min(scrollY / 80, 1)

        if (setOpacity && links) {
          const mainOpacity = 1 - Math.min(linkProgress * 2, 1)
          setOpacity(mainOpacity)
          links.style.pointerEvents = mainOpacity <= 0 ? "none" : ""
        }

        if (setWaypointOpacity && waypointLinks) {
          const wpOpacity = Math.max((linkProgress - 0.5) * 2, 0)
          setWaypointOpacity(wpOpacity)
          waypointLinks.style.pointerEvents = wpOpacity >= 1 ? "" : "none"
        }
      }

      window.addEventListener("scroll", onScroll, { passive: true })
      onScroll()

      return () => {
        window.removeEventListener("scroll", onScroll)
      }
    },
    { dependencies: [isDesigning, waypoints.length], revertOnUpdate: true },
  )

  return (
    <div style={{ height: spacerHeight }} className="w-full">
      <div ref={fixedRef} className="fixed z-50 w-full blur-in">
        {announcementBar && (
          <div ref={announcementRef} data-slot="navbar-announcement">
            {announcementBar}
          </div>
        )}
        <nav
          data-slot="navbar"
          className={cn("relative w-full border-b bg-background text-foreground", className)}
        >
          <div
            ref={navRowRef}
            data-slot="navbar-row"
            className={cn(
              "container relative z-10 flex h-20 items-center justify-end gap-12 max-lg:justify-between",
              {
                "justify-between": !hasNavLinks && !waypoints?.length,
              },
            )}
          >
            <a href={logoHref} data-slot="navbar-logo" className="shrink-0">
              <TerraLogo className="h-auto w-28.75" />
            </a>

            {(hasNavLinks || waypoints.length > 0) && (
              <div
                ref={menuRef}
                data-slot="navbar-mobile-menu"
                className={cn(
                  "max-lg:min-h-svh lg:relative lg:flex lg:h-full lg:grow lg:items-center lg:justify-end",
                  "max-lg:absolute max-lg:inset-x-0 max-lg:top-full max-lg:z-50",
                  "max-lg:hidden max-lg:flex-col",
                  "max-lg:border-border max-lg:border-b max-lg:bg-background",
                  "max-lg:px-6 max-lg:pb-8 max-lg:md:px-12",
                  {
                    "pointer-events-auto": mobileOpen,
                  },
                )}
              >
                {hasNavLinks && (
                  <div
                    ref={linksRef}
                    data-slot="navbar-nav"
                    className={cn(
                      "flex items-center",
                      "lg:h-full lg:gap-12",
                      "[--link-font-size:14px] [--link-font-weight:500] [--link-whitespace:nowrap]",
                      "max-lg:flex-col",
                      "max-lg:[--link-font-size:32px] max-lg:[--link-font-weight:500]",
                      "max-lg:[--link-letter-spacing:-0.02em] max-lg:[--link-line-height:40px]",
                      "max-lg:[--link-padding-block:20px] max-lg:md:[--link-padding-block:24px]",
                      "max-lg:[--link-border-color:var(--color-border)] max-lg:[--link-width:100%]",
                      {
                        "opacity-0": isDesigning && waypoints.length > 0,
                      },
                    )}
                  >
                    {navLinks}
                  </div>
                )}

                {waypoints.length > 0 && (
                  <div
                    ref={waypointLinksRef}
                    data-slot="navbar-waypoint-links"
                    className={cn(
                      "max-lg:hidden",
                      "pointer-events-none absolute inset-y-0 right-0 flex items-center justify-end gap-12 opacity-0",
                      { "pointer-events-auto opacity-100": isDesigning },
                    )}
                  >
                    {waypoints.map((wp) => (
                      <Button
                        key={wp.id}
                        data-slot="navbar-waypoint-link"
                        onClick={() => scrollToWaypoint(wp)}
                        variant="nav"
                        size="link"
                        state={activeWaypointId === wp.id ? "active" : "default"}
                        className={cn(
                          "pointer-events-auto relative whitespace-nowrap font-medium text-sm transition-colors",
                          {
                            "text-foreground": activeWaypointId === wp.id,
                            "text-muted-foreground hover:text-foreground":
                              activeWaypointId !== wp.id,
                          },
                        )}
                      >
                        <span>{wp.label}</span>
                      </Button>
                    ))}
                  </div>
                )}

                {showCta && ctaLabel && ctaHref && (
                  <div className="mt-8 lg:hidden">
                    <Button asChild variant="default" size="sm" className="w-fit">
                      <a href={ctaHref} target={ctaTarget}>
                        {ctaLabel}
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-4">
              {showCta && ctaLabel && ctaHref && (
                <Button asChild variant="default" size="sm" className="max-lg:hidden">
                  <a href={ctaHref} target={ctaTarget}>
                    {ctaLabel}
                  </a>
                </Button>
              )}

              {hasNavLinks && (
                <Button
                  variant="ghost"
                  size="icon"
                  data-slot="navbar-mobile-toggle"
                  className="inline-flex size-10 items-center justify-center lg:hidden"
                  onClick={handleMobileToggle}
                  aria-label={mobileOpen ? "Close menu" : "Open menu"}
                >
                  {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                </Button>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export { SiteNav }
