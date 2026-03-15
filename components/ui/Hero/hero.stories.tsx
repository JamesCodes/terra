import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { booleanArg, selectArg, textArg } from "@/lib/storybook"
import { Hero } from "./hero"
import { headlineSizeMap, propLabels, variantMap } from "./hero.webflow"
import "../../../app/globals.css"
import { WebflowSlot } from "@/lib/storybook-webflow"
import { absoluteFillDecorator } from "@/lib/webflow"
import { HeroVisual } from "./hero-visual"

const meta = {
  title: "Sections/Hero",
  component: Hero,
  parameters: {
    layout: "fullscreen",
    controls: {
      exclude: ["className", "children", "image"],
    },
  },
  tags: ["autodocs"],
  args: {
    variant: "Default",
    headlineSize: "Large",
    eyebrow: "Meet ATLAS",
    showEyebrow: false,
    heading: "Offensive security built for the AI era.",
    description: "Pentest at the pace of AI with Terra's continuous agentic platform.",
    showDescription: true,
    buttonLabel: "Book a Demo",
    showButton: true,
    showImage: true,
  },
  argTypes: {
    variant: selectArg(propLabels.variant, variantMap, "Default"),
    headlineSize: selectArg(propLabels.headlineSize, headlineSizeMap, "Large"),
    eyebrow: textArg(propLabels.eyebrow),
    showEyebrow: booleanArg(propLabels.showEyebrow),
    heading: textArg(propLabels.heading),
    description: textArg(propLabels.description),
    showDescription: booleanArg(propLabels.showDescription),
    buttonLabel: textArg(propLabels.buttonLabel),
    showButton: booleanArg(propLabels.showButton),
    showImage: booleanArg(propLabels.showImage),
  },
  render: ({
    showEyebrow,
    showDescription,
    showButton,
    showImage,
    eyebrow,
    description,
    buttonLabel,
    image,
    ...args
  }) => (
    <Hero
      {...args}
      eyebrow={showEyebrow ? eyebrow : undefined}
      description={showDescription ? description : undefined}
      buttonLabel={showButton ? buttonLabel : undefined}
      image={showImage ? image : undefined}
    />
  ),
} satisfies Meta<any>

export default meta
type Story = StoryObj<any>

export const Default: Story = {}

export const WithEyebrow: Story = {
  args: {
    showEyebrow: true,
    heading: "Where human + agent security teams really work.",
    showDescription: false,
    showButton: false,
  },
}

export const WithImage: Story = {
  args: {
    image: {
      src: "/images/hero-dunes.png",
      alt: "Desert dunes",
    },
  },
}

export const ProductHero: Story = {
  args: {
    variant: "Product",
    headlineSize: "Small",
    showEyebrow: true,
    eyebrow: "Terra Portal™",
    heading: "Where human + agent security teams really work.",
    image: {
      src: "/images/hero-dunes.png",
      alt: "Desert dunes",
    },
  },
}

export const WithVisual: Story = {
  args: {
    image: {
      src: "/images/hero-dunes.png",
      alt: "Desert dunes",
    },
  },
  render: ({
    showEyebrow,
    showDescription,
    showButton,
    showImage,
    eyebrow,
    description,
    buttonLabel,
    image,
    ...args
  }: any) => (
    <div className="min-h-[300vh]">
      <Hero
        {...args}
        eyebrow={showEyebrow ? eyebrow : undefined}
        description={showDescription ? description : undefined}
        buttonLabel={showButton ? buttonLabel : undefined}
        image={showImage ? image : undefined}
      >
        <WebflowSlot decorator={absoluteFillDecorator}>
          <HeroVisual />
        </WebflowSlot>
      </Hero>
    </div>
  ),
}
