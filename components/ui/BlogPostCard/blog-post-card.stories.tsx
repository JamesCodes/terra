import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { selectArg, textArg } from "@/lib/storybook"
import { BlogPostCard } from "./blog-post-card"
import { propLabels, variantMap } from "./blog-post-card.webflow"
import "../../../app/globals.css"
import { FloatingPostImage } from "@/components/ui/FloatingPostImage/floating-post-image"
import { Section } from "@/components/ui/Section/section"
import { WebflowSlot } from "@/lib/storybook-webflow"

const meta = {
  title: "Cards/Blog Post Card",
  component: BlogPostCard,
  parameters: {
    layout: "fullscreen",
    controls: {
      exclude: ["image", "href", "className"],
    },
  },
  tags: ["autodocs"],
  args: {
    variant: "Highlight" as any,
    title: "Blog Post Title",
    description: "A brief summary of the blog post content.",
    author: "Author Name",
    date: "January 1, 2026",
  },
  argTypes: {
    variant: selectArg(propLabels.layout, variantMap),
    title: textArg(propLabels.title),
    description: textArg(propLabels.description),
    author: textArg(propLabels.author),
    date: textArg(propLabels.date),
  },
} satisfies Meta<typeof BlogPostCard>

export default meta
type Story = StoryObj<any>

export const Highlight: Story = {
  render: () => (
    <Section>
      <div className="grid divide-border max-lg:divide-y md:grid-cols-3 lg:divide-x">
        <WebflowSlot>
          <BlogPostCard
            variant="highlight"
            category={{ name: "Featured" }}
            title="When AI Becomes the Attack Surface: CVE-2026-25724"
            author="Ofir Hamam"
            date="February 24, 2026"
            description="AI isn't just a tool anymore — it's an attack surface. Learn how we uncovered CVE-2026-25724 in an agentic AI coding tool."
            href="#"
          />
        </WebflowSlot>
        <WebflowSlot>
          <BlogPostCard
            variant="highlight"
            category={{ name: "Research", url: "#" }}
            title="White Box Pentesting with Code & Business Context"
            author="The Terra Team"
            date="February 11, 2026"
            description="Go beyond surface testing—white-box pentesting grounded in source code and business logic uncovers high-impact vulnerabilities."
            href="#"
          />
        </WebflowSlot>
        <WebflowSlot>
          <BlogPostCard
            variant="highlight"
            category={{ name: "Essential Guide" }}
            title="Offensive Security Training in an AI World: 7 Essentials"
            author="Shahar Peled"
            date="January 20, 2026"
            description="In an AI-powered threat landscape, offensive security training must evolve—explore the seven essential components."
            href="#"
          />
        </WebflowSlot>
      </div>
    </Section>
  ),
}

export const Listing: Story = {
  render: () => (
    <Section>
      <div className="grid gap-5 md:grid-cols-3">
        <BlogPostCard
          variant="listing"
          image={{ src: "https://picsum.photos/seed/terra1/600/400", alt: "Blog cover" }}
          category={{ name: "Featured" }}
          title="When AI Becomes the Attack Surface: CVE-2026-25724"
          author="Ofir Hamam"
          date="February 24, 2026"
          description="AI isn't just a tool anymore — it's an attack surface. Learn how we uncovered CVE-2026-25724 in an agentic AI coding tool."
          href="#"
        />
        <BlogPostCard
          variant="listing"
          image={{ src: "https://picsum.photos/seed/terra2/600/400", alt: "Blog cover" }}
          category={{ name: "Research" }}
          title="White Box Pentesting with Code & Business Context"
          author="The Terra Team"
          date="February 11, 2026"
          description="Go beyond surface testing—white-box pentesting grounded in source code and business logic uncovers high-impact vulnerabilities."
          href="#"
        />
        <BlogPostCard
          variant="listing"
          image={{ src: "https://picsum.photos/seed/terra3/600/400", alt: "Blog cover" }}
          category={{ name: "Essential Guide" }}
          title="Offensive Security Training in an AI World: 7 Essentials"
          author="Shahar Peled"
          date="January 20, 2026"
          description="In an AI-powered threat landscape, offensive security training must evolve—explore the seven essential components."
          href="#"
        />
      </div>
    </Section>
  ),
}

export const Featured: Story = {
  args: {
    variant: "Featured" as any,
    image: {
      src: "https://picsum.photos/seed/terra-featured/800/500",
      alt: "Featured post",
    },
    category: { name: "Featured" },
    title: "When AI Becomes the Attack Surface",
    author: "Ofir Hamam",
    date: "February 24, 2026",
    description:
      "AI isn't just a tool anymore — it's an attack surface. Learn how we uncovered CVE-2026-25724 in an agentic AI coding tool and why meaning and context now matter as much as code in security.",
    href: "#",
    className: "max-w-6xl",
  },
}

export const List: Story = {
  render: () => (
    <Section gap={0}>
      <WebflowSlot>
        <FloatingPostImage />
      </WebflowSlot>
      <WebflowSlot>
        <BlogPostCard
          variant="list"
          category={{ name: "Research", url: "#" }}
          author="Gal Malachi"
          title="API Security in AI-Enabled Platforms: Strategy, Risks, and Tactics"
          date="February 1, 2026"
          image={{ src: "https://picsum.photos/seed/terra-list1/800/700", alt: "Blog cover" }}
        />
      </WebflowSlot>
      <WebflowSlot>
        <BlogPostCard
          variant="list"
          category={{ name: "Product" }}
          author="Gal Malachi"
          title="The ATLAS AI Framework: Supercharging Security with AI"
          date="January 15, 2026"
          image={{ src: "https://picsum.photos/seed/terra-list2/800/700", alt: "Blog cover" }}
        />
      </WebflowSlot>
      <WebflowSlot>
        <BlogPostCard
          variant="list"
          category={{ name: "Essential Guide" }}
          author="Gal Malachi"
          title="How to Navigate AI Compliance Across New European AI Regulations"
          date="January 8, 2026"
          image={{ src: "https://picsum.photos/seed/terra-list3/800/700", alt: "Blog cover" }}
        />
      </WebflowSlot>
    </Section>
  ),
}
