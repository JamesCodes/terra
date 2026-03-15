import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ArrowRight } from "lucide-react"
import { booleanArg, selectArg } from "@/lib/storybook"
import { Button } from "./button"
import { sizeMap, variantMap } from "./button.webflow"
import "../../../app/globals.css"

const meta = {
  title: "Elements/Button",
  component: Button,
  parameters: {
    layout: "centered",
    controls: { include: ["variant", "size", "children", "disabled"] },
  },
  tags: ["autodocs"],
  args: {
    variant: "default",
    size: "default",
    children: "Button",
    disabled: false,
  },
  argTypes: {
    variant: selectArg("Style", variantMap),
    size: selectArg("Size", sizeMap),
    disabled: booleanArg("Disabled"),
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<any>

export const Default: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="default">View All Stories</Button>
      <Button variant="default" disabled>
        View All Stories
      </Button>
    </div>
  ),
}

export const Outline: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="outline">View All Stories</Button>
      <Button variant="outline" disabled>
        View All Stories
      </Button>
    </div>
  ),
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

export const Nav: Story = {
  args: {
    variant: "nav",
    size: "link",
    children: "Product",
  },
}

export const NavActive: Story = {
  args: {
    variant: "nav",
    size: "link",
    state: "active",
    children: "Product",
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="default">View All Stories</Button>
      <Button variant="outline">Read the Full Story</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Product</Button>
      <Button variant="nav" size="link">
        <span>Nav Item</span>
      </Button>
    </div>
  ),
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
      <Button variant="link" size="link">
        Link
      </Button>
    </div>
  ),
}

export const OutlineSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button variant="outline" size="sm">
        Small
      </Button>
      <Button variant="outline" size="default">
        Default
      </Button>
      <Button variant="outline" size="lg">
        Large
      </Button>
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
      <Button variant="outline" disabled>
        Disabled
      </Button>
    </div>
  ),
}
