var webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Export main JS Object. Here we define the entry and the output key values
module.exports = {
  /**
   * 1. ENTRY POINTS
   * Here we define the entry and the output key values.
   * Note that webpack 4 is serving files from an 'src'
   * folder by default and outputs in a 'dist' folder.
   * Optional use of 'context to define main source path. 
   * In this case /src
 */
  context: path.join(__dirname, 'src'),
  entry: {
    app: './index.js'
  },
  devtool: 'inline-source-map',
  /**
   * 2. DEV-SERVER
   */
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    publicPath: '/',
    port: 8899,
    open: true,
    inline: true,
    hot: true
  },

  /**
   * 3. CSS AND JS OPTIM
   * https://github.com/webpack-contrib/mini-css-extract-plugin
   optimization: {
     minimize: true
    },
  */
  
  /** 
   * 4. LOADERS
   * Inside the rules array we can add as many loaders as we want. 
   * Every loader takes a 'test' attribute that accepts a regex as a value.
  */
  module: {
    // Exclude lagre libs for performance
    noParse: function (content) {
      return /jquery|lodash/.test(content)
    },
    rules: [
      // Babel loader
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'env']
          }
        }
      },
      // Html loader
      {
        test: /\.(html|htm)$/,
        use: [{
          loader: "html-loader",
          options: { minimize: true }
        }]
      },
      // Css loader
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          MiniCssExtractPlugin.loader, 
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
              importLoader: 2
            }
          },
        ]
      },
      // File loader - Images
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './img/',
              publicPath: './img/'
            }
          }
        ]
      },
      // File loader - Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  
  /**
   * 5. PLUGINS
  */
  plugins: [
    // Clean webpack
    new CleanWebpackPlugin(['dist']),
    // Html plugins
    new HtmlWebPackPlugin({
      template: "index.html",
      filename: "./index.html"
    }),
    // Css plugins
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    // HMR
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
  ],

  /**
   * 6. OUTPUT
   */
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
};
