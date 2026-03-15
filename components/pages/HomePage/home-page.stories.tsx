import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import "../../../app/globals.css"

import { AnimatedIcon } from "@/components/ui/AnimatedIcon/animated-icon"
import { AnnouncementBar } from "@/components/ui/AnnouncementBar/announcement-bar"
import { Button } from "@/components/ui/Button/button"
import { CTABanner } from "@/components/ui/CTABanner/cta-banner"
import { FeatureContent } from "@/components/ui/FeatureContent/feature-content"
import { Hero } from "@/components/ui/Hero/hero"
import { HeroVisual } from "@/components/ui/Hero/hero-visual"
import { ItemFlex } from "@/components/ui/ItemFlex/item-flex"
import { Section } from "@/components/ui/Section/section"
import { SiteNav } from "@/components/ui/SiteNav/site-nav"
import { SiteNavLink } from "@/components/ui/SiteNavLink/site-nav-link"
import { SiteNavSubLink } from "@/components/ui/SiteNavSubLink/site-nav-sub-link"
import { StatsCard } from "@/components/ui/StatsCard/stats-card"
import { WebflowStatWrapper } from "@/components/ui/StatsCard/stats-card-wrapper.webflow"
import { textArg } from "@/lib/storybook"
import { WebflowSlot } from "@/lib/storybook-webflow"
import { absoluteFillDecorator } from "@/lib/webflow"
import * as BlogPostCardStories from "../../ui/BlogPostCard/blog-post-card.stories"
import * as CTABannerStories from "../../ui/CTABanner/cta-banner.stories"
import * as FooterStories from "../../ui/Footer/footer.stories"
import * as HeroStories from "../../ui/Hero/hero.stories"
import * as ItemFlexStories from "../../ui/ItemFlex/item-flex.stories"

const PRODUCT_CARDS = [
  {
    label: "Terra Platform™",
    image: { src: "/images/terra-platform-thumbnail.png", alt: "Terra Platform" },
    href: "#platform",
  },
  {
    label: "Terra Portal™",
    image: { src: "/images/terra-portal-thumbnail.png", alt: "Terra Portal" },
    href: "#portal",
  },
]

const NavLinks = () => (
  <WebflowSlot>
    <SiteNavLink label="Products" isGroup>
      {PRODUCT_CARDS.map((card) => (
        <SiteNavSubLink key={card.label} image={card.image} label={card.label} href={card.href} />
      ))}
    </SiteNavLink>
    <SiteNavLink label="About Us" href="#about" />
    <SiteNavLink label="Stories" href="#stories" />
    <SiteNavLink label="Resources" isGroup>
      {PRODUCT_CARDS.map((card) => (
        <SiteNavSubLink key={card.label} image={card.image} label={card.label} href={card.href} />
      ))}
    </SiteNavLink>
    <SiteNavLink label="Partners" href="#partners" />
  </WebflowSlot>
)

function renderStory(story: { render?: Function; args?: any }) {
  return story.render!(story.args ?? {}, {} as any)
}

function categoryArg(category: string, name: string) {
  return { ...textArg(name), table: { category } }
}

const meta = {
  title: "Pages/Home Page",
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    heroHeading: categoryArg("Hero", "Heading"),
    heroDescription: categoryArg("Hero", "Description"),
    heroButtonLabel: categoryArg("Hero", "Button Label"),

    feature1Title: categoryArg("Feature: Coverage", "Title"),
    feature1Description: categoryArg("Feature: Coverage", "Description"),
    feature2Title: categoryArg("Feature: Continuous", "Title"),
    feature2Description: categoryArg("Feature: Continuous", "Description"),
    feature3Title: categoryArg("Feature: Context", "Title"),
    feature3Description: categoryArg("Feature: Context", "Description"),
    feature4Title: categoryArg("Feature: Humans", "Title"),
    feature4Description: categoryArg("Feature: Humans", "Description"),

    stats1Value: categoryArg("Stats: Coverage", "Value"),
    stats1Suffix: categoryArg("Stats: Coverage", "Suffix"),
    stats1Description: categoryArg("Stats: Coverage", "Description"),
    stats2Value: categoryArg("Stats: Speed", "Value"),
    stats2Suffix: categoryArg("Stats: Speed", "Suffix"),
    stats2Description: categoryArg("Stats: Speed", "Description"),
    stats3Value: categoryArg("Stats: Always-On", "Value"),
    stats3Suffix: categoryArg("Stats: Always-On", "Suffix"),
    stats3Description: categoryArg("Stats: Always-On", "Description"),

    ctaHeading: categoryArg("CTA Banner", "Heading"),
    ctaDescription: categoryArg("CTA Banner", "Description"),
    ctaPlaceholder: categoryArg("CTA Banner", "Placeholder"),
  },
} satisfies Meta

export default meta
type Story = StoryObj<any>

