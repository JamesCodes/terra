import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { iconArgTypes } from "@/components/ui/AnimatedIcon/animated-icon.webflow"
import { Section } from "@/components/ui/Section/section"
import { selectArg, textArg } from "@/lib/storybook"
import { FeatureContent } from "./feature-content"
import { variantMap } from "./feature-content.webflow"

import "../../../app/globals.css"

const meta = {
  title: "Content Blocks/Feature Content",
  component: FeatureContent,
  parameters: {
    layout: "fullscreen",
    controls: { exclude: ["className", "children"] },
  },
  tags: ["autodocs"],
  args: {
    variant: "Image Left" as string,
    title: "Feature title goes here",
    description: "A brief description of this feature and its benefits.",
  },
  argTypes: {
    variant: selectArg("Layout", variantMap),
    title: textArg("Title"),
    description: textArg("Description"),
    ...iconArgTypes(),
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<any>

function FeatureContentStory({ variant, title, description, icon, section }: any) {
  return (
    <Section heading="Feature Content" {...section}>
      <FeatureContent
        variant={variant}
        title={title}
        description={description}
        image={{ src: "/images/diagram.svg", alt: "Flow Diagram" }}
        icon={icon}
      />
    </Section>
  )
}

export const Default: Story = {
  render: (args: any) => (
    <FeatureContentStory {...args} icon="target" section={{ variant: "chalk", paddingBottom: 0 }} />
  ),
}

export const ImageRight: Story = {
  args: {
    variant: "Image Right",
  },
  render: (args: any) => <FeatureContentStory {...args} section={{ variant: "chalk" }} />,
}
