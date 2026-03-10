import { cn } from "@/lib/utils"

function ClientLogos({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="client-logos"
      className={cn(
        "flex flex-row items-center gap-3 overflow-x-auto scrollbar-hide justify-center h-22.5",
        className,
      )}
      {...props}
    />
  )
}

export { ClientLogos }
