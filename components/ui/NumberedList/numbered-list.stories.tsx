import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { NumberedListItem } from "./numbered-list"
import "../../../app/globals.css"

const meta: Meta<typeof NumberedListItem> = {
  title: "UI/NumberedListItem",
  component: NumberedListItem,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  argTypes: {
    number: { control: { type: "number", min: 1, max: 99 } },
    title: { control: "text" },
    description: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="page-grid bg-background py-12">
        <div className="col-span-4 md:col-span-8 md:col-start-3">
          <Story />
        </div>
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    number: 1,
    title: "Do Not Run Unknown Tools Blindly",
    description:
      "Treat agentic tools as untrusted code. Allowing an agent to execute or analyze a repository effectively grants it filesystem visibility, execution capability, environment access, and contextual influence. Review the tool's source code to understand its intended functionality and trust boundaries, and assume any external content may attempt to influence the agent.",
  },
}

export const DoubleDigit: Story = {
  args: {
    number: 10,
    title: "Review All Generated Changes",
    description:
      "Always review the output of agentic tools before accepting or committing changes. Automated modifications may introduce subtle bugs, security vulnerabilities, or unwanted side effects.",
  },
}

export const List: Story = {
  render: () => (
    <div className="flex flex-col">
      <NumberedListItem
        number={1}
        title="Do Not Run Unknown Tools Blindly"
        description="Treat agentic tools as untrusted code. Allowing an agent to execute or analyze a repository effectively grants it filesystem visibility, execution capability, environment access, and contextual influence."
      />
      <NumberedListItem
        number={2}
        title="Scope Permissions Narrowly"
        description="Grant the minimum permissions necessary. Use sandboxed environments, read-only filesystem access where possible, and avoid exposing production credentials or secrets to agentic tools."
      />
      <NumberedListItem
        number={3}
        title="Monitor Tool Behavior"
        description="Log and audit the actions taken by agentic tools. Unexpected network requests, file modifications, or system calls are indicators of potential misuse or prompt injection attacks."
      />
      <NumberedListItem
        number={4}
        title="Validate Outputs Before Use"
        description="Always review the output of agentic tools before accepting or committing changes. Automated modifications may introduce subtle bugs, security vulnerabilities, or unwanted side effects."
      />
      <NumberedListItem
        number={5}
        title="Keep Tools Updated"
        description="Regularly update agentic tools to benefit from security patches and improvements. Outdated tools may contain known vulnerabilities that could be exploited."
      />
    </div>
  ),
}
