import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { selectArg, textArg } from "@/lib/storybook"
import { CTACard } from "./cta-card"
import { propLabels, variantMap } from "./cta-card.webflow"
import "../../../app/globals.css"

const meta = {
  title: "Cards/CTA Card",
  component: CTACard,
  parameters: {
    layout: "centered",
    controls: {
      exclude: ["className", "href", "target"],
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[624px] max-w-full">
        <Story />
      </div>
    ),
  ],
  args: {
    variant: "Moss" as any,
    title: "Careers",
    description:
      "At Terra, we're team-first, hiring only top talent and top humans. Learn more about why a career at Terra is right for you.",
    buttonLabel: "View All Insights",
    href: "#",
  },
  argTypes: {
    variant: selectArg(propLabels.variant, variantMap),
    title: textArg(propLabels.title),
    description: textArg(propLabels.description),
    buttonLabel: textArg(propLabels.buttonLabel),
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<any>

export const Moss: Story = {}

export const Magma: Story = {
  args: {
    variant: "Magma",
    title: "Press",
    buttonLabel: "Email Us",
  },
  render: ({ description: _, ...args }: any) => (
    <CTACard
      {...args}
      description={
        <>
          <p>For media, analyst, or speaking requests, contact us at:</p>
          <p className="font-mono text-accent">press@terra.security</p>
        </>
      }
    />
  ),
}
