import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from "lucide-react"
import type React from "react"
import { Alert, AlertDescription, AlertTitle } from "./alert"

import "../../../app/globals.css"

export const variantMap = {
  default: "default",
  destructive: "destructive",
} as const

export const iconOptionsMap = {
  none: "none",
  info: "info",
  warning: "warning",
  error: "error",
  success: "success",
} as const

const iconMap = {
  none: null,
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
  success: CheckCircle2,
} as const

interface WebflowAlertProps {
  className?: string
  variant?: "default" | "destructive"
  title?: string
  description?: string
  icon?: keyof typeof iconMap
}

const WebflowAlert: React.FC<WebflowAlertProps> = ({
  className,
  variant = "default",
  title,
  description,
  icon = "none",
}) => {
  const IconComponent = iconMap[icon]

  return (
    <Alert variant={variant} className={className}>
      {IconComponent && <IconComponent />}
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  )
}

export default declareComponent(WebflowAlert, {
  name: "Alert",
  description: "A callout component for important messages",
  group: "Elements",
  props: {
    className: props.Text({
      name: "Class Name",
      defaultValue: "",
      tooltip: "Additional Tailwind CSS classes",
    }),
    variant: props.Variant({
      name: "Variant",
      options: ["default", "destructive"],
      defaultValue: "default",
      tooltip: "The visual style of the alert",
    }),
    icon: props.Variant({
      name: "Icon",
      options: ["none", "info", "warning", "error", "success"],
      defaultValue: "none",
      tooltip: "Icon displayed alongside the alert",
    }),
    title: props.Text({
      name: "Title",
      defaultValue: "Alert Title",
      tooltip: "The alert heading text",
    }),
    description: props.Text({
      name: "Description",
      defaultValue: "Your alert description goes here.",
      tooltip: "The alert body text",
    }),
  },
})
