import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { WaypointSection } from "./waypoint-section"
import "../../../app/globals.css"

const meta = {
  title: "Sections/Waypoint Section",
  component: WaypointSection,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof WaypointSection>

export default meta
type Story = StoryObj<typeof WaypointSection>

export const Default: Story = {
  args: {
    waypointId: "overview",
    waypointLabel: "Overview",
    waypointOrder: 0,
    children: (
      <div className="container py-24">
        <h2 className="font-bold text-3xl">Overview Section</h2>
        <p className="mt-4 text-muted-foreground">
          This section registers itself as a waypoint with the navbar.
        </p>
      </div>
    ),
  },
}

export const WithOrder: Story = {
  args: {
    waypointId: "features",
    waypointLabel: "Features",
    waypointOrder: 1,
    children: (
      <div className="container py-24">
        <h2 className="font-bold text-3xl">Features Section</h2>
        <p className="mt-4 text-muted-foreground">
          This section has order=1, so it appears after order=0 sections in the navbar.
        </p>
      </div>
    ),
  },
}
