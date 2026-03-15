import type * as React from "react"
import LinkedInIcon from "@/components/icons/linkedin.svg"
import { Heading } from "@/components/ui/Heading/heading"
import { ItemFrame } from "@/components/ui/ItemFrame/item-frame"
import { cn } from "@/lib/utils"

interface LeadershipCardProps extends React.ComponentProps<"div"> {
  image?: { src: string; alt?: string }
  name: string
  role?: string
  socialLink?: { href: string; target?: string }
}

function LeadershipCard({
  className,
  image,
  name,
  role,
  socialLink,
  ...props
}: LeadershipCardProps) {
  return (
    <ItemFrame
      data-slot="leadership-card"
      className={cn("flex w-full flex-col gap-4 md:gap-6", className)}
      {...props}
    >
      <div className="relative aspect-square w-full overflow-clip rounded-2xl bg-border md:rounded-3xl">
        {image && (
          <img
            src={image.src}
            alt={image.alt ?? name}
            className="absolute inset-0 size-full object-cover"
          />
        )}
        {socialLink && (
          <a
            href={socialLink.href}
            target={socialLink.target}
            className="absolute top-2.5 right-2.5 flex size-6 items-center justify-center rounded-full bg-black/30 md:top-4 md:right-4 md:size-8"
          >
            <LinkedInIcon className="size-2.5 fill-current text-white md:size-3" />
          </a>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <Heading level={5}>{name}</Heading>
        {role && <p className="brand-caption text-granite">{role}</p>}
      </div>
    </ItemFrame>
  )
}

export { LeadershipCard }
