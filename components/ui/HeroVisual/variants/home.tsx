import { ArrowDown, ArrowUp, Minus } from "lucide-react"
import { cn } from "tailwind-variants"
import TerraIcon from "@/components/icons/terra-icon.svg"
import { AnimatedIcon } from "@/components/ui/AnimatedIcon/animated-icon"

const findings = [
  {
    color: "#D13415",
    count: 5,
    label: "Critical Findings",
    badgeBg: "#FEEBE7",
    badgeBorder: "#FDBDAF",
    badgeText: "#D13415",
    Icon: ArrowUp,
    change: "15%",
  },
  {
    color: "#F2750E",
    count: 3,
    label: "High Findings",
    badgeBg: "#E6F6EB",
    badgeBorder: "#ADDDC0",
    badgeText: "#218358",
    Icon: ArrowDown,
    change: "8%",
  },
  {
    color: "#FFDB4E",
    count: 8,
    label: "Medium Findings",
    badgeBg: "#E6F6EB",
    badgeBorder: "#ADDDC0",
    badgeText: "#218358",
    Icon: ArrowDown,
    change: "4%",
  },
  {
    color: "#218358",
    count: 9,
    label: "Low Findings",
    badgeBg: "#F0F0F0",
    badgeBorder: "#E0E0E0",
    badgeText: "#646464",
    Icon: Minus,
    change: "0%",
  },
]
export function HomeVisual() {
  return (
    <>
      <div data-depth="0.5" className="absolute inset-0 transform-gpu">
        <div
          className={cn(
            "absolute items-center gap-4 rounded-3xl bg-magma",
            "top-12 -left-3 flex w-55.5 p-5",
            "md:top-30 md:left-20 md:w-71.5",
            "lg:top-12 lg:left-53 lg:w-86 lg:p-7",
          )}
        >
          <AnimatedIcon icon="target" speed={9.5} />
          <div className="flex flex-col justify-center">
            <p className="font-medium text-primary-foreground text-xs lg:text-sm">
              Signals Received
            </p>
            <p className="shrink font-medium text-[40px] text-chalk leading-tight lg:text-5xl">
              148
            </p>
          </div>
        </div>
      </div>

      <div data-depth="2.5" className="absolute inset-0 transform-gpu">
        <div
          className={cn(
            "gradient-border-diagonal absolute bg-glass shadow-2xl",
            "top-32 left-6.5 h-62.5 w-97.5",
            "md:top-54 md:left-1/2 md:h-72.5 md:w-102 md:-translate-x-1/2",
            "lg:top-35 lg:h-87 lg:w-122.5",
          )}
        >
          <div className="absolute top-0 left-0 z-10 h-full w-full p-10">
            <h3 className="font-medium text-[32px] text-chalk">Findings</h3>
            <span className="mt-2 inline-block rounded-full bg-chalk px-3 py-1.5 font-medium text-obsidian text-xs">
              Past 30 days
            </span>
          </div>

          <div className="absolute left-1/2 z-10 flex h-full w-full flex-col justify-center gap-2 md:gap-3">
            {findings.map((f) => (
              <div
                key={f.label}
                className="relative flex h-11 w-73.5 items-center gap-3 rounded-lg bg-white px-4 shadow-md md:h-13.5 md:rounded-xl"
              >
                <div
                  className="size-4 shrink-0 rounded-full md:size-5"
                  style={{ backgroundColor: f.color }}
                />
                <div className="min-w-0 flex-1 text-xs md:text-sm">
                  <span className="font-semibold text-neutral">{f.count}</span>
                  <span className="ml-1 text-neutral">{f.label}</span>
                </div>
                <div
                  className="absolute -right-6 flex shrink-0 items-center gap-1 rounded-full border px-2"
                  style={{ backgroundColor: f.badgeBg, borderColor: f.badgeBorder }}
                >
                  <f.Icon size={20} style={{ color: f.badgeText }} />
                  <span className="font-medium text-lg" style={{ color: f.badgeText }}>
                    {f.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* <div
            className={cn(
              "absolute rounded-full bg-[#6b1a00]/70 blur-[90px]",
              "bottom-0 left-0 size-83",
              "md:right-0 md:left-auto md:translate-x-1/2",
              "z-0 lg:size-105",
            )}
          /> */}
        </div>
      </div>

      <div data-depth="4" className="absolute inset-0 transform-gpu">
        <div
          className={cn(
            "gradient-border-pill absolute flex items-center gap-3 rounded-full bg-glass shadow-2xl",
            "top-71.5 -left-4 w-48 p-2",
            "md:top-34 md:-right-7 md:left-auto md:w-60 md:px-3 md:py-2.5",
            "lg:top-12 lg:-right-12 lg:w-71",
          )}
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent">
            <div className="size-6">
              <TerraIcon />
            </div>
          </div>
          <span className="grow font-medium text-chalk text-sm md:text-center md:text-xl">
            Explore Terrain
          </span>
        </div>
      </div>
    </>
  )
}
