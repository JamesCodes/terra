import type React from "react"
import { useSyncExternalStore } from "react"

const BREAKPOINTS = {
  tablet: "(max-width: 991px)",
  mobile: "(max-width: 767px)",
} as const

type Breakpoint = keyof typeof BREAKPOINTS

const UNSET_VARIANT = "Auto"
const UNSET_NUMBER = -1

type ResponsiveOptions = {
  breakpoints?: Breakpoint[]
  group?: string
}

/**
 * Generates breakpoint-specific Webflow props from a single prop definition.
 * Spread the result into the `props` object of `declareComponent`.
 *
 * For Variant props (detected by `options` in config), breakpoint overrides
 * get an "Auto" option prepended meaning "inherit from larger breakpoint."
 * For Number props, -1 means "inherit" — breakpoint overrides default to -1.
 *
 * @example
 * ```tsx
 * props: {
 *   ...responsiveProps("columns", props.Number, {
 *     name: "Columns",
 *     defaultValue: 3,
 *     min: 1,
 *     max: 12,
 *   }),
 * }
 * // → columns, columnsTablet, columnsMobile (grouped as "Columns")
 * ```
 */
type WebflowProps = (typeof import("@webflow/data-types"))["props"]
type WebflowPropFactory = WebflowProps[keyof WebflowProps]

export function responsiveProps<F extends WebflowPropFactory>(
  name: string,
  factory: F,
  config: F extends (config: infer C) => unknown ? C : never,
  options?: ResponsiveOptions,
): Record<string, F extends (...args: any[]) => infer R ? R : never> {
  type Result = F extends (...args: any[]) => infer R ? R : never

  const fn = factory as (config: Record<string, unknown>) => Result
  const cfg = config as Record<string, unknown>

  const breakpoints = options?.breakpoints ?? ["tablet", "mobile"]
  const propName = (config as { name: string }).name
  const configGroup = cfg.group as string | undefined
  const group = options?.group ?? (configGroup ? `${configGroup} - ${propName}` : propName)
  const hasOptions = "options" in cfg && Array.isArray(cfg.options)
  const baseTooltip = cfg.tooltip as string | undefined
  const inheritHint = hasOptions
    ? "Set to Auto to inherit from the larger breakpoint"
    : "Set to -1 to inherit from the larger breakpoint"

  const result: Record<string, Result> = {
    [name]: fn({ ...cfg, group }),
  }

  for (const bp of breakpoints) {
    const bpLabel = bp.charAt(0).toUpperCase() + bp.slice(1)
    const propKey = `${name}${bpLabel}`
    const tooltip = baseTooltip
      ? `${baseTooltip} (${bpLabel}). ${inheritHint}`
      : inheritHint

    if (hasOptions) {
      const opts = cfg.options as string[]
      result[propKey] = fn({
        ...cfg,
        name: bpLabel,
        options: [UNSET_VARIANT, ...opts],
        defaultValue: UNSET_VARIANT,
        group,
        tooltip,
      })
    } else {
      const { defaultValue: _, ...rest } = cfg
      result[propKey] = fn({
        ...rest,
        name: bpLabel,
        group,
        min: UNSET_NUMBER,
        defaultValue: UNSET_NUMBER,
        tooltip,
      })
    }
  }

  return result
}

type ResponsiveValue = number | string

function isUnset(value: unknown): boolean {
  return value === undefined || value === UNSET_NUMBER || value === "" || value === UNSET_VARIANT
}

function resolveValue(value: ResponsiveValue | undefined, fallback: ResponsiveValue): ResponsiveValue {
  if (value === undefined || value === UNSET_NUMBER || value === "") return fallback
  return value
}

/**
 * Returns inline CSS custom properties for responsive values.
 * Unset values (-1 for numbers, "" for strings) inherit from
 * the next larger breakpoint. Pair with Tailwind responsive
 * arbitrary value classes.
 *
 * @example
 * ```tsx
 * <div
 *   style={responsiveStyles({
 *     gap: [gap, gapTablet, gapMobile],
 *   })}
 *   className="gap-[var(--gap)] max-lg:gap-[var(--gap-tablet)] max-md:gap-[var(--gap-mobile)]"
 * />
 * ```
 */
export function responsiveStyles(
  vars: Record<string, [base: ResponsiveValue, tablet?: ResponsiveValue, mobile?: ResponsiveValue]>,
): React.CSSProperties {
  const style: Record<string, ResponsiveValue> = {}

  for (const [name, [base, tablet, mobile]] of Object.entries(vars)) {
    const resolvedTablet = resolveValue(tablet, base)
    style[`--${name}`] = base
    style[`--${name}-tablet`] = resolvedTablet
    style[`--${name}-mobile`] = resolveValue(mobile, resolvedTablet)
  }

  return style as React.CSSProperties
}

function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia(query)
      mql.addEventListener("change", callback)
      return () => mql.removeEventListener("change", callback)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/**
 * Returns the responsive value for the current viewport via JS.
 * Use for non-CSS values (Variant, structural props) where
 * CSS custom properties aren't sufficient.
 *
 * Unset values inherit from the next larger breakpoint:
 * base → tablet → mobile. On the server, returns the base value.
 *
 * @example
 * ```tsx
 * const layout = useResponsiveProp(layout, layoutTablet, layoutMobile)
 * ```
 */
export function useResponsiveProp<T>(base: T, tablet?: T, mobile?: T): T {
  const isTablet = useMediaQuery(BREAKPOINTS.tablet)
  const isMobile = useMediaQuery(BREAKPOINTS.mobile)

  if (isMobile) {
    if (!isUnset(mobile)) return mobile as T
    if (!isUnset(tablet)) return tablet as T
    return base
  }
  if (isTablet) {
    if (!isUnset(tablet)) return tablet as T
    return base
  }
  return base
}
