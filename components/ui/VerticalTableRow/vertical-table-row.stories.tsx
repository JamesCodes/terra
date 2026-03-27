import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { numberArg, textArg } from "@/lib/storybook"
import { VerticalTable } from "@/components/ui/VerticalTable/vertical-table"
import { VerticalTableRow } from "./vertical-table-row"
import { propLabels } from "./vertical-table-row.webflow"


const meta = {
  title: "Rich Text/Vertical Table Row",
  component: VerticalTableRow,
  parameters: {
    layout: "padded",
    controls: {
      exclude: ["className", "children"],
    },
  },
  tags: ["autodocs"],
  args: {
    columns: 4,
    col1: "Google",
    col2: "Data Analytics",
    col3: "https://policies.google.com/privacy?hl=en&gl=uk",
    col4: "Performance and Analytics cookies",
  },
  argTypes: {
    columns: numberArg(propLabels.columns, { min: 1, max: 4 }),
    col1: textArg(propLabels.col1),
    col2: textArg(propLabels.col2),
    col3: textArg(propLabels.col3),
    col4: textArg(propLabels.col4),
  },
} satisfies Meta<typeof VerticalTableRow>

export default meta
type Story = StoryObj<typeof VerticalTableRow>

export const Default: Story = {
  render: ({ columns, col1, col2, col3, col4 }) => (
    <VerticalTable
      columns={columns}
      col1Header="Cookie Name"
      col2Header="Purpose / Functionality"
      col3Header="Policies & Links"
      col4Header="Cookie Category"
    >
      <VerticalTableRow columns={columns} col1={col1} col2={col2} col3={col3} col4={col4} />
    </VerticalTable>
  ),
}
