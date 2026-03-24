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

export const Scan: Story = {
  args: {
    icon: "Scan",
    speed: 8,
  },
}

export const Shield: Story = {
  args: { icon: "Shield" },
}

export const Noise: Story = {
  args: { icon: "Noise", speed: 9 },
}

export const Trustworthy: Story = {
  args: { icon: "Trustworthy" },
}

export const Analysis: Story = {
  args: { icon: "Analysis" },
}

export const Safe: Story = {
  args: { icon: "Safe" },
}

export const Chart: Story = {
  args: { icon: "Chart" },
}

export const Governable: Story = {
  args: { icon: "Governable" },
}

export const Compliance: Story = {
  args: { icon: "Compliance" },
}

export const Venn: Story = {
  args: { icon: "Venn" },
}

export const Audit: Story = {
  args: { icon: "Audit" },
}

export const Star: Story = {
  args: { icon: "Star" },
}

export const Onboarding: Story = {
  args: { icon: "Onboarding" },
}

export const Support: Story = {
  args: { icon: "Support" },
}

export const Market: Story = {
  args: { icon: "Market" },
}

export const AllIcons: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <AnimatedIcon icon="target" size="lg" />
      <AnimatedIcon icon="infinity" size="lg" />
      <AnimatedIcon icon="scan" size="lg" />
      <AnimatedIcon icon="shield" size="lg" />
      <AnimatedIcon icon="noise" size="lg" />
      <AnimatedIcon icon="trustworthy" size="lg" />
      <AnimatedIcon icon="analysis" size="lg" />
      <AnimatedIcon icon="safe" size="lg" />
      <AnimatedIcon icon="chart" size="lg" />
      <AnimatedIcon icon="governable" size="lg" />
      <AnimatedIcon icon="compliance" size="lg" />
      <AnimatedIcon icon="venn" size="lg" />
      <AnimatedIcon icon="audit" size="lg" />
      <AnimatedIcon icon="star" size="lg" />
      <AnimatedIcon icon="onboarding" size="lg" />
      <AnimatedIcon icon="support" size="lg" />
      <AnimatedIcon icon="market" size="lg" />
    </div>
  ),
}

export const Reveal: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <AnimatedIcon icon="target" size="lg" mode="reveal" />
      <AnimatedIcon icon="infinity" size="lg" mode="reveal" />
      <AnimatedIcon icon="scan" size="lg" mode="reveal" />
      <AnimatedIcon icon="shield" size="lg" mode="reveal" />
      <AnimatedIcon icon="noise" size="lg" mode="reveal" />
      <AnimatedIcon icon="trustworthy" size="lg" mode="reveal" />
      <AnimatedIcon icon="analysis" size="lg" mode="reveal" />
      <AnimatedIcon icon="safe" size="lg" mode="reveal" />
      <AnimatedIcon icon="chart" size="lg" mode="reveal" />
      <AnimatedIcon icon="governable" size="lg" mode="reveal" />
      <AnimatedIcon icon="compliance" size="lg" mode="reveal" />
      <AnimatedIcon icon="venn" size="lg" mode="reveal" />
      <AnimatedIcon icon="onboarding" size="lg" mode="reveal" />
      <AnimatedIcon icon="support" size="lg" mode="reveal" />
      <AnimatedIcon icon="market" size="lg" mode="reveal" />
    </div>
  ),
}

export const Hover: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <AnimatedIcon icon="target" size="lg" mode="hover" />
      <AnimatedIcon icon="infinity" size="lg" mode="hover" />
      <AnimatedIcon icon="scan" size="lg" mode="hover" />
      <AnimatedIcon icon="shield" size="lg" mode="hover" />
      <AnimatedIcon icon="noise" size="lg" mode="hover" />
      <AnimatedIcon icon="trustworthy" size="lg" mode="hover" />
      <AnimatedIcon icon="analysis" size="lg" mode="hover" />
      <AnimatedIcon icon="safe" size="lg" mode="hover" />
      <AnimatedIcon icon="chart" size="lg" mode="hover" />
      <AnimatedIcon icon="governable" size="lg" mode="hover" />
      <AnimatedIcon icon="compliance" size="lg" mode="hover" />
      <AnimatedIcon icon="venn" size="lg" mode="hover" />
      <AnimatedIcon icon="onboarding" size="lg" mode="hover" />
      <AnimatedIcon icon="support" size="lg" mode="hover" />
      <AnimatedIcon icon="market" size="lg" mode="hover" />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      <AnimatedIcon icon="target" size="sm" />
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
