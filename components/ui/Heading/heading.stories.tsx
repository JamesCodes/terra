import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { selectArg } from "@/lib/storybook"
import { Heading } from "./heading"
import { levelMap } from "./heading.webflow"
import "../../../app/globals.css"

const meta = {
  title: "UI/Heading",
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
  args: {
    level: "Heading 1",
    children: "Offensive security built for the AI era.",
  },
}

export const H2: Story = {
  args: { level: "Heading 2", children: "Leave nothing unvalidated." },
}

export const H3: Story = {
  args: {
    level: "Heading 3",
    children: "Work with what's already happening.",
  },
}

export const H4: Story = {
  args: { level: "Heading 4", children: "AI-powered, human-driven." },
}
