import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Badge } from "./badge"
import "../../../app/globals.css"

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    controls: { include: ["children"] },
  },
  tags: ["autodocs"],
  args: {
    children: "Featured",
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<any>

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
