const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const vueLoaderPlugin = require("vue-loader/lib/plugin");
const { resolve } = require("path");
module.exports = (env, args) => {
  return {
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "../dist"),
    },
    resolve: {
      alias: {
        vue$: "vue/dist/vue.esm.js",
        "^@": resolve(__dirname,"../src"),
      },
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|jpg|svg)$/i,
          use: {
            loader: "file-loader",
            options: {
              limit: 8916,
              name:"assets/images/[name].[ext]",
              esModule:false
            },
          },
        },
      ],
    },
    devServer: {
      static: [
        { directory: path.resolve(__dirname, "../dist"), publicPath: "/" },
      ],
      compress: true,
      port: 9000,
    },
    plugins: [
      new htmlWebpackPlugin({
        template: "index.html",
      }),
      new vueLoaderPlugin(),
    ],
  };
};
