import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { textArg } from "@/lib/storybook"
import { HorizontalTable } from "@/components/ui/HorizontalTable/horizontal-table"
import { HorizontalTableRow } from "./horizontal-table-row"
import { propLabels } from "./horizontal-table-row.webflow"


const meta = {
  title: "Rich Text/Horizontal Table Row",
  component: HorizontalTableRow,
  parameters: {
    layout: "padded",
    controls: {
      exclude: ["className", "children"],
    },
  },
  tags: ["autodocs"],
  args: {
    label: "Strictly necessary cookies",
  },
  argTypes: {
    label: textArg(propLabels.label),
  },
} satisfies Meta<typeof HorizontalTableRow>

export default meta
type Story = StoryObj<typeof HorizontalTableRow>

export const Default: Story = {
  render: ({ label }) => (
    <HorizontalTable>
      <HorizontalTableRow
        label={label}
        content="We use these cookies to enable you to use our Services features, such as enabling movement between pages and remembering information you enter on forms. Without these necessary cookies, our Services will not be possible and our Services will not perform as it should."
      />
    </HorizontalTable>
  ),
}
