const path = require("path");

module.exports = {
  mode: "development", // or "production"
  entry: {
    main: path.resolve(__dirname, "./src/index.js"),
    // scss: path.resolve(__dirname, "./src/scss/main.scss"),
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js",
    // clean: true, // // cleans out the /dist folder out whenever I run npm run build
  },
  devtool: "inline-source-map",
  // devServer: {
  //   contentBase: path.resolve(__dirname, "dist"),
  //   port: 5001, // default 8080
  //   open: true, // automatically open default browser when served
  //   hot: true, // hot reload
  //   watchContentBase: true,
  // },

  // loaders
  module: {
    rules: [
      // css & sass
      {
        test: /\.(s(a|c)ss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      // images
      { test: /\.(svg|ico|png|webp|jpg|jpeg)$/, type: "assets/resource" },
      // babel
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  // plugins
};
