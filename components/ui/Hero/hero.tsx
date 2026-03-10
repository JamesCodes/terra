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
  theme = "dark",
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
        "relative overflow-hidden py-37.5",
        {
          "bg-[#370e02]": theme === "dark",
          "bg-background": theme === "light",
          "bg-accent": theme === "accent",
        },
        className,
      )}
      {...props}
    >
      <div className="page-grid gap-y-4 pt-10 md:gap-y-6 md:pt-16">
        {eyebrow && (
          <p
            className={cn(
              "col-span-4 text-center text-sm font-medium md:col-span-6 md:col-start-4 md:text-lg",
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
          className={cn("col-span-4 text-center md:col-span-8 md:col-start-3", {
            "text-primary": isLight,
            "text-background": !isLight,
          })}
        >
          {heading}
        </Heading>

        {description && (
          <p
            className={cn(
              "col-span-4 text-center text-sm leading-relaxed md:col-span-6 md:col-start-4 md:text-lg md:font-medium md:leading-8",
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
          <div className="col-span-4 flex justify-center md:col-span-12">
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
          <div className="col-span-4 mt-6 md:col-span-10 md:col-start-2 md:mt-10">
            {backgroundImage?.src && (
              <div className="overflow-hidden rounded-t-3xl bg-[#260700] md:rounded-3xl">
                <img
                  src={backgroundImage.src}
                  alt={backgroundImage.alt ?? ""}
                  className="pointer-events-none h-72 w-full select-none object-cover md:h-120"
                />
              </div>
            )}
            {children}
          </div>
        )}
      </div>
    </section>
  )
}

export { Hero }
export type { HeroTheme }
