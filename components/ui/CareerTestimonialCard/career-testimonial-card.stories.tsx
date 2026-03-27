import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CareerTestimonialCard } from "./career-testimonial-card"

const meta = {
  title: "Cards/CareerTestimonialCard",
  component: CareerTestimonialCard,
  parameters: {
    layout: "centered",
  },
  args: {
    department: "Marketing",
    testimonial:
      "I joined Terra because the team came out of the gates executing like winners: clear focus, fast learning, and real momentum. We're building a product customers are actively pulling for, and we're doing it in partnership with industry leaders. It's the perfect set of ingredients for success.",
    name: "Alex Yakubov",
    position: "VP of Marketing",
  },
} satisfies Meta<typeof CareerTestimonialCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="w-[400px]">
      <CareerTestimonialCard {...args} />
    </div>
  ),
}

export const Grid: Story = {
  render: () => (
    <div className="grid max-w-4xl grid-cols-3 gap-5">
      <CareerTestimonialCard
        department="Marketing"
        testimonial="I joined Terra because the team came out of the gates executing like winners: clear focus, fast learning, and real momentum. We're building a product customers are actively pulling for, and we're doing it in partnership with industry leaders. It's the perfect set of ingredients for success."
        name="Alex Yakubov"
        position="VP of Marketing"
      />
      <CareerTestimonialCard
        department="Sales"
        testimonial="I can sum up my experience at Terra in one word: empowerment. Customers are genuinely excited about what we're building, and our leadership trusts us to execute."
        name="Willy Schlacks"
        position="Founder"
      />
      <CareerTestimonialCard
        department="Engineering"
        testimonial="The technical challenges here are fascinating. We're working with cutting-edge technology and the team moves fast without sacrificing quality."
        name="Dor Polo"
        position="VP of Engineering"
      />
    </div>
  ),
}
