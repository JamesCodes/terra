import { tv, type VariantProps } from "tailwind-variants"
import { Button } from "@/components/ui/Button/button"
import { ItemFrame } from "@/components/ui/ItemFrame/item-frame"
import { cn } from "@/lib/utils"

const ctaCardVariants = tv({
  base: "flex h-70 w-full flex-col items-start justify-between overflow-hidden rounded-3xl p-8 shadow-[0px_4px_54px_0px_rgba(0,0,0,0.05)] md:h-75 md:border md:border-primary/20 md:p-10",
  variants: {
    variant: {
      moss: "bg-moss",
      magma: "bg-magma",
    },
  },
  defaultVariants: {
    variant: "moss",
  },
})

interface CTACardProps
  extends Omit<React.ComponentProps<"div">, "children">,
    VariantProps<typeof ctaCardVariants> {
  title?: string
  description?: React.ReactNode
  buttonLabel?: string
  href?: string
  target?: string
}

function CTACard({
  className,
  variant,
  title,
  description,
  buttonLabel,
  href,
  target,
  ...props
}: CTACardProps) {
  return (
    <ItemFrame
      data-slot="cta-card"
      className={cn(ctaCardVariants({ variant }), className)}
      {...props}
    >
      <div className="flex flex-col gap-6">
        {title && (
          <h3 className="font-serif text-2xl text-chalk leading-8 md:text-[28px] md:leading-9">
            {title}
          </h3>
        )}
        {description && (
          <div className="text-chalk text-sm leading-[22px] md:text-base md:leading-6">
            {description}
          </div>
        )}
      </div>
      {buttonLabel && (
        <Button asChild={!!href}>
          {href ? (
            <a href={href} target={target}>
              {buttonLabel}
            </a>
          ) : (
            buttonLabel
          )}
        </Button>
      )}
    </ItemFrame>
  )
}

export { CTACard, ctaCardVariants }
