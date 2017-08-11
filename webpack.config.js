const path = require('path')
const webpack = require('webpack')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

const isProdEnvironment = (process.env.NODE_ENV === 'production')
const isDevEnvironment  = (process.env.NODE_ENV === 'development')

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
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new LodashModuleReplacementPlugin(),
    ]

    if (isProdEnvironment) {
      plugins = plugins.concat([
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.LoaderOptionsPlugin({
          debug:    false,
          minimize: true,
        }),
        new webpack.optimize.UglifyJsPlugin({
          beautify:  false,
          sourceMap: false,
          comments:  false,
          compress:  { warnings: false },
        }),
      ])
    }

    return plugins
  }()),
}
