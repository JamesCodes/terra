import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { numberArg, textArg } from "@/lib/storybook"
import { LoadMore } from "./load-more"

const meta = {
  title: "Elements/Load More",
  component: LoadMore,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    targetSelector: ".load-more-item",
    pageSize: 6,
    loadMoreText: "Load More",
    showArchive: true,
    viewArchiveText: "View All Articles",
    link: { href: "/archive" },
  },
  argTypes: {
    loadMoreText: textArg("Load More Text"),
    viewArchiveText: textArg("View Archive Text"),
    pageSize: numberArg("Page Size", { min: 1, max: 20, defaultValue: 6 }),
  },
  decorators: [
    (Story) => (
      <div className="w-[800px]">
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 18 }, (_, i) => (
            <div
              key={i}
              className="load-more-item rounded-lg border border-border bg-card p-6"
            >
              <p className="font-medium text-sm">Article {i + 1}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof LoadMore>

export default meta
type Story = StoryObj<typeof LoadMore>

export const Default: Story = {}

export const SmallPageSize: Story = {
  args: {
    pageSize: 3,
  },
}

export const NoArchive: Story = {
  args: {
    showArchive: false,
  },
}
