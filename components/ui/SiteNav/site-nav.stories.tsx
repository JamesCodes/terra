import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type React from "react"
import { SiteNavLink } from "@/components/ui/SiteNavLink/site-nav-link"
import { SiteNavSubLink } from "@/components/ui/SiteNavSubLink/site-nav-sub-link"
import { WaypointSection } from "@/components/ui/WaypointSection/waypoint-section"
import { WebflowSlot } from "@/lib/storybook-webflow"
import { SiteNav } from "./site-nav"
import { AnnouncementBar } from "@/components/ui/AnnouncementBar/announcement-bar"

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

const DefaultNavLinks = () => (
  <WebflowSlot>
    <SiteNavLink label="Products" isGroup>
      <WebflowSlot>
        {SAMPLE_CARDS.map((card) => (
          <SiteNavSubLink key={card.label} image={card.image} label={card.label} href={card.href} />
        ))}
      </WebflowSlot>
    </SiteNavLink>
    <SiteNavLink label="About Us" href="#about" />
    <SiteNavLink label="Stories" href="#stories" />
    <SiteNavLink label="Resources" isGroup>
      <WebflowSlot>
        {SAMPLE_CARDS.map((card) => (
          <SiteNavSubLink key={card.label} image={card.image} label={card.label} href={card.href} />
        ))}
      </WebflowSlot>
    </SiteNavLink>
    <SiteNavLink label="Partners" href="#partners" />
  </WebflowSlot>
)

const meta = {
  title: "Navigation/Site Nav",
  component: SiteNav,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
  tags: ["autodocs"],
} satisfies Meta<typeof SiteNav>

export default meta
type Story = StoryObj<any>

export const Default: Story = {
  args: {
    panelDescription: "Be the first to experience the future of security.",
    showCta: true,
    ctaLabel: "Book a Demo",
    ctaHref: "#demo",
    showLinkedin: true,
    linkedinHref: "https://linkedin.com/company/terra",
    showYoutube: true,
    youtubeHref: "https://youtube.com/@terra",
  },
  render: (args) => (
    <WebflowSlot>
      <SiteNav {...(args as React.ComponentProps<typeof SiteNav>)} navLinks={<DefaultNavLinks />} />
    </WebflowSlot>
  ),
}

export const NoCTA: Story = {
  args: {
    showCta: false,
  },
  render: (args) => (
    <SiteNav {...(args as React.ComponentProps<typeof SiteNav>)} navLinks={<DefaultNavLinks />} />
  ),
}

export const NoLinks: Story = {
  args: {
    showCta: true,
    ctaLabel: "Book a Demo",
    ctaHref: "#demo",
  },
}

export const WithAnnouncementBar: Story = {
  args: {
    showCta: true,
    ctaLabel: "Book a Demo",
    ctaHref: "#demo",
  },
  render: (args) => (
    <SiteNav
      {...(args as React.ComponentProps<typeof SiteNav>)}
      navLinks={<DefaultNavLinks />}
      announcementBar={
        <WebflowSlot>
          <AnnouncementBar
            announcements={[
              {
                text: "Terra Named Winner of the 2025 AWS, Crowdstrike, Nvidia Cybersecurity Accelerator",
              },
            ]}
          />
        </WebflowSlot>
      }
    />
  ),
}

export const StuckCTA: Story = {
  args: {
    showCta: false,
    showCtaOnStuck: true,
    ctaLabel: "Book a Demo",
    ctaHref: "#demo",
  },
  render: (args) => (
    <div className="h-[300vh]">
      <SiteNav {...(args as React.ComponentProps<typeof SiteNav>)} navLinks={<DefaultNavLinks />} />
      <div className="container pt-8">
        <p className="text-muted-foreground">
          Scroll down to see the CTA button appear when the nav enters its stuck position.
        </p>
      </div>
    </div>
  ),
}

export const WithScrollBehavior: Story = {
  args: {
    showCta: true,
    ctaLabel: "Book a Demo",
    ctaHref: "#demo",
  },
  render: (args) => (
    <div className="h-[300vh]">
      <SiteNav
        {...(args as React.ComponentProps<typeof SiteNav>)}
        navLinks={<DefaultNavLinks />}
        announcementBar={
          <WebflowSlot>
            <div className="bg-primary px-4 py-2 text-center text-primary-foreground text-sm">
              New: Terra ATLAS is now available.{" "}
              <a href="#" className="underline">
                Learn more &rarr;
              </a>
            </div>
          </WebflowSlot>
        }
      />
      <div className="container pt-8">
        <p className="text-muted-foreground">
          Scroll down to see the site nav links fade out and the announcement bar slide away.
        </p>
      </div>
    </div>
  ),
}

export const WithWaypointNavigation: Story = {
  args: {
    showCta: true,
    ctaLabel: "Book a Demo",
    ctaHref: "#demo",
    stuckText: "Terra Platform™",
  },
  render: (args) => (
    <div>
      <SiteNav {...(args as React.ComponentProps<typeof SiteNav>)} navLinks={<DefaultNavLinks />} />
      <WaypointSection waypointId="overview" waypointLabel="Overview" waypointOrder={0}>
        <div className="container min-h-screen py-48">
          <h2 className="font-bold text-4xl">Overview</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Scroll down to see the waypoint navigation appear in the site nav as the main links fade
            out.
          </p>
        </div>
      </WaypointSection>
      <WaypointSection waypointId="features" waypointLabel="Features" waypointOrder={1}>
        <div className="container min-h-screen bg-muted/50 py-48">
          <h2 className="font-bold text-4xl">Features</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The active waypoint link updates as you scroll through sections.
          </p>
        </div>
      </WaypointSection>
      <WaypointSection waypointId="pricing" waypointLabel="Pricing" waypointOrder={2}>
        <div className="container min-h-screen py-48">
          <h2 className="font-bold text-4xl">Pricing</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Click a waypoint link in the site nav to smooth-scroll to that section.
          </p>
        </div>
      </WaypointSection>
      <div className="container py-48">
        <p className="text-muted-foreground">End of page content.</p>
      </div>
    </div>
  ),
}

export const Mobile: Story = {
  args: {
    showCta: true,
    ctaLabel: "Book a Demo",
    ctaHref: "#demo",
    showLinkedin: true,
    linkedinHref: "https://linkedin.com/company/terra",
    showYoutube: true,
    youtubeHref: "https://youtube.com/@terra",
  },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: (args) => (
    <WebflowSlot>
      <SiteNav {...(args as React.ComponentProps<typeof SiteNav>)} navLinks={<DefaultNavLinks />} />
    </WebflowSlot>
  ),
}
