/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const GoogleFontsPlugin = require("@beyonk/google-fonts-webpack-plugin");
const CreateFileWebpack = require("create-file-webpack");

module.exports = {
  entry: "./src/index.tsx",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },

  mode: "development",

  devServer: {
    contentBase: "./dist",
    host: "0.0.0.0",
    port: 3000
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      DEMO: "false",
      BACKEND: "0.0.0.0:4000",
      VNC_DEMO_IP: "",
      VNC_PORT: "",
      VNC_PASSWORD: "",
      VNC_PASSWORD_ENC: ""
    }),
    new GoogleFontsPlugin({
      fonts: [{ family: "Roboto", variants: ["400", "500", "600", "700"] }]
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      title: "QA Lab Monitor"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CompressionPlugin()
  ],

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
        exclude: [path.resolve(__dirname, "./node_modules/zod")]
      }
    ]
  }
};

if (process.env.DEMO == "true") {
  module.exports.plugins.push(
    new CreateFileWebpack({
      path: "./dist",
      fileName: "log-demo.txt",
      content: "Demo log file."
    })
  );
}
