import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { selectArg } from "@/lib/storybook"
import { Navbar } from "./navbar"
import { variantMap } from "./navbar.webflow"
import "../../../app/globals.css"

const defaultLinks = [
  { label: "Product", href: "#product" },
  { label: "About Us", href: "#about" },
  { label: "Stories", href: "#stories" },
  { label: "Resources", href: "#resources" },
  { label: "Partners", href: "#partners" },
]

const meta = {
  title: "UI/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    variant: selectArg("Variant", variantMap),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Navbar>

export default meta
type Story = StoryObj<any>

export const Default: Story = {
  args: {
    links: defaultLinks,
    ctaLabel: "Book a Demo",
    ctaHref: "#demo",
  },
}

export const Dark: Story = {
  args: {
    variant: "dark",
    links: defaultLinks,
    ctaLabel: "Book a Demo",
    ctaHref: "#demo",
  },
}

export const NoLinks: Story = {
  args: {
    links: [],
    ctaLabel: "Book a Demo",
    ctaHref: "#demo",
  },
}

export const ThreeLinks: Story = {
  args: {
    links: defaultLinks.slice(0, 3),
    ctaLabel: "Get Started",
    ctaHref: "#start",
  },
}

export const Mobile: Story = {
  args: {
    links: defaultLinks,
    ctaLabel: "Book a Demo",
    ctaHref: "#demo",
  },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
}
