import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CareerTestimonialCard } from "@/components/ui/CareerTestimonialCard/career-testimonial-card"
import { CheckCard } from "@/components/ui/CheckCard/check-card"
import { ColorCard } from "@/components/ui/ColorCard/color-card"
import { ImageCard } from "@/components/ui/ImageCard/image-card"
import { Section } from "@/components/ui/Section/section"
import { TextCard } from "@/components/ui/TextCard/text-card"
import { numberArg, responsiveArgs } from "@/lib/storybook"
import { WebflowSlot } from "@/lib/storybook-webflow"
import { Carousel } from "./carousel"
import { propLabels } from "./carousel.webflow"

const meta = {
  title: "Media/Carousel",
  component: Carousel,
  parameters: {
    layout: "fullscreen",
    controls: {
      exclude: ["className", "children"],
    },
  },
  tags: ["autodocs"],
  args: {
    gap: 16,
  },
  argTypes: {
    ...responsiveArgs("gap", numberArg(propLabels.gap, { min: -1, max: 100 })),
    useContentsMaxHeight: { name: propLabels.useContentsMaxHeight, control: "boolean" as const },
    ...responsiveArgs(
      "contentsMaxHeight",
      numberArg(propLabels.contentsMaxHeight, { min: -1, max: 800 }),
    ),
    useItemWidth: { name: propLabels.useItemWidth, control: "boolean" as const },
    ...responsiveArgs("itemWidth", numberArg(propLabels.itemWidth, { min: -1, max: 800 })),
  },
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof Carousel>

const images = [
  { src: "https://picsum.photos/seed/carousel1/660/528", aspect: "660/528" },
  { src: "https://picsum.photos/seed/carousel2/543/334", aspect: "543/334" },
  { src: "https://picsum.photos/seed/carousel3/793/528", aspect: "793/528" },
  { src: "https://picsum.photos/seed/carousel4/491/528", aspect: "491/528" },
  { src: "https://picsum.photos/seed/carousel5/637/528", aspect: "637/528" },
  { src: "https://picsum.photos/seed/carousel6/704/528", aspect: "704/528" },
]

export const Images: Story = {
  render: (args) => (
    <Section heading="Gallery" showDivider={false}>
      <WebflowSlot>
        <Carousel {...args}>
          <WebflowSlot>
            {images.map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt={`Sample image ${i + 1}`}
                className="h-80 shrink-0 rounded-xl object-cover"
                style={{ aspectRatio: img.aspect }}
              />
            ))}
          </WebflowSlot>
        </Carousel>
      </WebflowSlot>
    </Section>
  ),
}

export const TextCards: Story = {
  args: { gap: 24 },
  render: (args) => (
    <Section heading="Our Services" showDivider={false}>
      <WebflowSlot>
        <Carousel {...args}>
          <WebflowSlot>
            {[
              {
                title: "Portfolio Construction",
                description:
                  "Build diversified portfolios with institutional-grade tools and real-time risk analytics.",
              },
              {
                title: "Risk Management",
                description:
                  "Monitor and manage risk across all positions with configurable alerts and limits.",
              },
              {
                title: "Trade Execution",
                description:
                  "Execute trades across multiple venues with smart order routing and best execution.",
              },
              {
                title: "Client Reporting",
                description:
                  "Generate custom reports for clients with automated delivery and white-labeling.",
              },
              {
                title: "Compliance",
                description: "Stay compliant with built-in regulatory checks and audit trails.",
              },
              {
                title: "Data Analytics",
                description:
                  "Analyze performance attribution, factor exposures, and market trends.",
              },
            ].map((card) => (
              <TextCard
                key={card.title}
                className="w-72 shrink-0"
                title={card.title}
                description={card.description}
              />
            ))}
          </WebflowSlot>
        </Carousel>
      </WebflowSlot>
    </Section>
  ),
}

export const CheckCards: Story = {
  args: { gap: 16 },
  render: (args) => (
    <Section heading="Security & Compliance" showDivider={false}>
      <WebflowSlot>
        <Carousel {...args}>
          <WebflowSlot>
            {[
              "SOC 2 Type II certified",
              "GDPR compliant",
              "ISO 27001 certified",
              "256-bit AES encryption",
              "Multi-factor authentication",
              "Role-based access control",
              "Regular penetration testing",
              "99.99% uptime SLA",
            ].map((text) => (
              <CheckCard key={text} className="w-48 shrink-0" text={text} />
            ))}
          </WebflowSlot>
        </Carousel>
      </WebflowSlot>
    </Section>
  ),
}

