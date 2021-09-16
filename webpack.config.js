const path = require("path");

module.exports = {
  mode: "development", // or production
  entry: {
    main: path.resolve(__dirname, "src/main.js"),
    // can add more than one file with names other than "main" if the project requires it
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    // filename: "[name].[contenthash].js",
    // // [contenthash] creates a unique git commit-like name for the js file in dist/ each time npm run build is executed
    // clean: true,
    // // setting clean to true empties old js files from dist/ on npm run build
  },
  devtool: "inline-source-map",
  devServer: {
    // contentBase: path.join(__dirname, "dist"),
    port: 5001, // default 8080
    open: true, // automatically open my default browser
    hot: true,
    // watchContentBase: true,
  },

  // Loaders
  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      // { test: /\.(woff|woff2)$/, use: { loader: "url-loader" } },
    ],
  },
  // Plugins
};
