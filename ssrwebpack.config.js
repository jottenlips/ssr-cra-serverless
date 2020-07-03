const path = require("path");
const slsw = require("serverless-webpack");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const { isEmpty } = require("ramda");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new CopyPlugin([{ from: "../build", to: "build" }]),
  ],
  entry: { ...slsw.lib.entries, localServer: "./localServer.js" },
  mode: "development",
  name: "server",
  devtool: "nosources-source-map",
  target: "node",
  // externals: [nodeExternals()],
  watch: true,
  output: {
    libraryTarget: "commonjs2",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js",
    sourceMapFilename: "[file].map",
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      components: path.resolve(__dirname, "src/*"),
      "react-native$": "react-native-web",
    },
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)/,
        loader: "babel-loader",
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "server"),
        ],
        options: {
          plugins: ["babel-plugin-styled-components"],
          presets: [
            "babel-preset-expo",
            // '@babel/preset-typescript',
            "module:metro-react-native-babel-preset",
          ],
        },
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: "graphql-tag/loader",
      },
      {
        test: /\.json/,
        loader: "json-loader",
        type: "javascript/auto",
      },
      {
        test: /\.(css)/,
        use: ["css-loader"],
      },
      {
        test: /\.(ttf|eot|otf|svg|png)$/,
        loader: "file-loader",
      },
      {
        test: /\.(woff|woff2|otf)$/,
        loader: "url-loader",
      },
    ],
  },
};
