import type { Args, Meta, StoryObj } from "@storybook/nextjs-vite"
import { textArg } from "@/lib/storybook"
import { LeadershipCard } from "./leadership-card"
import { propLabels } from "./leadership-card.webflow"

import { ItemFlex } from "@/components/ui/ItemFlex/item-flex"
import { Section } from "@/components/ui/Section/section"
import { WebflowSlot } from "@/lib/storybook-webflow"

const meta = {
  title: "Cards/Leadership Card",
  component: LeadershipCard,
  parameters: {
    layout: "fullscreen",
    controls: {
      exclude: ["className", "image", "socialLink"],
    },
  },
  tags: ["autodocs"],
  args: {
    name: "Full Name",
    role: "Co-Founder & CEO",
    image: {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=440&h=440&fit=crop&crop=face",
      alt: "Team member",
    },
  },
  argTypes: {
    name: textArg(propLabels.name),
    role: textArg(propLabels.role),
  },
  render: (args) => (
    <Section
      variant="chalk"
      heading="Leadership"
      text="Built by leaders who’ve spent their careers breaking and defending real-world systems"
    >
      <WebflowSlot>
        <ItemFlex gap={60} itemMaxWidthUnit="px" itemMaxWidth={220}>
          <WebflowSlot>
            <LeadershipCard {...args} />
            <LeadershipCard {...args} />
            <LeadershipCard {...args} />
            <LeadershipCard {...args} />
            <LeadershipCard {...args} />
            <LeadershipCard {...args} />
            <LeadershipCard {...args} />
          </WebflowSlot>
        </ItemFlex>
      </WebflowSlot>
    </Section>
  ),
} satisfies Meta<typeof LeadershipCard>

export default meta
type Story = StoryObj<any>

export const Default: Story = {}

export const WithLinkedIn: Story = {
  args: {
    name: "Shahar Peled",
    socialLink: {
      href: "https://linkedin.com",
      target: "_blank",
    },
  },
}

export const WithoutImage: Story = {
  args: {
    image: undefined,
  },
}
