export const NAV_STATE_EVENTS = {
  STUCK_CHANGE: "terra:nav-stuck-change",
} as const

export interface NavStuckChangeDetail {
  stuck: boolean
}
