## React from scratch - A React workshop
Note: No automated React build will be used here.
A demo of basic (and some advanced) React concepts in a React app with a complete development webpack4 setup.

### 1. Setting-up the environment.
- Use of yarn: How to initialize a project. 
  Tip: Yarn is ideal with NVM.
- Adding scripts section in `package.json`
- Babel presets installation setup (Official and experimental)
  * **babel-cli** installation: `yarn add babel-cli --dev`
  * **babel-preset-es2015** installation: **deprecated**
  * **babel-preset-env** installation: `yarn add babel-preset-env --dev`
  * **Tip:** run it with `node ./node_modules/.bin/babel index.js -o ./bundle.js --presets=env`
  * The `.babelrc` file

- ES6 features quick review:
  * ES6 modules: `import path from 'path'`
  * Arrow functions: `a => a * 2`
  * Classes: `class MyClass extends Framework.Class { }`
  * Object literals:`{ foo }`
  * Template Strings: `Foo ${bar}`
  * Destructing: `({ a }) => { console.log(a) }`
  * Let/Const: `const foo = 'Hello' let bar='World'`
- Handling Early versions of Node and older browsers

---
#### Reference Links and Tips: 
- 1.1 - The [Yarn package manager](https://yarnpkg.com/en/docs)

    - Installing Yarn on Debian
    ```sh
      # Add repo
      curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
      echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

      # Install
      sudo apt-get update && sudo apt-get install yarn

      # When NVM present avoid node installation with
      sudo apt-get install --no-install-recommends yarn
    ```

    - Install [NVM, a Node version Manager](https://github.com/creationix/nvm) 
      ```sh
        # Get NVM
        wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
      ```

    - NVM and Yarn path setup in your .zshrc:
      ```sh
        # NVM Node Version Manager
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
        [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

        # Yarn (must be placed after nvm)
        # export PATH=$HOME~/.yarn/bin:$PATH
        export PATH="$PATH:`yarn global bin`"
      ```

- 1.2 - The [Babel](https://babeljs.io/) transpiler
  - [JavaScript Transpilers: What They Are & Why We Need Them](https://scotch.io/tutorials/javascript-transpilers-what-they-are-why-we-need-them)
---

### 2. Webpack4 setup and configuration
- Intro to Webpack "module bundler" and its dependency graph
- How webpack works
  - **Entry point:** 
    Starting point of the graph. From here Webpack starts following the imports
    to form the rest of the graph.
  - **Output:** 
    Explicit path (where to save the output bundle).
  - **Module:** 
    Any file, whether a JS file, stylesheet, image, font, Markdown, etc.
  - **Loaders:** 
    A transformation applied to a module through the bundling process.
  - **Plugins:** 
    Apply transformations on parts of the bundle output.
  - Simple run from terminal: 
    `node_modules/.bin/webpack ./entry-point.js ./output-file.js`
- How to install and configure Webpack: The `webpack.config.js` file.
- Integrating Babel into webpack using a loader 
- Use of [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
  Note: Webpack dev server's cli have moved to `webpack-cli` in webpack4.
- Setting up a webpack plugin
- Getting everything ready to start writing React code

- **Installations**
  ```js
    // Babel core
    yarn add -D babel-core babel-cli
    
    // Babel presets. Note 'babel-preset-es2015' is deprecated
    yarn add -D babel-preset-env babel-preset-react

    // Babel main loader
    yarn add babel-loader
    
    // Webpack and dev server:
    yarn add -D webpack webpack-cli webpack-dev-server

    // Additional Webpack loaders
    yarn add -D html-loader css-loader style-loader sass-loader node-sass postcss-loader

    // Webpack plugins
    yarn add -D html-webpack-plugin

    // Install React libraries
    yarn add -D react react-dom prop-types
  ```

- **Configurations**
```js
/* 1. ---- ./webpack.config.js ---- */
var webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");

// Export main JS Object. Here we define the 'entry' and the 'output' values
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
    // contentBase: path.join(__dirname, 'dist'),
    contentBase: '/',
    compress: true,
    publicPath: '/',
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
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/
      },
      // Sass loader - Include node_modules
      {
        test:/\.(scss|sass)$/,
        use:['style-loader','css-loader','sass-loader'],
        include: /node_modules/
      },
      // File loader - Images
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit:80000,
              name: '[name].[ext]',
              outputPath: './img/',
              publicPath: './img/'
            }
          }
        ],
        exclude: /\/node_modules\//,
      },
      // File loader - Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'fonts/[name]-[hash].[ext]'
          }
        }],
        exclude: /node_modules/
      }
      
    ]
  },
  
  /**
   * 5. PLUGINS
  */
  plugins: [
    // Html plugins
    new HtmlWebPackPlugin({
      template: "index.html",
      filename: "./index.html"
    }),
    // Clean webpack
    new CleanWebpackPlugin(['dist']),
    // HMR
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],

  /**
   * 6. OUTPUT
   */
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './'
  }
};

/* 2. ---- ./package.json (scripts section) ---- */
  "scripts": {
        "serve": "webpack-dev-server --watch --config ./webpack.config.js --mode development",
        "dev": "webpack --mode development",
        "build": "webpack --mode production",
        "watch": "webpack --watch --mode development"
    },
    "babel": {
      "presets": [
          "react",
          "env"
      ]
    },
    "standard": {
      "parser": "babel-eslint"
    },

```
Now we can run `yarn serve` and watch the server in localhost:8899

### 3. React
- Creating and mounting root component. About renderers.
- Functional and Class components
- Importing assets
- Compose components to create more complex UI
- Props: Read only data-types (strings, numbers, arrays, objects, classes...)
- Passing and collecting props, conditionals and common problems
- Prop-types in React
- Intro to fetch: A promised based web request mechanism
- Making async request in the component life cycle
- Use the state to make components dynamic
