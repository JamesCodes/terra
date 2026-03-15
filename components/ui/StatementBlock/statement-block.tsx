import {
  type ResponsiveProps,
  responsiveClass,
  responsiveStyles,
  useResponsiveProp,
} from "@/lib/responsive-props"
import { cn } from "@/lib/utils"

type ObjectAlign = "top" | "center" | "bottom"

interface StatementBlockProps
  extends React.ComponentProps<"div">,
    ResponsiveProps<{
      imageHeight: number
    }> {
  image?: { src: string; alt?: string }
  objectAlign?: ObjectAlign
  objectAlignTablet?: ObjectAlign
  objectAlignMobile?: ObjectAlign
}

function StatementBlock({
  className,
  style,
  image,
  imageHeight = 807,
  imageHeightTablet,
  imageHeightMobile,
  objectAlign = "center",
  objectAlignTablet,
  objectAlignMobile,
  children,
  ...props
}: StatementBlockProps) {
  const resolvedAlign = useResponsiveProp(objectAlign, objectAlignTablet, objectAlignMobile)

  return (
    <div
      data-slot="statement-block"
      className={cn("flex flex-col gap-10 bg-background lg:gap-15", className)}
      style={style}
      {...props}
    >
      {children && <div className="page-grid gap-12">{children}</div>}

      {image?.src && (
        <img
          src={image.src}
          alt={image.alt ?? ""}
          className={cn("w-full object-cover", responsiveClass("h", "img-h"), {
            "object-top": resolvedAlign === "top",
            "object-center": resolvedAlign === "center",
            "object-bottom": resolvedAlign === "bottom",
          })}
          style={responsiveStyles({
            "img-h": [imageHeight, imageHeightTablet, imageHeightMobile, "px"],
          })}
        />
      )}
    </div>
  )
}

export { StatementBlock }
export type { ObjectAlign }
