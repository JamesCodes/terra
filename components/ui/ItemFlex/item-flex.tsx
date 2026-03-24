import { type ResponsiveProps, responsiveClass, responsiveStyles } from "@/lib/responsive-props"
import { cn } from "@/lib/utils"

interface ItemFlexProps
  extends React.ComponentProps<"div">,
    ResponsiveProps<{
      gap: number
      itemMaxWidth: number
      paddingTop: number
      paddingBottom: number
      itemAspectRatio: string
    }> {
  useAspectRatio?: boolean
  itemMaxWidthUnit?: "px" | "%"
}

function resolveCascade(base: number, tablet?: number, mobile?: number): [number, number, number] {
  const t = tablet == null || tablet === -1 ? base : tablet
  const m = mobile == null || mobile === -1 ? t : mobile
  return [base, t, m]
}

function calcMaxWidth(maxWidth: number, gapPx: number, unit: "px" | "%"): string {
  if (unit === "%") {
    const offset = (1 - maxWidth / 100) * gapPx
    return `calc(${maxWidth}% - ${offset}px)`
  }
  return `${maxWidth}px`
}

function ItemFlex({
  className,
  gap = 16,
  gapTablet,
  gapMobile,
  itemMaxWidth = 100,
  itemMaxWidthTablet,
  itemMaxWidthMobile,
  paddingTop = 0,
  paddingTopTablet,
  paddingTopMobile,
  paddingBottom = 0,
  paddingBottomTablet,
  paddingBottomMobile,
  itemAspectRatio,
  itemAspectRatioTablet,
  itemAspectRatioMobile,
  useAspectRatio = true,
  itemMaxWidthUnit = "px",
  style,
  children,
  ...props
}: ItemFlexProps) {
  const [gapBase, gapT, gapM] = resolveCascade(gap, gapTablet, gapMobile)
  const [mwBase, mwT, mwM] = resolveCascade(itemMaxWidth, itemMaxWidthTablet, itemMaxWidthMobile)

  return (
    <div
      data-slot="item-flex"
      style={
        {
          ...responsiveStyles({
            gap: [gap, gapTablet, gapMobile, "px"],
            pt: [paddingTop, paddingTopTablet, paddingTopMobile, "px"],
            pb: [paddingBottom, paddingBottomTablet, paddingBottomMobile, "px"],
          }),
          "--item-max-width": calcMaxWidth(mwBase, gapBase, itemMaxWidthUnit),
          "--item-max-width-tablet": calcMaxWidth(mwT, gapT, itemMaxWidthUnit),
          "--item-max-width-mobile": calcMaxWidth(mwM, gapM, itemMaxWidthUnit),
          ...(useAspectRatio
            ? responsiveStyles({
                "item-aspect-ratio": [itemAspectRatio ?? "", itemAspectRatioTablet, itemAspectRatioMobile],
              })
            : {}),
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        `flex w-full flex-row flex-wrap items-center justify-center ${responsiveClass("gap", "gap")} ${responsiveClass("pt", "pt")} ${responsiveClass("pb", "pb")} max-2xl:flex-wrap`,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { ItemFlex }
