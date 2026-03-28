"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ChevronDown } from "lucide-react"
import { type ReactNode, useEffect, useId, useRef, useState } from "react"
import { ItemFrame } from "@/components/ui/ItemFrame/item-frame"
import type { AccordionOpenDetail } from "@/lib/accordion-events"
import { ACCORDION_EVENTS } from "@/lib/accordion-events"
import { cn } from "@/lib/utils"

interface AccordionItemProps {
  title?: string
  children?: ReactNode
  group?: string
  defaultOpen?: boolean
  className?: string
}

function AccordionItem({
  title,
  children,
  group = "default",
  defaultOpen = false,
  className,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const id = useId()
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<AccordionOpenDetail>).detail
      if (detail.group === group) {
        setIsOpen(detail.id === id)
      }
    }

    window.addEventListener(ACCORDION_EVENTS.OPEN, onOpen)
    return () => window.removeEventListener(ACCORDION_EVENTS.OPEN, onOpen)
  }, [id, group])

  useGSAP(
    () => {
      const content = contentRef.current
      if (!content) return

      if (isOpen) {
        gsap.to(content, { height: "auto", duration: 0.4, ease: "power2.inOut" })
      } else {
        gsap.to(content, { height: 0, duration: 0.4, ease: "power2.inOut" })
      }
    },
    { dependencies: [isOpen] },
  )

  return (
    <ItemFrame
      data-slot="accordion-item"
      className={cn("w-full border-border border-b", className)}
    >
      <button
        data-slot="accordion-trigger"
        type="button"
        onClick={() => {
          if (isOpen) {
            setIsOpen(false)
          } else {
            window.dispatchEvent(
              new CustomEvent<AccordionOpenDetail>(ACCORDION_EVENTS.OPEN, {
                detail: { id, group },
              }),
            )
          }
        }}
        className="flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left lg:py-10"
      >
        <span className="brand-h5 text-balance">{title}</span>
        <ChevronDown
          className={cn("size-5 shrink-0 text-foreground transition-transform duration-300", {
            "rotate-180": isOpen,
          })}
        />
      </button>
      <div ref={contentRef} className="h-0 overflow-hidden">
        <div data-slot="accordion-content" className="pb-6 lg:max-w-6/10 lg:pb-10">
          <div className="brand-body2 richtext-cast-body2 text-pretty text-muted-foreground [&>p+p]:mt-3">
            {children}
          </div>
        </div>
      </div>
    </ItemFrame>
  )
}

export { AccordionItem }
