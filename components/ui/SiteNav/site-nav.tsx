import { useGSAP } from "@gsap/react"
import { useWebflowContext } from "@webflow/react"
import gsap from "gsap"
import { Menu, X } from "lucide-react"
import { Children, type ReactNode, useCallback, useEffect, useRef, useState } from "react"
import LinkedInIcon from "@/components/icons/linkedin.svg"
import TerraLogo from "@/components/icons/terra-logo.svg"
import YouTubeIcon from "@/components/icons/youtube.svg"
import { Button } from "@/components/ui/Button/button"
import type { NavMeasureDetail } from "@/lib/nav-link-events"
import { NAV_LINK_EVENTS } from "@/lib/nav-link-events"
import type { NavStuckChangeDetail } from "@/lib/nav-state-events"
import { NAV_STATE_EVENTS } from "@/lib/nav-state-events"
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
  navLinks?: ReactNode
  panelDescription?: string
  showCta?: boolean
  showCtaOnStuck?: boolean
  ctaLabel?: string
  ctaHref?: string
  ctaTarget?: string
  announcementBar?: ReactNode
  showLinkedin?: boolean
  linkedinHref?: string
  linkedinTarget?: string
  showYoutube?: boolean
  youtubeHref?: string
  youtubeTarget?: string
  stuckText?: string
  fadeIn?: boolean
}

