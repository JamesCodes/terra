import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button/button"
import { Heading } from "@/components/ui/Heading/heading"
import { Input } from "@/components/ui/Input/input"
import { type ResponsiveProps, responsiveClass, responsiveStyles } from "@/lib/responsive-props"
import { cn } from "@/lib/utils"

interface CTABannerProps
  extends Omit<React.ComponentProps<"section">, "children" | "onSubmit">,
    ResponsiveProps<{
      height: number
    }> {
  heading?: string
  description?: string
  placeholder?: string
  theme?: "light" | "dark"
  backgroundImage?: { src: string; alt?: string }
  backgroundSize?: "cover" | "contain"
  backgroundPosition?: string
  backgroundPositionMobile?: string
  onSubmit?: (email: string) => void
}

function CTABanner({
  className,
  style,
  theme = "light",
  heading = "Be the first to experience the future of security.",
  description = "Secure your spot and join dozens of security teams that already enjoy the future of pentesting.",
  placeholder = "Email address",
  backgroundImage,
  backgroundSize = "cover",
  backgroundPosition = "center",
  backgroundPositionMobile,
  height,
  heightTablet,
  heightMobile,
  onSubmit,
  ...props
}: CTABannerProps) {
  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    onSubmit?.(email)
  }

  return (
    <section
      data-slot="cta-banner"
      className={cn(
        `relative flex flex-col items-center overflow-hidden px-5 py-16 md:px-20 md:py-24 ${responsiveClass("h", "height")}`,
        { "bg-secondary": theme === "light", "bg-[#370e02]": theme === "dark" },
        className,
      )}
      style={
        {
          ...(height != null
            ? responsiveStyles({
                height: [height, heightTablet, heightMobile, "px"],
              })
            : undefined),
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {backgroundImage?.src && (
        <img
          src={backgroundImage.src}
          alt={backgroundImage.alt ?? ""}
          className="pointer-events-none absolute inset-0 size-full select-none responsive-object-position"
          style={
            {
              objectFit: backgroundSize,
              objectPosition: backgroundPositionMobile ?? backgroundPosition,
              "--object-position-md": backgroundPosition,
            } as React.CSSProperties
          }
        />
      )}
      <div className="relative z-10 flex flex-col items-center gap-8">
        <Heading
          level={theme === "light" ? 1 : 2}
          className={cn("text-center", {
            "text-primary": theme === "light",
            "text-background": theme === "dark",
          })}
        >
          {heading}
        </Heading>
        <p
          className={cn("max-w-126.5 text-center text-lg", {
            "text-primary": theme === "light",
            "text-white": theme === "dark",
          })}
        >
          {description}
        </p>
        <form onSubmit={handleSubmit} className="relative w-77">
          <Input variant="inline" type="email" name="email" placeholder={placeholder} required />
          <Button
            type="submit"
            size="icon"
            className="absolute right-2 top-1/2 size-8 -translate-y-1/2"
          >
            <ArrowRight className="size-4" />
          </Button>
        </form>
      </div>
    </section>
  )
}

export { CTABanner }
