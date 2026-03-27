import { props } from "@webflow/data-types"
import { declareComponent } from "@webflow/react"
import { LoadMore } from "./load-more"


export default declareComponent(LoadMore, {
  name: "Load More",
  description: "Progressively reveals items matching a selector, then links to an archive page",
  group: "Elements",
  options: { ssr: false },
  props: {
    loadMoreText: props.Text({
      name: "Load More Text",
      defaultValue: "Load More",
      tooltip: "Button label while there are more items to reveal",
    }),
    viewArchiveText: props.Text({
      name: "View Archive Text",
      defaultValue: "View Archive",
      tooltip: "Button label when all items are visible",
    }),
    pageSize: props.Number({
      name: "Page Size",
      defaultValue: 6,
      min: 1,
      max: 50,
      tooltip: "Number of items to reveal per click",
    }),
    link: props.Link({
      name: "Link",
      tooltip: "Archive page to navigate to when all items are loaded",
    }),
    targetSelector: props.Text({
      name: "Target List Selector",
      tooltip: "CSS selector for the list items to show/hide (e.g. .blog-list-item)",
    }),
  },
})
