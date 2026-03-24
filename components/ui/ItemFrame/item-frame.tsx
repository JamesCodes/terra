import { responsiveClass } from "@/lib/responsive-props"
import { cn } from "@/lib/utils"

function ItemFrame({ className, style, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-frame"
      className={cn(
        responsiveClass("max-w", "item-max-width"),
        responsiveClass("aspect", "item-aspect-ratio"),
        className,
      )}
      style={style}
      {...props}
    >
      {children}
    </div>
  )
}

export { ItemFrame }
