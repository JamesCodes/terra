import type { ComponentDecorator } from "@webflow/data-types"
import * as React from "react"

interface WebflowSlotProps {
  children: React.ReactNode
  decorator?: ComponentDecorator<React.ComponentType<any>>
}

/**
 * Mimics Webflow's Shadow DOM slot boundary in Storybook.
 * The host element has no intrinsic dimensions — just like a
 * Webflow Code Component host — so children that rely on
 * parent sizing (w-full, h-full) will fail without a decorator.
 */
export function WebflowSlot({ children, decorator }: WebflowSlotProps) {
  const hostRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const host = hostRef.current
    if (!host || host.shadowRoot) return

    const shadow = host.attachShadow({ mode: "open" })
    const slot = document.createElement("slot")
    shadow.appendChild(slot)
  }, [])

  if (decorator) {
    const Inner = () => <>{children}</>
    const Decorated = decorator(Inner)
    return (
      <div ref={hostRef}>
        <Decorated />
      </div>
    )
  }

  return <div ref={hostRef}>{children}</div>
}
