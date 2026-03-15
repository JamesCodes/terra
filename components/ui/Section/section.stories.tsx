import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { levelMap } from "@/components/ui/Heading/heading.webflow"
import { booleanArg, numberArg, responsiveArgs, selectArg, textArg } from "@/lib/storybook"
import { Section } from "./section"
import { variantMap as buttonVariantMap } from "@/components/ui/Button/button.webflow"
import { propLabels, variantMap } from "./section.webflow"

import "../../../app/globals.css"

const meta = {
  title: "Sections/Section",
  component: Section,
  parameters: {
    layout: "fullscreen",
    controls: { exclude: ["className", "children"] },
  },
  tags: ["autodocs"],
  args: {
    variant: "Chalk" as any,
    label: "Label",
    showLabel: false,
    heading: "Leave nothing unvalidated.",
    headingLevel: "Heading 2" as any,
    showHeading: true,
    text: "A brief description for this section.",
    showText: false,
    buttonText: "Learn More",
    buttonVariant: "Primary" as any,
    showButton: false,
    showPattern: false,
    fadePattern: true,
    gap: 80,
    gapTablet: 64,
    gapMobile: 48,
    paddingTop: 80,
    paddingBottom: 80,
  },
  argTypes: {
    variant: selectArg(propLabels.variant, variantMap),
    ...responsiveArgs("gap", numberArg(propLabels.gap, { min: -1, max: 200, step: 4 })),
    ...responsiveArgs(
      "paddingTop",
      numberArg(propLabels.paddingTop, { min: -1, max: 200, step: 4 }),
    ),
    ...responsiveArgs(
      "paddingBottom",
      numberArg(propLabels.paddingBottom, { min: -1, max: 200, step: 4 }),
    ),
    label: textArg(propLabels.label),
    showLabel: booleanArg(propLabels.showLabel),
    heading: textArg(propLabels.heading),
    headingLevel: selectArg(propLabels.headingLevel, levelMap),
    showHeading: booleanArg(propLabels.showHeading),
    text: textArg(propLabels.text),
    showText: booleanArg(propLabels.showText),
    buttonText: textArg(propLabels.buttonText),
    buttonVariant: selectArg(propLabels.buttonVariant, buttonVariantMap),
    showButton: booleanArg(propLabels.showButton),
    showPattern: booleanArg("Show Pattern"),
    fadePattern: booleanArg("Fade Background"),
  },
  render: ({ showLabel, showHeading, showText, showButton, label, heading, text, buttonText, ...args }) => (
    <Section
      {...args}
      label={showLabel ? label : undefined}
      heading={showHeading ? heading : undefined}
      text={showText ? text : undefined}
      buttonText={showButton ? buttonText : undefined}
    />
  ),
} satisfies Meta<any>

export default meta
type Story = StoryObj<any>

export const Chalk: Story = {
  args: {
    variant: "Chalk",
    heading: "Leave nothing unvalidated.",
  },
}

export const Moss: Story = {
  args: {
    variant: "Moss",
    heading: "The difference is undeniable",
    text: "Terra accelerates better outcomes across your security program and organization.",
    showText: true,
    showPattern: true,
  },
}

export const Obsidian: Story = {
  args: {
    variant: "Obsidian",
    label: "Our Customers",
    showLabel: true,
    heading: "Trusted and loved by industry leaders worldwide.",
    showPattern: true,
    fadePattern: false,
  },
}

export const Magma: Story = {
  args: {
    variant: "Magma",
    heading: "Security that scales with you.",
    showPattern: true,
    fadePattern: false,
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
