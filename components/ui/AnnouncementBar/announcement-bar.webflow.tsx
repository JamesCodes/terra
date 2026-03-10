import React from "react"
import { type PropType, type PropValues, props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import { AnnouncementBar, type Announcement } from "./announcement-bar"

import "../../../app/globals.css"

interface WebflowAnnouncementBarProps {
  text1?: string
  link1?: PropValues[PropType.Link]
  showSecond?: boolean
  text2?: string
  link2?: PropValues[PropType.Link]
  showThird?: boolean
  text3?: string
  link3?: PropValues[PropType.Link]
  autoRotate?: boolean
  rotateInterval?: number
}

const WebflowAnnouncementBar: React.FC<WebflowAnnouncementBarProps> = ({
  text1,
  link1,
  showSecond,
  text2,
  link2,
  showThird,
  text3,
  link3,
  autoRotate,
  rotateInterval,
}) => {
  const announcements: Announcement[] = []

  if (text1) {
    announcements.push({
      text: text1,
      href: link1?.href,
      target: link1?.target,
    })
  }

  if (showSecond && text2) {
    announcements.push({
      text: text2,
      href: link2?.href,
      target: link2?.target,
    })
  }

  if (showThird && text3) {
    announcements.push({
      text: text3,
      href: link3?.href,
      target: link3?.target,
    })
  }

  if (announcements.length === 0) return null

  return (
    <AnnouncementBar
      announcements={announcements}
      autoRotate={autoRotate}
      rotateInterval={rotateInterval}
    />
  )
}

export default declareComponent(WebflowAnnouncementBar, {
  name: "Announcement Bar",
  description: "A full-width dark banner that cycles through announcements with arrow navigation",
  group: "Navigation",
  props: {
    text1: props.Text({
      name: "Text 1",
      defaultValue:
        "Terra Named Winner of the 2025 AWS, Crowdstrike, Nvidia Cybersecurity Accelerator",
      tooltip: "First announcement message",
      group: "Announcement 1",
    }),
    link1: props.Link({
      name: "Link 1",
      tooltip: "Where announcement 1 navigates to",
      group: "Announcement 1",
    }),
    showSecond: props.Visibility({
      name: "Show Announcement 2",
      defaultValue: false,
      group: "Announcement 2",
    }),
    text2: props.Text({
      name: "Text 2",
      defaultValue: "New product launch — Learn more",
      tooltip: "Second announcement message",
      group: "Announcement 2",
    }),
    link2: props.Link({
      name: "Link 2",
      tooltip: "Where announcement 2 navigates to",
      group: "Announcement 2",
    }),
    showThird: props.Visibility({
      name: "Show Announcement 3",
      defaultValue: false,
      group: "Announcement 3",
    }),
    text3: props.Text({
      name: "Text 3",
      defaultValue: "Join us at RSA Conference 2025",
      tooltip: "Third announcement message",
      group: "Announcement 3",
    }),
    link3: props.Link({
      name: "Link 3",
      tooltip: "Where announcement 3 navigates to",
      group: "Announcement 3",
    }),
    autoRotate: props.Boolean({
      name: "Auto Rotate",
      defaultValue: false,
      trueLabel: "On",
      falseLabel: "Off",
      tooltip: "Automatically cycle through announcements",
      group: "Auto Rotate",
    }),
    rotateInterval: props.Number({
      name: "Interval (seconds)",
      defaultValue: 30,
      min: 5,
      max: 120,
      tooltip: "Seconds between each rotation",
      group: "Auto Rotate",
    }),
  },
  options: { ssr: false },
})
