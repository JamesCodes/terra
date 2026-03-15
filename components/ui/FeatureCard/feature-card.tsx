import type * as React from "react"
import { tv, type VariantProps } from "tailwind-variants"
import {
  AnimatedIcon,
  type AnimationMode,
  type IconVariant,
} from "@/components/ui/AnimatedIcon/animated-icon"
import { Heading } from "@/components/ui/Heading/heading"
import { ItemFrame } from "@/components/ui/ItemFrame/item-frame"
import { cn } from "@/lib/utils"

const featureCardVariants = tv({
  base: "",
  slots: {
    container: "flex self-stretch rounded-2xl",
    wrapper: "flex grow flex-col",
    text: "flex grow flex-col",
    iconMode: "",
  },
  variants: {
    variant: {
      large: {
        container: "gap-8 bg-card px-6 py-8 md:p-8 lg:gap-10 lg:p-16",
        wrapper: "gap-4 lg:gap-8",
        text: "gap-4 lg:gap-8",
      },
      small: {
        container: "gap-5 border border-border p-8 md:p-6 lg:p-10",
        wrapper: "gap-6 lg:gap-10",
        text: "gap-6",
      },
    },
    imagePosition: {
      top: { container: "flex-col-reverse" },
      bottom: { container: "flex-col" },
    },
    icon: {
      target: {
        iconMode: "loop",
      },
      infinity: {
        iconMode: "loop",
      },
      "half-circle": {
        iconMode: "loop",
      },
      shield: {
        iconMode: "reveal",
      },
    },
  },
  defaultVariants: {
    variant: "large",
    imagePosition: "bottom",
    icon: undefined,
  },
})

interface FeatureCardProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof featureCardVariants> {
  icon?: IconVariant
  imagePosition?: "top" | "bottom"
  label?: string
  title: string
  description: string
  image?: { src: string; alt?: string }
}

function FeatureCard({
  className,
  variant,
  icon,
  imagePosition,
  label,
  title,
  description,
  image,
  ...props
}: FeatureCardProps) {
  const hasText = !!label || !!icon || !!title || !!description
  const styles = featureCardVariants({ variant, imagePosition, icon })

  console.log({ icon: styles.iconMode() })

  return (
    <ItemFrame data-slot="feature-card" className={cn(styles.container(), className)} {...props}>
      {hasText && (
        <div className={cn(styles.wrapper())}>
          {!!label && <span className="font-semibold text-accent text-sm">{label}</span>}
          {!!icon && (
            <div data-slot="feature-card-icon" className="contents">
              <AnimatedIcon
                size="sm"
                icon={icon}
                mode={styles.iconMode() as AnimationMode}
                speed={8}
              />
            </div>
          )}
          {(!!title || !!description) && (
            <div className={styles.text()}>
              {!!title && <Heading level={4}>{title}</Heading>}
              {!!description && <p className="brand-body2 text-muted-foreground">{description}</p>}
            </div>
          )}
        </div>
      )}
      {image && (
        <div className="overflow-hidden rounded-lg">
          <img src={image.src} alt={image.alt ?? title} className="w-full object-cover" />
        </div>
      )}
    </ItemFrame>
  )
}

export { FeatureCard, featureCardVariants }
