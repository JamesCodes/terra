import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

const meta = {
  title: "Media/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    controls: { include: [] },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<any>

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
}

export const WithImage: Story = {
  render: () => (
    <Avatar>
      <AvatarImage
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
        alt="User avatar"
      />
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
}
