import { type PropType, type PropValues, props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import { createVariantMap } from "@/lib/utils"
import { BlogPostCard, blogPostCardVariants } from "./blog-post-card"


type BlogPostCardVariant = NonNullable<
  import("tailwind-variants").VariantProps<typeof blogPostCardVariants>["variant"]
>

export const variantMap = createVariantMap<BlogPostCardVariant>(
  blogPostCardVariants.variants.variant,
)

export const propLabels = {
  layout: "Layout",
  title: "Title",
  description: "Description",
  author: "Author",
  date: "Date",
} as const

interface WebflowBlogPostCardProps {
  variant?: keyof typeof variantMap
  image?: PropValues[PropType.Image]
  categoryName?: string
  categoryUrl?: PropValues[PropType.Link]
  title?: string
  description?: string
  author?: string
  date?: string
  link?: PropValues[PropType.Link]
  showImage?: boolean
}

const WebflowBlogPostCard: React.FC<WebflowBlogPostCardProps> = ({
  variant = "Highlight",
  image,
  categoryName,
  categoryUrl,
  title = "Blog Post Title",
  description,
  author,
  date,
  link,
  showImage = true,
}) => {
  const mappedVariant = variantMap[variant]

  return (
    <BlogPostCard
      variant={mappedVariant}
      image={showImage && image?.src ? { src: image.src, alt: image.alt } : undefined}
      category={categoryName ? { name: categoryName, link: categoryUrl } : undefined}
      title={title}
      description={description}
      author={author}
      date={date}
      href={link?.href}
    />
  )
}

export default declareComponent(WebflowBlogPostCard, {
  name: "Blog Post Card",
  description:
    "A card for displaying blog post previews with image, category, title, author, and date",
  group: "Cards",
  props: {
    variant: props.Variant({
      name: "Layout",
      options: Object.keys(variantMap),
      defaultValue: Object.keys(variantMap)[0],
      tooltip:
        "Card layout style — Grid (image+content), Featured (side-by-side), or List (text row)",
    }),
    image: props.Image({
      name: "Image",
      group: "Media",
      tooltip: "The blog post cover image",
    }),
    showImage: props.Visibility({
      name: "Show Image",
      defaultValue: true,
      group: "Media",
      tooltip: "Toggle the cover image",
    }),
    categoryName: props.Text({
      name: "Primary Category",
      group: "Content",
      tooltip: "Category name — used as fallback when the Categories slot is empty",
    }),
    categoryUrl: props.Link({
      name: "Category URL",
      group: "Content",
      tooltip: "Link for the primary category badge",
    }),
    title: props.TextNode({
      name: "Title",
      defaultValue: "Blog Post Title",
      group: "Content",
      tooltip: "The post title — editable on the canvas",
    }),
    description: props.TextNode({
      name: "Description",
      defaultValue: "A brief summary of the blog post content.",
      multiline: true,
      group: "Content",
      tooltip: "The post excerpt — editable on the canvas",
    }),
    author: props.Text({
      name: "Author",
      defaultValue: "Author Name",
      group: "Meta",
      tooltip: "The post author name",
    }),
    date: props.Text({
      name: "Date",
      defaultValue: "January 1, 2026",
      group: "Meta",
      tooltip: "The publish date",
    }),
    link: props.Link({
      name: "Link",
      group: "Meta",
      tooltip: "Link to the full blog post",
    }),
  },
})
