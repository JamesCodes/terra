"use client"

import { useGSAP } from "@gsap/react"
import { useWebflowContext } from "@webflow/react"
import gsap from "gsap"
import { Menu, X } from "lucide-react"
import * as React from "react"
import { Button } from "@/components/ui/Button/button"
import { cn } from "@/lib/utils"

function TerraLogo({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      className={cn("h-8 w-auto", className)}
      viewBox="0 0 116 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Terra</title>
      <g transform="translate(0, 0.86)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.5948 4.58196C12.2255 3.1293 12.55 1.57235 12.55 0H23.4369C23.4369 2.93631 22.8307 5.84388 21.6529 8.55665C21.1956 9.60982 20.6557 10.6255 20.0389 11.5956C19.8469 11.8977 20.2554 12.3076 20.5814 12.1399C23.9702 10.3956 27.8198 9.4874 31.7403 9.4874V19.8739C28.4118 19.8739 25.1893 21.1064 22.8356 23.3518C20.8644 25.2325 19.6166 27.6745 19.2633 30.284H8.32822C8.58601 26.706 9.74107 23.2583 11.6708 20.2226C11.8628 19.9205 11.4544 19.5105 11.1285 19.6783C10.4278 20.0389 9.70715 20.3659 8.96892 20.6577C6.12542 21.7813 3.07778 22.3597 0 22.3597L1.6362e-06 11.9732C1.6481 11.9732 3.28007 11.6636 4.80271 11.0618C6.32535 10.4601 7.70887 9.57818 8.87425 8.46632C10.0396 7.35454 10.9641 6.03462 11.5948 4.58196Z"
          fill="currentColor"
        />
      </g>
      <g transform="translate(42, 5.6)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.40574 1.75316C4.64542 1.19734 4.76876 0.601618 4.76876 0H8.9056C8.9056 1.1235 8.67522 2.23596 8.22767 3.27395C8.05958 3.6638 7.86207 4.0403 7.63715 4.40053C7.55991 4.52423 7.72685 4.69283 7.85929 4.62499C9.13733 3.97045 10.5744 3.619 12.0492 3.619V7.59313C10.7844 7.59313 9.57145 8.07578 8.67713 8.93493C7.78281 9.79409 7.28036 10.9593 7.28036 12.1743C7.28036 13.3893 7.78281 14.5546 8.67713 15.4137C9.57145 16.2729 10.7844 16.7555 12.0492 16.7555V20.7296C9.68731 20.7296 7.4221 19.8283 5.75192 18.2238C4.08183 16.6194 3.14352 14.4433 3.14352 12.1743C3.14352 10.6112 3.58886 9.09219 4.41197 7.77379C4.48912 7.65018 4.32227 7.48149 4.18983 7.54933C3.93578 7.67943 3.67492 7.79783 3.40802 7.90407C2.3275 8.33397 1.16945 8.55532 0 8.55532V4.58119C0.626175 4.58119 1.24631 4.4627 1.82495 4.23248C2.4035 4.00227 2.92924 3.6648 3.37199 3.23939C3.81484 2.81397 4.16606 2.30901 4.40574 1.75316ZM69.0298 5.21827C69.0298 5.41941 68.7586 5.5134 68.6139 5.36794C67.3259 4.07212 65.6201 3.43605 63.4743 3.43605C61.1906 3.43605 59.2471 4.28743 57.6113 5.95738C56.0089 7.62732 55.1915 9.6574 55.1915 12.0804C55.1915 14.5036 56.0089 16.5664 57.6113 18.2363C59.2471 19.9063 61.1906 20.7248 63.4743 20.7248C65.6201 20.7248 67.3259 20.0889 68.6139 18.793C68.7586 18.6476 69.0298 18.7416 69.0298 18.9427V20.2665H73.4266V3.89447H69.0298V5.21827ZM64.2918 16.6974C62.9291 16.6974 61.804 16.2717 60.9175 15.4203C60.0311 14.5363 59.5883 13.423 59.5883 12.0804C59.5883 10.738 60.0311 9.62467 60.9175 8.77338C61.804 7.88926 62.9291 7.46357 64.2918 7.46357C65.6555 7.46357 66.7806 7.88926 67.6661 8.77338C68.5871 9.62467 69.0298 10.738 69.0298 12.0804C69.0298 13.423 68.5871 14.5363 67.6661 15.4203C66.7806 16.2717 65.6555 16.6974 64.2918 16.6974ZM31.2165 13.8159H18.944C18.6529 13.8159 18.4403 14.0826 18.5461 14.3432C19.2401 16.0518 20.7822 16.8938 23.1725 16.8938C24.8427 16.8938 26.1379 16.3372 26.99 15.2567L30.5348 17.2213C28.8646 19.5461 26.3765 20.7248 23.1044 20.7248C20.2754 20.7248 18.0258 19.9063 16.3215 18.2691C14.6173 16.6318 13.7651 14.569 13.7651 12.0804C13.7651 9.62467 14.6173 7.56176 16.2874 5.92464C17.9575 4.2547 20.139 3.43605 22.7635 3.43605C25.2517 3.43605 27.3308 4.2547 28.9329 5.92464C30.5689 7.59459 31.3869 9.62467 31.3869 12.0804C31.3869 12.6371 31.3187 13.1938 31.2165 13.8159ZM18.4549 10.019C18.3606 10.2816 18.5752 10.5415 18.8643 10.5415H26.4317C26.7183 10.5415 26.9325 10.2853 26.843 10.0237C26.201 8.14718 24.6118 7.23436 22.7635 7.23436C20.6146 7.23436 19.0917 8.24583 18.4549 10.019ZM38.078 6.2825C38.0641 5.42078 38.0957 3.97557 38.0957 3.97557H33.748V20.1642H38.0957V12.426C38.0957 10.8719 38.6012 9.77105 39.6461 9.09118C40.6908 8.41123 41.9041 8.15221 43.2185 8.31413V3.65182C41.1907 3.65182 38.8557 5.10334 38.243 6.30654C38.2179 6.35582 38.0789 6.33735 38.078 6.2825ZM49.5332 3.90782C49.5332 3.90782 49.5018 5.35294 49.5156 6.21475C49.5164 6.2696 49.6554 6.28807 49.6805 6.23879C50.2932 5.0355 52.6282 3.58398 54.6558 3.58398V8.24638C53.3417 8.08446 52.1284 8.34348 51.0836 9.02343C50.0388 9.7033 49.5332 10.8042 49.5332 12.3583V20.0964H45.1855V3.90782H49.5332Z"
          fill="currentColor"
        />
      </g>
    </svg>
  )
}

