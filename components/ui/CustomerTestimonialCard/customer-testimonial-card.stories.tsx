import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CustomerTestimonialCard } from "./customer-testimonial-card"

const meta = {
  title: "Cards/CustomerTestimonialCard",
  component: CustomerTestimonialCard,
  parameters: {
    layout: "centered",
  },
  args: {
    logo: {
      src: "https://placehold.co/109x24/3c3c3c/3c3c3c?text=LOGO",
      alt: "Perion",
    },
    testimonial:
      "Terra delivered critical insights that other pentesters missed, and they did it with correct business context and real-world material impact. This wouldn't have been possible without their advanced Agentic AI system—the next evolutionary step of cybersecurity.",
    name: "Ben Hacmon",
    position: "CISO, Perion",
  },
} satisfies Meta<typeof CustomerTestimonialCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="w-[560px]">
      <CustomerTestimonialCard {...args} />
    </div>
  ),
}

export const Grid: Story = {
  render: () => (
    <div className="grid max-w-5xl grid-cols-3 gap-5">
      <CustomerTestimonialCard
        logo={{
          src: "https://placehold.co/109x24/3c3c3c/3c3c3c?text=PERION",
          alt: "Perion",
        }}
        testimonial="Terra delivered critical insights that other pentesters missed, and they did it with correct business context and real-world material impact. This wouldn't have been possible without their advanced Agentic AI system—the next evolutionary step of cybersecurity."
        name="Ben Hacmon"
        position="CISO, Perion"
      />
      <CustomerTestimonialCard
        logo={{
          src: "https://placehold.co/36x34/3c3c3c/3c3c3c?text=F100",
          alt: "Fortune 100",
        }}
        testimonial="Terra enables us double the web app attack surface we pen test without doubling the costs or internal resources."
        name="Kevin"
        position="Security Director, Fortune 100"
      />
      <CustomerTestimonialCard
        logo={{
          src: "https://placehold.co/80x24/3c3c3c/3c3c3c?text=ACME",
          alt: "Acme Corp",
        }}
        testimonial="The depth of coverage and accuracy of findings exceeded our expectations. Terra's AI-driven approach caught vulnerabilities that traditional tools consistently miss."
        name="Sarah Chen"
        position="Head of Security, Acme Corp"
      />
    </div>
  ),
}
