import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FooterNavColumn } from "@/components/ui/FooterNavColumn/footer-nav-column"
import { SiteLink } from "@/components/ui/SiteLink/site-link"
import { ResponsiveImage } from "@/components/ui/ResponsiveImage/responsive-image"
import { WebflowSlot } from "@/lib/storybook-webflow"
import { Footer } from "./footer"

const defaultSocialLinks = [
  { platform: "youtube" as const, href: "#youtube" },
  { platform: "linkedin" as const, href: "#linkedin" },
]

const defaultNavColumns = (
  <>
    <FooterNavColumn label="Products">
      <SiteLink label="Terra Platform" href="#terra-platform" />
      <SiteLink label="Terra Portal" href="#terra-portal" />
    </FooterNavColumn>
    <FooterNavColumn label="Resources" directLink>
      <SiteLink label="Insights" href="#insights" />
    </FooterNavColumn>
    <FooterNavColumn label="Work With Us">
      <SiteLink label="Testimonials" href="#testimonials" />
      <SiteLink label="Partners" href="#partners" />
    </FooterNavColumn>
    <FooterNavColumn label="Company">
      <SiteLink label="About" href="#about" />
      <SiteLink label="Careers" href="#careers" />
      <SiteLink label="Support" href="#support" />
    </FooterNavColumn>
  </>
)

const defaultLegalLinks = (
  <>
    <SiteLink label="DPA" href="#dpa" />
    <SiteLink label="Privacy Policy" href="#privacy" />
    <SiteLink label="SLA" href="#sla" />
    <SiteLink label="Terms of Service" href="#terms" />
  </>
)

const meta = {
  title: "Navigation/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
    controls: { include: [] },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<any>

export const Default: Story = {
  render: () => (
    <Footer
      socialLinks={defaultSocialLinks}
      navColumns={<WebflowSlot>{defaultNavColumns}</WebflowSlot>}
      legalLinks={<WebflowSlot>{defaultLegalLinks}</WebflowSlot>}
      badges={<WebflowSlot>{<ResponsiveImage src="/images/soc2.png" />}</WebflowSlot>}
    />
  ),
}

export const WithBadges: Story = {
  render: () => (
    <Footer
      socialLinks={defaultSocialLinks}
      navColumns={<WebflowSlot>{defaultNavColumns}</WebflowSlot>}
      legalLinks={<WebflowSlot>{defaultLegalLinks}</WebflowSlot>}
      badges={
        <WebflowSlot>
          <ResponsiveImage src="/images/soc2.png" />
          <ResponsiveImage src="/images/soc2.png" />
        </WebflowSlot>
      }
    />
  ),
}

export const Mobile: Story = {
  render: () => (
    <Footer
      socialLinks={defaultSocialLinks}
      navColumns={<WebflowSlot>{defaultNavColumns}</WebflowSlot>}
      legalLinks={<WebflowSlot>{defaultLegalLinks}</WebflowSlot>}
      badges={<WebflowSlot>{<ResponsiveImage src="/images/soc2.png" />}</WebflowSlot>}
    />
  ),
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
}
