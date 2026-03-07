import { type PropType, type PropValues, props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

import "../../../app/globals.css"

interface WebflowAvatarProps {
	className?: string
	size?: "default" | "sm" | "lg" | "xl"
	image?: PropValues[PropType.Image]
	fallbackText?: string
	showFallback?: boolean
}

const WebflowAvatar: React.FC<WebflowAvatarProps> = ({
	className,
	size,
	image,
	fallbackText = "AB",
	showFallback = true,
}) => {
	return (
		<Avatar className={className} size={size}>
			{image?.src && <AvatarImage src={image.src} alt={image.alt} />}
			{showFallback && <AvatarFallback>{fallbackText}</AvatarFallback>}
		</Avatar>
	)
}

export default declareComponent(WebflowAvatar, {
	name: "Avatar",
	description: "An avatar component with image and fallback support",
	group: "Data Display",
	props: {
		className: props.Text({
			name: "Class Name",
			defaultValue: "",
			tooltip: "Additional Tailwind CSS classes",
		}),
		size: props.Variant({
			name: "Size",
			options: ["default", "sm", "lg", "xl"],
			defaultValue: "default",
			tooltip: "Controls the size of the avatar",
		}),
		image: props.Image({
			name: "Image",
			tooltip: "The avatar image to display",
		}),
		fallbackText: props.Text({
			name: "Fallback Text",
			defaultValue: "AB",
			tooltip: "Text shown when no image is available (typically initials)",
		}),
		showFallback: props.Visibility({
			name: "Show Fallback",
			defaultValue: true,
			tooltip: "Show fallback text when image is unavailable",
		}),
	},
})