interface NavbarLink {
  label: string
  href: string
  target?: string
}

type NavbarVariant = "light" | "dark"

interface NavbarProps {
  className?: string
  variant?: NavbarVariant
  logo?: React.ReactNode
  logoHref?: string
  links?: NavbarLink[]
  ctaLabel?: string
  ctaHref?: string
  ctaTarget?: string
}

function useOverflowDetection(
  containerRef: React.RefObject<HTMLElement | null>,
  measuredRef: React.RefObject<HTMLElement | null>,
) {
  const [collapsed, setCollapsed] = React.useState(false)

  React.useEffect(() => {
    const container = containerRef.current
    const measured = measuredRef.current
    if (!container || !measured) return

    const check = () => {
      setCollapsed(measured.offsetWidth > container.clientWidth)
    }

    const ro = new ResizeObserver(check)
    ro.observe(container)
    check()

    return () => ro.disconnect()
  }, [containerRef, measuredRef])

  return collapsed
}

function Navbar({
  className,
  variant = "light",
  logo,
  logoHref = "/",
  links = [],
  ctaLabel,
  ctaHref,
  ctaTarget,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const measuredRef = React.useRef<HTMLDivElement>(null)
  const menuRef = React.useRef<HTMLDivElement>(null)
  const { mode } = useWebflowContext()
  const isDesigning = mode === "design" || mode === "edit" || mode === "build"
  const collapsed = useOverflowDetection(containerRef, measuredRef)

  useGSAP(
    () => {
      const menu = menuRef.current
      if (!menu) return

      if (mobileOpen) {
        gsap.set(menu, { display: "flex" })
        gsap.fromTo(
          menu,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" },
        )
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: -8,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(menu, { display: "none" })
          },
        })
      }
    },
    { dependencies: [mobileOpen] },
  )

  return (
    <nav
      data-slot="navbar"
      className={cn(
        "relative w-full border-b",
        {
          "text-white": variant === "light",
          "text-black": variant === "dark",
        },
        className,
      )}
    >
      {!isDesigning && (
        <div
          ref={measuredRef}
          aria-hidden
          className="pointer-events-none invisible absolute left-0 top-0 flex h-0 w-max items-center gap-12 overflow-hidden px-20"
        >
          <span className="shrink-0">
            <TerraLogo />
          </span>
          {links.map((link) => (
            <span key={link.label} className="shrink-0 text-sm font-medium">
              {link.label}
            </span>
          ))}
          {ctaLabel && (
            <Button variant="default" size="sm" className="shrink-0">
              {ctaLabel}
            </Button>
          )}
        </div>
      )}

      <div ref={containerRef} className="container relative flex h-20 items-center justify-between">
        <a href={logoHref} data-slot="navbar-logo" className="shrink-0">
          {logo || <TerraLogo />}
        </a>

        {links.length > 0 && !collapsed && (
          <div
            data-slot="navbar-links"
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-12"
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.target}
                data-slot="navbar-link"
                className="text-sm font-medium whitespace-nowrap transition-opacity hover:opacity-70"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4">
          {ctaLabel && ctaHref && !collapsed && (
            <Button asChild variant="default" size="sm">
              <a href={ctaHref} target={ctaTarget}>
                {ctaLabel}
              </a>
            </Button>
          )}

          {links.length > 0 && collapsed && (
            <Button
              variant="ghost"
              size="icon"
              data-slot="navbar-mobile-toggle"
              className="inline-flex size-10 items-center justify-center"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          )}
        </div>
      </div>

      {collapsed && links.length > 0 && (
        <div
          ref={menuRef}
          data-slot="navbar-mobile-menu"
          className={cn("absolute left-0 top-20 z-50 hidden w-full flex-col border-b px-5 py-6", {
            "border-border bg-background": variant === "light",
            "": variant === "dark",
          })}
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.target}
              className="py-3 text-sm font-medium transition-opacity hover:opacity-70"
            >
              {link.label}
            </a>
          ))}
          {ctaLabel && ctaHref && (
            <div className="mt-4">
              <Button asChild variant="default" size="sm" className="w-full">
                <a href={ctaHref} target={ctaTarget}>
                  {ctaLabel}
                </a>
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

export { Navbar, TerraLogo }
