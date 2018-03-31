const webpack = require("webpack");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

// config() exposes 'env' to 'process.env' (see plugins section)
require("dotenv").config();

// Export main JS Object. Here we define the 'entry' and the 'output' values
module.exports = {
  /**
   * 1. ENTRY POINTS
   * Here we define the entry and the output key values.
   * Note that webpack 4 is serving files from an 'src'
   * folder by default and outputs in a 'dist' folder.
   * Optional use of 'context' key to define main source
   * path so we can avoid writing './src/index.js'
   */
  context: path.join(__dirname, "src"),
  entry: {
    // Older browsers polyfill support for 'fetch'
    app: ["whatwg-fetch", "./index.js"]
  },
  devtool: "inline-source-map",

  /**
   * 2. DEV-SERVER
   * https://webpack.js.org/configuration/dev-server/
   */
  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    contentBase: "/",
    compress: true,
    publicPath: "/",
    port: 8899,
    open: true,
    inline: true,
    hot: true,
    stats: {
      colors: true
    }
  },

  /**
 * 3. CSS AND JS OPTIM
 * We don't need for this dev demo, but necessary in production.
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
    // Exclude large libs for performance
    noParse: content => /jquery|lodash/.test(content),
    rules: [
      // Babel loader
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          /**
           * Presets must be in this order. The 'stage-0' preset.
           * allows us to use arrow functions inside the body of
           * a class component.
           */
          options: {
            presets: ["react", "env", "stage-0"]
          }
        }
      },
      // Html loader
      // https://webpack.js.org/loaders/html-loader/
      {
        test: /\.(html|htm)$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      // Css loader - Exclude node_modules
      // https://webpack.js.org/loaders/css-loader/
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: "[name]--[local]--[hash:base64:8]"
            }
          },
          "postcss-loader" // has separate config, see postcss.config.js nearby
        ],
        exclude: /node_modules/
      },
      // Sass loader - Include node_modules
      // https://webpack.js.org/loaders/sass-loader/
      {
        test: /\.(scss|sass)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
        include: /node_modules/
      },
      // File loader - Images
      // https://webpack.js.org/loaders/file-loader/
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              limit: 80000,
              name: "[name].[ext]",
              outputPath: "./img/",
              publicPath: "./img/"
            }
          }
        ],
        exclude: /node_modules/
      },
      // File loader - Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "fonts/[name]-[hash].[ext]"
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },

  /**
   * 5. PLUGINS
   */
  plugins: [
    // Html plugin
    // https://github.com/jantimon/html-webpack-plugin
    new HtmlWebPackPlugin({
      template: "index.html",
      filename: "./index.html"
    }),
    // Clean webpack
    new CleanWebpackPlugin(["dist"]),
    // HMR
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // Use '.env' file for global var definitions.
    // https://github.com/mrsteele/dotenv-webpack
    new Dotenv({
      path: "./.env",
      safe: false,
      systemvars: true
    }),
    // Register global vars to webpack for all the files
    // @return {string}
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(process.env.API_URL)
    })
  ],

  /**
   * 6. OUTPUT
   */
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "./"
  },
  resolve: {
    extensions: [".js", ".json", ".css"]
  }
};
