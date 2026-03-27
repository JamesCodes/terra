import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { numberArg } from "@/lib/storybook"
import { PageTransition } from "./page-transition"

const meta: Meta<typeof PageTransition> = {
  title: "Elements/PageTransition",
  component: PageTransition,
  argTypes: {
    duration: numberArg("Duration", { defaultValue: 0.3, min: 0.1, max: 2, step: 0.1 }),
  },
  parameters: {
    docs: {
      description: {
        component:
          "Invisible component that intercepts same-origin link clicks and fades the page out before navigating. Drop it once on every page.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof PageTransition>

export const Default: Story = {
  args: {
    duration: 0.3,
  },
  decorators: [
    (Story: React.FC) => (
      <div className="flex flex-col gap-4 p-8">
        <p className="brand-body2 text-muted-foreground">
          This component renders nothing visible. Click a same-origin link on the page to see the
          fade-out transition.
        </p>
        <a href="/" className="text-accent underline">
          Example link (navigates to /)
        </a>
        <Story />
      </div>
    ),
  ],
}
