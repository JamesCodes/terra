import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"

import "@/app/globals.css"
import type { ReactNode } from "react"

interface WebflowStatWrapperProps {
  children?: ReactNode
}

export const WebflowStatWrapper: React.FC<WebflowStatWrapperProps> = ({ children }) => {
  return (
    <div className="flex flex-wrap flex-col gap-7 md:flex-row md:gap-6 justify-center py-13 md:py-25">
      {children}
    </div>
  )
}

export default declareComponent(WebflowStatWrapper, {
  name: "Stat Card Wrapper",
  description: "A wrapper for Stat Cards",
  group: "Layout",
  props: {
    children: props.Slot({
      name: "Stats",
      tooltip: "Container for Stat Cards",
    }),
  },
})
