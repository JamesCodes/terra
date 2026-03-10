import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { selectArg } from "@/lib/storybook"
import { Alert, AlertDescription, AlertTitle } from "./alert"
import { variantMap } from "./alert.webflow"
import "../../../app/globals.css"

const meta = {
  title: "UI/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
    controls: { include: ["variant", "icon", "title", "description"] },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: selectArg("Variant", variantMap),
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<any>

export const Default: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can add components to your app using the cli.</AlertDescription>
    </Alert>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
    </Alert>
  ),
}
