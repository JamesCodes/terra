import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Search, X } from "lucide-react"
import { useRef, useState } from "react"
import { booleanArg, selectArg } from "@/lib/storybook"
import { Input } from "./input"
import { typeMap, variantMap } from "./input.webflow"
import "../../../app/globals.css"

const meta = {
  title: "Elements/Input",
  component: Input,
  parameters: {
    layout: "centered",
    controls: { include: ["variant", "type", "placeholder", "disabled"] },
  },
  tags: ["autodocs"],
  args: {
    variant: "Default" as any,
    type: "text" as any,
    placeholder: "Enter text...",
    disabled: false,
  },
  argTypes: {
    variant: selectArg("Style", variantMap),
    type: selectArg("Type", typeMap),
    disabled: booleanArg("Disabled"),
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<any>

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
}

function SearchInput() {
  const [value, setValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="relative flex w-80 items-center">
      <Input
        ref={inputRef}
        variant="search"
        type="search"
        placeholder="Search articles"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pr-8"
      />
      <div className="absolute right-0 bottom-3 flex size-5 items-center justify-center">
        {value ? (
          <button
            type="button"
            onClick={() => {
              setValue("")
              inputRef.current?.focus()
            }}
            className="flex size-5 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        ) : (
          <Search className="pointer-events-none size-5 text-foreground" />
        )}
      </div>
    </div>
  )
}

export const SearchVariant: Story = {
  render: () => <SearchInput />,
}

export const SearchWithoutIcon: Story = {
  render: () => (
    <div className="w-80">
      <Input variant="search" placeholder="Search articles" />
    </div>
  ),
}

export const Inline: Story = {
  args: {
    variant: "Inline",
    type: "email",
    placeholder: "Email address",
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
}

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2">
      <label htmlFor="email" className="text-sm font-medium">
        Email
      </label>
      <Input id="email" type="email" placeholder="Enter your email" />
    </div>
  ),
}

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password",
  },
}

export const Number: Story = {
  args: {
    type: "number",
    placeholder: "Enter number",
  },
}

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
  },
}

export const DisabledSearch: Story = {
  render: () => (
    <div className="relative flex w-80 items-center">
      <Input variant="search" placeholder="Search articles" disabled className="pr-8" />
      <div className="absolute right-0 bottom-3 flex size-5 items-center justify-center">
        <Search className="pointer-events-none size-5 text-muted-foreground" />
      </div>
    </div>
  ),
}

export const WithValue: Story = {
  args: {
    value: "Pre-filled value",
    readOnly: true,
  },
}

export const FileInput: Story = {
  args: {
    type: "file",
  },
}

export const FormExample: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Full Name
        </label>
        <Input id="name" placeholder="John Doe" />
      </div>
      <div className="space-y-2">
        <label htmlFor="form-email" className="text-sm font-medium">
          Email
        </label>
        <Input id="form-email" type="email" placeholder="john@example.com" />
      </div>
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium">
          Phone
        </label>
        <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
      </div>
    </div>
  ),
}
