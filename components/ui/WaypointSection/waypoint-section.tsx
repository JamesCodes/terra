"use client"

import { useWebflowContext } from "@webflow/react"
import * as React from "react"
import { WAYPOINT_EVENTS } from "@/lib/waypoint-events"
import type { WaypointIdDetail, WaypointRegisterDetail } from "@/lib/waypoint-events"

interface WaypointSectionProps extends React.ComponentProps<"section"> {
  waypointId: string
  waypointLabel: string
  waypointOrder?: number
}

function WaypointSection({
  waypointId,
  waypointLabel,
  waypointOrder = 0,
  children,
  ...props
}: WaypointSectionProps) {
  const sectionRef = React.useRef<HTMLElement>(null)
  const { mode } = useWebflowContext()
  const isDesigning = mode === "design" || mode === "edit" || mode === "build"

  React.useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    window.dispatchEvent(
      new CustomEvent<WaypointRegisterDetail>(WAYPOINT_EVENTS.REGISTER, {
        detail: { id: waypointId, label: waypointLabel, order: waypointOrder, element },
      }),
    )

    return () => {
      window.dispatchEvent(
        new CustomEvent<WaypointIdDetail>(WAYPOINT_EVENTS.UNREGISTER, {
          detail: { id: waypointId },
        }),
      )
    }
  }, [waypointId, waypointLabel, waypointOrder])

  React.useEffect(() => {
    if (isDesigning) return

    const element = sectionRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const eventName = entry.isIntersecting ? WAYPOINT_EVENTS.ENTER : WAYPOINT_EVENTS.LEAVE
        window.dispatchEvent(
          new CustomEvent<WaypointIdDetail>(eventName, {
            detail: { id: waypointId },
          }),
        )
      },
      { rootMargin: "-80px 0px -40% 0px", threshold: 0 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [waypointId, isDesigning])

  return (
    <section ref={sectionRef} id={waypointId} data-slot="waypoint-section" {...props}>
      {children}
    </section>
  )
}

export { WaypointSection }
