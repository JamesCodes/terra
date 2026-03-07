import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import "../../../app/globals.css"

const meta: Meta<typeof Avatar> = {
  title: "UI/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

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
