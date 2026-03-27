import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { textArg } from "@/lib/storybook"
import { StatementBlockItem } from "./statement-block-item"
import { propLabels } from "./statement-block-item.webflow"

const meta = {
  title: "Content Blocks/Statement Block Item",
  component: StatementBlockItem,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    heading: "Our Vision",
    description:
      "Make the digital world more secure by enabling organizations to harness Offensive Security as their most reliable security control.",
  },
  argTypes: {
    heading: textArg(propLabels.heading),
    description: textArg(propLabels.description),
  },
} satisfies Meta<typeof StatementBlockItem>

export default meta
type Story = StoryObj<typeof StatementBlockItem>

export const Default: Story = {
  render: (args) => (
    <div className="container py-10">
      <StatementBlockItem {...args} />
    </div>
  ),
}

export const MultipleItems: Story = {
  render: () => (
    <div className="container flex flex-col gap-12 py-10 lg:gap-20">
      <StatementBlockItem
        heading="Our Vision"
        description="Make the digital world more secure by enabling organizations to harness Offensive Security as their most reliable security control."
      />
      <StatementBlockItem
        heading="Our Mission"
        description="Enable Enterprise organizations to perform continuous threat exposure management through easy, affordable, and scalable pentesting that is continuously running with full business context, powered by agentic AI with a human-in-the-loop, trusted for compliance."
      />
    </div>
  ),
}
