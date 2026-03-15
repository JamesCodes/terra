export const WAYPOINT_EVENTS = {
  REGISTER: "terra:waypoint-register",
  UNREGISTER: "terra:waypoint-unregister",
  ENTER: "terra:waypoint-enter",
  LEAVE: "terra:waypoint-leave",
} as const

export interface WaypointRegisterDetail {
  id: string
  label: string
  order: number
  element: HTMLElement
}

export interface WaypointIdDetail {
  id: string
}
