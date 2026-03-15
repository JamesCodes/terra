import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Image } from "./image"

const meta: Meta<typeof Image> = {
  title: "Media/Image",
  component: Image,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Image>

export const Default: Story = {
  args: {
    src: "/images/desert-dunes.png",
    alt: "Desert dunes",
  },
}

export const WithCustomSize: Story = {
  args: {
    src: "/images/desert-dunes.png",
    alt: "Desert dunes",
    className: "h-8 w-auto",
  },
}
