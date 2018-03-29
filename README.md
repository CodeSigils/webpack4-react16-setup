## React from scratch - A React workshop
Note: No automated React build will be used here.
A demo of basic (and some advanced) React concepts in a React app.

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

### 2. Webpack setup and configuration
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
    yarn add -D html-loader css-loader

    // Webpack plugins
    yarn add -D html-webpack-plugin mini-css-extract-plugin

    // Install React libraries
    yarn add -D react react-dom prop-types
  ```

- **Configurations**
```js
/* 1. ---- ./webpack.config.js ---- */
const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  /**
   * ENTRY POINTS
   * Here we define the entry and the output key values.
   * Note that webpack 4 is serving files from an 'src'
   * folder by default and outputs in a 'dist' folder.
   * Optional use of 'context to define main source path. 
   * In this case /src
 */
  context: path.join(__dirname, 'src'),
  entry: {
    filename: './index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './bundle.js'
  },
  /** 
   * LOADERS
   * Inside the rules array we can add as many loaders as we want. 
   * Every loader takes a 'test' attribute that accepts a regex as a value.
  */
  module: {
    rules: [
      // Babel loader
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      // Html loader
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      // Css loader
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  }, // End loaders
  
  // PLUGINS
  plugins: [
    // Html plugins
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    // Css plugins
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]

};

/* 2. ---- ./package.json (scripts section) ---- */
  "scripts": {
    "start": "webpack-dev-server --mode development --open",
    "dev": "webpack --mode development",
    "build": "webpack --mode production"
  },

/* 3. ---- ./.babelrc ---- */
{
  "presets": [
    "env",
    "react"
  ]
}

```
Now we can run `yarn start` and watch the server in localhost:8080

### 3. React
- Creating and mounting root component. About renderers.
- Functional and Class components
- Importing assets
- Compose components to create more complex UI
- Making async request in the component life cycle
- Use the state to make components dynamic
