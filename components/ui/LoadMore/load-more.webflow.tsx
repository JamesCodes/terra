import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import { LoadMore } from "./load-more"


export default declareComponent(LoadMore, {
  name: "Load More",
  description: "Progressively reveals items matching a selector, with an optional archive link",
  group: "Elements",
  options: { ssr: false },
  props: {
    loadMoreText: props.Text({
      name: "Load More Text",
      defaultValue: "Load More",
      tooltip: "Button label while there are more items to reveal",
    }),
    showArchive: props.Boolean({
      name: "Show Archive Link",
      defaultValue: false,
      trueLabel: "Show",
      falseLabel: "Hide",
      tooltip: "Show an archive link once all items are visible",
    }),
    viewArchiveText: props.Text({
      name: "View Archive Text",
      defaultValue: "View Archive",
      tooltip: "Button label when all items are visible",
      group: "Archive",
    }),
    pageSize: props.Number({
      name: "Page Size",
      defaultValue: 6,
      min: 1,
      max: 50,
      tooltip: "Number of items to reveal per click",
    }),
    link: props.Link({
      name: "Archive Link",
      tooltip: "Archive page to navigate to when all items are loaded",
      group: "Archive",
    }),
    targetSelector: props.Text({
      name: "Target List Selector",
      tooltip: "CSS selector for the list items to show/hide (e.g. .blog-list-item)",
    }),
  },
})
