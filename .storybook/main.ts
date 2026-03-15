import type { StorybookConfig } from "@storybook/nextjs-vite"
import svgr from "vite-plugin-svgr"

const config: StorybookConfig = {
  stories: ["../components/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["storybook-addon-grid-overlay"],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {
      image: {
        excludeFiles: ["**/*.svg"],
      },
    },
  },
  staticDirs: ["../public"],
  viteFinal(config) {
    config.plugins?.push(svgr({ include: "**/*.svg" }))
    return config
  },
}
export default config
