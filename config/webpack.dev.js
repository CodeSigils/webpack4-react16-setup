// Core - Plugins
const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

// Rules - moved to a separate file for readability
const appRules = require('./rules.js');

// Main directories - change if you move this file
const rootDir = '..';
const inDir = 'src';
const outDir = 'dist';

// Paths - Ports
const PATHS = {
  src: path.join(__dirname, `${rootDir}/${inDir}`),
  dist: path.resolve(__dirname, `${rootDir}/${outDir}`),
  serve: path.join(__dirname, `${rootDir}/${outDir}`),
  servePort: 8799,
};

// Vendors in separate bundle
const vendorLibs = ['react', 'react-dom', 'react-router-dom', 'prop-types'];

// config() exposes 'env' to 'process.env' (see plugins section)
require('dotenv').config();

/**
 * Export main JS Object. We name it CONFIG optionally for modularity.
 * Here we define the 'entry' and the 'output' values
 */
const CONFIG = {
  /**
   * 1. ENTRY POINT
   * Here we define the entry and the output key values. Note that webpack 4
   * is serving files from an 'src' by default and outputs in 'dist' folder.
   * Optional use of 'context' key to define main source path so we can avoid
   * writing './src/index.js'
   */
  context: PATHS.src,
  entry: {
    bundle: [
      // Older browsers polyfill support for 'fetch'
      'whatwg-fetch',
      /**
       * For hot reloading into an existing server without webpack-dev-server
       * add 'webpack-hot-middleware/client':
       */
      './index.js',
    ],
    vendor: vendorLibs,
  },
  devtool: 'inline-source-map',

  /**
   * 2. DEV-SERVER
   * https://webpack.js.org/configuration/dev-server/
   */
  devServer: {
    /**
     * Use historyApiFallback to redirect not found requests to index.html file
     * so we can use react-router instead of the build in express server.
     */
    historyApiFallback: {
      index: [`${outDir}/index`],
    },
    contentBase: PATHS.serve,
    watchContentBase: true,
    publicPath: `/${outDir}/`,
    port: PATHS.servePort,
    compress: true,
    progress: true,
    open: true,
    inline: true,
    hot: true,
    stats: {
      colors: true,
    },
  },

  /**
   * 4. LOADERS:
   * Rules are defined in './config/rules.js' file.
   * Inside the rules array we can add as many loaders as we want.
   * Every loader takes a 'test' attribute that accepts a regex as a value.
   */
  module: {
    /** Exclude large libs for performance */
    // noParse: content => /jquery|lodash/.test(content),
    rules: [
      appRules.JS_RULE,
      appRules.HTML_RULE,
      appRules.CSS_RULE,
      appRules.SASS_RULE,
      appRules.FILE_RULE,
      appRules.FONT_RULE,
    ],
  },

  /**
   * 5. PLUGINS
   */
  plugins: [
    // Clean webpack plugin
    new CleanWebpackPlugin([outDir]),
    /**
     * Html plugin
     * https://github.com/jantimon/html-webpack-plugin
     */
    new HtmlWebPackPlugin({
      template: 'index.html',
      favicon: 'favicon.ico',
      inject: 'body',
    }),
    /** HMR - Native webpack plugins (no need for installation) */
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    /**
     * Webpack gives our modules and chunks ids to identify them.
     * https://github.com/webpack/docs/wiki/optimization:
     */
    new webpack.optimize.OccurrenceOrderPlugin(),
    /**
     * Use '.env' file for global var definitions, and store sensitive data.
     * The '.env.sample' file in this repo that must be renamed to '.env'.
     * Read carefully: https://github.com/mrsteele/dotenv-webpack
     */
    new Dotenv({
      path: './.env',
      safe: false,
      systemvars: true,
    }),
    /**
     * Register global vars to webpack for all the files. Must return a string.
     */
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(process.env.API_URL),
    }),
  ],

  /**
   * 6. OUTPUT
   * https://webpack.js.org/configuration/output/
   */
  output: {
    filename: '[name].js',
    path: `${PATHS.dist}/`,
    sourceMapFilename: '[file].map',
    chunkFilename: '[name].js',
    publicPath: `/${outDir}/`,
  },
  resolve: {
    extensions: ['.js', '.json', '.css'],
  },
};

module.exports = CONFIG;
