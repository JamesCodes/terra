import type { Preview } from "@storybook/nextjs-vite"
import "./fonts.css"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    gridOverlay: {
      columns: "var(--grid-columns)",
      gap: "var(--grid-gap)",
      gutter: "var(--grid-gutter)",
      maxWidth: "1440px",
      color: "rgba(255, 71, 132, 0.1)",
    },
    viewport: {
      options: {
        mobilePortrait: {
          name: "Mobile Portrait",
          styles: { width: "478px", height: "800px" },
          type: "mobile",
        },
        mobileLandscape: {
          name: "Mobile Landscape",
          styles: { width: "768px", height: "478px" },
          type: "mobile",
        },
        tablet: {
          name: "Tablet",
          styles: { width: "991px", height: "1024px" },
          type: "tablet",
        },
        desktop: {
          name: "Desktop",
          styles: { width: "1440px", height: "900px" },
          type: "desktop",
        },
        largeDesktop: {
          name: "Large Desktop",
          styles: { width: "1920px", height: "1080px" },
          type: "desktop",
        },
      },
    },
  },
}

export default preview
