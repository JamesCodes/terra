import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useEffect } from "react"
import { DesignerReference, injectStyles, processRichText } from "./rich-text-marks"

import "../../../app/globals.css"

const meta = {
  title: "Utilities/RichTextMarks",
  component: DesignerReference,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof DesignerReference>

export default meta
type Story = StoryObj<typeof meta>

export const DesignerView: Story = {}

function LiveDemo() {
  useEffect(() => {
    injectStyles()
    processRichText()
  }, [])

  return (
    <div className="flex flex-col gap-8">
      <DesignerReference />
      <div className="w-richtext rounded-lg border p-6">
        <p>
          This text has a [button]<a href="#">styled button</a>[/button] and an
          [button-outline]<a href="#">outline button</a>[/button-outline] and an
          external [button]<a href="https://example.com" target="_blank" rel="noopener noreferrer">external button</a>[/button] inside it.
        </p>
        <p>[---]</p>
        <p>
          Here is an <a href="https://example.com" target="_blank" rel="noopener noreferrer">external link</a> and
          an <a href="#">internal link</a> for comparison.
        </p>
        <p>[numbered-list]</p>
        <h3>1. Do Not Run Unknown Tools Blindly</h3>
        <p>
          Treat agentic tools as untrusted code. Allowing an agent to execute or analyze a
          repository effectively grants it filesystem visibility, execution capability,
          environment access, and contextual influence.
        </p>
        <h3>2. Scope Permissions Narrowly</h3>
        <p>
          Grant the minimum permissions necessary. Use sandboxed environments, read-only
          filesystem access where possible, and avoid exposing production credentials or
          secrets to agentic tools.
        </p>
        <h3>3. Monitor Tool Behavior</h3>
        <p>
          Log and audit the actions taken by agentic tools. Unexpected network requests,
          file modifications, or system calls are indicators of potential misuse or prompt
          injection attacks.
        </p>
        <p>[/numbered-list]</p>
      </div>
    </div>
  )
}

export const Live: Story = {
  render: () => <LiveDemo />,
}