export const ColorCards: Story = {
  args: { gap: 24 },
  render: (args) => (
    <Section heading="Explore" variant="obsidian" showDivider={false}>
      <WebflowSlot>
        <Carousel {...args}>
          <WebflowSlot>
            <ColorCard
              className="w-80 shrink-0"
              variant="moss"
              title="Get started"
              description="Launch your first portfolio in minutes with our guided onboarding."
              buttonLabel="Start free trial"
            />
            <ColorCard
              className="w-80 shrink-0"
              variant="magma"
              title="Enterprise"
              description="Custom solutions for institutional investors and asset managers."
              buttonLabel="Contact sales"
            />
            <ColorCard
              className="w-80 shrink-0"
              variant="terracotta"
              title="Partners"
              description="Join our partner ecosystem and grow your business with Terra."
              buttonLabel="Become a partner"
            />
            <ColorCard
              className="w-80 shrink-0"
              variant="moss"
              title="Documentation"
              description="Comprehensive API docs, guides, and tutorials to help you integrate."
              buttonLabel="Read docs"
            />
            <ColorCard
              className="w-80 shrink-0"
              variant="magma"
              title="Community"
              description="Connect with other developers and share best practices."
              buttonLabel="Join community"
            />
          </WebflowSlot>
        </Carousel>
      </WebflowSlot>
    </Section>
  ),
}

export const Testimonials: Story = {
  args: { gap: 24, useItemWidth: true, itemWidth: 320 },
  render: (args) => (
    <Section heading="Life at Terra" showDivider={false} textAlign="left" fullBleedContents>
      <WebflowSlot>
        <Carousel {...args}>
          <WebflowSlot>
            <div className="contents">
              <div className="contents">
                <div className="contents">
                  <CareerTestimonialCard
                    className="w-80 shrink-0"
                    department="Engineering"
                    testimonial="The culture of innovation here is unmatched. I've grown more in two years than I did in five at my previous company."
                    name="Sarah Chen"
                    position="Senior Software Engineer"
                  />
                </div>
                <div className="contents">
                  <CareerTestimonialCard
                    className="w-80 shrink-0"
                    department="Product"
                    testimonial="What I love most is the autonomy. We're trusted to make decisions and move fast without endless approval chains."
                    name="David Amari"
                    position="Product Manager"
                  />
                </div>
                <div className="contents">
                  <CareerTestimonialCard
                    className="w-80 shrink-0"
                    department="Design"
                    testimonial="Collaborating across teams feels effortless. Designers, engineers, and PMs all speak the same language here."
                    name="Maya Patel"
                    position="Lead Product Designer"
                  />
                </div>
                <div className="contents">
                  <CareerTestimonialCard
                    className="w-80 shrink-0"
                    department="Data Science"
                    testimonial="The problems we solve are genuinely interesting. Every day brings a new challenge that pushes me to think differently."
                    name="James Okafor"
                    position="Data Scientist"
                  />
                </div>
                <div className="contents">
                  <CareerTestimonialCard
                    className="w-80 shrink-0"
                    department="Operations"
                    testimonial="The leadership team genuinely cares about work-life balance. It's not just a talking point — it's built into how we operate."
                    name="Lisa Nakamura"
                    position="Operations Lead"
                  />
                </div>
              </div>
            </div>
          </WebflowSlot>
        </Carousel>
      </WebflowSlot>
    </Section>
  ),
}

export const ImageCards: Story = {
  args: { gap: 16, useContentsMaxHeight: true, contentsMaxHeight: 334 },
  render: (args) => (
    <Section heading="Featured Work" showDivider={false} fullBleedContents>
      <WebflowSlot>
        <Carousel {...args}>
          <WebflowSlot>
            {images.map((img, i) => (
              <ImageCard
                key={i}
                image={{ src: img.src }}
                title={`Sample image ${i + 1}`}
                showTitle={false}
                useAspectRatio={false}
              />
            ))}
          </WebflowSlot>
        </Carousel>
      </WebflowSlot>
    </Section>
  ),
}
