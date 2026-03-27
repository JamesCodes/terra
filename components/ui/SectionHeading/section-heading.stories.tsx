import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { booleanArg, selectArg, textArg } from "@/lib/storybook"
import { SectionHeading } from "./section-heading"
import { levelMap } from "@/components/ui/Heading/heading.webflow"
import { propLabels, variantMap } from "./section-heading.webflow"


const meta = {
  title: "Sections/SectionHeading",
  component: SectionHeading,
  parameters: {
    layout: "padded",
    controls: { exclude: ["className"] },
  },
  tags: ["autodocs"],
  args: {
    variant: "Light" as any,
    label: "Label",
    showLabel: false,
    heading: "Leave nothing unvalidated.",
    headingLevel: "Heading 2" as any,
    showHeading: true,
    text: "A brief description for this section.",
    showText: false,
  },
  argTypes: {
    variant: selectArg(propLabels.variant, variantMap),
    label: textArg(propLabels.label),
    showLabel: booleanArg(propLabels.showLabel),
    heading: textArg(propLabels.heading),
    headingLevel: selectArg(propLabels.headingLevel, levelMap),
    showHeading: booleanArg(propLabels.showHeading),
    text: textArg(propLabels.text),
    showText: booleanArg(propLabels.showText),
  },
  render: ({ showLabel, showHeading, showText, label, heading, text, ...args }) => (
    <SectionHeading
      {...args}
      label={showLabel ? label : undefined}
      heading={showHeading ? heading : undefined}
      text={showText ? text : undefined}
    />
  ),
} satisfies Meta<any>

export default meta
type Story = StoryObj<any>

export const Light: Story = {
  args: {
    heading: "Leave nothing unvalidated.",
  },
}

export const Dark: Story = {
  args: {
    variant: "Dark",
    heading: "The difference is undeniable",
    text: "Terra accelerates better outcomes across your security program and organization.",
    showText: true,
  },
  decorators: [
    (Story) => (
      <div className="bg-moss p-12 text-chalk">
        <Story />
      </div>
    ),
  ],
}

export const WithText: Story = {
  args: {
    heading: "Noise is a business liability.",
    text: "Terra accelerates better outcomes across your security program and organization.",
    showText: true,
  },
}
