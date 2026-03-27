import type * as React from "react"
import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import { AdvisorCard } from "./advisor-card"


export const propLabels = {
  name: "Name",
  role: "Role",
  link: "Link",
} as const

function AdvisorCardWrapper({
  link,
  ...rest
}: React.ComponentProps<typeof AdvisorCard> & {
  link?: { href: string; target?: string }
}) {
  const hasLink = link?.href && link.href !== "#"
  return (
    <AdvisorCard
      {...rest}
      href={hasLink ? link.href : undefined}
      target={hasLink ? link.target : undefined}
    />
  )
}

export default declareComponent(AdvisorCardWrapper, {
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
    link: props.Link({
      name: propLabels.link,
      group: "Content",
      tooltip: "Optional link for the advisor's name",
    }),
  },
})
