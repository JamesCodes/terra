import { Button } from "@/components/ui/Button/button"
import { Heading } from "@/components/ui/Heading/heading"
import { cn } from "@/lib/utils"

type HeroTheme = "dark" | "light" | "accent"

interface HeroProps extends Omit<React.ComponentProps<"section">, "children"> {
  theme?: HeroTheme
  eyebrow?: string
  heading?: string
  description?: string
  buttonLabel?: string
  buttonLink?: { href: string; target?: string }
  backgroundImage?: { src: string; alt?: string }
  children?: React.ReactNode
}

function Hero({
  className,
  theme = "light",
  eyebrow,
  heading = "Offensive security built for the AI era.",
  description,
  buttonLabel,
  buttonLink,
  backgroundImage,
  children,
  ...props
}: HeroProps) {
  const isLight = theme === "light"

  return (
    <section
      data-slot="hero"
      className={cn(
        "relative py-10 md:mb-16 md:pt-12 lg:pb-25",
        {
          "bg-[#370e02]": theme === "dark",
          "bg-background": theme === "light",
          "bg-accent": theme === "accent",
        },
        className,
      )}
      {...props}
    >
      <div className="page-grid gap-y-6">
        {eyebrow && (
          <p
            className={cn(
              "col-span-4 text-center font-medium text-sm md:col-span-7 md:col-start-2 md:text-lg lg:col-span-8 lg:col-start-4",
              {
                "text-primary": isLight,
                "text-background": !isLight,
              },
            )}
          >
            {eyebrow}
          </p>
        )}

        <Heading
          level={1}
          className={cn(
            "col-span-4 text-center md:col-start-3 md:col-span-5 lg:col-span-8 lg:col-start-3",
            {
              "text-primary": isLight,
              "text-background": !isLight,
            },
          )}
        >
          {heading}
        </Heading>

        {description && (
          <p
            className={cn(
              "col-span-4 text-center brand-body1 md:col-span-7 lg:col-span-6 md:col-start-2 lg:col-start-4",
              {
                "text-primary": isLight,
                "text-background": !isLight,
              },
            )}
          >
            {description}
          </p>
        )}

        {buttonLabel && (
          <div className="col-span-4 flex justify-center md:col-span-full">
            {buttonLink?.href ? (
              <Button
                asChild
                className={cn({
                  "bg-primary text-primary-foreground hover:bg-primary/90": theme === "accent",
                })}
              >
                <a href={buttonLink.href} target={buttonLink.target}>
                  {buttonLabel}
                </a>
              </Button>
            ) : (
              <Button
                className={cn({
                  "bg-primary text-primary-foreground hover:bg-primary/90": theme === "accent",
                })}
              >
                {buttonLabel}
              </Button>
            )}
          </div>
        )}

        {(backgroundImage?.src || children) && (
          <div className="relative col-span-full mt-2 lg:col-span-10 lg:col-start-2">
            {backgroundImage?.src && (
              <div className="overflow-hidden rounded-3xl bg-[#260700]">
                <img
                  id="hero-image"
                  src={backgroundImage.src}
                  alt={backgroundImage.alt ?? ""}
                  className="pointer-events-none h-110 w-full select-none object-cover object-bottom md:h-120"
                />
              </div>
            )}
            {children && <div className="absolute inset-0 rounded-3xl">{children}</div>}
          </div>
        )}
      </div>
    </section>
  )
}

export { Hero }
export type { HeroTheme }
