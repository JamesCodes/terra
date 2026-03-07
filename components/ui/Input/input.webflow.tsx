import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import { Input } from "./input"

import "../../../app/globals.css"

export default declareComponent(Input, {
  name: "Input",
  description: "A text input field component",
  group: "Form",
  props: {
    className: props.Text({
      name: "Class Name",
      defaultValue: "",
      tooltip: "Additional Tailwind CSS classes",
    }),
    type: props.Variant({
      name: "Type",
      options: [
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
      ],
      defaultValue: "text",
      tooltip: "The HTML input type",
    }),
    placeholder: props.Text({
      name: "Placeholder",
      defaultValue: "Enter text...",
      tooltip: "Placeholder text shown when the input is empty",
    }),
    disabled: props.Boolean({
      name: "Disabled",
      defaultValue: false,
      tooltip: "Whether the input is disabled",
    }),
    required: props.Boolean({
      name: "Required",
      defaultValue: false,
      tooltip: "Whether the input is required",
    }),
    value: props.Text({
      name: "Value",
      defaultValue: "",
      tooltip: "The default value of the input",
    }),
  },
})
