import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { StatsCard } from "./stats-card"
import "../../../app/globals.css"

const meta: Meta<typeof StatsCard> = {
  title: "UI/StatsCard",
  component: StatsCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
  render: () => (
    <div className="bg-[#133224] p-12 rounded-2xl">
      <div className="flex gap-6">
        <StatsCard
          variant="large"
          value="100%"
          description="Attack surface coverage with continuous pentesting compared to quarterly snapshots"
          className="w-[260px]"
        />
        <StatsCard
          variant="large"
          value="0"
          description="False positives delivered— only spend time fixing the truly critical things that could really disrupt or hurt the business"
          className="w-[260px]"
        />
        <StatsCard
          variant="large"
          value="10x"
          description="ROI by reducing money and time spent on repetitive pentesting tasks"
          className="w-[260px]"
        />
        <StatsCard
          variant="large"
          value="24/7"
          description="Always-on vulnerability analysis to make sure your business stays ahead of today's most advanced threats"
          className="w-[260px]"
        />
      </div>
    </div>
  ),
}

export const Mini: Story = {
  render: () => (
    <div className="bg-card p-8 rounded-2xl border shadow-sm">
      <div className="flex gap-4">
        <StatsCard
          variant="mini"
          value="10"
          description="Vulnerable Endpoints"
          className="w-[180px]"
        />
        <StatsCard
          variant="mini"
          value="7"
          description="Sensitive Endpoints"
          className="w-[180px]"
        />
        <StatsCard
          variant="mini"
          value="3"
          description="Clear Endpoints"
          className="w-[180px]"
        />
      </div>
    </div>
  ),
}

export const Single: Story = {
  args: {
    variant: "large",
    value: "100%",
    description: "Attack surface coverage with continuous pentesting",
  },
  render: (args) => (
    <div className="bg-[#133224] p-8 rounded-2xl">
      <StatsCard {...args} className="w-[260px]" />
    </div>
  ),
}
