import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SiteLink } from "./site-link"

const meta = {
  title: "Navigation/SiteLink",
  component: SiteLink,
  parameters: {
    layout: "centered",
    controls: { include: [] },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SiteLink>

export default meta
type Story = StoryObj<typeof SiteLink>

export const NavLink: Story = {
  decorators: [
    (Story) => (
      <div
        className="bg-primary p-8 text-white"
        style={
          {
            "--link-font-size": "20px",
            "--link-font-weight": "600",
            "--link-line-height": "24px",
          } as React.CSSProperties
        }
      >
        <Story />
      </div>
    ),
  ],
  args: {
    label: "Terra Platform",
    href: "#",
  },
}

export const LegalLink: Story = {
  decorators: [
    (Story) => (
      <div
        className="bg-primary p-8 text-white"
        style={
          {
            "--link-font-size": "12px",
            "--link-color": "rgba(255,255,255,0.75)",
          } as React.CSSProperties
        }
      >
        <Story />
      </div>
    ),
  ],
  args: {
    label: "Privacy Policy",
    href: "#",
  },
}
