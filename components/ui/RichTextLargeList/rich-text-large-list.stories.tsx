import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { RichTextLargeListItem } from "@/components/ui/RichTextLargeListItem/rich-text-large-list-item"
import { RichTextLargeList } from "./rich-text-large-list"

import "../../../app/globals.css"
import { Section } from "@/components/ui/Section/section"
import { WebflowSlot } from "@/lib/storybook-webflow"

const meta = {
  title: "Rich Text/Large List",
  component: RichTextLargeList,
  parameters: {
    layout: "padded",
    controls: {
      exclude: ["className", "children"],
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RichTextLargeList>

export default meta
type Story = StoryObj<typeof RichTextLargeList>

export const Default: Story = {
  render: () => (
    <Section>
      <WebflowSlot>
        <RichTextLargeList>
          <RichTextLargeListItem
            heading="Your consent"
            number="01"
            content={
              <p>
                By accessing the Services, you agree to this Privacy Policy, including to the
                collection and processing of your Personal Information.
              </p>
            }
          />
          <RichTextLargeListItem
            heading="What types of information do we collect?"
            number="02"
            content={
              <>
                <p>We collect the following types of information:</p>
                <ul>
                  <li>
                    <strong>Non-Personal Information:</strong> Un-identified and non-identifiable
                    information pertaining to a user.
                  </li>
                  <li>
                    <strong>Personal Information:</strong> Information that identifies an individual
                    or may with reasonable efforts enable the identification of an individual.
                  </li>
                </ul>
              </>
            }
          />
          <RichTextLargeListItem
            heading="How do we use the information we collect?"
            number="03"
            content={
              <p>
                We use Personal Information for the purposes set out in this Privacy Policy,
                including to provide and improve our Services, to communicate with you, and to
                comply with legal obligations.
              </p>
            }
          />
        </RichTextLargeList>
      </WebflowSlot>
    </Section>
  ),
}
