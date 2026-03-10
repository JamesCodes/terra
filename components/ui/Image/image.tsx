import * as React from "react"
import { cn } from "@/lib/utils"

interface ImageProps extends React.ComponentProps<"img"> {
  src: string
  alt?: string
}

function Image({ className, src, alt = "", ...props }: ImageProps) {
  return (
    <img data-slot="image" src={src} alt={alt} className={cn("max-w-full", className)} {...props} />
  )
}

export { Image }
