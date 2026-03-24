import { cn } from "tailwind-variants"
import TerraIcon from "@/components/icons/terra-icon.svg"

const Btn = ({ label }: { label: string }) => (
  <div
    className={cn(
      "flex h-3.5 items-center justify-center rounded-full bg-chalk/20 px-2 py-0.5",
      "md:h-6.5 md:px-3 md:py-1",
      "lg:h-8 lg:px-4 lg:py-2",
    )}
  >
    <span className="font-medium text-[5px] text-chalk md:text-[9px] lg:text-xs">{label}</span>
  </div>
)

export function PortalVisual() {
  return (
    <>
      {/* Signals Pipeline card */}
      <div data-depth="2.5" className="absolute inset-0 transform-gpu">
        <div
          className={cn(
            "gradient-border-diagonal absolute",
            "bg-glass shadow-2xl backdrop-blur-3xl backdrop-brightness-95 backdrop-saturate-110",
            "flex flex-col gap-2 p-4",
            "top-90 left-3 w-[calc(100%-24px)]",
            "md:top-72 md:left-1/2 md:w-120 md:-translate-x-1/2 md:gap-4 md:px-8 md:py-7",
            "lg:top-80 lg:left-1/2 lg:w-148.75 lg:-translate-x-1/2 lg:px-10 lg:py-8",
          )}
        >
          <p
            className={cn(
              "whitespace-nowrap font-medium text-white",
              "text-sm md:text-[22px] lg:text-[32px]",
            )}
          >
            Hello, how can I help?
          </p>

          <div
            className={cn(
              "relative bg-magma",
              "h-16 rounded-[12px] p-4 text-[10px] text-chalk/60",
              "md:h-26.25 md:text-sm",
              "lg:h-33 lg:rounded-3xl lg:p-7 lg:text-lg",
            )}
          >
            Investigate padding oracle via token decryption
            <div
              className={cn(
                "absolute right-2 bottom-2 flex size-5.5 items-center justify-center rounded-full bg-accent",
                "md:size-8.5",
                "lg:right-4 lg:bottom-4",
              )}
            >
              <div className="size-2.5 md:size-4.5 lg:size-5.5">
                <TerraIcon />
              </div>
            </div>
          </div>

          {/* Timeframe pills */}
          <div className={cn("flex gap-1 md:gap-1.5 lg:gap-2")}>
            {["Bug findings", "Critical leaks", "Security vulnerabilities"]?.map((label) => (
              <Btn label={label} key={label} />
            ))}
          </div>

          <div
            className={cn(
              "pl-1 font-mono text-[8px] text-chalk leading-4.5 md:text-xs md:leading-7 lg:text-base lg:leading-9",
            )}
          >
            &gt;_Writing file...
            <br />
            &gt;_Listing directory...
            <br />
            &gt;_Reading file...
          </div>
        </div>

        <div data-depth="3" className="absolute inset-0 transform-gpu">
          <div
            className={cn(
              "gradient-border-pill absolute flex items-center gap-3 rounded-full rounded-br-none bg-glass bg-linear-to-b from-[#6F2F1C]/20 to-[#E65C32]/20 shadow-2xl before:rounded-br-none before:bg-linear-to-t",
              "top-136 right-0 gap-2 px-4.5 py-4",
              "md:top-140 md:right-20 md:gap-2.5 md:px-5 md:py-4",
              "lg:top-161.5 lg:right-35 lg:gap-2.5 lg:px-6 lg:py-5.5",
            )}
          >
            <span className="grow font-medium text-chalk text-sm md:text-base lg:text-xl">
              Analyze token decryption
            </span>
          </div>
        </div>

        <div data-depth="3.5" className="absolute inset-0 transform-gpu">
          <div
            className={cn(
              "gradient-border-pill absolute flex items-center gap-3 rounded-full rounded-bl-none bg-glass bg-linear-to-b from-[#6F2F1C]/50 to-[#E65C32]/40 shadow-2xl before:rounded-bl-none before:bg-linear-to-t",
              "top-152 left-8 gap-2 px-4.5 py-4",
              "md:top-160 md:right-40 md:left-auto md:gap-2.5 md:px-5 md:py-4",
              "lg:top-184 lg:right-40 lg:gap-2.5 lg:px-6 lg:py-5.5",
            )}
          >
            <div className="size-3.5 text-chalk md:size-4 lg:size-5">
              <TerraIcon />
            </div>
            <span className="grow font-medium text-chalk text-sm md:text-base lg:text-xl">
              Checking the existing context file
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
