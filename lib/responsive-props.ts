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
type WebflowProps = typeof import("@webflow/data-types")["props"]
type WebflowPropFactory = WebflowProps[keyof WebflowProps]

type InferConfig<F> = F extends (config: infer C) => unknown ? C : never

type WithResponsiveDefault<C> = C extends { defaultValue?: infer D }
  ? Omit<C, "defaultValue"> & { defaultValue?: D | [base: D, tablet: D, mobile: D] }
  : C

export function responsiveProps<F extends WebflowPropFactory>(
  name: string,
  factory: F,
  config: WithResponsiveDefault<InferConfig<F>>,
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
  const probe = fn({ ...cfg, name: "__probe" } as Record<string, unknown>) as { type?: string }
  const isTextLike = probe.type === "Text" || probe.type === "RichText" || probe.type === "TextNode"
  const baseTooltip = cfg.tooltip as string | undefined
  const inheritHint = hasOptions
    ? "Set to Auto to inherit from the larger breakpoint"
    : isTextLike
      ? "Leave empty to inherit from the larger breakpoint"
      : "Set to -1 to inherit from the larger breakpoint"

  const rawDefault = cfg.defaultValue
  const defaultIsArray = Array.isArray(rawDefault)
  const baseDefault = defaultIsArray ? rawDefault[0] : rawDefault
  const bpDefaults = defaultIsArray
    ? { tablet: rawDefault[1], mobile: rawDefault[2] }
    : { tablet: undefined, mobile: undefined }

  const result: Record<string, Result> = {
    [name]: fn({ ...cfg, defaultValue: baseDefault, group }),
  }

  for (const bp of breakpoints) {
    const bpLabel = bp.charAt(0).toUpperCase() + bp.slice(1)
    const propKey = `${name}${bpLabel}`
    const tooltip = baseTooltip ? `${baseTooltip} (${bpLabel}). ${inheritHint}` : inheritHint

    if (hasOptions) {
      const opts = cfg.options as string[]
      result[propKey] = fn({
        ...cfg,
        name: bpLabel,
        options: [UNSET_VARIANT, ...opts],
        defaultValue: bpDefaults[bp] ?? UNSET_VARIANT,
        group,
        tooltip,
      })
    } else if (isTextLike) {
      const { defaultValue: _, ...rest } = cfg
      result[propKey] = fn({
        ...rest,
        name: bpLabel,
        group,
        defaultValue: bpDefaults[bp] ?? "",
        tooltip,
      })
    } else {
      const { defaultValue: _, ...rest } = cfg
      result[propKey] = fn({
        ...rest,
        name: bpLabel,
        group,
        min: UNSET_NUMBER,
        defaultValue: bpDefaults[bp] ?? UNSET_NUMBER,
        tooltip,
      })
    }
  }

  return result
}

type ResponsiveValue = number | string

export type ResponsiveProps<T extends Record<string, ResponsiveValue>> = {
  [K in keyof T]?: T[K]
} & {
  [K in keyof T as `${K & string}Tablet`]?: T[K]
} & {
  [K in keyof T as `${K & string}Mobile`]?: T[K]
}

function isUnset(value: unknown): boolean {
  return value === undefined || value === UNSET_NUMBER || value === "" || value === UNSET_VARIANT
}

function resolveValue(
  value: ResponsiveValue | undefined,
  fallback: ResponsiveValue,
): ResponsiveValue {
  if (value === undefined || value === UNSET_NUMBER || value === "") return fallback
  return value
}

function withUnit(value: ResponsiveValue, unit?: string): ResponsiveValue {
  if (unit && typeof value === "number") return `${value}${unit}`
  return value
}

/**
 * Returns inline CSS custom properties for responsive values.
 * Unset values (-1 for numbers, "" for strings) inherit from
 * the next larger breakpoint. An optional unit suffix (e.g. "px")
 * is appended to resolved numeric values after cascade resolution.
 *
 * @example
 * ```tsx
 * <div
 *   style={responsiveStyles({
 *     gap: [gap, gapTablet, gapMobile, "px"],
 *   })}
 *   className="gap-(--gap) max-lg:gap-(--gap-tablet) max-md:gap-(--gap-mobile)"
 * />
 * ```
 */
export function responsiveStyles(
  vars: Record<
    string,
    [base: ResponsiveValue, tablet?: ResponsiveValue, mobile?: ResponsiveValue, unit?: string]
  >,
): React.CSSProperties {
  const style: Record<string, ResponsiveValue> = {}

  for (const [name, [base, tablet, mobile, unit]] of Object.entries(vars)) {
    const resolvedTablet = resolveValue(tablet, base)
    style[`--${name}`] = withUnit(base, unit)
    style[`--${name}-tablet`] = withUnit(resolvedTablet, unit)
    style[`--${name}-mobile`] = withUnit(resolveValue(mobile, resolvedTablet), unit)
  }

  return style as React.CSSProperties
}

/**
 * Returns Tailwind classes that read a responsive CSS custom property
 * at each breakpoint. Pairs with `responsiveStyles()` which sets the vars.
 *
 * When adding a new var name, add a corresponding `@source inline`
 * declaration in `globals.css` so the Webflow PostCSS build generates
 * the CSS for the dynamic class names.
 *
 * @example
 * ```tsx
 * responsiveClass("gap", "gap")
 * // → "gap-(--gap) max-lg:gap-(--gap-tablet) max-md:gap-(--gap-mobile)"
 * ```
 */
export function responsiveClass(prop: string, varName: string) {
  return `${prop}-(--${varName}) max-lg:${prop}-(--${varName}-tablet) max-md:${prop}-(--${varName}-mobile)`
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
