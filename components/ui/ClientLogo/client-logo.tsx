import type { ReactNode } from "react"
import SVG from "react-inlinesvg"
import { cn } from "@/lib/utils"

interface ClientLogoProps {
  src: string
  alt?: string
  className?: string
}

function ClientLogo({ className, src, alt = "" }: ClientLogoProps) {
  const isSvg = src.endsWith(".svg")
  let logoEl: ReactNode

  if (isSvg) {
    logoEl = (
      <SVG
        src={src}
        title={alt}
        data-slot="image"
        preProcessor={(svg) => svg.replace(/fill="(?!none)[^"]*"/g, "")}
        className={cn("max-w-full w-full h-auto fill-current", className)}
      />
    )
  } else {
    logoEl = (
      <img
        data-slot="image"
        src={src}
        alt={alt}
        className={cn("max-w-full w-full h-auto", className)}
      />
    )
  }

  return <div className="w-37.5 h-22.5 shrink-0">{logoEl}</div>
}

export { ClientLogo }
