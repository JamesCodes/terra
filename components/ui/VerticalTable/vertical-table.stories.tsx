import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { VerticalTableRow } from "@/components/ui/VerticalTableRow/vertical-table-row"
import { numberArg, textArg } from "@/lib/storybook"
import { VerticalTable } from "./vertical-table"
import { propLabels } from "./vertical-table.webflow"


const meta = {
  title: "Rich Text/Vertical Table",
  component: VerticalTable,
  parameters: {
    layout: "padded",
    controls: {
      exclude: ["className", "children"],
    },
  },
  tags: ["autodocs"],
  args: {
    heading: "Third-party cookies",
    columns: 4,
    footer: "",
    col1Header: "Cookie Name",
    col2Header: "Purpose / Functionality",
    col3Header: "Policies & Links",
    col4Header: "Cookie Category",
  },
  argTypes: {
    heading: textArg(propLabels.heading),
    columns: numberArg(propLabels.columns, { min: 1, max: 4 }),
    footer: textArg(propLabels.footer),
    col1Header: textArg(propLabels.col1Header),
    col2Header: textArg(propLabels.col2Header),
    col3Header: textArg(propLabels.col3Header),
    col4Header: textArg(propLabels.col4Header),
  },
} satisfies Meta<typeof VerticalTable>

export default meta
type Story = StoryObj<typeof VerticalTable>

export const Default: Story = {
  args: {
    footer:
      "SLA Credits are not refundable and shall not be exchanged for cash or any other form of payment. SLA Credits will be applied exclusively toward the purchase of future Services under the Agreement. Such credits must be used within 12 months from the date of issuance, and any unused credits will expire thereafter.",
  },

  render: ({ heading, columns, footer, col1Header, col2Header, col3Header, col4Header }) => (
    <VerticalTable
      heading={heading}
      columns={columns}
      footer={footer}
      col1Header={col1Header}
      col2Header={col2Header}
      col3Header={col3Header}
      col4Header={col4Header}
    >
      <VerticalTableRow
        columns={columns}
        col1="Google"
        col2="Data Analytics"
        col3="https://policies.google.com/privacy?hl=en&gl=uk"
        col4="Performance and Analytics cookies"
      />
      <VerticalTableRow
        columns={columns}
        col1="Facebook"
        col2="Social Media Integration"
        col3="https://www.facebook.com/privacy/policy/"
        col4="Functionality and Preference cookies"
      />
      <VerticalTableRow
        columns={columns}
        col1="Stripe"
        col2="Payment Processing"
        col3="https://stripe.com/privacy"
        col4="Strictly necessary cookies"
      />
    </VerticalTable>
  ),
}
