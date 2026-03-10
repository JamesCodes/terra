import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { selectArg, booleanArg, textArg, numberArg } from "@/lib/storybook"
import { Section } from "./section"
import { variantMap, propLabels } from "./section.webflow"

import "../../../app/globals.css"

const meta = {
  title: "UI/Section",
  component: Section,
  parameters: {
    layout: "fullscreen",
    controls: { exclude: ["className", "children"] },
  },
  tags: ["autodocs"],
  args: {
    variant: "White" as any,
    heading: "Leave nothing unvalidated.",
    showHeading: true,
    text: "A brief description for this section.",
    showText: false,
    paddingTop: 80,
    paddingBottom: 80,
  },
  argTypes: {
    variant: selectArg(propLabels.variant, variantMap),
    paddingTop: numberArg(propLabels.paddingTop, { min: 0, max: 200, step: 4 }),
    paddingBottom: numberArg(propLabels.paddingBottom, { min: 0, max: 200, step: 4 }),
    heading: textArg(propLabels.heading),
    showHeading: booleanArg(propLabels.showHeading),
    text: textArg(propLabels.text),
    showText: booleanArg(propLabels.showText),
  },
  render: ({ showHeading, showText, heading, text, ...args }) => (
    <Section
      {...args}
      heading={showHeading ? heading : undefined}
      text={showText ? text : undefined}
    />
  ),
} satisfies Meta<any>

export default meta
type Story = StoryObj<any>

export const White: Story = {
  args: {
    variant: "White",
    heading: "Leave nothing unvalidated.",
  },
}

export const Chalk: Story = {
  args: {
    variant: "Chalk",
    heading: "Noise is a business liability.",
  },
}

export const Moss: Story = {
  args: {
    variant: "Moss",
    heading: "The difference is undeniable",
    text: "Terra accelerates better outcomes across your security program and organization.",
    showText: true,
  },
}

export const WithContent: Story = {
  args: {
    variant: "Chalk",
    heading: "Work with what's already happening.",
  },
  render: ({ showHeading, showText, heading, text, ...args }: any) => (
    <Section
      {...args}
      heading={showHeading ? heading : undefined}
      text={showText ? text : undefined}
    >
      <div className="flex items-center justify-center rounded-2xl bg-card p-12 shadow-sm">
        <p className="text-muted-foreground">Content slot area</p>
      </div>
    </Section>
  ),
}
