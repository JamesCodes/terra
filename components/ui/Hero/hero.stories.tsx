import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { HeroVisual } from "@/components/ui/HeroVisual/hero-visual"
import { Input } from "@/components/ui/Input/input"
import { booleanArg, numberArg, responsiveArgs, selectArg, textArg } from "@/lib/storybook"
import { WebflowSlot } from "@/lib/storybook-webflow"
import { absoluteFillDecorator } from "@/lib/webflow"
import { Hero } from "./hero"
import {
  childVariantMap,
  eyebrowVariantMap,
  headlineSizeMap,
  propLabels,
  themeVariantMap,
  variantMap,
} from "./hero.webflow"

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
    height: 480,
  },
  argTypes: {
    variant: selectArg(propLabels.variant, variantMap, "Default"),
    headlineSize: selectArg(propLabels.headlineSize, headlineSizeMap, "Large"),
    theme: selectArg(propLabels.theme, themeVariantMap),
    eyebrow: { ...textArg(propLabels.eyebrow), table: { category: "Eyebrow" } },
    eyebrowVariant: {
      ...selectArg(propLabels.eyebrowVariant, eyebrowVariantMap),
      table: { category: "Eyebrow" },
    },
    showEyebrow: { ...booleanArg(propLabels.showEyebrow), table: { category: "Eyebrow" } },
    heading: { ...textArg(propLabels.heading), table: { category: "Heading" } },
    description: { ...textArg(propLabels.description), table: { category: "Description" } },
    showDescription: {
      ...booleanArg(propLabels.showDescription),
      table: { category: "Description" },
    },
    buttonLabel: { ...textArg(propLabels.buttonLabel), table: { category: "Button" } },
    showButton: { ...booleanArg(propLabels.showButton), table: { category: "Button" } },
    showImage: { ...booleanArg(propLabels.showImage), table: { category: "Content" } },
    ...responsiveArgs("height", {
      ...numberArg("Height", { min: -1, max: 1000, defaultValue: 480 }),
      table: { category: "Content" },
    }),
    childVariant: {
      ...selectArg(propLabels.childVariant, childVariantMap, "Hidden"),
      table: { category: "Content" },
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

export const BackgroundImageMoss: Story = {
  args: {
    variant: "Background",
    childVariant: "Static",
    headlineSize: "Small",
    showEyebrow: true,
    eyebrow: "Join Us",
    heading: "Careers at Terra",
    height: 536,
    description:
      "We’re building the future of agentic AI-powered pentesting and we’re doing it with people who care deeply about craft, impact and trust.",
    buttonLabel: "Explore Open Roles",
    theme: "Moss",
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
              src="/images/desert-looped-extended.png"
              alt="Desert dunes"
              className="absolute top-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2"
            />
          ) : undefined
        }
      />
    </div>
  ),
}

export const BackgroundImageMagma: Story = {
  args: {
    variant: "Background",
    childVariant: "Static",
    headlineSize: "Small",
    showEyebrow: true,
    eyebrow: "Our Customers",
    heading: "Trusted by enterprise-grade security teams and providers.",
    height: 535,
    description: "See why our customers choose us. Request your demo today.",
    showButton: false,
    theme: "Magma",
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
              src="/images/desert-abstract-extended.png"
              alt="Desert dunes"
              className="absolute top-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2"
            />
          ) : undefined
        }
      >
        {args?.childVariant !== "Hidden" && (
          <WebflowSlot>
            <div className="mt-8 w-full max-w-[308px] rounded-full bg-white px-6 py-4">
              Form placeholder
            </div>
          </WebflowSlot>
        )}
      </Hero>
    </div>
  ),
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
    childVariant: "Interactive",
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
        {args?.childVariant !== "Hidden" && (
          <WebflowSlot decorator={absoluteFillDecorator}>
            <HeroVisual />
          </WebflowSlot>
        )}
      </Hero>
    </div>
  ),
}

export const WithVisualPlatform: Story = {
  args: {
    variant: "Product",
    childVariant: "Interactive",
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
        {args?.childVariant !== "Hidden" && (
          <WebflowSlot decorator={absoluteFillDecorator}>
            <HeroVisual variant="platform" />
          </WebflowSlot>
        )}
      </Hero>
    </div>
  ),
}

export const WithVisualPortal: Story = {
  args: {
    variant: "Product",
    childVariant: "Interactive",
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
        {args?.childVariant !== "Hidden" && (
          <WebflowSlot decorator={absoluteFillDecorator}>
            <HeroVisual variant="portal" />
          </WebflowSlot>
        )}
      </Hero>
    </div>
  ),
}
