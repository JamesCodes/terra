import { tv, type VariantProps } from "tailwind-variants"
import {
  AnimatedIcon,
  type AnimationMode,
  type IconVariant,
} from "@/components/ui/AnimatedIcon/animated-icon"
import { Heading } from "@/components/ui/Heading/heading"
import { cn } from "@/lib/utils"

const featuredContentVariants = tv({
  slots: {
    container: "brand-grid w-full gap-y-10",
    imageWrapper: "col-span-full md:col-span-6",
    contentWrapper: "col-span-full flex flex-col justify-center gap-4",
  },
  variants: {
    variant: {
      imageLeft: {
        imageWrapper: "order-1 md:col-start-1 md:col-end-6 lg:col-end-8",
        contentWrapper: "order-2 md:col-start-7 md:col-end-10 lg:col-start-9 lg:col-end-12",
      },
      imageRight: {
        imageWrapper:
          "order-1 md:order-2 md:col-start-5 md:col-end-10 lg:col-start-6 lg:col-end-13",
        contentWrapper:
          "order-2 col-span-full max-md:text-center md:order-1 md:col-start-1 md:col-end-4 lg:col-start-2 lg:col-end-5",
      },
    },
  },
  defaultVariants: {
    variant: "imageLeft",
  },
})

interface FeatureContentProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof featuredContentVariants> {
  title?: string
  description?: string
  icon?: IconVariant
  iconMode?: AnimationMode
  iconSpeed?: number
  image?: { src: string; alt?: string }
}

function FeatureContent({
  className,
  style,
  variant = "imageLeft",
  title,
  description,
  icon,
  iconMode = "loop",
  iconSpeed = 5,
  image,
  ...props
}: FeatureContentProps) {
  const { container, imageWrapper, contentWrapper } = featuredContentVariants({
    variant,
  })

  const contentColumn = (
    <div className={contentWrapper()}>
      {!!icon && <AnimatedIcon icon={icon} size="lg" mode={iconMode} speed={iconSpeed} />}
      {!!title && (
        <Heading className="text-balance text-accent max-md:text-center" level={3}>
          {title}
        </Heading>
      )}
      {description && <p className="brand-body1 max-md:text-center">{description}</p>}
    </div>
  )

  const imageColumn = image?.src ? (
    <div className={imageWrapper()}>
      <img src={image.src} alt={image.alt ?? ""} className="h-auto w-full object-cover" />
    </div>
  ) : null

  return (
    <div
      data-slot="feature-content"
      className={cn(container(), className)}
      style={style}
      {...props}
    >
      {imageColumn}
      {contentColumn}
    </div>
  )
}

export { FeatureContent, featuredContentVariants }
