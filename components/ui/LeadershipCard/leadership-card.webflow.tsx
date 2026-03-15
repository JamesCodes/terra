import type { PropValues, PropType } from "@webflow/data-types"
import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import { LeadershipCard } from "./leadership-card"

import "../../../app/globals.css"

export const propLabels = {
  name: "Name",
  role: "Role",
} as const

interface WebflowLeadershipCardProps {
  image?: PropValues[PropType.Image]
  name?: string
  role?: string
  socialLink?: PropValues[PropType.Link]
}

const WebflowLeadershipCard: React.FC<WebflowLeadershipCardProps> = ({
  image,
  name = "Full Name",
  role,
  socialLink,
}) => {
  return (
    <LeadershipCard
      image={image?.src ? { src: image.src, alt: image.alt } : undefined}
      name={name}
      role={role}
      socialLink={
        socialLink?.href ? { href: socialLink.href, target: socialLink.target } : undefined
      }
    />
  )
}

export default declareComponent(WebflowLeadershipCard, {
  name: "Leadership Card",
  description: "A card displaying a team member's headshot, name, role, and LinkedIn link",
  group: "Cards",
  props: {
    image: props.Image({
      name: "Photo",
      group: "Content",
      tooltip: "Team member headshot",
    }),
    name: props.TextNode({
      name: "Name",
      defaultValue: "Full Name",
      group: "Content",
      tooltip: "Team member's name",
    }),
    role: props.TextNode({
      name: "Role",
      defaultValue: "Co-Founder & CEO",
      group: "Content",
      tooltip: "Team member's job title",
    }),
    socialLink: props.Link({
      name: "LinkedIn",
      group: "Social",
      tooltip: "Link to team member's LinkedIn profile — icon appears when a URL is set",
    }),
  },
})
