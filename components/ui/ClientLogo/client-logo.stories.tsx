import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ClientLogo } from "./client-logo"

const meta: Meta<typeof ClientLogo> = {
  title: "Components/Client Logo",
  component: ClientLogo,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof ClientLogo>

export const Default: Story = {
  args: {
    src: "/images/agoda.svg",
    alt: "Agoda",
  },
}

export const WithColour: Story = {
  args: {
    src: "/images/perion.svg",
    alt: "Perion",
    className: "text-accent",
  },
  decorators: [
    (Story) => (
      <div className="text-primary">
        <Story />
      </div>
    ),
  ],
}
