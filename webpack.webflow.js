const path = require("node:path")

module.exports = {
  mode: "development",
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
}
