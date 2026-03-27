import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { booleanArg, textArg } from "@/lib/storybook"
import { AccordionItem } from "./accordion"
import { propLabels } from "./accordion.webflow"

const meta = {
  title: "Elements/Accordion Item",
  component: AccordionItem,
  parameters: {
    layout: "padded",
    controls: { include: ["title", "group", "defaultOpen"] },
  },
  tags: ["autodocs"],
  args: {
    title: "Accordion title",
    group: "default",
    defaultOpen: false,
  },
  argTypes: {
    title: textArg(propLabels.title),
    group: textArg(propLabels.group),
    defaultOpen: booleanArg(propLabels.defaultOpen),
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-[1063px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AccordionItem>

export default meta
type Story = StoryObj<typeof AccordionItem>

export const Default: Story = {
  args: {
    title: "Outcomes That Matter, Not Just Boxes Checked",
    children: (
      <>
        <p>
          {`At Terra, we don't do things just because they're required. We do them in ways that actually drive meaningful impact. Whether it's meeting compliance requirements, writing code, running a campaign, or supporting a customer, we ask: What's the real value?`}
        </p>
        <p>
          We aim to fulfill the spirit of the goal, not just the letter. That means cutting through
          noise, doing what's useful, and always choosing clarity, substance, and effectiveness over
          performative effort.
        </p>
      </>
    ),
  },
}

export const Group: Story = {
  render: () => (
    <>
      <AccordionItem
        title="Outcomes That Matter, Not Just Boxes Checked"
        group="values"
        defaultOpen
      >
        <p>
          {`At Terra, we don't do things just because they're required. We do them in ways that actually drive meaningful impact. Whether it's meeting compliance requirements, writing code, running a campaign, or supporting a customer, we ask: What's the real value?`}
        </p>
        <p>
          We aim to fulfill the spirit of the goal, not just the letter. That means cutting through
          noise, doing what's useful, and always choosing clarity, substance, and effectiveness over
          performative effort.
        </p>
      </AccordionItem>
      <AccordionItem title="Context First, Always" group="values">
        <p>
          We take the time to understand the full picture before acting. That means reading the
          brief, studying the data, absorbing feedback, and listening carefully before jumping to
          solutions.
        </p>
      </AccordionItem>
      <AccordionItem title="Raise the Bar, Together" group="values">
        <p>
          We hold ourselves and each other to a high standard — not to gatekeep, but because
          excellence is a shared responsibility. Feedback is a gift, and we give it with care.
        </p>
      </AccordionItem>
      <AccordionItem title="Own It End to End" group="values">
        <p>
          {`When you take something on, you see it through. That means thinking beyond your immediate task to consider how your work affects the whole. If something's broken, fix it — don't wait for someone else.`}
        </p>
      </AccordionItem>
    </>
  ),
}
