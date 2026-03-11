import type { ReactNode } from "react"
import SVG from "react-inlinesvg"
import { cn } from "@/lib/utils"

interface ImageProps extends React.ComponentProps<"img"> {
  src: string
  alt?: string
}

function Image({ className, src, alt = "", ...props }: ImageProps) {
  const isSvg = src.endsWith(".svg")
  let imgEl: ReactNode

  if (isSvg) {
    imgEl = (
      <SVG
        src={src}
        title={alt}
        data-slot="image"
        className={cn("max-w-full w-full h-auto", className)}
      />
    )
  } else {
    imgEl = (
      <img
        data-slot="image"
        src={src}
        alt={alt}
        className={cn("max-w-full w-full h-auto", className)}
      />
    )
  }
  return imgEl
}

export { Image }
