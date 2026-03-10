import type * as React from "react"
import { tv, type VariantProps } from "tailwind-variants"
import { cn } from "@/lib/utils"

const blogPostCardVariants = tv({
  base: "flex text-foreground",
  variants: {
    variant: {
      grid: "flex-col gap-4",
      featured: "flex-col md:flex-row gap-10 items-center",
      list: "items-center justify-between gap-4 py-4 border-b border-border",
    },
  },
  defaultVariants: {
    variant: "grid",
  },
})

interface BlogPostCardProps
  extends React.ComponentProps<"article">,
    VariantProps<typeof blogPostCardVariants> {
  image?: { src: string; alt?: string }
  category?: string
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
  if (variant === "list") {
    return (
      <article
        data-slot="blog-post-card"
        className={cn(blogPostCardVariants({ variant }), className)}
        {...props}
      >
        <p className="font-serif text-lg">{title}</p>
        <div className="flex items-center gap-4 shrink-0 text-sm">
          {category && <span className="text-muted-foreground">{category}</span>}
          {date && <span className="text-muted-foreground">{date}</span>}
        </div>
      </article>
    )
  }

  if (variant === "featured") {
    return (
      <article
        data-slot="blog-post-card"
        className={cn(blogPostCardVariants({ variant }), className)}
        {...props}
      >
        {image && (
          <div className="md:basis-3/5 shrink-0 overflow-hidden rounded-3xl bg-secondary aspect-[17/10]">
            <img src={image.src} alt={image.alt ?? title} className="size-full object-cover" />
          </div>
        )}
        <div className="flex flex-col gap-5 md:basis-2/5">
          {category && (
            <span className="inline-flex items-center justify-center self-start rounded-full bg-secondary/50 px-3 py-1.5 text-xs font-medium">
              {category}
            </span>
          )}
          <h3 className="font-serif text-5xl leading-[58px]">{title}</h3>
          <BlogPostMeta author={author} date={date} />
          {description && <p className="text-sm leading-normal">{description}</p>}
          {href && <BlogPostLink href={href} filled />}
        </div>
      </article>
    )
  }

  // Default: grid variant
  return (
    <article
      data-slot="blog-post-card"
      className={cn(blogPostCardVariants({ variant }), className)}
      {...props}
    >
      {image && (
        <div className="overflow-hidden rounded-lg aspect-[3/2]">
          <img src={image.src} alt={image.alt ?? title} className="size-full object-cover" />
        </div>
      )}
      {category && (
        <span className="inline-flex items-center justify-center self-start rounded-full bg-secondary/50 px-3 py-1.5 text-xs font-medium">
          {category}
        </span>
      )}
      <h3 className="font-serif text-[28px] leading-[36px]">{title}</h3>
      <BlogPostMeta author={author} date={date} />
      {description && <p className="text-sm leading-relaxed">{description}</p>}
      {href && <BlogPostLink href={href} />}
    </article>
  )
}

function BlogPostMeta({ author, date }: { author?: string; date?: string }) {
  if (!author && !date) return null
  return (
    <div data-slot="blog-post-meta" className="flex items-center gap-4 text-xs">
      {author && <span className="font-bold">{author}</span>}
      {date && <span className="text-foreground/75">{date}</span>}
    </div>
  )
}

function BlogPostLink({ href, filled }: { href: string; filled?: boolean }) {
  return (
    <a
      data-slot="blog-post-link"
      href={href}
      className={cn(
        "inline-flex items-center justify-center self-start rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
        {
          "bg-accent text-background hover:bg-accent/90": filled,
          "border border-accent text-accent hover:bg-accent/10": !filled,
        }
      )}
    >
      Read the Full Story
    </a>
  )
}

export { BlogPostCard, blogPostCardVariants }
