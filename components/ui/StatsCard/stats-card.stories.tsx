import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { selectArg, textArg } from "@/lib/storybook"
import { StatsCard } from "./stats-card"
import { propLabels, sizeMap } from "./stats-card.webflow"
import { WebflowStatWrapper } from "./stats-card-wrapper.webflow"
import "../../../app/globals.css"
import { Section } from "@/components/ui/Section/section"

const meta = {
  title: "UI/StatsCard",
  component: StatsCard,
  parameters: {
    layout: "centered",
    controls: { include: ["variant", "value", "suffix", "description"] },
  },
  tags: ["autodocs"],
  args: {
    variant: "Large" as any,
    value: "100",
    suffix: "%",
    description: "Attack surface coverage with continuous pentesting",
  },
  argTypes: {
    variant: selectArg(propLabels.size, sizeMap),
    value: textArg(propLabels.value),
    suffix: textArg(propLabels.suffix),
    description: textArg(propLabels.description),
  },
} satisfies Meta<typeof StatsCard>

export default meta
type Story = StoryObj<any>

export const Large: Story = {
  render: () => (
    <Section variant="moss">
      <WebflowStatWrapper>
        <StatsCard
          variant="large"
          value="100"
          suffix="%"
          description="Attack surface coverage with continuous pentesting compared to quarterly snapshots"
        />
        <StatsCard
          variant="large"
          value="0"
          description="False positives delivered— only spend time fixing the truly critical things that could really disrupt or hurt the business"
        />
        <StatsCard
          variant="large"
          value="10"
          suffix="x"
          description="ROI by reducing money and time spent on repetitive pentesting tasks"
        />
        <StatsCard
          variant="large"
          value="24"
          suffix="/7"
          description="Always-on vulnerability analysis to make sure your business stays ahead of today's most advanced threats"
        />
      </WebflowStatWrapper>
    </Section>
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
        <StatsCard variant="mini" value="3" description="Clear Endpoints" className="w-[180px]" />
      </div>
    </div>
  ),
}

export const Single: Story = {
  render: () => (
    <div className="bg-[#133224] p-8 rounded-2xl">
      <StatsCard
        variant="large"
        value="100%"
        description="Attack surface coverage with continuous pentesting"
        className="w-[260px]"
      />
    </div>
  ),
}
