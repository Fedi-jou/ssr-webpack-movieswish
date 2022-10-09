const path = require("path");
const webpack = require("webpack");
const config = require("dotenv").config();
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const isDevelopment = true;

const browserConfig = {
  mode: "production",
  entry: "./src/browser/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: "babel-loader" },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.json$/,
        use: "json-loader",
        type: "javascript/auto",
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({ ...process.env }),
    new webpack.DefinePlugin({
      process: { env: {} },
    }),
    new webpack.DefinePlugin({
      __isBrowser__: "true",
    }),
    new MiniCssExtractPlugin(),
  ],
};

const serverConfig = {
  mode: "production",
  entry: "./src/server/index.js",
  target: "node",
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js",
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: "babel-loader" },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "isomorphic-style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]",
              },
              sourceMap: isDevelopment,
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.json$/,
        use: "json-loader",
        type: "javascript/auto",
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      __isBrowser__: "false",
    }),
    new webpack.EnvironmentPlugin({ ...process.env }),
    new webpack.DefinePlugin({
      process: { env: {} },
    }),
  ],
};

module.exports = [browserConfig, serverConfig];
