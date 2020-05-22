const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const GoogleFontsPlugin = require("@beyonk/google-fonts-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin;

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    contentBase: "./dist",
    host: "0.0.0.0",
    port: 3000
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      DEMO: "false",
      BACKEND: "ws://0.0.0.0:4000",
      VNC_PROXY: "ws://0.0.0.0:5000",
      VNC_IP: "",
      VNC_PORT: "",
      VNC_PASSWORD: ""
    }),
    new GoogleFontsPlugin({
      fonts: [{family: "Roboto", variants: ["400", "500", "600", "700"]}]
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      title: "QA Lab Monitor"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CompressionPlugin()
    // new BundleAnalyzerPlugin()
  ],

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  mode: "development",

  module: {
    rules: [
      {
        test: /\.(tsx?)|(js)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {enforce: "pre", test: /\.js$/, loader: "source-map-loader"}
    ]
  }
};
