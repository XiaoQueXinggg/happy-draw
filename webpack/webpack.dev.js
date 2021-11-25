const config = require("./webpack.config.js");
const path = require("path");
const { merge } = require("webpack-merge");
module.exports = merge(config(), {
  mode: "development",
  entry: path.resolve(__dirname, "../index.js"),
  watch:true
});
