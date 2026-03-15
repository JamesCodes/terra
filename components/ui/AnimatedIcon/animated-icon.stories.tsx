import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { numberArg, selectArg } from "@/lib/storybook"
import { AnimatedIcon } from "./animated-icon"
import { iconMap, modeMap, sizeMap } from "./animated-icon.webflow"
import "../../../app/globals.css"

const meta = {
  title: "Media/Animated Icon",
  component: AnimatedIcon,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    icon: "Target" as any,
    size: "Large" as any,
    mode: "Loop" as any,
    speed: 5,
  },
  argTypes: {
    icon: selectArg("Icon", iconMap),
    size: selectArg("Size", sizeMap),
    mode: selectArg("Animation", modeMap),
    speed: numberArg("Speed", { min: 1, max: 10, step: 1 }),
  },
} satisfies Meta<typeof AnimatedIcon>

export default meta
type Story = StoryObj<any>

export const Target: Story = {
  args: {
    icon: "Target",
    speed: 9,
  },
}

export const Infinity: Story = {
  args: {
    icon: "Infinity",
    speed: 8,
  },
}

export const HalfCircle: Story = {
  args: {
    icon: "Half Circle",
    speed: 8,
  },
}

export const Shield: Story = {
  args: { icon: "Shield" },
}

export const AllIcons: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <AnimatedIcon icon="target" size="lg" />
      <AnimatedIcon icon="infinity" size="lg" />
      <AnimatedIcon icon="half-circle" size="lg" />
      <AnimatedIcon icon="shield" size="lg" />
    </div>
  ),
}

export const Reveal: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <AnimatedIcon icon="target" size="lg" mode="reveal" />
      <AnimatedIcon icon="infinity" size="lg" mode="reveal" />
      <AnimatedIcon icon="half-circle" size="lg" mode="reveal" />
      <AnimatedIcon icon="shield" size="lg" mode="reveal" />
    </div>
  ),
}

export const Hover: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <AnimatedIcon icon="target" size="lg" mode="hover" />
      <AnimatedIcon icon="infinity" size="lg" mode="hover" />
      <AnimatedIcon icon="half-circle" size="lg" mode="hover" />
      <AnimatedIcon icon="shield" size="lg" mode="hover" />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      <AnimatedIcon icon="target" size="sm" />
      <AnimatedIcon icon="target" size="md" />
      <AnimatedIcon icon="target" size="lg" />
    </div>
  ),
}

export const SpeedVariations: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <AnimatedIcon icon="infinity" size="lg" speed={2} />
        <span className="text-muted-foreground text-xs">Slow (2)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <AnimatedIcon icon="infinity" size="lg" speed={5} />
        <span className="text-muted-foreground text-xs">Medium (5)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <AnimatedIcon icon="infinity" size="lg" speed={9} />
        <span className="text-muted-foreground text-xs">Fast (9)</span>
      </div>
    </div>
  ),
}
