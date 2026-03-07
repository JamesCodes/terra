import { type PropType, type PropValues, props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import { Button } from "./button"

import "../../../app/globals.css"

interface WebflowButtonProps {
	className?: string
	variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
	size?: "default" | "sm" | "lg" | "icon"
	children?: string
	disabled?: boolean
	link?: PropValues[PropType.Link]
}

const WebflowButton: React.FC<WebflowButtonProps> = ({
	className,
	variant,
	size,
	children,
	disabled,
	link,
}) => {
	if (link?.href) {
		return (
			<Button asChild variant={variant} size={size} className={className}>
				<a href={link.href} target={link.target}>
					{children}
				</a>
			</Button>
		)
	}

	return (
		<Button
			variant={variant}
			size={size}
			className={className}
			disabled={disabled}
		>
			{children}
		</Button>
	)
}

export default declareComponent(WebflowButton, {
	name: "Button",
	description: "A versatile button component with multiple variants and sizes",
	group: "Interaction",
	props: {
		className: props.Text({
			name: "Class Name",
			defaultValue: "",
			tooltip: "Additional Tailwind CSS classes",
		}),
		variant: props.Variant({
			name: "Variant",
			options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
			defaultValue: "default",
			tooltip: "The visual style of the button",
		}),
		size: props.Variant({
			name: "Size",
			options: ["default", "sm", "lg", "icon"],
			defaultValue: "default",
			tooltip: "The size of the button",
		}),
		children: props.Text({
			name: "Text",
			defaultValue: "Button",
			tooltip: "The button label text",
		}),
		disabled: props.Boolean({
			name: "Disabled",
			defaultValue: false,
			tooltip: "Whether the button is disabled",
		}),
		link: props.Link({
			name: "Link",
			tooltip: "Optional URL — renders the button as a link when set",
		}),
	},
})
