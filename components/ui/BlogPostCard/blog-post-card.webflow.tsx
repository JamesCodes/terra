import { type PropType, type PropValues, props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import type React from "react"
import { BlogPostCard } from "./blog-post-card"

import "../../../app/globals.css"

export const variantMap = {
  Grid: "grid",
  Featured: "featured",
  List: "list",
} as const

export const propLabels = {
  layout: "Layout",
  category: "Category",
  title: "Title",
  description: "Description",
  author: "Author",
  date: "Date",
} as const

interface WebflowBlogPostCardProps {
  variant?: keyof typeof variantMap
  image?: PropValues[PropType.Image]
  category?: string
  title?: string
  description?: string
  author?: string
  date?: string
  link?: PropValues[PropType.Link]
  showImage?: boolean
}

const WebflowBlogPostCard: React.FC<WebflowBlogPostCardProps> = ({
  variant = "Grid",
  image,
  category,
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
      category={category}
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
  group: "Data Display",
  props: {
    variant: props.Variant({
      name: "Layout",
      options: ["Grid", "Featured", "List"],
      defaultValue: "Grid",
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
    category: props.Text({
      name: "Category",
      defaultValue: "Featured",
      group: "Content",
      tooltip: "Category badge label (e.g. Featured, Research)",
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
