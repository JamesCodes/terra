import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Section } from "@/components/ui/Section/section"
import { booleanArg, selectArg, textArg } from "@/lib/storybook"
import { ColorCard } from "./color-card"
import { propLabels, variantMap } from "./color-card.webflow"
import { ItemFlex } from "@/components/ui/ItemFlex/item-flex"
import { WebflowSlot } from "@/lib/storybook-webflow"

const meta = {
  title: "Cards/Color Card",
  component: ColorCard,
  parameters: {
    layout: "fullscreen",
    controls: {
      exclude: ["className", "href", "target"],
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="max-w-full">
        <Story />
      </div>
    ),
  ],
  args: {
    variant: "Moss" as any,
    title: "Careers",
    description:
      "At Terra, we're team-first, hiring only top talent and top humans. Learn more about why a career at Terra is right for you.",
    showButton: true,
    buttonLabel: "View All Insights",
    href: "#",
  },
  argTypes: {
    variant: selectArg(propLabels.variant, variantMap),
    title: textArg(propLabels.title),
    description: textArg(propLabels.description),
    showButton: booleanArg(propLabels.showButton),
    buttonLabel: textArg(propLabels.buttonLabel),
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<any>

export const Moss: Story = {}

export const Terracotta: Story = {
  args: {
    variant: "Terracotta",
  },
}

export const Magma: Story = {
  args: {
    variant: "Magma",
    title: "Press",
    buttonLabel: "Email Us",
  },
  render: ({ description: _, ...args }: any) => (
    <ColorCard
      {...args}
      description={
        <p>
          For media, analyst, or speaking requests, contact us at:{" "}
          <span className="font-mono text-accent">press@terra.security</span>
        </p>
      }
    />
  ),
}

export const List: Story = {
  args: {
    variant: "Magma",
    title: "Press",
    buttonLabel: "Email Us",
  },
  render: ({ description: _, ...args }: any) => (
    <Section>
      <WebflowSlot>
        <ItemFlex itemMaxWidth={33} itemMaxWidthUnit="%" itemAspectRatio="43/30">
          <WebflowSlot>
            <ColorCard
              {...args}
              showButton={false}
              variant="moss"
              title="Security Service Providers"
              description={<p>Offering penetration testing or AppSec services</p>}
            />
            <ColorCard
              {...args}
              showButton={false}
              title="Technology Partners"
              variant="magma"
              description={<p>Integrating into security or developer workflows</p>}
            />
            <ColorCard
              {...args}
              showButton={false}
              title="Advisory & Consulting Firms"
              variant="terracotta"
              description={<p>Supporting security transformation</p>}
            />
          </WebflowSlot>
        </ItemFlex>
      </WebflowSlot>
    </Section>
  ),
}
