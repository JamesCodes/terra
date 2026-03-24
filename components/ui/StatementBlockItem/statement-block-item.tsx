import { Heading } from "@/components/ui/Heading/heading"
import { cn } from "@/lib/utils"

interface StatementBlockItemProps extends React.ComponentProps<"div"> {
  heading?: string
  description?: string
}

function StatementBlockItem({
  className,
  heading,
  description,
  ...props
}: StatementBlockItemProps) {
  return (
    <div
      data-slot="statement-block-item"
      className={cn(
        "col-span-full grid grid-cols-1 flex-col gap-4 md:col-span-7 md:col-start-2 md:grid-cols-2 lg:col-span-8 lg:col-start-3 lg:gap-6",
        className,
      )}
      {...props}
    >
      <div className="col-span-full border-black/10 border-t" />
      {heading && (
        <Heading level={3} className="text-accent">
          {heading}
        </Heading>
      )}
      {description && <p className="richtext-cast-body2 text-granite">{description}</p>}
    </div>
  )
}

export { StatementBlockItem }
