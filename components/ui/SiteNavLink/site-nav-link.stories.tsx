import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SiteNavSubLink } from "@/components/ui/SiteNavSubLink/site-nav-sub-link"
import { textArg } from "@/lib/storybook"
import { SiteNavLink } from "./site-nav-link"
import { propLabels } from "./site-nav-link.webflow"

const SAMPLE_CARDS = [
  {
    label: "Terra Platform™",
    image: {
      src: "https://placehold.co/696x444/260700/260700",
      alt: "Terra Platform",
    },
    href: "#",
  },
  {
    label: "Terra Portal™",
    image: {
      src: "https://placehold.co/696x444/f0ebd4/f0ebd4",
      alt: "Terra Portal",
    },
    href: "#",
  },
]

const meta = {
  title: "Navigation/SiteNav Link",
  component: SiteNavLink,
  parameters: {
    layout: "padded",
    controls: {
      exclude: ["className", "children"],
    },
  },
  tags: ["autodocs"],
  args: {
    label: "Products",
    isGroup: true,
  },
  argTypes: {
    label: textArg(propLabels.label),
  },
  decorators: [
    (Story) => (
      <div className="mx-auto">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<any>

export default meta
type Story = StoryObj<any>

export const Trigger: Story = {
  render: (args) => (
    <SiteNavLink {...args}>
      {SAMPLE_CARDS.map((card) => (
        <SiteNavSubLink key={card.label} image={card.image} label={card.label} href={card.href} />
      ))}
    </SiteNavLink>
  ),
}

export const PlainLink: Story = {
  args: {
    label: "About Us",
    href: "#about",
  },
  render: (args) => <SiteNavLink {...args} />,
}

export const TriggerWithDropdown: Story = {
  args: {
    label: "Products",
    description: "Be the first to experience the future of security.",
    showCta: true,
    ctaLabel: "Book a Demo",
    ctaHref: "#",
  },
  render: (args) => (
    <SiteNavLink {...args}>
      {SAMPLE_CARDS.map((card) => (
        <SiteNavSubLink key={card.label} image={card.image} label={card.label} href={card.href} />
      ))}
    </SiteNavLink>
  ),
}

export const Default: Story = {
  render: (args) => (
    <SiteNavLink {...args}>
      {SAMPLE_CARDS.map((card) => (
        <SiteNavSubLink key={card.label} image={card.image} label={card.label} href={card.href} />
      ))}
    </SiteNavLink>
  ),
}

export const MobileTrigger: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: (args) => (
    <SiteNavLink {...args}>
      {SAMPLE_CARDS.map((card) => (
        <SiteNavSubLink key={card.label} image={card.image} label={card.label} href={card.href} />
      ))}
    </SiteNavLink>
  ),
}
