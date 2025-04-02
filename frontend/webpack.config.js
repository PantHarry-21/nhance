const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/main.jsx', // Ensure this is correct
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // Ensure this is the final bundled file
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|mp4)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // ✅ Make sure this file exists
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, "public"),
    },
    port: 3000,
    historyApiFallback: true, // ✅ This fixes reload on /login, /signup, etc.
    open: true,
  },
  mode: "development", // or "production" if you're building
};
