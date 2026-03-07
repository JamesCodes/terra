import type * as React from "react"
import { cn } from "@/lib/utils"
import { tv, type VariantProps } from "tailwind-variants"

const blogPostCardVariants = tv({
  base: "flex text-foreground",
  variants: {
    variant: {
      grid: "flex-col gap-4",
      featured: "flex-col md:flex-row gap-8 items-start",
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
          {category && (
            <span className="text-muted-foreground">{category}</span>
          )}
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
        <div className="flex flex-col gap-4 flex-1">
          {category && (
            <span className="inline-flex items-center justify-center self-start rounded-full bg-secondary/50 px-3 py-1.5 text-xs font-medium">
              {category}
            </span>
          )}
          <h3 className="font-serif text-4xl leading-tight">{title}</h3>
          <BlogPostMeta author={author} date={date} />
          {description && (
            <p className="text-sm leading-relaxed">{description}</p>
          )}
          {href && <BlogPostLink href={href} />}
        </div>
        {image && (
          <div className="flex-1 overflow-hidden rounded-lg">
            <img
              src={image.src}
              alt={image.alt ?? title}
              className="size-full object-cover"
            />
          </div>
        )}
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
          <img
            src={image.src}
            alt={image.alt ?? title}
            className="size-full object-cover"
          />
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

function BlogPostLink({ href }: { href: string }) {
  return (
    <a
      data-slot="blog-post-link"
      href={href}
      className="inline-flex items-center justify-center self-start rounded-full border border-accent px-5 py-2.5 text-sm font-semibold text-accent hover:bg-accent/10 transition-colors"
    >
      Read the Full Story
    </a>
  )
}

export { BlogPostCard, blogPostCardVariants }
