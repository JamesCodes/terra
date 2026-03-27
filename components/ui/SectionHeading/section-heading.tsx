import type { VariantProps } from "tailwind-variants"
import { Button, type buttonVariants } from "@/components/ui/Button/button"
import { Heading, type HeadingLevel } from "@/components/ui/Heading/heading"
import { cn } from "@/lib/utils"

type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>

type TextAlign = "left" | "center" | "right"

interface SectionHeadingProps extends React.ComponentProps<"div"> {
  label?: string
  heading?: string
  headingLevel?: HeadingLevel
  text?: string
  textAlign?: TextAlign
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
  textAlign = "center",
  variant = "light",
  buttonText,
  buttonLink,
  buttonVariant = "default",
  ...props
}: SectionHeadingProps) {
  if (!label && !heading && !text && !buttonText) return null

  return (
    <div
      data-slot="section-heading"
      className={cn("text-center", className, {
        "lg:text-left": textAlign === "left",
        "lg:text-right": textAlign === "right",
      })}
      {...props}
    >
      <div className="brand-grid gap-y-6">
        {label && (
          <p
            className={cn("brand-eyebrow col-span-full text-accent md:col-span-7 md:col-start-2", {
              "lg:col-span-8 lg:col-start-3": textAlign === "center",
              "lg:col-span-full": textAlign !== "center",
            })}
          >
            {label}
          </p>
        )}
        {heading && (
          <Heading
            level={headingLevel}
            className={cn("col-span-full text-balance md:col-span-7 md:col-start-2", {
              "lg:col-span-8 lg:col-start-3": textAlign === "center",
              "lg:col-span-full": textAlign !== "center",
            })}
          >
            {heading}
          </Heading>
        )}
        {text && (
          <p
            className={cn("brand-body1 col-span-full text-balance", {
              "lg:col-span-8 lg:col-start-3": textAlign === "center",
              "lg:col-span-full": textAlign !== "center",
              "text-[#3c3c3c]": variant === "light",
            })}
          >
            {text}
          </p>
        )}
        {buttonText && (
          <div
            className={cn("col-span-full mt-2 flex justify-center md:mt-4", {
              "lg:justify-start": textAlign === "left",
              "lg:justify-end": textAlign === "right",
            })}
          >
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
export type { SectionHeadingProps, TextAlign }
