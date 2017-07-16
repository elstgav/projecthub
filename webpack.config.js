const path = require('path')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

module.exports = {
  context: __dirname,
  entry: './src/Application.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new LodashModuleReplacementPlugin(),
  ],
}
