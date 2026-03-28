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
        "flex w-full flex-row items-center gap-6 self-stretch max-lg:pb-6 max-ld:mx-auto lg:flex-col lg:pb-10",
        className,
      )}
      {...props}
    >
      <CheckIcon className="size-12 shrink-0 text-terracotta lg:size-16" />
      <p className="text-balance text-left font-serif text-lg leading-6 lg:text-center lg:text-[20px] lg:leading-7.5">
        {text}
      </p>
    </ItemFrame>
  )
}

export { CheckCard }
