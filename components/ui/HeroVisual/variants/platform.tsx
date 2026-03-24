import { ArrowDown, ArrowUp, Minus, TriangleAlert } from "lucide-react"
import type { HTMLAttributes, ReactNode } from "react"
import { cn, tv } from "tailwind-variants"
import TerraIcon from "@/components/icons/terra-icon.svg"
import PipelineChart from "./pipeline-chart.svg"

const Btn = ({ label, active = false }: { label: string; active: boolean }) => (
  <div
    className={cn(
      "flex h-3.5 items-center justify-center rounded-full px-2 py-0.5",
      "md:h-6.5 md:px-3 md:py-1",
      "lg:h-8 lg:px-4 lg:py-2",
      {
        "bg-chalk/25": active,
        "border border-chalk/30": !active,
      },
    )}
  >
    <span className="font-medium text-[5px] text-chalk md:text-[9px] lg:text-xs">{label}</span>
  </div>
)

const pillStyles = tv({
  slots: {
    container: "",
    text: "",
  },
  variants: {
    variant: {
      neutral: {
        container: "bg-chalk",
        text: "text-granite",
      },
      positive: {
        container: "bg-[#b8e4c6]",
        text: "text-[#218358]",
      },
    },
  },
})

const Pill = ({
  label,
  variant,
  className,
}: { label: string; variant: "neutral" | "positive" } & HTMLAttributes<HTMLDivElement>) => {
  const styles = pillStyles({ variant })
  return (
    <div
      className={cn(
        "absolute flex items-center gap-1.5 rounded-full px-3.5 py-1 shadow-lg md:h-8 lg:h-10",
        styles.container(),
        className,
      )}
    >
      {variant === "neutral" && <Minus className={cn("size-5 lg:size-7", styles.text())} />}
      {variant === "positive" && <ArrowDown className={cn("size-5 lg:size-7", styles.text())} />}
      <span className={cn("font-medium text-[#218358] text-base lg:text-[21px]", styles.text())}>
        {label}
      </span>
    </div>
  )
}

export function PlatformVisual() {
  return (
    <>
      <div data-depth="0.5" className="pointer-events-none absolute inset-0 z-10 transform-gpu">
        <div
          className={cn(
            "absolute",
            "top-78.25 left-7.5",
            "md:top-56 md:left-7.5",
            "lg:top-72.75 lg:left-32 lg:rounded-3xl",
          )}
        >
          <div
            className={cn(
              "relative flex flex-row overflow-hidden rounded-2xl bg-light-magma",
              "min-h-20.5 min-w-50.5 gap-3 px-4.5 py-5",
              "md:min-h-24 md:min-w-66 md:gap-3.5 md:px-5.5 md:py-6",
              "lg:min-h-31 lg:min-w-86 lg:gap-5 lg:p-8",
            )}
          >
            <p
              className={cn(
                "font-normal text-chalk",
                "text-[42px] leading-8",
                "md:text-[55px] md:leading-10.25",
                "lg:text-7xl lg:leading-13.5",
              )}
            >
              6
            </p>
            <div className="flex flex-col gap-1 md:gap-1.5">
              <p
                className={cn(
                  "whitespace-nowrap font-medium text-chalk",
                  "text-[9px] leading-3",
                  "mg:leading-[17px] md:text-xs",
                  "lg:text-base lg:leading-5",
                )}
              >
                Critical Findings
              </p>
              <div
                className={cn(
                  "flex w-fit items-center gap-0.5 rounded-full border border-terracotta bg-dark-terracotta/25",
                  "px-1.5 py-0.5",
                  "md:gap-1 md:px-2 md:py-1",
                )}
              >
                <ArrowUp className="size-3 text-terracotta md:size-4 lg:size-5" />
                <span className="font-medium text-[8px] text-terracotta md:text-xs lg:text-sm">
                  4%
                </span>
              </div>
            </div>
            <div
              className={cn(
                "absolute",
                "top-4 right-4",
                "md:top-5 md:right-4",
                "lg:top-7.5 lg:right-6",
              )}
            >
              <TriangleAlert className="size-4 text-chalk md:size-5 lg:size-7" />
            </div>
          </div>
        </div>
      </div>

      <div data-depth="2.5" className="pointer-events-none absolute inset-0 z-20 transform-gpu">
        <div
          className={cn(
            "gradient-border-diagonal absolute",
            "bg-glass shadow-2xl backdrop-saturate-100",
            "flex flex-col gap-2 p-4",
            "top-109 w-[calc(100%-24px)]",
            "left-1/2 -translate-x-1/2 md:top-82 md:w-[calc(100%-140px)] md:gap-4 md:rounded-3xl md:p-6",
            "lg:top-102 lg:w-184 lg:gap-4 lg:p-8",
          )}
        >
          <p
            className={cn(
              "relative z-10 whitespace-nowrap font-medium text-white",
              "text-sm md:text-xl lg:text-[32px]",
            )}
          >
            Signals Pipeline
          </p>

          {/* Timeframe pills */}
          <div className={cn("relative z-10 flex gap-1 md:gap-1.5 lg:gap-2")}>
            {["Past 30 days", "This week", "Today"]?.map((label, i) => (
              <Btn active={0 === i} label={label} key={label} />
            ))}
          </div>

          <div className={cn("relative z-10 rounded-lg bg-magma/65 md:rounded-xl lg:rounded-2xl")}>
            <PipelineChart />
          </div>

          <div data-depth="4" className="pointer-events-none absolute inset-0 z-20 transform-gpu">
            <Pill
              label="0%"
              variant="neutral"
              className="right-1/2 -bottom-7 max-md:-translate-x-2 md:right-0 md:bottom-1/3 md:translate-x-1/2"
            />
          </div>

          <div data-depth="4" className="pointer-events-none absolute inset-0 z-20 transform-gpu">
            <Pill
              label="8%"
              variant="positive"
              className="right-1/2 -bottom-9 max-md:translate-x-full md:right-0 md:bottom-[22%] md:translate-x-1/2"
            />
          </div>
        </div>
      </div>

      {/* <div data-depth="0.1" className="pointer-events-none absolute inset-0 z-10 transform-gpu">
        <div
          className={cn(
            "absolute rounded-full bg-[#6b1a00] blur-[90px]",
            "bottom-0 left-1/2 size-83 -translate-x-1/2",
            "z-0 lg:size-50",
          )}
        />
      </div> */}

      {/* Review Findings pill */}
      <div data-depth="3.5" className="pointer-events-none absolute inset-0 z-20 transform-gpu">
        <div
          className={cn(
            "gradient-border-pill absolute flex items-center gap-3 rounded-full bg-glass bg-linear-to-b from-chalk/40 to-chalk/0 shadow-2xl before:bg-linear-to-t",
            "top-106 right-2 w-47 gap-4 p-1.5",
            "md:top-92.5 md:right-8 md:w-60 md:gap-6.5 md:p-2",
            "lg:top-120 lg:right-10 lg:w-71 lg:gap-6.5 lg:p-2.5",
          )}
        >
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-terracotta md:size-9 lg:size-10.5">
            <div className="size-3.5 text-chalk md:size-4 lg:size-5">
              <TerraIcon />
            </div>
          </div>
          <span className="grow font-medium text-chalk text-sm md:text-base lg:text-xl">
            Review Findings
          </span>
        </div>
      </div>
    </>
  )
}
