import type * as React from "react"
import { ItemFrame } from "@/components/ui/ItemFrame/item-frame"
import { cn } from "@/lib/utils"

interface ImageCardProps extends React.ComponentProps<"div"> {
  image?: { src: string; alt?: string }
  useAspectRatio?: boolean
  aspectRatio?: string
  title: string
  showTitle?: boolean
}

function ImageCard({ className, image, useAspectRatio = true, aspectRatio, title, showTitle = true, ...props }: ImageCardProps) {
  return (
    <ItemFrame
      data-slot="image-card"
      className={cn(
        { "flex flex-col gap-4 self-stretch md:gap-6": useAspectRatio, contents: !useAspectRatio },
        className,
      )}
      {...props}
    >
      {image && (
        <div
          className={cn({ "overflow-hidden rounded-3xl": useAspectRatio, contents: !useAspectRatio })}
          style={useAspectRatio ? { aspectRatio: aspectRatio ?? "1/1" } : undefined}
        >
          <img
            src={image.src}
            alt={image.alt ?? title}
            className={cn({
              "size-full object-cover": useAspectRatio,
              "h-full shrink-0 rounded-3xl object-cover": !useAspectRatio,
            })}
          />
        </div>
      )}
      {showTitle && <h3 className="brand-h3">{title}</h3>}
    </ItemFrame>
  )
}

export { ImageCard }
export type { ImageCardProps }
