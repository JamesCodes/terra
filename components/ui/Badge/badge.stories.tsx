import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Badge } from "./badge"
import "../../../app/globals.css"

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Featured",
  },
}

export const CategoryTags: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Featured</Badge>
      <Badge>Security</Badge>
      <Badge>AI</Badge>
      <Badge>Pentesting</Badge>
    </div>
  ),
}
