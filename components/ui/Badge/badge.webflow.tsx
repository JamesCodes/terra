import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import { Badge } from "./badge"

import "../../../app/globals.css"

export default declareComponent(Badge, {
	name: "Badge",
	description: "A small status label component",
	group: "Data Display",
	props: {
		className: props.Text({
			name: "Class Name",
			defaultValue: "",
			tooltip: "Additional Tailwind CSS classes",
		}),
		variant: props.Variant({
			name: "Variant",
			options: ["default", "secondary", "destructive", "outline"],
			defaultValue: "default",
			tooltip: "The visual style of the badge",
		}),
		children: props.Text({
			name: "Text",
			defaultValue: "Badge",
			tooltip: "The badge label text",
		}),
	},
})
