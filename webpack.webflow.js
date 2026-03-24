const path = require("node:path")
const { Environment } = require("@webflow/data-types")

module.exports = (env) => ({
  mode: env === Environment.Client ? "production" : "development",
  devtool: env === Environment.Client ? "source-map" : false,
  resolve: {
    alias: {
      "@": path.resolve(process.cwd()), // Maps @ to the v4 app directory
    },
  },
  module: {
    rules: (existingRules) => [
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
        type: "javascript/auto",
        issuer: /\.[jt]sx?$/,
      },
      ...existingRules.map((rule) => {
        if (rule.test?.toString().includes("svg")) {
          return { ...rule, exclude: /\.svg$/i }
        }
        return rule
      }),
    ],
  },
})
