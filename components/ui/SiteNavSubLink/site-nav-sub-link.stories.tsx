import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { textArg } from "@/lib/storybook"
import { SiteNavSubLink } from "./site-nav-sub-link"
import { propLabels } from "./site-nav-sub-link.webflow"

const meta = {
  title: "Navigation/SiteNav SubLink",
  component: SiteNavSubLink,
  parameters: {
    layout: "centered",
    controls: {
      exclude: ["className", "image"],
    },
  },
  tags: ["autodocs"],
  args: {
    label: "Terra Platform™",
    image: {
      src: "https://placehold.co/696x444/260700/260700",
      alt: "Terra Platform",
    },
    href: "#",
  },
  argTypes: {
    label: textArg(propLabels.label),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 348 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SiteNavSubLink>

export default meta
type Story = StoryObj<any>

export const Default: Story = {}

export const Portal: Story = {
  args: {
    label: "Terra Portal™",
    image: {
      src: "https://placehold.co/696x444/f0ebd4/f0ebd4",
      alt: "Terra Portal",
    },
  },
}
