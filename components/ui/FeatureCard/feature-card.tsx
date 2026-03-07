import type * as React from "react"
import { cn } from "@/lib/utils"
import { tv, type VariantProps } from "tailwind-variants"

const featureCardVariants = tv({
  base: "flex rounded-2xl",
  variants: {
    variant: {
      large: "flex-col gap-6 bg-card border border-border p-10",
      grid: "flex-col gap-5 bg-card border border-border rounded-2xl p-8",
    },
  },
  defaultVariants: {
    variant: "grid",
  },
})

interface FeatureCardProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof featureCardVariants> {
  icon?: React.ReactNode
  label?: string
  title: string
  description: string
  image?: { src: string; alt?: string }
}

function FeatureCard({
  className,
  variant,
  icon,
  label,
  title,
  description,
  image,
  ...props
}: FeatureCardProps) {
  if (variant === "large") {
    return (
      <div
        data-slot="feature-card"
        className={cn(featureCardVariants({ variant }), className)}
        {...props}
      >
        {label && (
          <span className="text-sm font-semibold text-accent">{label}</span>
        )}
        <h3 className="font-serif text-[28px] leading-tight">{title}</h3>
        <p className="text-sm text-foreground leading-relaxed max-w-md grow">
          {description}
        </p>
        {image && (
          <div className="overflow-hidden rounded-lg">
            <img
              src={image.src}
              alt={image.alt ?? title}
              className="w-full object-cover"
            />
          </div>
        )}
      </div>
    )
  }

  // Default: grid variant
  return (
    <div
      data-slot="feature-card"
      className={cn(featureCardVariants({ variant }), className)}
      {...props}
    >
      {icon && <div data-slot="feature-card-icon">{icon}</div>}
      <h3 className="font-serif text-xl font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  )
}

export { FeatureCard, featureCardVariants }
