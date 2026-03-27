import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { textArg } from "@/lib/storybook"
import { AdvisorCard } from "./advisor-card"
import { propLabels } from "./advisor-card.webflow"


const meta = {
  title: "Cards/Advisor Card",
  component: AdvisorCard,
  parameters: {
    layout: "centered",
    controls: {
      exclude: ["className"],
    },
  },
  tags: ["autodocs"],
  args: {
    name: "Jay Leek",
    role: "Managing Partner & Co-Founder, Syn Ventures",
  },
  argTypes: {
    name: textArg(propLabels.name),
    role: textArg(propLabels.role),
  },
} satisfies Meta<typeof AdvisorCard>

export default meta
type Story = StoryObj<any>

export const Default: Story = {}

export const LongRole: Story = {
  args: {
    name: "Gil Zimmermann",
    role: "Managing Partner & Co-Founder, FXP",
  },
}

export const WithoutRole: Story = {
  args: {
    role: undefined,
  },
}

export const WithLink: Story = {
  args: {
    name: "Jay Leek",
    role: "Managing Partner & Co-Founder, Syn Ventures",
    href: "https://example.com",
  },
}
