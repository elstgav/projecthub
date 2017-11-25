const path = require('path')
const webpack = require('webpack')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')

const isProdEnvironment = (process.env.NODE_ENV === 'production')

module.exports = {
  cache:   true,
  devtool: isProdEnvironment ? 'source-map' : 'cheap-module-source-map',

  context: __dirname,

  entry: {
    app:     './src/Application.jsx',
    options: './src/Options.jsx',
  },

  output: {
    filename: '[name].bundle.js',
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

  plugins: (function configurePlugins() {
    let plugins = [
      new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
      new LodashModuleReplacementPlugin(),
    ]

    if (isProdEnvironment) {
      plugins = plugins.concat([
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.LoaderOptionsPlugin({
          debug:    false,
          minimize: true,
        }),
        new MinifyPlugin({}, {
          test: /\.(js|jsx)$/,
        }),
      ])
    }

    return plugins
  }()),
}
