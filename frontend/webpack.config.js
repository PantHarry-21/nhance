const path = require('path');

module.exports = {
  entry: './src/main.jsx', // Ensure this is correct
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // Ensure this is the final bundled file
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    static: path.join(__dirname, 'public'),
    port: 3000,
  },
};
