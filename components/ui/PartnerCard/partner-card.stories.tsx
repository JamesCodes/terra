import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { textArg } from "@/lib/storybook"
import { PartnerCard } from "./partner-card"
import { propLabels } from "./partner-card.webflow"
import "../../../app/globals.css"

const meta = {
  title: "Cards/Partner Card",
  component: PartnerCard,
  parameters: {
    layout: "fullscreen",
    controls: { exclude: ["className", "image"] },
  },
  tags: ["autodocs"],
  args: {
    image: { src: "/images/aws-partner.png", alt: "Partner" },
    label: "AI Software Competency\nSecurity Software Competency",
  },
  argTypes: {
    label: textArg(propLabels.label),
  },
} satisfies Meta<typeof PartnerCard>

export default meta
type Story = StoryObj<typeof PartnerCard>

export const Default: Story = {}
