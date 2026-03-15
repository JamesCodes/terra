import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import { AdvisorCard } from "./advisor-card"

import "../../../app/globals.css"

export const propLabels = {
  name: "Name",
  role: "Role",
} as const

export default declareComponent(AdvisorCard, {
  name: "Advisor Card",
  description: "A simple card displaying an advisor's name and role",
  group: "Cards",
  props: {
    name: props.TextNode({
      name: propLabels.name,
      defaultValue: "Full Name",
      group: "Content",
      tooltip: "Advisor's name",
    }),
    role: props.TextNode({
      name: propLabels.role,
      defaultValue: "Managing Partner & Co-Founder, Company",
      group: "Content",
      tooltip: "Advisor's job title and company",
    }),
  },
})
