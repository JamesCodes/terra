import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { textArg } from "@/lib/storybook"
import { RichTextLargeListItem } from "./rich-text-large-list-item"
import { propLabels } from "./rich-text-large-list-item.webflow"


const meta = {
  title: "Rich Text/Large List Item",
  component: RichTextLargeListItem,
  parameters: {
    layout: "padded",
    controls: {
      exclude: ["className", "children"],
    },
  },
  tags: ["autodocs"],
  args: {
    heading: "Your consent",
    number: "01",
  },
  argTypes: {
    heading: textArg(propLabels.heading),
    number: textArg(propLabels.number),
  },
} satisfies Meta<typeof RichTextLargeListItem>

export default meta
type Story = StoryObj<typeof RichTextLargeListItem>

export const Default: Story = {
  render: ({ heading, number }) => (
    <RichTextLargeListItem
      heading={heading}
      number={number}
      content={
        <>
          <p>
            <strong>
              PLEASE READ THIS PRIVACY POLICY BEFORE ACCESSING AND USING THE SERVICES. BY ACCESSING
              THE SERVICES, YOU AGREE TO THIS PRIVACY POLICY, INCLUDING TO THE COLLECTION AND
              PROCESSING OF YOUR PERSONAL INFORMATION.
            </strong>
          </p>
          <p>
            Please note: You hereby acknowledge and agree that you are providing us with Personal
            Information at your own free will and that we may collect and use such Personal
            Information pursuant to this Privacy Policy and any applicable laws and regulations.
          </p>
        </>
      }
    />
  ),
}

export const MultipleItems: Story = {
  render: () => (
    <ul className="flex list-none flex-col gap-8">
      <RichTextLargeListItem
        heading="Your consent"
        number="01"
        content={
          <p>
            By accessing the Services, you agree to this Privacy Policy, including to the collection
            and processing of your Personal Information.
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
                <strong>Personal Information:</strong> Information that identifies an individual or
                may with reasonable efforts enable the identification of an individual.
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
            We use Personal Information for the purposes set out in this Privacy Policy, including
            to provide and improve our Services, to communicate with you, and to comply with legal
            obligations.
          </p>
        }
      />
    </ul>
  ),
}
