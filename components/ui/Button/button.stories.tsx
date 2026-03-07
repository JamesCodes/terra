import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ArrowRight } from "lucide-react"
import { Button } from "./button"
import "../../../app/globals.css"

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "outline", "ghost", "link"],
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg", "icon"],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="default">View All Stories</Button>
      <Button variant="outline">Read the Full Story</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Product</Button>
    </div>
  ),
}

export const Default: Story = {
  args: {
    children: "View All Stories",
  },
}

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Read the Full Story",
  },
}

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost",
  },
}

export const Link: Story = {
  args: {
    variant: "link",
    children: "Product",
  },
}

export const Icon: Story = {
  render: () => (
    <Button size="icon">
      <ArrowRight className="size-4" />
    </Button>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <ArrowRight className="size-4" />
      </Button>
    </div>
  ),
}

export const OutlineSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button variant="outline" size="sm">Small</Button>
      <Button variant="outline" size="default">Default</Button>
      <Button variant="outline" size="lg">Large</Button>
    </div>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button>
        View All Stories
        <ArrowRight className="size-4" />
      </Button>
      <Button variant="outline">
        Read More
        <ArrowRight className="size-4" />
      </Button>
    </div>
  ),
}

export const AsLink: Story = {
  render: () => (
    <Button asChild>
      <a href="#">View All Stories</a>
    </Button>
  ),
}

export const ButtonGroup: Story = {
  render: () => (
    <div className="flex gap-3">
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button disabled>Disabled</Button>
      <Button variant="outline" disabled>Disabled</Button>
    </div>
  ),
}
