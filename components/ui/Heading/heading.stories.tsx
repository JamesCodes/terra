import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { selectArg } from "@/lib/storybook"
import { Heading } from "./heading"
import { levelMap } from "./heading.webflow"
import "../../../app/globals.css"

const meta = {
  title: "Content Blocks/Heading",
  component: Heading,
  parameters: {
    layout: "centered",
    controls: { include: ["level", "children"] },
  },
  tags: ["autodocs"],
  args: {
    level: "Heading 1" as any,
    children: "Offensive security built for the AI era.",
  },
  argTypes: {
    level: selectArg("Level", levelMap),
  },
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<any>

export const H1: Story = {
  name: "H1",
  args: {
    level: 1,
    children: "Offensive security built for the AI era.",
  },
}

export const H2: Story = {
  name: "H2",
  args: { level: 2, children: "Leave nothing unvalidated." },
}

export const H3: Story = {
  name: "H3",
  args: {
    level: 3,
    children: "Work with what's already happening.",
  },
}

export const H4: Story = {
  name: "H4",
  args: { level: 4, children: "AI-powered, human-driven." },
}
