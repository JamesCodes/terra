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
    icon: "",
  },
  variants: {
    variant: {
      large: {
        container: "card-shadow w-full gap-8 bg-card px-6 py-8 md:p-8 lg:gap-10 lg:p-16",
        wrapper: "gap-4 lg:gap-8",
        text: "gap-4 lg:gap-8",
      },
      small: {
        container: "gap-5 border border-border p-8 md:p-6 lg:p-10",
        wrapper: "gap-6 lg:gap-10",
        text: "gap-6",
        icon: "max-md:self-start",
      },
      simple: {
        container: "w-full items-center gap-12 rounded-none py-10 md:py-8",
        wrapper: "items-center gap-6 lg:gap-12",
        text: "items-center gap-4 text-center",
      },
    },
    imagePosition: {
      top: { container: "flex-col-reverse" },
      bottom: { container: "flex-col" },
    },
  },
  defaultVariants: {
    variant: "large",
    imagePosition: "bottom",
  },
})

interface FeatureCardProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof featureCardVariants> {
  icon?: IconVariant
  iconMode?: AnimationMode
  iconSpeed?: number
  imagePosition?: "top" | "bottom"
  label?: string
  title: string
  description: string
  image?: { src: string; alt?: string }
  showText?: boolean
  showDividers?: boolean
  showSlot?: boolean
  children?: React.ReactNode
}

function FeatureCard({
  className,
  variant,
  icon,
  iconMode = "loop",
  iconSpeed = 5,
  imagePosition,
  label,
  title,
  description,
  image,
  showText = true,
  showDividers,
  showSlot,
  children,
  ...props
}: FeatureCardProps) {
  const hasText = !!label || !!icon || (showText && (!!title || !!description))
  const styles = featureCardVariants({ variant, imagePosition })

  return (
    <ItemFrame
      data-slot="feature-card"
      className={cn(
        styles.container(),
        { "border-border max-md:border-y md:border-x": showDividers },
        className,
      )}
      {...props}
    >
      {hasText && (
        <div className={cn(styles.wrapper())}>
          {!!label && <span className="font-semibold text-accent text-sm">{label}</span>}
          {!!icon && (
            <div data-slot="feature-card-icon" className="contents">
              <AnimatedIcon
                size="sm"
                icon={icon}
                mode={iconMode}
                speed={iconSpeed}
                className={styles.icon()}
              />
            </div>
          )}
          {(!!title || !!description) && (
            <div className={styles.text()}>
              {!!title && (
                <Heading level={4} className="text-balance">
                  {title}
                </Heading>
              )}
              {showText && !!description && (
                <p className="brand-body2 text-granite/50">{description}</p>
              )}
            </div>
          )}
        </div>
      )}
      {image && (
        <div className="overflow-hidden rounded-lg">
          <img src={image.src} alt={image.alt ?? title} className="w-full object-cover" />
        </div>
      )}
      {showSlot && children}
    </ItemFrame>
  )
}

const layoutVariants = Object.keys(
  featureCardVariants.variants.variant,
) as (keyof typeof featureCardVariants.variants.variant)[]
const imagePositionVariants = Object.keys(
  featureCardVariants.variants.imagePosition,
) as (keyof typeof featureCardVariants.variants.imagePosition)[]

export { FeatureCard, featureCardVariants, layoutVariants, imagePositionVariants }
