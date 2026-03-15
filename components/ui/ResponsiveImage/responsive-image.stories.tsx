import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Section } from "@/components/ui/Section/section"
import { ResponsiveImage } from "./responsive-image"

const meta: Meta<typeof ResponsiveImage> = {
  title: "Media/Responsive Image",
  component: ResponsiveImage,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof ResponsiveImage>

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
      <Section>
        <Story />
      </Section>
    ),
  ],
}
