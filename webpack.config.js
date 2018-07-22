/**
 * Created by ktran on 12/26/2016.
 */
const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const outDir = `${__dirname}/dist`;

module.exports = {
  entry: {
    javascript: './app/App.tsx',
    vendor: ['react', 'react-dom', 'redux', 'react-redux'],
  },
  output: {
    path: outDir,
    filename: 'bundle.js',
    publicPath: '/dist',
    sourceMapFilename: '[file].map',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
    new ExtractTextPlugin('styles.css'),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader',
        }),
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: path.join(__dirname, 'app'),
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  devtool: 'source-map',
  devServer: {
    inline: true,
    port: 8080,
    contentBase: './',
  },
};
