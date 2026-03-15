import type { ReactNode } from "react"
import SVG from "react-inlinesvg"
import { ItemFrame } from "@/components/ui/ItemFrame/item-frame"
import { cn } from "@/lib/utils"

interface ResponsiveImageProps {
  src: string
  alt?: string
  className?: string
}

function ResponsiveImage({ className, src, alt = "" }: ResponsiveImageProps) {
  const isSvg = src.endsWith(".svg")
  let imageEl: ReactNode

  if (isSvg) {
    imageEl = (
      <SVG
        src={src}
        title={alt}
        data-slot="image"
        className={cn("h-full max-h-full w-full max-w-full")}
      />
    )
  } else {
    imageEl = <img data-slot="image" src={src} alt={alt} className={cn("max-h-full max-w-full")} />
  }

  return (
    <ItemFrame className={cn("flex flex-row items-center justify-center", className)}>
      {imageEl}
    </ItemFrame>
  )
}

export { ResponsiveImage }
