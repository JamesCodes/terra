import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { numberArg, responsiveArgs, selectArg } from "@/lib/storybook"
import { CTABanner } from "./cta-banner"
import { backgroundPositionMap, backgroundSizeMap, themeMap } from "./cta-banner.webflow"
import "../../../app/globals.css"

const meta = {
  title: "Sections/CTA Banner",
  component: CTABanner,
  parameters: {
    layout: "fullscreen",
    controls: {
      exclude: ["className", "onSubmit"],
    },
  },
  tags: ["autodocs"],
  args: {
    theme: "Light" as any,
    heading: "Be the first to experience the future of security.",
    description:
      "Secure your spot and join dozens of security teams that already enjoy the future of pentesting.",
    placeholder: "Email address",
  },
  argTypes: {
    theme: selectArg("Theme", themeMap),
    backgroundSize: selectArg("Background Size", backgroundSizeMap),
    backgroundPosition: selectArg("Background Position", backgroundPositionMap),
    backgroundPositionMobile: selectArg("Background Position (Mobile)", backgroundPositionMap),
    ...responsiveArgs("height", numberArg("Height", { min: -1, max: 1200, step: 10 })),
  },
} satisfies Meta<typeof CTABanner>

export default meta
type Story = StoryObj<any>

export const Light: Story = {
  args: {
    theme: "Light",
  },
}

export const Dark: Story = {
  args: {
    theme: "Dark",
    heading: "Book a demo and try ATLAS now.",
  },
}

export const WithBackgroundImage: Story = {
  args: {
    theme: "Light",
    backgroundImage: {
      src: "/images/desert-dunes.png",
      alt: "Desert dunes",
    },
    backgroundSize: "Cover",
    backgroundPosition: "Center",
    backgroundPositionMobile: "Bottom",
    height: 1066,
    heightMobile: 594,
  },
}

export const DarkWithBackgroundImage: Story = {
  args: {
    theme: "Dark",
    heading: "Book a demo and try ATLAS now.",
    backgroundImage: {
      src: "/images/desert-dunes.png",
      alt: "Desert dunes",
    },
    backgroundSize: "Cover",
    backgroundPosition: "Center",
    height: 1066,
    heightMobile: 594,
  },
}
