import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Section } from "@/components/ui/Section/section"
import { selectArg, textArg } from "@/lib/storybook"
import { FeatureContent } from "./feature-content"
import { imageVariantMap, propLabels, variantMap } from "./feature-content.webflow"

import "../../../app/globals.css"
import { AnimatedIcon } from "@/components/ui/AnimatedIcon/animated-icon"

const meta = {
  title: "UI/Feature Content",
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
    imageVariant: imageVariantMap["Full Bleed"] as string,
  },
  argTypes: {
    variant: selectArg(propLabels.variant, variantMap),
    title: textArg(propLabels.title),
    description: textArg(propLabels.description),
    imageVariant: selectArg(propLabels.imageVariant, imageVariantMap),
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<any>

function FeatureContentStory({ variant, title, description, imageVariant, icon, section }: any) {
  return (
    <Section heading="Feature Content" {...section}>
      <FeatureContent
        variant={variant}
        title={title}
        description={description}
        image={{ src: "/images/diagram.svg", alt: "Flow Diagram" }}
        imageVariant={imageVariant}
        icon={icon}
      />
    </Section>
  )
}

export const Default: Story = {
  render: (args: any) => (
    <FeatureContentStory
      {...args}
      icon={<AnimatedIcon icon="target" />}
      section={{ variant: "chalk", paddingBottom: 0 }}
    />
  ),
}

export const ImageRight: Story = {
  args: {
    variant: "Image Right",
  },
  render: (args: any) => <FeatureContentStory {...args} section={{ variant: "chalk" }} />,
}
