import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import { Search, X } from "lucide-react"
import { useRef, useState } from "react"
import { createVariantMap } from "@/lib/utils"
import { Input, inputVariants } from "./input"

import "../../../app/globals.css"

type InputVariant = NonNullable<
  import("tailwind-variants").VariantProps<typeof inputVariants>["variant"]
>

export const variantMap = createVariantMap<InputVariant>(inputVariants.variants.variant)

const inputTypes = [
  "text",
  "email",
  "password",
  "number",
  "tel",
  "url",
  "search",
  "date",
  "time",
  "datetime-local",
  "file",
] as const

export const typeMap = createVariantMap<(typeof inputTypes)[number]>(inputTypes)

interface WebflowInputProps {
  variant?: keyof typeof variantMap
  placeholder?: string
  type?: keyof typeof typeMap
  disabled?: boolean
  required?: boolean
  value?: string
  showIcon?: boolean
}

function WebflowInput({
  variant = "Default",
  placeholder,
  type = "Text",
  disabled,
  required,
  value,
  showIcon = true,
}: WebflowInputProps) {
  const mappedVariant = variantMap[variant]
  const mappedType = typeMap[type]
  const [searchValue, setSearchValue] = useState(value ?? "")
  const inputRef = useRef<HTMLInputElement>(null)

  if (mappedVariant === "search") {
    return (
      <div className="relative flex w-full items-center">
        <Input
          ref={inputRef}
          variant="search"
          type="search"
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className={showIcon ? "pr-8" : ""}
        />
        {showIcon && (
          <div className="absolute right-0 bottom-3 flex size-5 items-center justify-center">
            {searchValue ? (
              <button
                type="button"
                onClick={() => {
                  setSearchValue("")
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
        )}
      </div>
    )
  }

  return (
    <Input
      variant="default"
      type={mappedType}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      defaultValue={value}
    />
  )
}

export default declareComponent(WebflowInput, {
  name: "Input",
  description: "A text input field with default, search, and inline variants",
  group: "Elements",
  props: {
    variant: props.Variant({
      name: "Style",
      options: Object.keys(variantMap),
      defaultValue: Object.keys(variantMap)[0],
      tooltip: "The visual style of the input",
    }),
    placeholder: props.Text({
      name: "Placeholder",
      defaultValue: "Enter text...",
      tooltip: "Placeholder text shown when the input is empty",
    }),
    type: props.Variant({
      name: "Type",
      options: Object.keys(typeMap),
      defaultValue: Object.keys(typeMap)[0],
      tooltip: "The HTML input type",
      group: "Settings",
    }),
    disabled: props.Boolean({
      name: "Disabled",
      defaultValue: false,
      tooltip: "Whether the input is disabled",
      group: "Settings",
    }),
    required: props.Boolean({
      name: "Required",
      defaultValue: false,
      tooltip: "Whether the input is required",
      group: "Settings",
    }),
    value: props.Text({
      name: "Value",
      defaultValue: "",
      tooltip: "The default value of the input",
      group: "Settings",
    }),
    showIcon: props.Visibility({
      name: "Search Icon",
      tooltip: "Show search icon (only applies to Search variant)",
    }),
  },
})
