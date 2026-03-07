import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Heading } from "./heading"
import "../../../app/globals.css"

const meta: Meta<typeof Heading> = {
  title: "UI/Heading",
  component: Heading,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    level: {
      control: { type: "select" },
      options: [1, 2, 3, 4],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const H1: Story = {
  args: { level: 1, children: "Offensive security built for the AI era." },
}

export const H2: Story = {
  args: { level: 2, children: "Leave nothing unvalidated." },
}

export const H3: Story = {
  args: { level: 3, children: "Work with what's already happening." },
}

export const H4: Story = {
  args: { level: 4, children: "AI-powered, human-driven." },
}