function SiteNav({
  className,
  logoHref = "/",
  navLinks,
  panelDescription,
  showCta,
  showCtaOnStuck,
  ctaLabel,
  ctaHref,
  ctaTarget,
  announcementBar,
  showLinkedin,
  linkedinHref,
  linkedinTarget,
  showYoutube,
  youtubeHref,
  youtubeTarget,
  stuckText,
  fadeIn = true,
}: SiteNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [spacerHeight, setSpacerHeight] = useState<number>(0)
  const [waypoints, setWaypoints] = useState<WaypointItem[]>([])
  const [activeWaypointId, setActiveWaypointId] = useState<string | null>(null)
  const fixedRef = useRef<HTMLDivElement>(null)
  const navRowRef = useRef<HTMLDivElement>(null)
  const announcementRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const waypointLinksRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLAnchorElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const stuckTextRef = useRef<HTMLSpanElement>(null)
  const stuckCtaRef = useRef<HTMLDivElement>(null)
  const menuTweenRef = useRef<gsap.core.Tween | null>(null)
  const menuWasOpenRef = useRef(false)
  const intersectingRef = useRef<Set<string>>(new Set())
  const programmaticScrollRef = useRef(false)
  const { mode } = useWebflowContext()
  const isDesigning = mode === "design" || mode === "edit" || mode === "build"

  const hasNavLinks = Children.count(navLinks) > 0

  const handleMobileToggle = useCallback(() => {
    setMobileOpen((prev) => {
      if (prev) {
        window.dispatchEvent(new CustomEvent(NAV_LINK_EVENTS.CLOSE_ALL))
      }
      return !prev
    })
  }, [])

  useGSAP(
    () => {
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
    },
    { dependencies: [mobileOpen] },
  )

  useEffect(() => {
    const el = fixedRef.current
    if (!el) return

    const ro = new ResizeObserver(() => {
      setSpacerHeight(el.offsetHeight)
    })
    ro.observe(el)

    return () => ro.disconnect()
  }, [])

  useEffect(() => {
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

  useEffect(() => {
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
      if (!programmaticScrollRef.current) setActiveWaypointId(id)
    }

    const onLeave = (e: Event) => {
      const { id } = (e as CustomEvent<WaypointIdDetail>).detail
      intersectingRef.current.delete(id)
      if (programmaticScrollRef.current) return
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
    setActiveWaypointId(wp.id)
    const fullHeight = fixedRef.current?.offsetHeight ?? 80
    const announcementHeight = announcementRef.current?.offsetHeight ?? 0
    const navRowHeight = fullHeight - announcementHeight
    const y = wp.element.getBoundingClientRect().top + window.scrollY - navRowHeight
    const scrollsToTop = y <= announcementHeight
    if (!scrollsToTop) programmaticScrollRef.current = true
    window.scrollTo({ top: scrollsToTop ? 0 : y, behavior: "smooth" })
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

      const logoTextEl = logoRef.current?.querySelector("[class$='logo-text']") as SVGElement | null
      const setLogoTextOpacity =
        logoTextEl && stuckText ? gsap.quickSetter(logoTextEl, "opacity") : null

      const stuckTextEl = stuckTextRef.current
      const setStuckTextOpacity =
        isLg && stuckTextEl ? gsap.quickSetter(stuckTextEl, "opacity") : null

      const stuckCta = stuckCtaRef.current
      const animateStuckCta = isLg && stuckCta && showCtaOnStuck && !showCta
      const setStuckCtaOpacity = animateStuckCta ? gsap.quickSetter(stuckCta, "opacity") : null

      let lastScrollY = window.scrollY
      let targetProgress = window.scrollY > 10 ? 1 : 0
      let currentProgress = targetProgress
      let progressTween: gsap.core.Tween | null = null
      const scrollThreshold = 5

      const applyProgress = (progress: number) => {
        currentProgress = progress
        const announcementHeight = announcement?.offsetHeight ?? 0

        const visibleHeight = (fixed?.offsetHeight ?? 80) - announcementHeight * progress
        document.documentElement.style.setProperty("--nav-height", `${visibleHeight}px`)

        if (setY) {
          setY(-announcementHeight * progress)
        }

        if (setLogoTextOpacity) {
          setLogoTextOpacity(1 - Math.min(progress * 2, 1))
        }

        if (setStuckTextOpacity && stuckTextEl) {
          const textOpacity = Math.max((progress - 0.5) * 2, 0)
          setStuckTextOpacity(textOpacity)
          stuckTextEl.style.pointerEvents = textOpacity >= 1 ? "auto" : "none"
        }

        if (setOpacity && links) {
          const mainOpacity = 1 - Math.min(progress * 2, 1)
          setOpacity(mainOpacity)
          links.style.pointerEvents = mainOpacity <= 0 ? "none" : ""
        }

        if (setWaypointOpacity && waypointLinks) {
          const wpOpacity = Math.max((progress - 0.5) * 2, 0)
          setWaypointOpacity(wpOpacity)
          waypointLinks.style.pointerEvents = wpOpacity >= 1 ? "auto" : "none"
        }

        if (setStuckCtaOpacity && stuckCta) {
          const ctaOpacity = Math.max((progress - 0.5) * 2, 0)
          setStuckCtaOpacity(ctaOpacity)
          stuckCta.style.display = ctaOpacity > 0 ? "" : "none"
          stuckCta.style.pointerEvents = ctaOpacity >= 1 ? "" : "none"
        }
      }

      const animateToProgress = (target: number) => {
        if (target === targetProgress) return
        targetProgress = target
        progressTween?.kill()

        window.dispatchEvent(
          new CustomEvent<NavStuckChangeDetail>(NAV_STATE_EVENTS.STUCK_CHANGE, {
            detail: { stuck: target === 1 },
          }),
        )

        const proxy = { value: currentProgress }
        progressTween = gsap.to(proxy, {
          value: target,
          duration: 0.3,
          ease: "power2.out",
          onUpdate: () => applyProgress(proxy.value),
        })
      }

      let scrollEndTimer = 0

      const onScroll = () => {
        const scrollY = window.scrollY
        const delta = scrollY - lastScrollY
        lastScrollY = scrollY

        if (scrollY <= 10) {
          animateToProgress(0)
          if (programmaticScrollRef.current) {
            programmaticScrollRef.current = false
            window.clearTimeout(scrollEndTimer)
          }
          return
        }

        if (programmaticScrollRef.current) {
          window.clearTimeout(scrollEndTimer)
          scrollEndTimer = window.setTimeout(() => {
            programmaticScrollRef.current = false
          }, 100)
          return
        }

        if (delta > scrollThreshold) {
          animateToProgress(1)
        } else if (delta < -scrollThreshold) {
          animateToProgress(0)
        }
      }

      window.addEventListener("scroll", onScroll, { passive: true })
      applyProgress(currentProgress)

      return () => {
        window.removeEventListener("scroll", onScroll)
        window.clearTimeout(scrollEndTimer)
        progressTween?.kill()
      }
    },
    {
      dependencies: [isDesigning, waypoints.length, showCtaOnStuck, showCta, stuckText],
      revertOnUpdate: true,
    },
  )

  return (
    <div style={{ height: spacerHeight }} className="w-full">
      <div ref={fixedRef} className="fixed z-50 w-full">
        {announcementBar && (
          <div
            ref={announcementRef}
            data-slot="navbar-announcement"
            className={cn({ "fade-in delay-100": fadeIn, "fade-in--eager": !fadeIn })}
          >
            {announcementBar}
          </div>
        )}
        <nav
          data-slot="navbar"
          className={cn(
            "relative w-full border-b bg-background text-foreground",
            { "fade-in delay-500": fadeIn },
            className,
          )}
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
            <div className="flex flex-row items-center">
              <a ref={logoRef} href={logoHref} data-slot="navbar-logo" className="shrink-0">
                <TerraLogo className="h-auto w-28.75" />
              </a>
              {stuckText && (
                <span
                  ref={stuckTextRef}
                  data-slot="navbar-stuck-text"
                  className="pointer-events-none -ml-4 whitespace-nowrap font-bold text-lg opacity-0 max-lg:hidden"
                >
                  {stuckText}
                </span>
              )}
            </div>

            {(hasNavLinks || waypoints.length > 0) && (
              <div
                ref={menuRef}
                data-slot="navbar-mobile-menu"
                className={cn(
                  "max-lg:min-h-[calc(100svh-80px)] lg:relative lg:flex lg:h-full lg:grow lg:items-center lg:justify-end",
                  "max-lg:absolute max-lg:inset-x-0 max-lg:top-full max-lg:z-50",
                  "max-lg:hidden max-lg:flex-col",
                  "max-lg:border-border max-lg:border-b max-lg:bg-background",
                  "max-lg:flex-col max-lg:px-6 max-lg:pb-8 max-lg:md:px-12",
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
                      "max-lg:pointer-events-auto! max-lg:opacity-100!",
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
                          "relative whitespace-nowrap font-medium text-sm transition-colors",
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

                {(showCta || showCtaOnStuck) && ctaLabel && ctaHref && (
                  <div className="flex max-w-50 grow flex-col justify-end gap-6 text-balance lg:hidden">
                    {panelDescription}
                    <Button asChild variant="default" size="sm" className="w-fit">
                      <a href={ctaHref} target={ctaTarget}>
                        {ctaLabel}
                      </a>
                    </Button>
                  </div>
                )}

                {(showLinkedin || showYoutube) && (
                  <div className="mt-12 mt-6 flex gap-3 border-border border-t pt-10 lg:hidden">
                    {showYoutube && youtubeHref && (
                      <a
                        href={youtubeHref}
                        target={youtubeTarget}
                        aria-label="YouTube"
                        className="text-foreground/60"
                      >
                        <YouTubeIcon className="size-5" />
                      </a>
                    )}
                    {showLinkedin && linkedinHref && (
                      <a
                        href={linkedinHref}
                        target={linkedinTarget}
                        aria-label="LinkedIn"
                        className="text-foreground/60"
                      >
                        <LinkedInIcon className="size-5" />
                      </a>
                    )}
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

              {!showCta && showCtaOnStuck && ctaLabel && ctaHref && (
                <div ref={stuckCtaRef} style={{ display: "none" }} className="max-lg:hidden!">
                  <Button asChild variant="default" size="sm">
                    <a href={ctaHref} target={ctaTarget}>
                      {ctaLabel}
                    </a>
                  </Button>
                </div>
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
