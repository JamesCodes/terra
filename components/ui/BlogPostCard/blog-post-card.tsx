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
    title: "",
    description: "",
    meta: "brand-caption flex items-center gap-4",
  },
  variants: {
    variant: {
      highlight: {
        container:
          "w-full flex-col gap-8 nth-[3n]:pr-0 nth-[3n+1]:pl-0 max-lg:pb-10 md:px-5 lg:px-10",
        imageWrap: "aspect-3/2 rounded-lg",
        content: "gap-5 md:max-w-50 lg:max-w-85",
        title: "brand-h3 text-balance",
        description: "brand-body2 grow text-balance",
        meta: "flex-row max-lg:md:flex-col max-lg:md:items-start max-lg:md:gap-0",
      },
      listing: {
        container: "w-full flex-col gap-4 nth-[3n]:pr-0 nth-[3n+1]:pl-0 max-lg:pb-10",
        imageWrap: "aspect-video rounded-lg transition-all group-hover/story:opacity-70",
        content: "gap-5",
        title:
          "brand-h4 line-clamp-2 overflow-hidden text-balance transition-all group-hover/story:text-accent",
        description: "hidden",
        meta: "flex-row max-lg:md:flex-col max-lg:md:items-start max-lg:md:gap-0",
      },
      featured: {
        container: "flex-col items-center gap-10 md:flex-row",
        imageWrap: "aspect-17/10 shrink-0 rounded-3xl bg-secondary md:basis-3/5",
        content: "gap-5 md:basis-2/5",
        title: "font-serif text-5xl leading-14.5",
        description: "text-sm leading-normal",
        meta: "flex-row max-lg:md:flex-col max-lg:md:items-start max-lg:md:gap-0",
      },
      list: {
        imageWrap: "hidden",
        container: "p5-4 border-border border-b pb-9 lg:py-10",
        content: "justify-between gap-4 md:flex-row md:items-center",
        title:
          "brand-h5 w-full whitespace-normal text-left transition-colors group-hover/story:text-accent md:line-clamp-1 md:overflow-hidden",
        meta: "w-full shrink-0 md:max-w-1/6 lg:max-w-1/3 lg:justify-between",
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
  category?: { name: string; url?: string }
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
  const isLink = ["list", "listing"].includes(variant ?? "")

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
      {date && <span className="text-granite">{date}</span>}
    </div>
  )

  const innerContent = isLink ? (
    <Button asChild variant="ghost" className="contents cursor-pointer font-normal">
      <a href={href}>
        {titleEl}
        {metaEl}
      </a>
    </Button>
  ) : (
    <>
      {titleEl}
      {metaEl}
      {description && <p className={styles.description()}>{description}</p>}
      {href && <BlogPostLink href={href} />}
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
          <img src={image.src} alt={image.alt ?? title} className="size-full object-cover" />
        </div>
      )}
      <div className={styles.content()}>
        {category && (
          <div className={cn({ "relative z-10 md:max-w-41 lg:w-full": isLink })}>
            <CategoryBadge name={category.name} url={category.url} />
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

function BlogPostLink({ href }: { href: string }) {
  return (
    <a
      data-slot="blog-post-link"
      href={href}
      className="inline-flex items-center justify-center self-start"
    >
      <Button variant="outline" size="md">
        Read the Full Story
      </Button>
    </a>
  )
}

export { BlogPostCard, blogPostCardVariants }
