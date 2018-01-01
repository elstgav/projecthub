const path = require('path')
const webpack = require('webpack')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const isProdEnvironment = (process.env.NODE_ENV === 'production')

module.exports = {
  cache:   true,
  devtool: isProdEnvironment ? false : 'cheap-module-source-map',

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
      new webpack.optimize.CommonsChunkPlugin({ name: 'common' }),
    ]

    if (process.env.ANALYZE_WEBPACK_BUNDLE) {
      plugins = [
        ...plugins,
        new BundleAnalyzerPlugin(),
      ]
    }

    if (isProdEnvironment) {
      plugins = [
        ...plugins,

        new webpack.optimize.OccurrenceOrderPlugin(),

        new webpack.LoaderOptionsPlugin({
          debug:    false,
          minimize: true,
        }),

        new MinifyPlugin({}, {
          test: /\.(js|jsx)$/,
        }),
      ]
    }

    return plugins
  }()),
}
