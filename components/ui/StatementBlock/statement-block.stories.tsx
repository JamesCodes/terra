import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Section } from "@/components/ui/Section/section"
import { StatementBlockItem } from "@/components/ui/StatementBlockItem/statement-block-item"
import { numberArg, responsiveArgs, selectArg } from "@/lib/storybook"
import { StatementBlock } from "./statement-block"
import { alignMap, propLabels } from "./statement-block.webflow"
import "../../../app/globals.css"
import { WebflowSlot } from "@/lib/storybook-webflow"

const meta = {
  title: "Content Blocks/Statement Block",
  component: StatementBlock,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    imageHeight: 807,
    objectAlign: "Center" as string,
  },
  argTypes: {
    objectAlign: selectArg(propLabels.objectAlign, alignMap),
    ...responsiveArgs(
      "imageHeight",
      numberArg(propLabels.imageHeight, { min: -1, max: 1200, defaultValue: 807 }),
    ),
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<any>

export const Default: Story = {
  render: (args: any) => (
    <StatementBlock
      image={{
        src: "/images/desert-peaks.png",
        alt: "Desert landscape",
      }}
      imageHeight={args.imageHeight}
      imageHeightTablet={args.imageHeightTablet}
      imageHeightMobile={args.imageHeightMobile}
      objectAlign={alignMap[args.objectAlign as keyof typeof alignMap] ?? "center"}
    >
      <WebflowSlot>
        <StatementBlockItem
          heading="Our Vision"
          description="Make the digital world more secure by enabling organizations to harness Offensive Security as their most reliable security control."
        />
        <StatementBlockItem
          heading="Our Mission"
          description="Enable Enterprise organizations to perform continuous threat exposure management through easy, affordable, and scalable pentesting that is continuously running with full business context, powered by agentic AI with a human-in-the-loop, trusted for compliance."
        />
      </WebflowSlot>
    </StatementBlock>
  ),
}
