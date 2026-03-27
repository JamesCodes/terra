import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SiteLink } from "@/components/ui/SiteLink/site-link"
import { FooterNavColumn } from "./footer-nav-column"

const meta = {
  title: "Navigation/FooterNavColumn",
  component: FooterNavColumn,
  parameters: {
    layout: "centered",
    backgrounds: { default: "dark" },
    controls: { include: [] },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="min-w-[300px] bg-primary p-8 text-white">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FooterNavColumn>

export default meta
type Story = StoryObj<typeof FooterNavColumn>

export const WithMultipleLinks: Story = {
  args: {
    label: "Products",
    children: (
      <>
        <SiteLink label="Terra Platform" href="#terra-platform" />
        <SiteLink label="Terra Portal" href="#terra-portal" />
      </>
    ),
  },
}

export const WithSingleLink: Story = {
  args: {
    label: "Resources",
    directLink: true,
    children: <SiteLink label="Insights" href="#insights" />,
  },
}

export const WithThreeLinks: Story = {
  args: {
    label: "Company",
    children: (
      <>
        <SiteLink label="About" href="#about" />
        <SiteLink label="Careers" href="#careers" />
        <SiteLink label="Support" href="#support" />
      </>
    ),
  },
}
