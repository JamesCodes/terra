import type { ReactNode } from "react"
import { tv, type VariantProps } from "tailwind-variants"
import { Heading } from "@/components/ui/Heading/heading"
import { cn } from "@/lib/utils"

const featuredContentVariants = tv({
  slots: {
    container: "w-full py-10 lg:py-20 brand-grid",
    imageWrapper: "",
    image: "",
    contentWrapper: "flex basis-full flex-col justify-center gap-4",
  },
  variants: {
    variant: {
      imageLeft: {
        container: "w-full",
        imageWrapper: "order-1 md:col-span-7",
        contentWrapper: "order-2 lg:mr-1/12 md:col-start-9 md:col-end-13 lg:col-end-12",
      },
      imageRight: {
        container: "w-full",
        imageWrapper: "order-1 md:order-2 md:col-start-6 md:col-end-13",
        contentWrapper: "max-md:text-center order-2 md:order-1 md:col-start-2 md:col-end-6 lg:col-end-5",
      },
    },
    imageVariant: {
      default: {
        imageWrapper: "",
        image: "",
      },
      fullBleed: {
        container: "md:pb-0 lg:pb-0",
        imageWrapper: "md:basis-[65%] lg:basis-[65%] md:pb-0 lg:pb-0",
        image: "",
      },
    },
  },
  compoundVariants: [
    {
      variant: "imageLeft",
      imageVariant: "fullBleed",
      className: {
        imageWrapper: "-ml-6 md:-ml-10 lg:-ml-20",
      },
    },
    {
      variant: "imageRight",
      imageVariant: "fullBleed",
      className: {
        imageWrapper: "-mr-6 md:-mr-10 lg:-mr-20",
      },
    },
  ],
  defaultVariants: {
    variant: "imageLeft",
    imageVariant: "default",
  },
})

interface FeatureContentProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof featuredContentVariants> {
  title?: string
  description?: string
  icon?: ReactNode
  image?: { src: string; alt?: string }
}

function FeatureContent({
  className,
  style,
  variant = "imageLeft",
  title,
  description,
  icon,
  image,
  imageVariant = "default",
  ...props
}: FeatureContentProps) {
  const { container, imageWrapper, contentWrapper } = featuredContentVariants({
    variant,
    imageVariant,
  })

  console.log({ variant, imageVariant, imageWrapper: imageWrapper({ variant, imageVariant }) })

  const contentColumn = (
    <div className={contentWrapper()}>
      {icon && <div className="flex max-md:justify-center">{icon}</div>}
      {title && (
        <Heading className="max-md:text-center" level={3}>
          {title}
        </Heading>
      )}
      {description && (
        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p>
      )}
    </div>
  )

  const imageColumn = image?.src ? (
    <div className={cn("basis-full md:basis-7/12", imageWrapper({ variant, imageVariant }))}>
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
      {/* <div className="flex flex-col items-center gap-4 md:gap-8 md:flex-row md:justify-between lg:gap-8">
        
      </div> */}
    </div>
  )
}

export { FeatureContent }
