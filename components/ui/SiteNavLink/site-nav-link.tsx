"use client"

import gsap from "gsap"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import * as React from "react"
import { useCallback, useEffect, useMemo } from "react"
import { createPortal } from "react-dom"
import { Button } from "@/components/ui/Button/button"
import type { NavLinkOpenDetail, NavMeasureDetail } from "@/lib/nav-link-events"
import { NAV_LINK_EVENTS } from "@/lib/nav-link-events"
import { cn } from "@/lib/utils"

interface SiteNavLinkProps extends React.ComponentProps<"div"> {
  label?: string
  href?: string
  target?: string
  isGroup?: boolean
  description?: string
  showCta?: boolean
  ctaLabel?: string
  ctaHref?: string
  ctaTarget?: string
}

function SiteNavLink({
  label,
  href,
  target,
  isGroup = false,
  description,
  showCta,
  ctaLabel,
  ctaHref,
  ctaTarget,
  children,
  className,
  ...props
}: SiteNavLinkProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [portalTarget, setPortalTarget] = React.useState<Element | null>(null)
  const [navConfig, setNavConfig] = React.useState<NavMeasureDetail | null>(null)
  const id = React.useId()
  const hoverTimeoutRef = React.useRef<ReturnType<typeof setTimeout>>(undefined)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const panelRef = React.useRef<HTMLDivElement>(null)
  const tweenRef = React.useRef<gsap.core.Tween | null>(null)
  const wasOpenRef = React.useRef(false)

  const isDesktop = useMemo(() => window.matchMedia("(min-width: 992px)").matches ?? false, [])

  const handleHoverOpen = useCallback(() => {
    if (!isDesktop) return
    clearTimeout(hoverTimeoutRef.current)
    setIsOpen(true)
  }, [isDesktop])

  const handleHoverClose = useCallback(() => {
    if (!isDesktop) return
    hoverTimeoutRef.current = setTimeout(() => setIsOpen(false), 150)
  }, [isDesktop])

  React.useEffect(() => {
    if (!isGroup) return

    const el = document.createElement("div")
    el.style.display = "contents"
    const root = triggerRef.current?.getRootNode()
    if (root instanceof ShadowRoot) {
      root.appendChild(el)
    } else {
      document.body.appendChild(el)
    }
    setPortalTarget(el)

    return () => {
      el.remove()
      setPortalTarget(null)
    }
  }, [isGroup])

  React.useEffect(() => {
    if (isOpen) {
      window.dispatchEvent(
        new CustomEvent<NavLinkOpenDetail>(NAV_LINK_EVENTS.OPEN, { detail: { id } }),
      )
    }
  }, [isOpen, id])

  React.useEffect(() => {
    const onOtherOpen = (e: Event) => {
      const detail = (e as CustomEvent<NavLinkOpenDetail>).detail
      if (detail.id !== id) setIsOpen(false)
    }

    const onCloseAll = () => setIsOpen(false)

    window.addEventListener(NAV_LINK_EVENTS.OPEN, onOtherOpen)
    window.addEventListener(NAV_LINK_EVENTS.CLOSE_ALL, onCloseAll)

    return () => {
      window.removeEventListener(NAV_LINK_EVENTS.OPEN, onOtherOpen)
      window.removeEventListener(NAV_LINK_EVENTS.CLOSE_ALL, onCloseAll)
      clearTimeout(hoverTimeoutRef.current)
    }
  }, [id])

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return

    tweenRef.current?.kill()

    if (isOpen) {
      wasOpenRef.current = true

      const measure: NavMeasureDetail = { rowBottom: 0 }
      window.dispatchEvent(new CustomEvent(NAV_LINK_EVENTS.MEASURE_NAV, { detail: measure }))
      setNavConfig(measure)

      if (isDesktop) {
        const top = (triggerRef.current?.getBoundingClientRect().bottom ?? 0) + 24
        panel.style.top = `${top}px`
        gsap.set(panel, { display: "block", opacity: 0, y: -8 })
        tweenRef.current = gsap.to(panel, {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: "power2.out",
        })
      } else {
        panel.style.top = `${measure.rowBottom}px`
        gsap.set(panel, { display: "block", x: "100%" })
        tweenRef.current = gsap.to(panel, {
          x: "0%",
          duration: 0.3,
          ease: "power2.out",
        })
      }
    } else if (wasOpenRef.current) {
      wasOpenRef.current = false

      if (isDesktop) {
        tweenRef.current = gsap.to(panel, {
          opacity: 0,
          y: -8,
          duration: 0.15,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(panel, { display: "none" })
          },
        })
      } else {
        tweenRef.current = gsap.to(panel, {
          x: "100%",
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(panel, { display: "none" })
          },
        })
      }
    }

    return () => {
      tweenRef.current?.kill()
    }
  }, [isOpen, isDesktop])

  // Document-level pointer tracking — bypasses Shadow DOM event boundary issues
  React.useEffect(() => {
    if (!isOpen || !isDesktop) return

    let closeTimer: ReturnType<typeof setTimeout> | undefined

    const inRect = (x: number, y: number, rect: DOMRect) =>
      x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom

    const onPointerMove = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e
      const triggerRect = triggerRef.current?.getBoundingClientRect()
      const panelRect = panelRef.current?.getBoundingClientRect()

      const inTrigger = triggerRect ? inRect(x, y, triggerRect) : false
      const inPanel = panelRect ? inRect(x, y, panelRect) : false
      const inBridge =
        triggerRect &&
        panelRect &&
        y > triggerRect.bottom &&
        y < panelRect.top &&
        x >= panelRect.left &&
        x <= panelRect.right

      if (inTrigger || inPanel || inBridge) {
        clearTimeout(hoverTimeoutRef.current)
        if (closeTimer) {
          clearTimeout(closeTimer)
          closeTimer = undefined
        }
      } else if (!closeTimer) {
        closeTimer = setTimeout(() => {
          setIsOpen(false)
          closeTimer = undefined
        }, 150)
      }
    }

    document.addEventListener("pointermove", onPointerMove, { passive: true })
    return () => {
      document.removeEventListener("pointermove", onPointerMove)
      if (closeTimer) clearTimeout(closeTimer)
    }
  }, [isOpen, isDesktop])

  const panel = isGroup && (
    <div
      ref={panelRef}
      style={{ display: "none" }}
      className={cn(
        "fixed right-0 left-0 z-50",
        "max-lg:bottom-0 max-lg:overflow-y-auto max-lg:bg-background",
      )}
    >
      <div className="container">
        <div
          className={cn(
            "bg-background lg:rounded-3xl lg:shadow-[0px_32px_64px_0px_rgba(0,0,0,0.2)]",
          )}
        >
          <div className="pt-9 lg:hidden lg:px-12 lg:pt-12">
            <Button variant="link" size="link" onClick={() => setIsOpen(false)}>
              <ChevronLeft className="size-4" />
              Back
            </Button>
          </div>

          <div className="mt-6 h-px bg-border md:mt-8 lg:mx-12 lg:hidden" />

          <div className="flex flex-col lg:flex-row">
            {(() => {
              const desc = description ?? navConfig?.description
              const cta = showCta ?? navConfig?.showCta
              const ctaLbl = ctaLabel ?? navConfig?.ctaLabel
              const ctaUrl = ctaHref ?? navConfig?.ctaHref
              const ctaTgt = ctaTarget ?? navConfig?.ctaTarget
              return (
                <>
                  <div className="hidden lg:flex lg:grow lg:flex-col lg:justify-between lg:p-10">
                    {label && (
                      <h2 className="font-medium text-[32px] leading-snug tracking-tight">
                        {label}
                      </h2>
                    )}
                    <div className="flex flex-col gap-4">
                      {desc && <p className="max-w-45 text-sm">{desc}</p>}
                      {cta && ctaLbl && ctaUrl && (
                        <Button asChild variant="default" size="sm" className="w-fit">
                          <a href={ctaUrl} target={ctaTgt}>
                            {ctaLbl}
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="my-10 hidden w-px bg-border lg:block" />
                </>
              )
            })()}

            <div
              data-slot="site-nav-link-cards"
              className={cn(
                "flex flex-col gap-8 py-10",
                "md:gap-10 md:py-12 lg:px-12",
                "lg:flex-1 lg:shrink-0 lg:flex-row lg:gap-6 lg:p-10",
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  if (!isGroup && href) {
    return (
      <div data-slot="site-nav-link" className={cn("relative max-lg:w-full", className)} {...props}>
        <Button
          variant="nav"
          size="link"
          asChild
          className={cn(
            "max-lg:w-full max-lg:justify-between max-lg:border-border max-lg:border-b max-lg:py-5 max-lg:text-[32px] max-lg:leading-10 max-lg:tracking-tight",
            "max-lg:md:py-6 lg:h-full",
          )}
        >
          <a href={href} target={target}>
            <span>{label}</span>
          </a>
        </Button>
      </div>
    )
  }

  return (
    <div data-slot="site-nav-link" className={cn("relative max-lg:w-full", className)} {...props}>
      <Button
        variant="nav"
        size="link"
        ref={triggerRef}
        type="button"
        onMouseEnter={handleHoverOpen}
        onMouseLeave={handleHoverClose}
        onClick={() => setIsOpen(true)}
        state={isOpen ? "active" : "default"}
        className={cn(
          "max-lg:w-full max-lg:justify-between max-lg:border-border max-lg:border-b max-lg:py-5 max-lg:text-[32px] max-lg:leading-10 max-lg:tracking-tight",
          "max-lg:md:py-6 lg:h-full",
        )}
      >
        <span>{label}</span>
        <ChevronDown
          className={cn("hidden size-3.5 opacity-50 transition-transform duration-200 lg:block", {
            "rotate-180": isOpen,
          })}
        />
        <ChevronRight className="size-6 lg:hidden" />
      </Button>

      {portalTarget && createPortal(panel, portalTarget)}
    </div>
  )
}

export { SiteNavLink }
