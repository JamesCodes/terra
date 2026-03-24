import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ItemFlex } from "./item-flex"
import "../../../app/globals.css"
import { ResponsiveImage } from "@/components/ui/ResponsiveImage/responsive-image"
import { Section } from "@/components/ui/Section/section"
import { booleanArg, numberArg, responsiveArgs, selectArg, textArg } from "@/lib/storybook"
import { WebflowSlot } from "@/lib/storybook-webflow"

const meta: Meta = {
  title: "Layout/Item Flex",
  component: ItemFlex,
  parameters: {
    layout: "fullscreen",
    controls: { exclude: ["className", "children"] },
  },
  argTypes: {
    ...responsiveArgs("gap", numberArg("Gap", { min: -1, max: 100, defaultValue: 16 })),
    ...responsiveArgs("itemMaxWidth", numberArg("Item Max Width", { min: -1, max: 500 })),
    ...responsiveArgs(
      "paddingTop",
      numberArg("Padding Top", { min: -1, max: 200, defaultValue: 0 }),
    ),
    ...responsiveArgs(
      "paddingBottom",
      numberArg("Padding Bottom", { min: -1, max: 200, defaultValue: 0 }),
    ),
    itemMaxWidthUnit: selectArg("Max Width Unit", { px: "px", "%": "%" }, "px"),
    useAspectRatio: booleanArg("Use Aspect Ratio"),
    ...responsiveArgs("itemAspectRatio", textArg("Item Aspect Ratio")),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ItemFlex>

export default meta
type Story = StoryObj<typeof ItemFlex>

export const Clients: Story = {
  args: {
    itemMaxWidth: 150,
    itemAspectRatio: "5/3",
  },
  render: (args) => (
    <Section
      showDivider={false}
      heading="Trusted by enterprise-grade security teams and providers"
      headingLevel={7}
      paddingTop={80}
      paddingTopTablet={60}
      paddingTopMobile={60}
      paddingBottom={80}
      paddingBottomTablet={60}
      paddingBottomMobile={60}
    >
      <WebflowSlot>
        <ItemFlex {...args}>
          <WebflowSlot>
            <ResponsiveImage src="/images/solenis.svg" />
            <ResponsiveImage src="/images/perion.svg" />
            <ResponsiveImage src="/images/agoda.svg" />
            <ResponsiveImage src="/images/klaviyo.svg" />
            <ResponsiveImage src="/images/root.svg" />
            <ResponsiveImage src="/images/fortune-100.svg" />
            <ResponsiveImage src="/images/solvay.svg" />
            <ResponsiveImage src="/images/jit.svg" />
            <ResponsiveImage src="/images/qodo.svg" />
          </WebflowSlot>
        </ItemFlex>
      </WebflowSlot>
    </Section>
  ),
}

export const Certifications: Story = {
  args: {
    gap: 80,
    gapTablet: 32,
    gapMobile: 32,
    itemMaxWidth: 90,
    itemMaxWidthMobile: 52,
    itemAspectRatio: "1/1",
  },
  render: (args) => (
    <Section
      heading="Approved by the highest compliance standards"
      headingLevel={7}
      showDivider={false}
      paddingTop={80}
      paddingTopTablet={60}
      paddingTopMobile={60}
      paddingBottom={80}
      paddingBottomTablet={60}
      paddingBottomMobile={60}
    >
      <WebflowSlot>
        <ItemFlex {...args}>
          <WebflowSlot>
            <ResponsiveImage src="/images/iso-27001.png" />
            <ResponsiveImage src="/images/pci-dss.png" />
            <ResponsiveImage src="/images/soc2.png" />
            <ResponsiveImage src="/images/gdpr.png" />
            <ResponsiveImage src="/images/hipaa.png" />
            <ResponsiveImage src="/images/nist.png" />
            <ResponsiveImage src="/images/hitrust.png" />
          </WebflowSlot>
        </ItemFlex>
      </WebflowSlot>
    </Section>
  ),
}
