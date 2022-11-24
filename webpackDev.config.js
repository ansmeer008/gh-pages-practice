const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  mode: "development", //빼먹지 말자
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
    runtimeChunk: "single", //optimization 자체에 적용가능한 옵션인 것 같은데 기본적으로 multiple이고 single로 설정하면
    //The value 'single' instead creates a runtime file to be shared for all generated chunks.
    //https://webpack.js.org/configuration/optimization/#optimizationruntimechunk
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    static: "./dist",
  },
};
