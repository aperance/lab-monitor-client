const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

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
    new webpack.EnvironmentPlugin({DEMO: "false"}),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico"
    }),
    new webpack.HotModuleReplacementPlugin()
    // new webpack.DefinePlugin({
    //   "process.env.NODE_ENV": JSON.stringify("production")
    // })
  ],

  // devServer: {
  //   compress: true,
  //   hot: true,
  //   host: "192.168.1.117",
  //   port: 3000
  // },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js"]
  },
  mode: "development",

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      //{ test: /\.tsx?$/, loader: "awesome-typescript-loader" },

      {
        test: /\.(tsx?)|(js)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {enforce: "pre", test: /\.js$/, loader: "source-map-loader"}
    ]
  }
};
