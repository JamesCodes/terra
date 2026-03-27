import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"

const OVERLAY_ID = "terra-page-transition"

if (typeof document !== "undefined" && !document.getElementById(OVERLAY_ID)) {
  const overlay = document.createElement("div")
  overlay.id = OVERLAY_ID
  overlay.style.cssText =
    "position:fixed;inset:0;z-index:9999;background:var(--brand-color-chalk);pointer-events:none;"
  document.body.appendChild(overlay)
}

interface PageTransitionProps {
  duration?: number
}

function PageTransition({ duration = 0.3 }: PageTransitionProps) {
  const overlayRef = useRef<HTMLElement | null>(null)

  useGSAP(() => {
    const overlay = document.getElementById(OVERLAY_ID)
    overlayRef.current = overlay
    if (overlay) {
      gsap.to(overlay, {
        opacity: 0,
        duration,
        ease: "power2.out",
      })
    }

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a")
      if (!anchor) return

      const href = anchor.getAttribute("href")
      if (!href) return

      if (
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey
      )
        return

      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return

      try {
        const url = new URL(href, window.location.origin)
        if (url.origin !== window.location.origin) return
        if (url.pathname === window.location.pathname && url.hash) return
      } catch {
        return
      }

      e.preventDefault()

      if (overlay) {
        gsap.to(overlay, {
          opacity: 1,
          duration,
          ease: "power2.in",
          onComplete: () => {
            window.location.href = href
          },
        })
      } else {
        window.location.href = href
      }
    }

    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, { dependencies: [duration], revertOnUpdate: true })

  return null
}

export { PageTransition }
