import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { textArg } from "@/lib/storybook"
import { StatsCard } from "./stats-card"
import { propLabels } from "./stats-card.webflow"
import { WebflowStatWrapper } from "./stats-card-wrapper.webflow"
import "../../../app/globals.css"
import { Section } from "@/components/ui/Section/section"

const meta = {
  title: "Cards/Stats Card",
  component: StatsCard,
  parameters: {
    layout: "fullscreen",
    controls: { include: ["value", "suffix", "description"] },
  },
  tags: ["autodocs"],
  args: {
    value: "100",
    suffix: "%",
    description: "Attack surface coverage with continuous pentesting",
  },
  argTypes: {
    value: textArg(propLabels.value),
    suffix: textArg(propLabels.suffix),
    description: textArg(propLabels.description),
  },
} satisfies Meta<typeof StatsCard>

export default meta
type Story = StoryObj<typeof StatsCard>

export const Default: Story = {
  render: () => (
    <Section variant="moss">
      <WebflowStatWrapper>
        <StatsCard
          value="100"
          suffix="%"
          description="Attack surface coverage, on pace with attack surface development."
        />
        <StatsCard
          value="250"
          suffix="x"
          description="Faster than traditional pentesting approaches (from 4-6 weeks to 2-4 hours). "
        />
        <StatsCard
          value="24"
          suffix="/7"
          description="Always-on vulnerability analysis compared to point-in-time snapshots."
        />
      </WebflowStatWrapper>
    </Section>
  ),
}
