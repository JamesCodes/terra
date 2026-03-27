import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { textArg } from "@/lib/storybook"
import { HorizontalTableRow } from "@/components/ui/HorizontalTableRow/horizontal-table-row"
import { HorizontalTable } from "./horizontal-table"
import { propLabels } from "./horizontal-table.webflow"


const meta = {
  title: "Rich Text/Horizontal Table",
  component: HorizontalTable,
  parameters: {
    layout: "padded",
    controls: {
      exclude: ["className", "children"],
    },
  },
  tags: ["autodocs"],
  args: {
    heading: "Types of cookies we use",
    footer: "",
  },
  argTypes: {
    heading: textArg(propLabels.heading),
    footer: textArg(propLabels.footer),
  },
} satisfies Meta<typeof HorizontalTable>

export default meta
type Story = StoryObj<typeof HorizontalTable>

export const Default: Story = {
  render: ({ heading, footer }) => (
    <HorizontalTable heading={heading} footer={footer}>
      <HorizontalTableRow
        label="Strictly necessary cookies"
        content="We use these cookies to enable you to use our Services features, such as enabling movement between pages and remembering information you enter on forms. Without these necessary cookies, our Services will not be possible and our Services will not perform as it should."
      />
      <HorizontalTableRow
        label="Security cookies"
        content="We use these cookies to enable you to use our Services features, such as enabling movement between pages and remembering information you enter on forms. Without these necessary cookies, our Services will not be possible and our Services will not perform as it should."
      />
      <HorizontalTableRow
        label="Performance and Analytics cookies"
        content="We use these cookies to collect information about your use of our Services and to help improve the way it works."
      />
      <HorizontalTableRow
        label="Functionality and Preference cookies"
        content="We use these cookies to remember the choices you make such as which language you prefer and to provide you with personalized features."
      />
    </HorizontalTable>
  ),
}
