# React from scratch - React with Webpack, a step by step guide

A demo of basic (and some advanced) React concepts in a React app.
Also a webpack4 setup guide useful for development, with tips and some
necessary yet light reading along the way.

**★ Note:** No script automated React build will be used here. More and more notes and tips will be added in the future. Keep reading, or scroll to Webpack setup section.

**Table of Contents:**

<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

* [1. Setting-up the environment.](#1-setting-up-the-environment)
  * [Yarn package manager with Node version Manager](#yarn-package-manager-with-node-version-manager)
    * [1.1 - Install Yarn](#11---install-yarn)
    * [1.2 - Install NVM](#12---install-nvm)
    * [1.3 - NVM and Yarn path setup in your .zshrc:](#13---nvm-and-yarn-path-setup-in-your-zshrc)
    * [1.4 - Use of yarn: Initialize a project with `yarn init`.](#14---use-of-yarn-initialize-a-project-with-yarn-init)
    * [1.5 - Babel presets (Official and experimental) installation and setup](#15---babel-presets-official-and-experimental-installation-and-setup)
    * [1.6 - ES6 features quick review:](#16---es6-features-quick-review)
    * [1.7 - Adding scripts section in `package.json`](#17---adding-scripts-section-in-packagejson)
    * [1.8 - Handling Early versions of Node and older browsers](#18---handling-early-versions-of-node-and-older-browsers)
* [2. Code-Linting, Code-Formating and Git hooks](#2-code-linting-code-formating-and-git-hooks)
  * [2.1 - `Eslint` and `Prettier` plugins for VSCode](#21---eslint-and-prettier-plugins-for-vscode)
  * [2.2 - Bring all together](#22---bring-all-together)
* [3. Webpack4 setup and configuration](#3-webpack4-setup-and-configuration)
  * [3.1 - Intro to Webpack "module bundler" and its dependency graph](#31---intro-to-webpack-module-bundler-and-its-dependency-graph)
  * [3.2 - Installations](#32---installations)
  * [3.3 - Configurations](#33---configurations)
  * [3.4 - Run the project in browser](#34---run-the-project-in-browser)
  * [4. React](#4-react)
  * [5. Styling in React](#5-styling-in-react)
    * [5.1 - Setting Up PostCSS with BassCss.](#51---setting-up-postcss-with-basscss)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 1. Setting-up the environment.

### [Yarn package manager](https://yarnpkg.com/en/docs) with [Node version Manager](https://github.com/creationix/nvm)

#### 1.1 - Install Yarn

```sh
  # Add repo
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

  # Install with yarn included Node (see next line)
  sudo apt-get update && sudo apt-get install yarn

  # When NVM present avoid node installation with
  sudo apt-get install --no-install-recommends yarn
```

#### 1.2 - Install NVM

```sh
  # Get NVM the scary way
  wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```

#### 1.3 - NVM and Yarn path setup in your .zshrc:

```sh
  # NVM Node Version Manager
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

  # Yarn (must be placed after nvm)
  # export PATH=$HOME~/.yarn/bin:$PATH
  export PATH="$PATH:`yarn global bin`"
```

#### 1.4 - Use of yarn: Initialize a project with `yarn init`.

Run `yarn help` and read about global options for setup.

**★ Tip:** Yarn is ideal with `NVM` since is not forcing you to migrate your globally installed modules every time you change `Node` version.

#### 1.5 - Babel presets (Official and experimental) installation and setup

* Read about the [Babel](https://babeljs.io/) transpiler:
  [JavaScript Transpilers: What They Are & Why We Need Them](https://scotch.io/tutorials/javascript-transpilers-what-they-are-why-we-need-them)
* The **babel-cli:** Babel comes with a built-in CLI which can be used to compile files from the command line. Install it with: `yarn add babel-cli --dev`

* Read about [Babel presets](https://babeljs.io/docs/plugins/#presets).

  * **★ Tip:** **babel-preset-es2015 is deprecated**. Use `babel-preset-env` with `babel-preset-stage-0` instead. The `stage-0` allows experimental features.
  * The **babel-preset-env:** is all about latest stable JS features. It allows us to use 'const', 'import from', arrow functions and [many more](https://babeljs.io/docs/plugins/preset-env/) ...
    * Installation: `yarn add babel-preset-env --dev`
    - **★ Tip:** run it from terminal with `node ./node_modules/.bin/babel index.js -o ./bundle.js --presets=env`

* We are going to define Babel presets in webpack so we don't need the `.babelrc` file.

#### 1.6 - ES6 features quick review:

* ES6 modules: `import path from 'path'`
* Arrow functions: `a => a * 2`
* Classes: `class MyClass extends Framework.Class { }`
* Object literals:`{ foo }`
* Template Strings: `Foo ${bar}`
* Destructing: `({ a }) => { console.log(a) }`
* Let/Const: `const foo = 'Hello' let bar='World'`

#### 1.7 - Adding scripts section in `package.json`

People are using the "scripts" section of package.json file in all sorts of ways. There is also one famous article about how to replace build automation tools using only piped commands in scripts.

* **★ Tip:** Read about [How to Use npm as a Build Tool](https://www.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/)

```js
{
  "name": "webpack4-react16-setup",
  "version": "1.0.0",
  "description": "React ecosystem demo",
  // Note: Comments will not work on JSON files
  // Define scripts here and run them with "npm run ..." or "yarn"
  "scripts": {
    "serve":
      "webpack-dev-server --watch --config ./webpack.config.js --mode development",
    "dev": "webpack --mode development",
    "build": "webpack --mode production",
    "watch": "webpack --watch --mode development",
    "precommit": "pretty-quick --staged"
  },
  // ... Comments will not work on JSON files
}
```

#### 1.8 - Handling Early versions of Node and older browsers

---

## 2. Code-Linting, Code-Formating and Git hooks

Take a look at ESLint, "the pluggable linting utility for JavaScript and JSX"
in [eslint.org](https://eslint.org/).

Take a look at Prettier, "the opinionated code formatter" in [prettier.io](https://prettier.io/).

Take a look at [Husky](https://github.com/typicode/husky/tree/master)

#### 2.1 - `Eslint` and `Prettier` plugins for VSCode

Install Prettier and ESlint plugins from VSCode marketplace:

* [Prettier code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
* [Eslint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

#### 2.2 - Bring all together

**★ Tips:**

* There is a great YouTube video for [configuring lint, prettier and husky](https://www.youtube.com/watch?v=bfyI9yl3qfE). If you follow these instructions, every time you push to git your code will be evaluated and auto-formated.

* [Flow](https://flow.org/) is also very interesting. Read [Configure ESLint, Prettier, and Flow in VS Code for React Development](https://hackernoon.com/configure-eslint-prettier-and-flow-in-vs-code-for-react-development-c9d95db07213).

---

## 3. Webpack4 setup and configuration

#### 3.1 - Intro to Webpack "module bundler" and its dependency graph

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
  **★ Note:** Webpack dev server's cli have moved to `webpack-cli` in webpack4.
* Setting up a webpack plugin
* Getting everything ready to start writing React code.

#### 3.2 - Installations

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
  yarn add -D html-loader file-loader css-loader style-loader sass-loader node-sass postcss-loader

  # Webpack plugins
  yarn add -D html-webpack-plugin clean-webpack-plugin dotenv-webpack

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

#### 3.3 - Configurations

* → The **`webpack.config.js`** file.

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
   * Every loader takes a 'test' attribute (that accepts a regex as a value)
   * and some options.
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
           * Presets must be in this order. The 'stage-0' preset
           * allows us to use arrow functions inside the body of
           * a class component and must be mounted last.
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
    // Clean webpack plugin
    new CleanWebpackPlugin(["dist"]),
    // HMR - Native webpack plugins (no need for installation)
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    /**
     * Use '.env' file for global var definitions, and store sensitive data.
     * There is a '.env.sample' file in this repo that must be renamed to
     * '.env'.
     * Read carefully: https://github.com/mrsteele/dotenv-webpack
     */
    new Dotenv({
      path: "./.env",
      safe: false,
      systemvars: true
    }),
    // Register global vars to webpack for all the files.
    // Must return a string.
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

* → **The `package.json`** file. Here we can define our project dependencies, the scripts we want to run, the babel presets, browser support for auto-prefixer and many more...

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
    // ...
```

* → **The `.env` file.** Here we define sensitive data that we want webpack to process but we don't want to leave our machine. It is a good idea to add this file to `.gitignore`. Inside this repo the `.env.sample` file must be renamed to `.env`

```sh
# 2. ---- ./env ----
API_URL=http://reactrecipes.herokuapp.com
```

#### 3.4 - Run the project in browser

Rename `.env.sample` to `.env`, run `yarn serve` and watch the server in `localhost:8899`

### 4. React

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

### 5. Styling in React

Different approaches, one philosophy: "the real way to scale CSS, is to stop writing CSS". You are using JS anyway, so why not take advantage of the language to style your elements ?

* **Plain CSS:**
  Hard to maintain in large scale. Global naming, monolithic files, high coupling between components.

* **Inline styling:**
  Use of the style prop of React elements.

  * The good: CSS in JS
  * Tha bad: No reusable CSS. High coupling between markup and styles. Huge components.

* **CSS modules:**
  Treat a CSS file as one module using Webpack

  * The good: Component isolated CSS. No monolithic files with global scope.
  * The bad: No reusable CSS. Huge amount of files.

* **Styled components:**
  CSS in JS solution using ES6.

  * The good: CSS with JS in one file. Easy props based styles. Popular. Good for animation.
  * The bad: Hard to style components with many nested elements.
  * The ugly: Odd backtick syntax. Bloated files

* **Functional CSS with [BassCSS](http://basscss.com/):**
  CSS toolkit with extensible predefined classes: "The overwhelming majority of CSS you would need for your elements has already been written".

  * The good: Almost zero repetition. Enforces style-guide. Quick to prototype. PostCSS and CSSNext. Small(er) bundled file.
  * The bad: Hard to apply specific styles. Find and replace problem. Fixed units.
  * The ugly: Long less semantic classnames. Confusing at first.

* **Worth exploring:**

  * [Tachyons](https://devarchy.com/react/library/tachyons): Functional css for humans.
  * [Radium](https://devarchy.com/react/radium) is a set of tools to manage inline styles on React elements. It gives you powerful styling capabilities without CSS.
  * [Aphrodite](https://devarchy.com/react/Aphrodite): Inline Styles that work.
  * [Styletron](http://styletron.js.org)Universal, high-performance JavaScript styles.
  * [React-JSS](http://cssinjs.org/react-jss/?v=v8.4.0)

#### 5.1 - Setting Up PostCSS

The [PostCSS project](http://postcss.org/) is an amazing project that allows CSS transformations using JS. They also claim that PostCSS "transforms CSS specs into more compatible CSS so you don’t need to wait for browser support."
You can think that **PostCss is to CSS, what Babel is to JS**. It enable us to write CSSNext. **CSSNext is to CSS, what ES6 is to JS**: Use of future CSS features that are not yet supported by the browser.

Features: Automatic vendor prefixer with autoprefixer, custom properties and var(), nesting, many color functions and more...

**★ Tip:** There are many (more than 200) powerful [PostCSS plugins](https://www.postcss.parts/), some good learning sources out there and a [github tutorial](https://github.com/DavidWells/PostCSS-tutorial) by [David Wells](https://github.com/DavidWells)

* Install Autoprefixer, Postcss and postcss-loader for webpack.

  `yarn add -D autoprefixer postcss postcss-loader`

* Add some postcss plugins that will allow us som custom PostCSS transformations in basscss. Note that `classnames` library is not a postcss plugin but is a very useful CSS utility for React:

  `yarn add -D postcss-cssnext postcss-import classnames`

* Configure the **`postcss.config.js`** file:

```js
/* 2. ---- Create a ./postcss.config.js file ---- */
const postcssCssNext = require("postcss-cssnext");
const postcssImport = require("postcss-import");

module.exports = {
  plugins: [postcssCssNext, postcssImport]
};
```

#### 5.1 - Setting Up BassCSS
