import type { ComponentDecorator } from "@webflow/data-types"

/**
 * Wraps a slotted component in an absolutely positioned container
 * that fills its parent slot, giving the component real dimensions
 * inside Webflow's Shadow DOM.
 */
export const absoluteFillDecorator: ComponentDecorator<React.ComponentType<any>> =
  (Component) => (props) => {
    console.log({ Component })
    return (
      <div style={{ position: "absolute", inset: 0 }}>
        <Component {...props} />
      </div>
    )
  }

/**
 * Wraps logo components in a flex-row container inside
 * Webflow's Shadow DOM.
 */
export const logosDecorator: ComponentDecorator<React.ComponentType<any>> =
  (Component) => (props) => (
    <div>
      <Component {...props} />
    </div>
  )
