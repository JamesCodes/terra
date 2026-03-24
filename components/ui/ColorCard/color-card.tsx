import { tv, type VariantProps } from "tailwind-variants"
import { Button } from "@/components/ui/Button/button"
import { ItemFrame } from "@/components/ui/ItemFrame/item-frame"
import { cn } from "@/lib/utils"

const colorCardVariants = tv({
  slots: {
    container:
      "flex w-full flex-col items-start justify-between self-stretch overflow-hidden rounded-3xl p-8 shadow-card md:p-10",
    button: "",
  },
  variants: {
    variant: {
      moss: {
        container: "bg-moss",
        button: "default",
      },
      magma: {
        container: "bg-light-magma",
        button: "default",
      },
      terracotta: {
        container: "bg-terracotta",
        button: "dark",
      },
    },
  },
  defaultVariants: {
    variant: "moss",
  },
})

interface ColorCardProps
  extends Omit<React.ComponentProps<"div">, "children">,
    VariantProps<typeof colorCardVariants> {
  title?: string
  description?: React.ReactNode
  showButton?: boolean
  buttonLabel?: string
  href?: string
  target?: string
}

function ColorCard({
  className,
  variant,
  title,
  description,
  showButton = true,
  buttonLabel,
  href,
  target,
  ...props
}: ColorCardProps) {
  const styles = colorCardVariants({ variant })
  return (
    <ItemFrame data-slot="color-card" className={cn(styles.container(), className)} {...props}>
      <div
        className={cn("flex flex-col gap-6", {
          "grow justify-between": !showButton,
          "gap-6": showButton,
        })}
      >
        {title && (
          <h3 className="font-serif text-2xl text-chalk leading-8 md:text-[28px] md:leading-9">
            {title}
          </h3>
        )}
        {description && (
          <div className={cn("richtext-cast-body2 w-richtext text-chalk [&_p]:text-balance!")}>
            {description}
          </div>
        )}
      </div>
      {showButton && buttonLabel && (
        <Button
          asChild={!!href}
          theme={styles.button() as "default" | "dark"}
          className="mt-9 md:mt-15"
        >
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

export { ColorCard, colorCardVariants }
