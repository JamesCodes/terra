export const NAV_LINK_EVENTS = {
  OPEN: "terra:nav-link-open",
  CLOSE_ALL: "terra:nav-link-close-all",
  MEASURE_NAV: "terra:nav-link-measure-nav",
} as const

export interface NavLinkOpenDetail {
  id: string
}

export interface NavMeasureDetail {
  rowBottom: number
  description?: string
  showCta?: boolean
  ctaLabel?: string
  ctaHref?: string
  ctaTarget?: string
}
