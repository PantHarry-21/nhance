const path = require('path');  // Use CommonJS 'require'

module.exports = {
  entry: './src/index.jsx',  // Main entry point for React app
  output: {
    filename: 'bundle.js',  // Output file name
    path: path.resolve(__dirname, 'dist'),  // Output directory
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,  // JavaScript/JSX files
        exclude: /node_modules/,
        use: 'babel-loader',  // Use Babel to transpile JSX
      },
      {
        test: /\.css$/,  // CSS files
        use: [
          'style-loader',  // Inject styles into the DOM
          'css-loader',    // Resolves CSS imports and dependencies
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],  // Resolve .js and .jsx extensions
  },
  devServer: {
    static: './dist',  // Serve files from the 'dist' folder
    port: 4000,  // Port for dev server
    open: true,  // Automatically open the browser
  },
};
