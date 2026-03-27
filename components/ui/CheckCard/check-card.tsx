import CheckIcon from "@/components/icons/check.svg"
import { ItemFrame } from "@/components/ui/ItemFrame/item-frame"
import { cn } from "@/lib/utils"

interface CheckCardProps extends React.ComponentProps<"div"> {
  text: string
}

function CheckCard({ className, text, ...props }: CheckCardProps) {
  return (
    <ItemFrame
      data-slot="check-card"
      className={cn(
        "flex w-full flex-row items-center gap-4 self-stretch lg:flex-col lg:gap-6",
        className,
      )}
      {...props}
    >
      <CheckIcon className="size-16 shrink-0 text-terracotta" />
      <p className="brand-h5 text-balance text-left leading-6 lg:text-center lg:leading-8">
        {text}
      </p>
    </ItemFrame>
  )
}

export { CheckCard }
