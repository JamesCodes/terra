import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { booleanArg, numberArg, responsiveArgs, selectArg, textArg } from "@/lib/storybook"
import { Hero } from "./hero"
import { eyebrowVariantMap, headlineSizeMap, propLabels, variantMap } from "./hero.webflow"
import "../../../app/globals.css"
import { HeroVisual } from "@/components/ui/HeroVisual/hero-visual"
import { WebflowSlot } from "@/lib/storybook-webflow"
import { absoluteFillDecorator } from "@/lib/webflow"

const meta = {
  title: "Sections/Hero",
  component: Hero,
  parameters: {
    layout: "fullscreen",
    controls: {
      exclude: ["className", "children", "imageSlot"],
    },
  },
  tags: ["autodocs"],
  args: {
    variant: "Default",
    headlineSize: "Large",
    eyebrow: "Meet ATLAS",
    eyebrowVariant: "Accent" as any,
    showEyebrow: false,
    heading: "Offensive security built for the AI era.",
    description: "Pentest at the pace of AI with Terra's continuous agentic platform.",
    showDescription: true,
    buttonLabel: "Book a Demo",
    showButton: true,
    showImage: true,
    showVisual: true,
    height: 480,
  },
  argTypes: {
    variant: selectArg(propLabels.variant, variantMap, "Default"),
    headlineSize: selectArg(propLabels.headlineSize, headlineSizeMap, "Large"),
    eyebrow: textArg(propLabels.eyebrow),
    eyebrowVariant: selectArg(propLabels.eyebrowVariant, eyebrowVariantMap),
    showEyebrow: booleanArg(propLabels.showEyebrow),
    heading: textArg(propLabels.heading),
    description: textArg(propLabels.description),
    showDescription: booleanArg(propLabels.showDescription),
    buttonLabel: textArg(propLabels.buttonLabel),
    showButton: booleanArg(propLabels.showButton),
    showImage: booleanArg(propLabels.showImage),
    showVisual: booleanArg(propLabels.showVisual),
    ...responsiveArgs("height", numberArg("Height", { min: -1, max: 1000, defaultValue: 480 })),
  },
  render: ({
    showEyebrow,
    showDescription,
    showButton,
    showImage,
    eyebrow,
    description,
    buttonLabel,
    ...args
  }) => (
    <Hero
      {...args}
      eyebrow={showEyebrow ? eyebrow : undefined}
      description={showDescription ? description : undefined}
      buttonLabel={showButton ? buttonLabel : undefined}
      imageSlot={
        showImage ? (
          <img
            src="/images/hero-dunes.png"
            alt="Desert dunes"
            className="h-full w-full object-cover object-bottom"
          />
        ) : undefined
      }
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

export const WithImage: Story = {}

export const ProductHero: Story = {
  args: {
    variant: "Product",
    headlineSize: "Small",
    showEyebrow: true,
    eyebrow: "Terra Portal™",
    heading: "Where human + agent security teams really work.",
    height: 720,
  },
}

export const Compact: Story = {
  args: {
    variant: "Compact",
    showButton: false,
    showImage: false,
    visual: null,
    headlineSize: "Small",
    heading: "The leader in Agentic AI-powered continuous penetration testing",
    description:
      "Learn how we supercharge the value security teams receive from their pentest program.",
  },
}

export const WithVisualHome: Story = {
  args: {
    heightMobile: 443,
  },
  render: ({
    showEyebrow,
    showDescription,
    showButton,
    showImage,
    eyebrow,
    description,
    buttonLabel,
    ...args
  }: any) => (
    <div className="min-h-[300vh]">
      <Hero
        {...args}
        eyebrow={showEyebrow ? eyebrow : undefined}
        description={showDescription ? description : undefined}
        buttonLabel={showButton ? buttonLabel : undefined}
        imageSlot={
          showImage ? (
            <img
              src="/images/hero-dunes.png"
              alt="Desert dunes"
              className="h-full w-full object-cover object-bottom"
            />
          ) : undefined
        }
      >
        <WebflowSlot decorator={absoluteFillDecorator}>
          <HeroVisual />
        </WebflowSlot>
      </Hero>
    </div>
  ),
}

export const WithVisualPlatform: Story = {
  args: {
    variant: "Product",
    headlineSize: "Small",
    showEyebrow: true,
    eyebrow: "Terra Platform™",
    eyebrowVariant: "White",
    heading: "The enterprise-ready platform for continuous agentic pentesting.",
    showDescription: false,
    showButton: false,
    height: 731,
    heightTablet: 563,
    heightMobile: 526,
  },
  render: ({
    showEyebrow,
    showDescription,
    showButton,
    showImage,
    eyebrow,
    description,
    buttonLabel,
    ...args
  }: any) => (
    <div className="min-h-[300vh]">
      <Hero
        {...args}
        eyebrow={showEyebrow ? eyebrow : undefined}
        description={showDescription ? description : undefined}
        buttonLabel={showButton ? buttonLabel : undefined}
        imageSlot={
          showImage ? (
            <img
              src="/images/terra-platform-hero.png"
              alt="Desert dunes"
              className="h-full w-full object-cover object-bottom"
            />
          ) : undefined
        }
      >
        <WebflowSlot decorator={absoluteFillDecorator}>
          <HeroVisual variant="platform" />
        </WebflowSlot>
      </Hero>
    </div>
  ),
}

export const WithVisualPortal: Story = {
  args: {
    variant: "Product",
    headlineSize: "Small",
    showEyebrow: true,
    eyebrow: "Terra Portal™",
    eyebrowVariant: "Accent",
    heading: "Where human + agent security teams really work.",
    showDescription: false,
    showButton: false,
    height: 731,
    heightTablet: 563,
    heightMobile: 526,
  },
  render: ({
    showEyebrow,
    showDescription,
    showButton,
    showImage,
    eyebrow,
    description,
    buttonLabel,
    ...args
  }: any) => (
    <div className="min-h-[300vh]">
      <Hero
        {...args}
        eyebrow={showEyebrow ? eyebrow : undefined}
        description={showDescription ? description : undefined}
        buttonLabel={showButton ? buttonLabel : undefined}
        imageSlot={
          showImage ? (
            <img
              src="/images/terra-portal-hero.png"
              alt="Desert dunes"
              className="h-full w-full object-cover object-bottom"
            />
          ) : undefined
        }
      >
        <WebflowSlot decorator={absoluteFillDecorator}>
          <HeroVisual variant="portal" />
        </WebflowSlot>
      </Hero>
    </div>
  ),
}
