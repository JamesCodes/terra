import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from "lucide-react"
import type React from "react"
import { createVariantMap } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle, alertVariants } from "./alert"

import "../../../app/globals.css"

type AlertVariant = NonNullable<
  import("tailwind-variants").VariantProps<typeof alertVariants>["variant"]
>

export const variantMap = createVariantMap<AlertVariant>(alertVariants.variants.variant)

const iconOptions = ["none", "info", "warning", "error", "success"] as const

export const iconOptionsMap = createVariantMap<(typeof iconOptions)[number]>(iconOptions)

const iconMap = {
  none: null,
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
  success: CheckCircle2,
} as const

interface WebflowAlertProps {
  className?: string
  variant?: keyof typeof variantMap
  title?: string
  description?: string
  icon?: keyof typeof iconOptionsMap
}

const WebflowAlert: React.FC<WebflowAlertProps> = ({
  className,
  variant = "Default",
  title,
  description,
  icon = "None",
}) => {
  const mappedVariant = variantMap[variant]
  const mappedIcon = iconOptionsMap[icon]
  const IconComponent = iconMap[mappedIcon]

  return (
    <Alert variant={mappedVariant} className={className}>
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
      options: Object.keys(variantMap),
      defaultValue: Object.keys(variantMap)[0],
      tooltip: "The visual style of the alert",
    }),
    icon: props.Variant({
      name: "Icon",
      options: Object.keys(iconOptionsMap),
      defaultValue: Object.keys(iconOptionsMap)[0],
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
