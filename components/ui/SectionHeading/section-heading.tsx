import type { VariantProps } from "tailwind-variants"
import { Button, type buttonVariants } from "@/components/ui/Button/button"
import { Heading, type HeadingLevel } from "@/components/ui/Heading/heading"
import { cn } from "@/lib/utils"

type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>

interface SectionHeadingProps extends React.ComponentProps<"div"> {
  label?: string
  heading?: string
  headingLevel?: HeadingLevel
  text?: string
  variant?: "light" | "dark"
  buttonText?: string
  buttonLink?: { href: string; target?: string }
  buttonVariant?: ButtonVariant
}

function SectionHeading({
  className,
  label,
  heading,
  headingLevel = 2,
  text,
  variant = "light",
  buttonText,
  buttonLink,
  buttonVariant = "default",
  ...props
}: SectionHeadingProps) {
  if (!label && !heading && !text && !buttonText) return null

  return (
    <div data-slot="section-heading" className={className} {...props}>
      <div className="brand-grid gap-y-6">
        {label && (
          <p className="brand-eyebrow col-span-full text-center text-accent md:col-span-7 md:col-start-2 lg:col-span-8 lg:col-start-3">
            {label}
          </p>
        )}
        {heading && (
          <Heading
            level={headingLevel}
            className="col-span-full text-balance text-center md:col-span-7 md:col-start-2 lg:col-span-8 lg:col-start-3"
          >
            {heading}
          </Heading>
        )}
        {text && (
          <p
            className={cn(
              "brand-body1 col-span-full text-balance text-center lg:col-span-8 lg:col-start-3",
              {
                "text-[#3c3c3c]": variant === "light",
              },
            )}
          >
            {text}
          </p>
        )}
        {buttonText && (
          <div className="col-span-full mt-2 flex justify-center md:mt-4">
            {buttonLink?.href ? (
              <Button asChild variant={buttonVariant}>
                <a href={buttonLink.href} target={buttonLink.target}>
                  {buttonText}
                </a>
              </Button>
            ) : (
              <Button variant={buttonVariant}>{buttonText}</Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export { SectionHeading }
export type { SectionHeadingProps }
