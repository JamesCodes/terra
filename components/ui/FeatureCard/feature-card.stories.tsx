import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Shield, ShieldCheck, Target } from "lucide-react"
import { selectArg } from "@/lib/storybook"
import { FeatureCard } from "./feature-card"
import { layoutMap } from "./feature-card.webflow"
import "../../../app/globals.css"

const meta = {
  title: "UI/FeatureCard",
  component: FeatureCard,
  parameters: {
    layout: "centered",
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
type Story = StoryObj<any>

export const Large: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 max-w-4xl">
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
    </div>
  ),
}

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6 max-w-3xl">
      <FeatureCard
        variant="grid"
        icon={<Target className="size-10 text-accent" />}
        title="Zero false positives"
        description="Terra agents go beyond surface scanning and legacy tooling to provide unparalleled quality of discovery."
      />
      <FeatureCard
        variant="grid"
        icon={<Shield className="size-10 text-accent" />}
        title="Instant audit-grade reports"
        description="Terra ATLAS logs every agent and operator action, for execution records ready to review at any time."
      />
      <FeatureCard
        variant="grid"
        icon={<ShieldCheck className="size-10 text-accent" />}
        title="Governable by design"
        description="Terra lets you configure guardrails at the system level, rather than leaving security solely for operators to enforce."
      />
    </div>
  ),
}

export const Single: Story = {
  render: () => (
    <FeatureCard
      variant="grid"
      title="Zero false positives"
      description="Terra agents go beyond surface scanning and legacy tooling to provide unparalleled quality of discovery."
      icon={<Target className="size-10 text-accent" />}
      className="max-w-xs"
    />
  ),
}
