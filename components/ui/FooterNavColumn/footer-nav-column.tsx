"use client"

import { ChevronDown } from "lucide-react"
import * as React from "react"
import { Button } from "@/components/ui/Button/button"
import type { FooterColumnToggleDetail } from "@/lib/footer-events"
import { FOOTER_EVENTS } from "@/lib/footer-events"
import { cn } from "@/lib/utils"

interface FooterNavColumnProps {
  className?: string
  label: string
  directLink?: boolean
  children?: React.ReactNode
}

function FooterNavColumn({ className, label, directLink, children }: FooterNavColumnProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const id = React.useId()

  React.useEffect(() => {
    if (isOpen) {
      window.dispatchEvent(
        new CustomEvent<FooterColumnToggleDetail>(FOOTER_EVENTS.COLUMN_TOGGLE, {
          detail: { id },
        }),
      )
    }
  }, [isOpen, id])

  React.useEffect(() => {
    const onOtherToggle = (e: Event) => {
      const detail = (e as CustomEvent<FooterColumnToggleDetail>).detail
      if (detail.id !== id) setIsOpen(false)
    }

    window.addEventListener(FOOTER_EVENTS.COLUMN_TOGGLE, onOtherToggle)
    return () => window.removeEventListener(FOOTER_EVENTS.COLUMN_TOGGLE, onOtherToggle)
  }, [id])

  return (
    <div
      data-slot="footer-nav-column"
      className={cn(
        "flex flex-col first:border-t-0 max-sm:col-span-full max-sm:border-white/10 max-sm:border-t lg:col-span-2",
        className,
      )}
    >
      {/* Desktop/Tablet header — always visible */}
      <span className="hidden font-normal text-sm text-white/35 md:block lg:font-semibold">
        {label}
      </span>

      {/* Mobile accordion trigger — hidden when directLink */}
      {!directLink && (
        <Button
          variant="ghost"
          size="link"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex w-full items-center justify-between py-8 font-semibold text-chalk text-xl md:hidden"
        >
          <span>{label}</span>
          <ChevronDown
            className={cn("size-5 transition-transform duration-300", { "rotate-180": isOpen })}
          />
        </Button>
      )}

      {/* Links — always visible on desktop, collapsible accordion on mobile */}
      <div
        className={cn(
          "md:mt-6 md:flex md:flex-col md:gap-6 lg:gap-4",
          {
            "max-md:grid max-md:transition-all max-md:duration-300 max-md:ease-in-out": !directLink,
          },
          { "max-md:grid-rows-[1fr] max-md:opacity-100": !directLink && isOpen },
          { "max-md:grid-rows-[0fr] max-md:opacity-0": !directLink && !isOpen },
        )}
      >
        <div className={cn({ "max-md:overflow-hidden": !directLink })}>
          <div
            className={cn(
              "flex flex-col md:gap-6 lg:gap-4",
              "[--link-font-size:18px] [--link-font-weight:400] [--link-line-height:18px]",
              "md:[--link-font-weight:600]",
              "lg:[--link-font-size:20px] lg:[--link-line-height:24px]",
              {
                "gap-8 pb-8": !directLink,
                "[--link-font-size:20px] [--link-font-weight:500] max-md:py-8": directLink,
              },
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export { FooterNavColumn }
