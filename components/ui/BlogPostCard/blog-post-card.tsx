import type { PropType, PropValues } from "@webflow/data-types"
import type * as React from "react"
import { tv, type VariantProps } from "tailwind-variants"
import { Badge } from "@/components/ui/Badge/badge"
import { Button } from "@/components/ui/Button/button"
import { cn } from "@/lib/utils"

const blogPostCardVariants = tv({
  slots: {
    container: "flex text-foreground",
    imageWrap: "overflow-hidden",
    content: "flex grow flex-col",
    title: "transition-all hover:text-accent",
    description: "",
    meta: "brand-caption flex items-center gap-4",
    button: "inline-flex items-center justify-center self-start",
  },
  variants: {
    variant: {
      highlight: {
        container: "w-full flex-col gap-8 border-border max-md:border-t max-md:pt-6 max-md:pb-10",
        imageWrap: "aspect-3/2 rounded-lg",
        content: "gap-5",
        title: "brand-h3 text-balance",
        description: "brand-body2 hidden grow text-balance md:block",
        meta: "flex-row max-lg:md:flex-col max-lg:md:items-start max-lg:md:gap-0",
      },
      listing: {
        container: "h-full w-full flex-col gap-4 nth-[3n]:pr-0 nth-[3n+1]:pl-0",
        imageWrap: "aspect-video rounded-lg transition-all group-hover/story:opacity-70",
        content: "gap-5",
        title: "brand-h4 line-clamp-2 overflow-hidden text-balance transition-all",
        description: "hidden",
        meta: "flex-row max-lg:md:flex-col max-lg:md:items-start max-lg:md:gap-0",
        button: "mt-auto",
      },
      featured: {
        container: "flex-col items-start gap-10 md:flex-row",
        imageWrap: "aspect-17/10 shrink-0 rounded-3xl bg-secondary md:basis-3/5",
        content: "gap-5 md:basis-2/5",
        title: "brand-h2",
        description: "text-sm leading-normal",
        meta: "flex-row max-lg:md:flex-col max-lg:md:items-start max-lg:md:gap-0",
      },
      list: {
        imageWrap: "hidden",
        container: "p5-4 border-border border-b py-6 md:py-9 lg:py-10",
        content: "justify-between gap-4 md:flex-row md:items-center",
        description: "hidden",
        title:
          "brand-h5 w-full grow whitespace-normal text-left transition-colors md:line-clamp-1 md:w-full md:max-w-3/6 md:overflow-hidden lg:max-w-8/12 lg:pr-10",
        meta: "w-full shrink-0 md:max-w-2/6 lg:max-w-3/12 lg:justify-between",
        button: "hidden",
      },
    },
  },
  defaultVariants: {
    variant: "highlight",
  },
})

interface BlogPostCardProps
  extends React.ComponentProps<"article">,
    VariantProps<typeof blogPostCardVariants> {
  image?: { src: string; alt?: string }
  category?: { name: string; link?: PropValues[PropType.Link] }
  title: string
  description?: string
  author?: string
  date?: string
  href?: string
}

function BlogPostCard({
  className,
  variant,
  image,
  category,
  title,
  description,
  author,
  date,
  href,
  ...props
}: BlogPostCardProps) {
  const styles = blogPostCardVariants({ variant })
  const isLink = ["list", "listing", "featured"].includes(variant ?? "")

  const titleEl = (
    <h3
      className={styles.title()}
      data-floating-src={variant === "list" && image ? image.src : undefined}
      data-floating-alt={variant === "list" && image ? image.alt : undefined}
    >
      {title}
    </h3>
  )

  const metaEl = (author || date) && (
    <div data-slot="blog-post-meta" className={styles.meta()}>
      {author && <span className="font-bold">{author}</span>}
      {date && <span className="text-granite/75">{date}</span>}
    </div>
  )

  const innerContent = (
    <>
      <Button
        asChild
        variant="ghost"
        className="group/title contents cursor-pointer whitespace-normal font-normal"
      >
        <a href={href}>
          {titleEl}
          {metaEl}
        </a>
      </Button>
      {description && <p className={styles.description()}>{description}</p>}
      {href && <BlogPostLink href={href} className={styles.button()} />}
    </>
  )

  return (
    <article
      data-slot="blog-post-card"
      className={cn(styles.container(), { "group/story": isLink }, className)}
      {...props}
    >
      {image && (
        <div className={styles.imageWrap()}>
          <a href={href}>
            <img src={image.src} alt={image.alt ?? title} className="size-full object-cover" />
          </a>
        </div>
      )}
      <div className={styles.content()}>
        {category && (
          <div
            className={cn({
              "relative z-10 md:w-full md:max-w-1/6 lg:w-full lg:max-w-2/12": isLink,
            })}
          >
            <CategoryBadge name={category.name} url={category.link?.href} />
          </div>
        )}
        {innerContent}
      </div>
    </article>
  )
}

function CategoryBadge({ name, url }: { name: string; url?: string }) {
  const badge = <Badge>{name}</Badge>
  if (url) return <a href={url}>{badge}</a>
  return badge
}

function BlogPostLink({ href, className }: { href: string; className?: string }) {
  return (
    <a data-slot="blog-post-link" href={href} className={className}>
      <Button variant="outline" size="md">
        Read the full story
      </Button>
    </a>
  )
}

export { BlogPostCard, blogPostCardVariants }
