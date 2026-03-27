import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { AnnouncementBar } from "./announcement-bar"

const meta = {
  title: "Navigation/Announcement Bar",
  component: AnnouncementBar,
  parameters: {
    layout: "fullscreen",
    controls: { include: [] },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AnnouncementBar>

export default meta
type Story = StoryObj<any>

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
    dismissible: true,
  },
}

export const Dismissible: Story = {
  args: {
    announcements: [
      {
        text: "Terra Named Winner of the 2025 AWS, Crowdstrike, Nvidia Cybersecurity Accelerator",
        href: "https://example.com/award",
      },
    ],
    dismissible: true,
  },
}
