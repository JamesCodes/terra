import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { selectArg } from "@/lib/storybook"
import { FeatureCard } from "./feature-card"
import { layoutMap } from "./feature-card.webflow"
import "../../../app/globals.css"
import { ItemFlex } from "@/components/ui/ItemFlex/item-flex"
import { Section } from "@/components/ui/Section/section"
import { WebflowSlot } from "@/lib/storybook-webflow"

const meta = {
  title: "Cards/Feature Card",
  component: FeatureCard,
  parameters: {
    layout: "fullscreen",
    controls: { include: ["variant", "label", "title", "description"] },
  },
  tags: ["autodocs"],
  args: {
    variant: "Grid" as any,
    title: "Feature Title",
    description: "Feature description goes here.",
  },
  argTypes: {
    variant: selectArg("Layout", layoutMap),
  },
} satisfies Meta<typeof FeatureCard>

export default meta
type Story = StoryObj<typeof FeatureCard>

export const Large: Story = {
  render: () => (
    <Section variant="chalk">
      <WebflowSlot>
        <ItemFlex
          useAspectRatio={false}
          itemMaxWidthUnit="%"
          itemMaxWidth={50}
          itemMaxWidthTablet={49}
          itemMaxWidthMobile={100}
        >
          <WebflowSlot>
            <FeatureCard
              variant="large"
              label="Always-on"
              title="4x your monitoring with Ambient Agents"
              description="Keep an up-to-date, prioritized view of your attack surface via agents that execute guardrailed, surgical pentests to determine which vulnerabilities are actually worth further investigation."
              image={{
                src: "https://picsum.photos/seed/feature1/600/350",
                alt: "Agent monitoring screenshot",
              }}
            />
            <FeatureCard
              variant="large"
              label="On-demand"
              title="Supercharge research with Co-Pilots"
              description="Use natural language prompts to direct co-pilot agents to explore attack paths, run complex exploits, and verify remediation—all under your supervision."
              image={{
                src: "https://picsum.photos/seed/feature2/600/350",
                alt: "Co-pilot screenshot",
              }}
            />
          </WebflowSlot>
        </ItemFlex>
      </WebflowSlot>
    </Section>
  ),
}

export const Small: Story = {
  render: () => (
    <Section variant="chalk">
      <WebflowSlot>
        <ItemFlex
          useAspectRatio={true}
          itemAspectRatio="333/244"
          itemMaxWidthUnit="%"
          itemMaxWidth={32.33}
          itemMaxWidthTablet={33}
          itemMaxWidthMobile={100}
        >
          <WebflowSlot>
            <FeatureCard
              variant="small"
              icon="target"
              title="Zero false positives"
              description="Terra agents go beyond surface scanning and legacy tooling to provide unparalleled quality of discovery."
            />
            <FeatureCard
              variant="small"
              icon="shield"
              title="Instant audit-grade reports"
              description="Terra ATLAS logs every agent and operator action, for execution records ready to review at any time."
            />
            <FeatureCard
              variant="small"
              icon="half-circle"
              title="Governable by design"
              description="Terra lets you configure guardrails at the system level, rather than leaving security solely for operators to enforce."
            />
          </WebflowSlot>
        </ItemFlex>
      </WebflowSlot>
    </Section>
  ),
}

export const Single: Story = {
  render: () => (
    <FeatureCard
      variant="small"
      title="Zero false positives"
      description="Terra agents go beyond surface scanning and legacy tooling to provide unparalleled quality of discovery."
      icon="target"
      className="max-w-xs"
    />
  ),
}
