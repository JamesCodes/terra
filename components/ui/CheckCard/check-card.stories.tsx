import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ItemFlex } from "@/components/ui/ItemFlex/item-flex"
import { Section } from "@/components/ui/Section/section"
import { textArg } from "@/lib/storybook"
import { WebflowSlot } from "@/lib/storybook-webflow"
import { CheckCard } from "./check-card"
import { propLabels } from "./check-card.webflow"

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
          <ItemFlex
            itemMaxWidth={20}
            itemMaxWidthUnit="%"
            itemMaxWidthTablet={33.33}
            itemMaxWidthMobile={80}
            gap={10}
          >
            <WebflowSlot>
              <CheckCard text="Verified, exploitable findings instead of noise" />
              <CheckCard text="Business logic-aware testing" />
              <CheckCard text="Continuous, change-based coverage" />
              <CheckCard text="Scale without linear cost increases" />
              <CheckCard text="Human-verified findings & reports on demand for compliance" />
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
