## React from scratch - A React workshop

Note: No automated React build will be used here.
A demo of basic (and some advanced) React concepts in a React app with a complete webpack4 setup for development.

### 1. Setting-up the environment.

* Use of yarn: How to initialize a project.
  Tip: Yarn is ideal with NVM since is not forcing you to migrate your globally installed modules every time you change Node version.
* Adding scripts section in `package.json`
* Babel presets installation setup (Official and experimental)

  * **babel-cli:** Babel comes with a built-in CLI which can be used to compile files from the command line.
    * Installation: `yarn add babel-cli --dev`
  * **babel-preset-es2015**: deprecated. Use env instead.
  * **babel-preset-env:** Latest stable and experimental JS features. It allows us to use 'const', 'import from' arrow functions and [many more](https://babeljs.io/docs/plugins/preset-env/) ...
    * Installation: `yarn add babel-preset-env --dev`
    - **Tip:** run it from terminal with `node ./node_modules/.bin/babel index.js -o ./bundle.js --presets=env`
  * We are going to define Babel presets in webpack so we don't need the `.babelrc` file.

* ES6 features quick review:
  * ES6 modules: `import path from 'path'`
  * Arrow functions: `a => a * 2`
  * Classes: `class MyClass extends Framework.Class { }`
  * Object literals:`{ foo }`
  * Template Strings: `Foo ${bar}`
  * Destructing: `({ a }) => { console.log(a) }`
  * Let/Const: `const foo = 'Hello' let bar='World'`
* Handling Early versions of Node and older browsers

---

#### Reference Links and Tips:

* 1.1 - The [Yarn package manager](https://yarnpkg.com/en/docs)

  * Installing Yarn on Debian

```sh
  # Add repo
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

  # Install with yarn included Node (see next line)
  sudo apt-get update && sudo apt-get install yarn

  # When NVM present avoid node installation with
  sudo apt-get install --no-install-recommends yarn
```

* Install [NVM, a Node version Manager](https://github.com/creationix/nvm)

  ```sh
    # Get NVM
    wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
  ```

* NVM and Yarn path setup in your .zshrc:

  ```sh
    # NVM Node Version Manager
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

    # Yarn (must be placed after nvm)
    # export PATH=$HOME~/.yarn/bin:$PATH
    export PATH="$PATH:`yarn global bin`"
  ```

* 1.2 - The [Babel](https://babeljs.io/) transpiler
  * [JavaScript Transpilers: What They Are & Why We Need Them](https://scotch.io/tutorials/javascript-transpilers-what-they-are-why-we-need-them)

---

### 2. Webpack4 setup and configuration

* Intro to Webpack "module bundler" and its dependency graph
* How webpack works
  * **Entry point:**
    Starting point of the graph. From here Webpack starts following the imports
    to form the rest of the graph.
  * **Output:**
    Explicit path (where to save the output bundle).
  * **Module:**
    Any file, whether a JS file, stylesheet, image, font, Markdown, etc.
  * **Loaders:**
    A transformation applied to a module through the bundling process.
  * **Plugins:**
    Apply transformations on parts of the bundle output.
  * Simple run from terminal:
    `node_modules/.bin/webpack ./entry-point.js ./output-file.js`
* How to install and configure Webpack: The `webpack.config.js` file.
* Integrating Babel into webpack using a loader
* Use of [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
  Note: Webpack dev server's cli have moved to `webpack-cli` in webpack4.
* Setting up a webpack plugin
* Getting everything ready to start writing React code

* **Installations**

  ```sh
    # Babel core
    yarn add -D babel-core babel-cli

    # Babel presets. Note 'babel-preset-es2015' is deprecated
    yarn add -D babel-preset-react babel-preset-env babel-preset-stage-0

    # Babel main loader
    yarn add babel-loader

    # Webpack and dev server:
    yarn add -D webpack webpack-cli webpack-dev-server

    # Additional Webpack loaders
    yarn add -D html-loader css-loader style-loader sass-loader node-sass

    # Autoprefixer and postcss
    yarn add -D autoprefixer postcss-loader && touch postcss.config.js

    # Webpack plugins
    yarn add -D html-webpack-plugin

    # Install React libraries
    yarn add -D react react-dom prop-types

    # Install dotenv for global environment variables definitions
    # Note: 'whatwg-fetch' polyfill is for older browsers 'fetch' support
    yarn add -D dotenv dotenv-webpack whatwg-fetch

    # Eslint with prettier plugin rules
    yarn add -D eslint eslint-config-prettier eslint-plugin-prettier

    # Use prettier only on staged files to git and only on changed files
    yarn add -D husky lint-staged prettier-quick
  ```

* **Configurations**
  The `webpack.config.js` file.

```js
/* 1. ---- ./webpack.config.js ---- */
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
   *  optimization: {
   *    minimize: true
   *  },
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
        use: ["style-loader", "css-loader", "postcss-loader"],
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
  }
};
```

The `package.json` file:

```js
/* 2. ---- ./package.json (scripts section) ---- */
  "scripts": {
        "serve": "webpack-dev-server --watch --config ./webpack.config.js --mode development",
        "dev": "webpack --mode development",
        "build": "webpack --mode production",
        "watch": "webpack --watch --mode development",
        "precommit": "pretty-quick --staged"
    },
    "babel": {
        "presets": ["react", "env"]
    },
    "browserslist": ["> 1%", "last 2 versions"],
```

The `postcss.config.js` file:

```js
/* 2. ---- ./postcss.config.js ---- */
module.exports = {
  plugins: [require("autoprefixer")]
};
```

Now, rename `.env.sample` to `.env`, run `yarn serve` and watch the server in localhost:8899

### 3. React

* Creating and mounting root component. About renderers.
* Functional and Class components
* Importing assets
* Compose components to create more complex UI
* Props: Read only data-types (strings, numbers, arrays, objects, classes...)
* Passing and collecting props, conditionals and common problems
* Prop-types in React
* Intro to fetch: A promised based web request mechanism
* Making async request in the component life cycle
* Use the state to make components dynamic

### 4. Styling

* Different approaches
* Functional CSS
* BassCSS
* Style guide

### 5. Code-Linting and Git

* Install `Eslint` and `Prettier` plugins for VSCode
* Clean code with `Prettier`, `prettier-quick` and git hooks with `husky`
  * **Tip:** There is a Great youtube video for [configuring lint, prettier and husky](https://www.youtube.com/watch?v=bfyI9yl3qfE). If you follow these instructions, every time you push to git your code will be evaluated and autoformated.
