import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { AnnouncementBar } from "./announcement-bar"
import "../../../app/globals.css"

const meta: Meta<typeof AnnouncementBar> = {
  title: "UI/AnnouncementBar",
  component: AnnouncementBar,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Single: Story = {
  args: {
    announcements: [
      {
        text: "Terra Named Winner of the 2025 AWS, Crowdstrike, Nvidia Cybersecurity Accelerator",
      },
    ],
  },
}

export const SingleWithLink: Story = {
  args: {
    announcements: [
      {
        text: "Terra Named Winner of the 2025 AWS, Crowdstrike, Nvidia Cybersecurity Accelerator",
        href: "https://example.com",
      },
    ],
  },
}

export const MultipleAnnouncements: Story = {
  args: {
    announcements: [
      {
        text: "Terra Named Winner of the 2025 AWS, Crowdstrike, Nvidia Cybersecurity Accelerator",
        href: "https://example.com/award",
      },
      {
        text: "New product launch — Learn more",
        href: "https://example.com/launch",
      },
      {
        text: "Join us at RSA Conference 2025",
        href: "https://example.com/rsa",
      },
    ],
  },
}
