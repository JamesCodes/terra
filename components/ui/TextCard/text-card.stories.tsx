import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { textArg } from "@/lib/storybook"
import { TextCard } from "./text-card"
import { propLabels } from "./text-card.webflow"
import "../../../app/globals.css"
import { ItemFlex } from "@/components/ui/ItemFlex/item-flex"
import { Section } from "@/components/ui/Section/section"
import { WebflowSlot } from "@/lib/storybook-webflow"

const meta = {
  title: "Cards/TextCard",
  component: TextCard,
  parameters: {
    layout: "fullscreen",
    controls: {
      exclude: ["className"],
    },
  },
  tags: ["autodocs"],
  args: {
    title: "Onboard once",
    description:
      "Terra agents learn in-step with your context and code, delivering continuous pentesting without the constant rescoping.",
  },
  argTypes: {
    title: textArg(propLabels.title),
    description: textArg(propLabels.description),
  },
  decorators: [
    (Story) => (
      <Section variant="moss">
        <WebflowSlot>
          <ItemFlex itemMaxWidthUnit="%" itemMaxWidth={50} gap={40}>
            <WebflowSlot>
              <Story />
              <TextCard
                title="Drive the pace"
                description="Terra agents turn pentesting from a scheduled compliance measure into an always-on security layer you can interact with anytime."
              />
              <TextCard
                title="Space to think"
                description="Terra agents function under strict guardrails to accelerate front-work, repetitive tasks and reporting, while safely leaving key decisioning to you."
              />
              <TextCard
                title="Less noise, more impact"
                description="Terra agents track and validate meaningful changes to your code and context, helping you prioritize your action plan. "
              />
            </WebflowSlot>
          </ItemFlex>
        </WebflowSlot>
      </Section>
    ),
  ],
} satisfies Meta<typeof TextCard>

export default meta
type Story = StoryObj<any>

export const Default: Story = {}
