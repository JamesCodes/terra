import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ImageCard } from "./image-card"
import { Section } from "@/components/ui/Section/section"
import { WebflowSlot } from "@/lib/storybook-webflow"
import { ItemFlex } from "@/components/ui/ItemFlex/item-flex"

const meta = {
  title: "Cards/Image Card",
  component: ImageCard,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ImageCard>

export default meta
type Story = StoryObj<typeof ImageCard>

export const Default: Story = {
  render: () => (
    <Section variant="chalk">
      <WebflowSlot>
        <ItemFlex
          useAspectRatio={false}
          itemMaxWidthUnit="%"
          itemMaxWidth={25}
          itemMaxWidthTablet={33}
          itemMaxWidthMobile={50}
        >
          <WebflowSlot>
            <ImageCard
              image={{
                src: "https://picsum.photos/seed/boston/600/600",
                alt: "Boston skyline",
              }}
              title="Boston"
            />
            <ImageCard
              image={{
                src: "https://picsum.photos/seed/nyc/600/600",
                alt: "Brooklyn Bridge",
              }}
              title="New York City"
            />
            <ImageCard
              image={{
                src: "https://picsum.photos/seed/chicago/600/600",
                alt: "Chicago skyline",
              }}
              title="Chicago"
            />
            <ImageCard
              image={{
                src: "https://picsum.photos/seed/sf/600/600",
                alt: "Golden Gate Bridge",
              }}
              title="San Francisco"
            />
          </WebflowSlot>
        </ItemFlex>
      </WebflowSlot>
    </Section>
  ),
}
