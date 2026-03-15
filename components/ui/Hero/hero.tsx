import { tv } from "tailwind-variants"
import { Button } from "@/components/ui/Button/button"
import { Heading } from "@/components/ui/Heading/heading"
import { cn } from "@/lib/utils"

const heroVariants = tv({
  slots: {
    root: "relative max-w-screen bg-background max-md:overflow-hidden",
    grid: "page-grid appear-up blur-in",
    eyebrow:
      "col-span-4 text-center text-sm md:col-span-7 md:col-start-2 md:text-lg lg:col-span-8 lg:col-start-3",
    heading:
      "col-span-4 text-balance text-center md:col-span-5 md:col-start-3 lg:col-span-8 lg:col-start-3",
    imageContainer: "relative col-span-full lg:col-span-10 lg:col-start-2",
    imageWrapper: "overflow-hidden rounded-3xl",
    image: "pointer-events-none w-full select-none object-cover object-bottom",
  },
  variants: {
    variant: {
      default: {
        root: "py-10 md:pt-12 lg:pb-25",
        grid: "gap-y-6",
        eyebrow: "font-bold",
        heading: "text-primary",
        imageContainer: "mt-2",
        imageWrapper: "bg-[#260700]",
        image: "h-110 md:h-120",
      },
      product: {
        root: "pt-8 pb-50 md:pt-16 md:pb-40",
        grid: "grid-rows-[auto_auto_1fr] gap-y-3",
        eyebrow: "z-10 col-start-1 row-start-1 pt-12 font-semibold md:pt-16",
        heading: "z-10 text-primary-foreground",
        imageContainer: "row-span-full row-start-1",
        imageWrapper: "bg-[#370e02]",
        image: "h-120 md:h-180",
      },
    },
    eyebrowVariant: {
      accent: { eyebrow: "text-terracotta" },
      white: { eyebrow: "text-white" },
    },
    hasEyebrow: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variant: "product",
      hasEyebrow: true,
      class: {
        heading: "col-start-1 row-start-2",
      },
    },
    {
      variant: "product",
      hasEyebrow: false,
      class: {
        heading: "col-start-1 row-start-1 pt-12 md:pt-16",
      },
    },
  ],
  defaultVariants: {
    variant: "default",
    eyebrowVariant: "accent",
    hasEyebrow: false,
  },
})

interface HeroProps extends Omit<React.ComponentProps<"section">, "children"> {
  variant?: "default" | "product"
  headlineSize?: "large" | "small"
  eyebrow?: string
  eyebrowVariant?: "accent" | "white"
  heading?: string
  description?: string
  buttonLabel?: string
  buttonLink?: { href: string; target?: string }
  image?: { src: string; alt?: string }
  children?: React.ReactNode
}

function Hero({
  variant = "default",
  headlineSize = "large",
  className,
  eyebrow,
  eyebrowVariant = "accent",
  heading = "Offensive security built for the AI era.",
  description,
  buttonLabel,
  buttonLink,
  image,
  children,
  ...props
}: HeroProps) {
  const styles = heroVariants({ variant, eyebrowVariant, hasEyebrow: !!eyebrow })

  return (
    <section data-slot="hero" className={cn(styles.root(), className)} {...props}>
      <div className={styles.grid()}>
        {eyebrow && <p className={styles.eyebrow()}>{eyebrow}</p>}

        <Heading level={headlineSize === "small" ? 2 : 1} className={styles.heading()}>
          {heading}
        </Heading>

        {variant !== "product" && description && (
          <p className="brand-body1 col-span-4 text-center text-primary md:col-span-7 md:col-start-2 lg:col-span-6 lg:col-start-4">
            {description}
          </p>
        )}

        {variant !== "product" && buttonLabel && (
          <div className="col-span-4 flex justify-center md:col-span-full">
            {buttonLink?.href ? (
              <Button asChild>
                <a href={buttonLink.href} target={buttonLink.target}>
                  {buttonLabel}
                </a>
              </Button>
            ) : (
              <Button>{buttonLabel}</Button>
            )}
          </div>
        )}

        {(variant === "product" || image?.src || children) && (
          <div className={styles.imageContainer()}>
            {(image?.src || variant === "product") && (
              <div className={styles.imageWrapper()}>
                {image?.src ? (
                  <img
                    id="hero-image"
                    src={image.src}
                    alt={image.alt ?? ""}
                    className={styles.image()}
                  />
                ) : (
                  <div className="h-120 md:h-180" />
                )}
              </div>
            )}

            {children && <div className="absolute inset-0 rounded-3xl">{children}</div>}
          </div>
        )}
      </div>
    </section>
  )
}

export { Hero, heroVariants }
