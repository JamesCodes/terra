import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { textArg } from "@/lib/storybook"
import { CheckCard } from "./check-card"
import { propLabels } from "./check-card.webflow"
import "../../../app/globals.css"
import { ItemFlex } from "@/components/ui/ItemFlex/item-flex"
import { Section } from "@/components/ui/Section/section"
import { WebflowSlot } from "@/lib/storybook-webflow"

const meta = {
  title: "Cards/CheckCard",
  component: CheckCard,
  parameters: {
    layout: "fullscreen",
    controls: {
      exclude: ["className"],
    },
  },
  tags: ["autodocs"],
  args: {
    text: "Expand pentesting coverage without increasing headcount.",
  },
  argTypes: {
    text: textArg(propLabels.text),
  },
  decorators: [
    (Story) => (
      <Section variant="moss">
        <WebflowSlot>
          <ItemFlex itemMaxWidth={33} itemMaxWidthUnit="%" itemMaxWidthMobile={100} gap={40}>
            <WebflowSlot>
              <CheckCard text="Expand pentesting coverage without increasing headcount." />
              <CheckCard text="Complement existing services and platforms." />
              <CheckCard text="Deliver continuous value beyond point-in-time assessments." />
            </WebflowSlot>
          </ItemFlex>
        </WebflowSlot>
      </Section>
    ),
  ],
} satisfies Meta<typeof CheckCard>

export default meta
type Story = StoryObj<any>

export const Default: Story = {}
