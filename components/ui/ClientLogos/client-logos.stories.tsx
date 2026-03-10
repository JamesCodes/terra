import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ClientLogos } from "./client-logos"
import "../../../app/globals.css"

const meta = {
  title: "UI/ClientLogos",
  component: ClientLogos,
  parameters: {
    layout: "padded",
    controls: { exclude: ["className", "children"] },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ClientLogos>

export default meta
type Story = StoryObj<any>

const PlaceholderLogo = ({ name }: { name: string }) => (
  <div className="flex h-[89px] w-[149px] shrink-0 items-center justify-center text-lg font-semibold text-muted-foreground">
    {name}
  </div>
)

export const Default: Story = {
  render: () => (
    <ClientLogos>
      <PlaceholderLogo name="Solenis" />
      <PlaceholderLogo name="Perion" />
      <PlaceholderLogo name="Agoda" />
      <PlaceholderLogo name="Klaviyo" />
      <PlaceholderLogo name="Solenis" />
      <PlaceholderLogo name="Klaviyo" />
      <PlaceholderLogo name="Perion" />
      <PlaceholderLogo name="Klaviyo" />
    </ClientLogos>
  ),
}
