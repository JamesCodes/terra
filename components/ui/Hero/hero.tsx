import { tv } from "tailwind-variants"
import { Button } from "@/components/ui/Button/button"
import { Heading } from "@/components/ui/Heading/heading"
import { type ResponsiveProps, responsiveClass, responsiveStyles } from "@/lib/responsive-props"
import { cn } from "@/lib/utils"

const heroVariants = tv({
  slots: {
    root: "relative max-w-screen bg-background max-md:overflow-hidden",
    grid: "page-grid",
    eyebrow:
      "appear-up fade-in col-span-4 text-center text-sm md:col-span-7 md:col-start-2 md:text-lg lg:col-span-8 lg:col-start-3",
    heading:
      "appear-up fade-in col-span-4 text-balance text-center md:col-span-7 md:col-start-2 lg:col-span-8 lg:col-start-3",
    text: "appear-up fade-in brand-body1 col-span-4 text-balance text-center text-primary md:col-span-7 md:col-start-2 lg:col-span-8 lg:col-start-3",
    imageContainer: "relative col-span-full lg:col-span-10 lg:col-start-2",
    imageWrapper: "overflow-hidden rounded-3xl",
    staticChild: "",
    interactiveChild: "",
    button: "appear-up fade-in col-span-4 flex justify-center md:col-span-full",
  },
  variants: {
    variant: {
      default: {
        root: "py-10 md:pt-12 lg:pb-25",
        grid: "gap-y-6",
        eyebrow: "font-bold",
        heading: "text-primary",
        imageContainer: "mt-2",
        interactiveVisual: "absolute inset-0 rounded-3xl",
        imageWrapper: "appear-up fade-in bg-[#260700]",
      },
      product: {
        root: "pt-8 pb-50 md:pt-16 md:pb-40",
        grid: "grid-rows-[auto_auto_1fr] gap-y-3",
        eyebrow: "z-10 col-start-1 row-start-1 pt-12 font-semibold md:pt-16",
        heading: "z-10 px-6 text-primary-foreground",
        imageContainer: "row-span-full row-start-1",
        interactiveVisual: "absolute inset-0 rounded-3xl",
        imageWrapper: "appear-up fade-in bg-[#370e02]",
      },
      compact: {
        root: "py-10 md:pt-12 lg:pb-20",
        grid: "gap-y-6",
        eyebrow: "font-bold",
        heading: "text-primary",
        imageContainer: "mt-2",
        imageWrapper: "appear-up fade-in bg-[#260700]",
      },
      background: {
        root: "overflow-hidden p-0",
        grid: "gap-y-6 py-10 md:pt-12 lg:py-25",
        eyebrow: "relative z-2 font-bold",
        heading: "relative z-2 text-chalk",
        text: "relative z-2 text-chalk",
        imageContainer: "absolute top-0 left-0 z-0 h-full w-full",
        button: "relative z-2 pt-4",
        imageWrapper: "rounded-none",
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
    theme: {
      moss: {},
      magma: {},
    },
    headlineSize: {
      small: {
        heading: "brand-h2",
      },
      large: {
        heading: "brand-h1",
      },
    },
    childVariant: {
      hidden: {
        interactiveChild: "hidden",
        staticChild: "hidden",
      },
      static: {
        interactiveChild: "hidden",
        staticChild: "fade-in appear-up relative z-2 col-span-full flex justify-center",
      },
      interactive: {
        staticChild: "hidden",
      },
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
    {
      variant: "background",
      theme: "moss",
      class: {
        root: "bg-moss",
      },
    },
    {
      variant: "background",
      theme: "magma",
      class: {
        root: "bg-magma",
      },
    },
  ],
  defaultVariants: {
    variant: "default",
    childVariant: "hidden",
    eyebrowVariant: "accent",
    hasEyebrow: false,
    theme: undefined,
  },
})

export type HeroVariant = "default" | "product" | "compact" | "background"

export type ChildVariant = "hidden" | "static" | "interactive"

interface HeroProps
  extends Omit<React.ComponentProps<"section">, "children">,
    ResponsiveProps<{
      height: number
    }> {
  variant?: HeroVariant
  childVariant: ChildVariant
  headlineSize?: "large" | "small"
  eyebrow?: string
  eyebrowVariant?: "accent" | "white"
  theme?: "moss" | "magma"
  heading?: string
  description?: string
  buttonLabel?: string
  buttonLink?: { href: string; target?: string }
  imageSlot?: React.ReactNode
  children?: React.ReactNode
}

function Hero({
  variant = "default",
  childVariant = "hidden",
  headlineSize = "large",
  className,
  eyebrow,
  eyebrowVariant = "accent",
  heading = "Offensive security built for the AI era.",
  description,
  buttonLabel,
  buttonLink,
  imageSlot,
  children,
  height = 480,
  heightTablet,
  heightMobile,
  theme,
  ...props
}: HeroProps) {
  const styles = heroVariants({
    variant,
    childVariant,
    eyebrowVariant,
    headlineSize,
    theme,
    hasEyebrow: !!eyebrow,
  })
  const heightStyle = responsiveStyles({ height: [height, heightTablet, heightMobile, "px"] })
  const heightCls = responsiveClass("h", "height")

  return (
    <section
      data-slot="hero"
      className={cn(styles.root(), className, {
        [heightCls]: variant === "background",
      })}
      style={heightStyle}
      {...props}
    >
      <div className={styles.grid()}>
        {eyebrow && <p className={styles.eyebrow()}>{eyebrow}</p>}

        <Heading level={1} className={styles.heading()}>
          {heading}
        </Heading>

        {variant !== "product" && description && <p className={styles.text()}>{description}</p>}

        {variant !== "product" && buttonLabel && (
          <div className={styles.button()}>
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

        {variant === "background" && children && (
          <div className={styles.staticChild()}>{children}</div>
        )}

        {(variant === "product" || imageSlot || children) && (
          <div className={styles.imageContainer()}>
            {(imageSlot || variant === "product") && (
              <div className={cn(styles.imageWrapper(), { [heightCls]: variant !== "background" })}>
                {imageSlot}
              </div>
            )}

            {children && <div className={styles.interactiveChild()}>{children}</div>}
          </div>
        )}
      </div>
    </section>
  )
}

export { Hero, heroVariants }
