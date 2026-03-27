import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface SiteNavSubLinkProps extends React.ComponentProps<"a"> {
  image?: { src: string; alt?: string }
  label?: string
}

function SiteNavSubLink({ image, label, className, ...props }: SiteNavSubLinkProps) {
  return (
    <a
      data-slot="site-nav-sub-link"
      className={cn("group flex flex-col gap-4 lg:min-w-0 lg:flex-1", className)}
      {...props}
    >
      {image && (
        <div className="overflow-hidden rounded-xl">
          <img
            src={image.src}
            alt={image.alt || ""}
            className="aspect-3/2 w-full object-cover transition-all duration-300 group-hover:opacity-90 md:aspect-2/1 lg:aspect-auto lg:h-56"
          />
        </div>
      )}
      {label && (
        <div className="flex items-center gap-2 transition-all group-hover:text-accent">
          <span className="font-medium text-xl lg:text-base">{label}</span>
          <ArrowRight className="size-5" />
        </div>
      )}
    </a>
  )
}

export { SiteNavSubLink }
