import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { booleanArg, selectArg, textArg } from "@/lib/storybook"
import { Hero } from "./hero"
import { propLabels, themeMap } from "./hero.webflow"
import "../../../app/globals.css"

const meta = {
  title: "UI/Hero",
  component: Hero,
  parameters: {
    layout: "fullscreen",
    controls: {
      exclude: ["className", "children", "backgroundImage"],
    },
  },
  tags: ["autodocs"],
  args: {
    theme: "Dark" as any,
    eyebrow: "Meet ATLAS",
    showEyebrow: false,
    heading: "Offensive security built for the AI era.",
    description: "Pentest at the pace of AI with Terra's continuous agentic platform.",
    showDescription: true,
    buttonLabel: "Book a Demo",
    showButton: true,
  },
  argTypes: {
    theme: selectArg(propLabels.theme, themeMap),
    eyebrow: textArg(propLabels.eyebrow),
    showEyebrow: booleanArg(propLabels.showEyebrow),
    heading: textArg(propLabels.heading),
    description: textArg(propLabels.description),
    showDescription: booleanArg(propLabels.showDescription),
    buttonLabel: textArg(propLabels.buttonLabel),
    showButton: booleanArg(propLabels.showButton),
  },
  render: ({
    showEyebrow,
    showDescription,
    showButton,
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
    />
  ),
} satisfies Meta<any>

export default meta
type Story = StoryObj<any>

export const Dark: Story = {
  args: {
    theme: "Dark",
  },
}

export const Light: Story = {
  args: {
    theme: "Light",
  },
}

export const Accent: Story = {
  args: {
    theme: "Accent",
  },
}

export const WithEyebrow: Story = {
  args: {
    theme: "Dark",
    showEyebrow: true,
    heading: "Where human + agent security teams really work.",
    showDescription: false,
    showButton: false,
  },
}

export const DarkWithImage: Story = {
  args: {
    theme: "Dark",
    backgroundImage: {
      src: "/images/desert-dunes.png",
      alt: "Desert dunes",
    },
  },
}

export const LightWithImage: Story = {
  args: {
    theme: "Light",
    backgroundImage: {
      src: "/images/desert-dunes.png",
      alt: "Desert dunes",
    },
  },
}

export const AccentWithImage: Story = {
  args: {
    theme: "Accent",
    backgroundImage: {
      src: "/images/desert-dunes.png",
      alt: "Desert dunes",
    },
  },
}

export const ProductHero: Story = {
  args: {
    theme: "Dark",
    showEyebrow: true,
    heading: "Where human + agent security teams really work.",
    showDescription: false,
    showButton: false,
    backgroundImage: {
      src: "/images/desert-dunes.png",
      alt: "Desert dunes",
    },
  },
}
