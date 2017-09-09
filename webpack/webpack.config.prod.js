/**
 * Created by ktran on 4/14/2017.
 */
/**
 * Created by ktran on 12/26/2016.
 */
const path = require('path');
const webpack = require('webpack');

const outDir = `${__dirname}/../dist/app`;

module.exports = {
  entry: {
    javascript: './app/App.js',
    vendor: ['react',
      'react-dom'],
    html: './app/index.html',
  },
  output: {
    path: outDir,
    filename: 'bundle.js',
    publicPath: './app/components/assets/',
    sourceMapFilename: '[file].map',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    ],
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'app'),
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /\.css$/,

        loaders: ['style-loader',
          'css-loader',
        ],
      },
    ],
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx'],
  },
  debug: true,
  devtool: 'source-map',
  devServer: {
    inline: true,
    port: 8080,
  },
};