export const Default: Story = {
  args: {
    heroHeading: HeroStories.default.args?.heading ?? "Offensive security built for the AI era.",
    heroDescription:
      HeroStories.default.args?.description ??
      "Pentest at the pace of AI with Terra's continuous agentic platform.",
    heroButtonLabel: HeroStories.default.args?.buttonLabel ?? "Book a Demo",

    feature1Title: "Leave nothing unvalidated",
    feature1Description:
      "Full attack surface coverage that keeps pace with your expanding infrastructure, APIs, and cloud workloads.",
    feature2Title: "Work with what's already happening",
    feature2Description:
      "Continuous pentesting that integrates into your existing security workflows and tools — not another silo.",
    feature3Title: "Noise is a business liability",
    feature3Description:
      "White-box context means fewer false positives and findings prioritized by actual business impact.",
    feature4Title: "AI-powered, human-driven",
    feature4Description:
      "Agentic AI handles scale and speed. Human operators bring judgment, creativity, and accountability.",

    stats1Value: "100",
    stats1Suffix: "%",
    stats1Description: "Attack surface coverage, on pace with attack surface development.",
    stats2Value: "250",
    stats2Suffix: "x",
    stats2Description:
      "Faster than traditional pentesting approaches (from 4-6 weeks to 2-4 hours).",
    stats3Value: "24",
    stats3Suffix: "/7",
    stats3Description: "Always-on vulnerability analysis compared to point-in-time snapshots.",

    ctaHeading:
      CTABannerStories.default.args?.heading ?? "Continuous is the new pentesting standard.",
    ctaDescription:
      CTABannerStories.default.args?.description ??
      "Secure your spot and join dozens of security teams that already enjoy the future of pentesting.",
    ctaPlaceholder: CTABannerStories.default.args?.placeholder ?? "Email address",
  },
  render: (args: any) => (
    <>
      {/* 1. SiteNav + AnnouncementBar */}
      <WebflowSlot>
        <SiteNav
          showCta
          ctaLabel="Book a Demo"
          ctaHref="#demo"
          navLinks={<NavLinks />}
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
      </WebflowSlot>

      {/* 2. Hero */}
      <WebflowSlot>
        <Hero
          heading={args.heroHeading}
          description={args.heroDescription}
          buttonLabel={args.heroButtonLabel}
          image={(HeroStories.WithVisual.args as any)?.image}
        >
          <WebflowSlot decorator={absoluteFillDecorator}>
            <HeroVisual />
          </WebflowSlot>
        </Hero>
      </WebflowSlot>

      {/* 3. Client Logos */}
      <WebflowSlot>{renderStory(ItemFlexStories.Clients)}</WebflowSlot>

      {/* 4. Feature: Coverage */}
      <WebflowSlot>
        <Section
          heading="Coverage that keeps up with your attack surface."
          variant="chalk"
          paddingBottom={0}
        >
          <FeatureContent
            variant="imageLeft"
            title={args.feature1Title}
            description={args.feature1Description}
            image={{ src: "/images/findings.svg", alt: "Findings" }}
            icon={<AnimatedIcon icon="target" />}
          />
        </Section>
      </WebflowSlot>

      {/* 5. Feature: Continuous */}
      <WebflowSlot>
        <Section heading="From point in time, to all the time." variant="chalk" paddingBottom={0}>
          <FeatureContent
            variant="imageRight"
            title={args.feature2Title}
            description={args.feature2Description}
            image={{ src: "/images/diagram.svg", alt: "Flow Diagram" }}
            icon={<AnimatedIcon icon="half-circle" />}
          />
        </Section>
      </WebflowSlot>

      {/* 6. Feature: Context */}
      <WebflowSlot>
        <Section heading="White-box level context." variant="chalk" paddingBottom={0}>
          <FeatureContent
            variant="imageLeft"
            title={args.feature3Title}
            description={args.feature3Description}
            image={{ src: "/images/signals-pipeline.svg", alt: "Signals Pipeline" }}
            icon={<AnimatedIcon icon="shield" />}
          />
        </Section>
      </WebflowSlot>

      {/* 7. Feature: Humans */}
      <WebflowSlot>
        <Section heading="Humans always in the loop." variant="chalk">
          <FeatureContent
            variant="imageRight"
            title={args.feature4Title}
            description={args.feature4Description}
            image={{ src: "/images/ai-assistant.svg", alt: "AI Assistant" }}
            icon={<AnimatedIcon icon="target" />}
          />
        </Section>
      </WebflowSlot>

      {/* 8. Stats */}
      <WebflowSlot>
        <Section
          variant="moss"
          heading="The difference is undeniable."
          text="Terra accelerates better outcomes across your security program and organization."
          showDivider={false}
        >
          <ItemFlex paddingTop={48} paddingTopMobile={32}>
            <StatsCard
              value={args.stats1Value}
              suffix={args.stats1Suffix}
              description={args.stats1Description}
            />
            <StatsCard
              value={args.stats2Value}
              suffix={args.stats2Suffix}
              description={args.stats2Description}
            />
            <StatsCard
              value={args.stats3Value}
              suffix={args.stats3Suffix}
              description={args.stats3Description}
            />
          </ItemFlex>
        </Section>
      </WebflowSlot>

      {/* 9. Compliance Logos */}
      <WebflowSlot>{renderStory(ItemFlexStories.Certifications)}</WebflowSlot>

      {/* 10. Recent Insights */}
      {/* <WebflowSlot>
        <Section heading="Recent Insights">
          {renderStory(BlogPostCardStories.Grid)}
          <div className="mt-12 flex justify-center">
            <Button variant="outline">View All Insights</Button>
          </div>
        </Section>
      </WebflowSlot> */}

      {/* 11. CTA Banner */}
      <WebflowSlot>
        <CTABanner
          heading={args.ctaHeading}
          description={args.ctaDescription}
          placeholder={args.ctaPlaceholder}
          backgroundImage={(CTABannerStories.WithBackgroundImage.args as any)?.backgroundImage}
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundPositionMobile="bottom"
          height={(CTABannerStories.WithBackgroundImage.args as any)?.height}
          heightMobile={(CTABannerStories.WithBackgroundImage.args as any)?.heightMobile}
        />
      </WebflowSlot>

      {/* 12. Footer */}
      <WebflowSlot>{renderStory(FooterStories.Default)}</WebflowSlot>
    </>
  ),
}
