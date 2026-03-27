import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SiteNav } from "@/components/ui/SiteNav/site-nav"
import { SiteNavLink } from "@/components/ui/SiteNavLink/site-nav-link"
import { SiteNavSubLink } from "@/components/ui/SiteNavSubLink/site-nav-sub-link"
import { AnnouncementBar } from "@/components/ui/AnnouncementBar/announcement-bar"
import { WebflowSlot } from "@/lib/storybook-webflow"
import { TableOfContents } from "./table-of-contents"


const SAMPLE_CARDS = [
  {
    label: "Terra Platform™",
    image: { src: "https://placehold.co/696x444/260700/260700", alt: "Terra Platform" },
    href: "#",
  },
  {
    label: "Terra Portal™",
    image: { src: "https://placehold.co/696x444/f0ebd4/f0ebd4", alt: "Terra Portal" },
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

const RichTextContent = () => (
  <div className="w-richtext">
    <h2>Getting Started</h2>
    <p>
      Welcome to the platform. This guide will walk you through everything you need to know to get
      up and running quickly. We cover the basics of account setup, configuration, and your first
      integration.
    </p>
    <p>
      Before diving in, make sure you have the prerequisites ready. You will need an active account
      and API credentials. The onboarding process typically takes less than ten minutes.
    </p>
    <p>
      Our platform is designed to be intuitive, but having a solid understanding of the core
      concepts will help you get the most out of it from day one.
    </p>

    <h2>Authentication</h2>
    <p>
      All API requests require authentication via bearer tokens. You can generate tokens from your
      dashboard under Settings &rarr; API Keys. Tokens expire after 30 days by default.
    </p>
    <p>
      For server-to-server communication, we recommend using service accounts with scoped
      permissions rather than personal access tokens. This ensures better auditability and reduces
      the risk of credential leakage.
    </p>

    <h2>Configuration</h2>
    <p>
      The platform supports extensive configuration through both the dashboard and configuration
      files. Environment-specific settings can be managed through deployment profiles.
    </p>
    <p>
      Configuration changes are versioned and can be rolled back at any time. We recommend using
      infrastructure-as-code patterns for production environments to maintain consistency across
      deployments.
    </p>

    <h2>Data Integration</h2>
    <p>
      Connect your existing data sources using our pre-built integrations. We support major cloud
      providers, databases, and third-party services out of the box.
    </p>
    <p>
      Custom integrations can be built using our webhook system and event-driven architecture. See
      the API reference for available endpoints. Our SDK supports TypeScript, Python, and Go.
    </p>
    <p>
      Data pipelines can be configured to run on a schedule or triggered by events. Built-in
      deduplication and schema validation ensure data quality throughout the pipeline.
    </p>

    <h2>Monitoring &amp; Alerts</h2>
    <p>
      Set up monitoring rules to track system health and data pipeline status. Alerts can be
      configured to notify your team via email, Slack, or PagerDuty when thresholds are breached.
    </p>
    <p>
      The monitoring dashboard provides real-time visibility into your system. Historical data is
      retained for 90 days by default, with options for extended retention on enterprise plans.
    </p>

    <h2>Best Practices</h2>
    <p>
      Follow our recommended practices for security, performance, and reliability. Regular audits of
      your configuration and access controls help maintain a strong security posture.
    </p>
    <p>
      We publish quarterly security advisories and maintain a public changelog for all platform
      updates. Subscribe to our engineering blog for deep dives into architecture decisions and
      performance optimisations.
    </p>
  </div>
)

const meta = {
  title: "Utilities/TableOfContents",
  component: TableOfContents,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TableOfContents>

export default meta
type Story = StoryObj<typeof meta>

export const Desktop: Story = {
  render: () => (
    <div>
      <SiteNav
        navLinks={<DefaultNavLinks />}
        showCta
        ctaLabel="Book a Demo"
        ctaHref="#demo"
        announcementBar={
          <WebflowSlot>
            <AnnouncementBar
              announcements={[
                { text: "Terra Named Winner of the 2025 AWS, Crowdstrike, Nvidia Cybersecurity Accelerator" },
              ]}
            />
          </WebflowSlot>
        }
      />
      <div className="container flex gap-12 py-8">
        <aside className="w-64 shrink-0">
          <div className="sticky top-(--nav-height,80px) pt-8">
            <TableOfContents />
          </div>
        </aside>
        <main className="max-w-2xl">
          <RichTextContent />
        </main>
      </div>
    </div>
  ),
}

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => (
    <div>
      <SiteNav
        navLinks={<DefaultNavLinks />}
        showCta
        ctaLabel="Book a Demo"
        ctaHref="#demo"
        announcementBar={
          <WebflowSlot>
            <AnnouncementBar
              announcements={[
                { text: "Terra Named Winner of the 2025 AWS, Crowdstrike, Nvidia Cybersecurity Accelerator" },
              ]}
            />
          </WebflowSlot>
        }
      />
      <main className="container py-8">
        <RichTextContent />
      </main>
      <TableOfContents />
    </div>
  ),
}
