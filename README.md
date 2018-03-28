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

    - NVM and Yarn setup path in your .zshrc:
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
  - Simple run from terminal: `node_modules/.bin/webpack ./entry-point.js ./output-file.js`
- How to configure Webpack
- Integrating Babel into webpack using a loader 
- Installation: 
  - `yarn add webpack --dev`

