export const ACCORDION_EVENTS = {
  OPEN: "terra:accordion-open",
} as const

export interface AccordionOpenDetail {
  id: string
  group: string
}
