/**
 * Converts a Webflow label-to-code map into a Storybook argType with
 * Title Case select options that map to code values.
 */
export function selectArg(
  name: string,
  map: Record<string, string | number>,
  defaultValue?: string,
) {
  return {
    name,
    control: "select" as const,
    options: Object.keys(map),
    mapping: map,
    ...(defaultValue != null ? { defaultValue } : {}),
  }
}

/**
 * Converts a Webflow Number prop config into a Storybook argType range control.
 */
export function numberArg(
  name: string,
  opts: { min?: number; max?: number; step?: number; defaultValue?: number },
) {
  return {
    name,
    control: {
      type: "range" as const,
      min: opts.min ?? 0,
      max: opts.max ?? 100,
      step: opts.step ?? 1,
    },
    ...(opts.defaultValue != null ? { defaultValue: opts.defaultValue } : {}),
  }
}

/**
 * Creates a Storybook boolean argType.
 */
export function booleanArg(name: string) {
  return { name, control: "boolean" as const }
}

/**
 * Creates a Storybook text argType.
 */
export function textArg(name: string) {
  return { name, control: "text" as const }
}
