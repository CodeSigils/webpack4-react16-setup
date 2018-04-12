module.exports = {
  /**
   * Babel loader
   * https://github.com/babel/babel-loader
   */
  JS_RULE: {
    test: /\.(js|jsx)$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      /**
       * Presets must be in this order. The 'stage-0' preset allows us
       * to use arrow functions inside the body of a class component.
       */
      options: {
        presets: ['react', 'env', 'stage-0'],
      },
    },
  },
  /**
   * Html loader
   * https://webpack.js.org/loaders/html-loader/
   */
  HTML_RULE: {
    test: /\.html$/,
    use: [
      {
        loader: 'html-loader',
        options: {
          minimize: true,
          removeComments: true,
          collapseWhitespace: true,
        },
      },
    ],
  },
  /**
   * Css loader - Exclude node_modules
   * https://webpack.js.org/loaders/css-loader/
   * - The postcss loader has a separate config file in project root.
   * - Webpack is reading the order of the plugins from right to left
   *   so in this setup "postcss-loader" will be loaded first.
   */
  CSS_RULE: {
    test: /\.css$/,
    exclude: /node_modules/,
    use: [
      { loader: 'style-loader' },
      {
        loader: 'css-loader',
        options: {
          /** Should be set to false for postcss to work */
          modules: false,
          sourceMap: true,
          minimize: true,
          importLoaders: 1,
        },
      },
      /**
       * Postcss loader
       * https://github.com/postcss/postcss-loader
       */
      {
        loader: 'postcss-loader',
        options: {
          config: { path: './postcss.config.js' },
        },
      },
    ],
  },
  /**
   * Sass loader - Include node_modules
   * https://webpack.js.org/loaders/sass-loader/
   */
  SASS_RULE: {
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'sass-loader',
        options: {
          includePaths: ['../src/start/css/**/*.scss'],
          include: /node_modules/,
        },
      },
    ],
  },
  /**
   * File loader - Images
   * https://webpack.js.org/loaders/file-loader/
   */
  FILE_RULE: {
    test: /\.(jpe?g|png|gif|svg|ico)$/i,
    exclude: /node_modules/,
    use: [
      {
        loader: 'file-loader',
        options: {
          limit: 80000,
          // name: '[name]-[hash:8].[ext]',
          name: '[name].[ext]',
          outputPath: './img/',
          publicPath: './img/',
        },
      },
    ],
  },
  // File loader - Fonts
  FONT_RULE: {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'fonts/[name]-[hash].[ext]',
        },
      },
    ],
  },
};
