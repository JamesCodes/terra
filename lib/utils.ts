import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

/**
 * Creates a label→value map from a TV variants group or a string array.
 * Values are the original keys; labels default to capitalized keys
 * but can be overridden for user-friendly names.
 *
 * @example
 * ```ts
 * // From TV variants object
 * createVariantMap<ButtonSize>(buttonVariants.variants.size, {
 *   sm: "Small", lg: "Large", icon: "Icon Only",
 * })
 *
 * // From a string array
 * createVariantMap<IconVariant>(iconVariants)
 * ```
 */
export function createVariantMap<T extends string>(
  variants: readonly string[] | Record<string, unknown>,
  labels?: Partial<Record<string, string>>,
): Record<string, T> {
  const keys = Array.isArray(variants) ? variants : Object.keys(variants)
  return Object.fromEntries(
    keys.map((key) => [labels?.[key] ?? capitalize(key), key]),
  ) as Record<string, T>
}
