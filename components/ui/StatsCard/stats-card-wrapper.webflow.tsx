import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"

import type { ReactNode } from "react"

interface WebflowStatWrapperProps {
  children?: ReactNode
}

export const WebflowStatWrapper: React.FC<WebflowStatWrapperProps> = ({ children }) => {
  return (
    <div className="flex flex-col justify-center gap-7 py-13 max-md:flex-wrap md:flex-row md:gap-6 md:py-25">
      {children}
    </div>
  )
}

export default declareComponent(WebflowStatWrapper, {
  name: "Stat Card Wrapper",
  description: "A wrapper for Stat Cards",
  group: "Cards",
  props: {
    children: props.Slot({
      name: "Stats",
      tooltip: "Container for Stat Cards",
    }),
  },
})
