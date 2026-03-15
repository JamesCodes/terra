import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { selectArg, textArg } from "@/lib/storybook"
import { BlogPostCard } from "./blog-post-card"
import { propLabels, variantMap } from "./blog-post-card.webflow"
import "../../../app/globals.css"

const meta = {
  title: "Cards/Blog Post Card",
  component: BlogPostCard,
  parameters: {
    layout: "centered",
    controls: {
      exclude: ["image", "href", "className"],
    },
  },
  tags: ["autodocs"],
  args: {
    variant: "Grid" as any,
    category: "Featured",
    title: "Blog Post Title",
    description: "A brief summary of the blog post content.",
    author: "Author Name",
    date: "January 1, 2026",
  },
  argTypes: {
    variant: selectArg(propLabels.layout, variantMap),
    category: textArg(propLabels.category),
    title: textArg(propLabels.title),
    description: textArg(propLabels.description),
    author: textArg(propLabels.author),
    date: textArg(propLabels.date),
  },
} satisfies Meta<typeof BlogPostCard>

export default meta
type Story = StoryObj<any>

export const Grid: Story = {
  render: () => (
    <div className="grid max-w-4xl grid-cols-3 gap-8 divide-x divide-border">
      <BlogPostCard
        variant="grid"
        category="Featured"
        title="When AI Becomes the Attack Surface: CVE-2026-25724"
        author="Ofir Hamam"
        date="February 24, 2026"
        description="AI isn't just a tool anymore — it's an attack surface. Learn how we uncovered CVE-2026-25724 in an agentic AI coding tool."
        href="#"
        className="px-8 first:pl-0"
      />
      <BlogPostCard
        variant="grid"
        category="Research"
        title="White Box Pentesting with Code & Business Context"
        author="The Terra Team"
        date="February 11, 2026"
        description="Go beyond surface testing—white-box pentesting grounded in source code and business logic uncovers high-impact vulnerabilities."
        href="#"
        className="px-8"
      />
      <BlogPostCard
        variant="grid"
        category="Essential Guide"
        title="Offensive Security Training in an AI World: 7 Essentials"
        author="Shahar Peled"
        date="January 20, 2026"
        description="In an AI-powered threat landscape, offensive security training must evolve—explore the seven essential components."
        href="#"
        className="px-8"
      />
    </div>
  ),
}

export const GridWithImage: Story = {
  args: {
    variant: "Grid" as any,
    image: {
      src: "https://picsum.photos/seed/terra/600/400",
      alt: "Blog cover",
    },
    category: "Research",
    title: "White Box Pentesting with Code & Business Context",
    author: "The Terra Team",
    date: "February 11, 2026",
    description:
      "Go beyond surface testing—white-box pentesting grounded in source code and business logic.",
    href: "#",
    className: "max-w-sm",
  },
}

export const Featured: Story = {
  args: {
    variant: "Featured" as any,
    image: {
      src: "https://picsum.photos/seed/terra-featured/800/500",
      alt: "Featured post",
    },
    category: "Featured",
    title: "When AI Becomes the Attack Surface",
    author: "Ofir Hamam",
    date: "February 24, 2026",
    description:
      "AI isn’t just a tool anymore — it’s an attack surface. Learn how we uncovered CVE-2026-25724 in an agentic AI coding tool and why meaning and context now matter as much as code in security.",
    href: "#",
    className: "max-w-6xl",
  },
}

export const List: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col">
      <BlogPostCard
        variant="list"
        title="API Security in AI-Enabled Platforms: Strategy, Risks, and Tactics"
        category="Research"
        date="February 1, 2026"
      />
      <BlogPostCard
        variant="list"
        title="The ATLAS AI Framework: Supercharging Security with AI"
        category="Product"
        date="January 15, 2026"
      />
      <BlogPostCard
        variant="list"
        title="How to Navigate AI Compliance Across New European AI Regulations"
        category="Essential Guide"
        date="January 8, 2026"
      />
    </div>
  ),
}
