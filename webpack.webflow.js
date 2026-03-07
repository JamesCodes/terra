const path = require("node:path")

module.exports = {
  mode: "development",
  resolve: {
    alias: {
      "@": path.resolve(process.cwd()), // Maps @ to the v4 app directory
    },
  },
}
