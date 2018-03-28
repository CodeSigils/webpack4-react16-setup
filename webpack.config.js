const webpack = require('webpack');

// Export main JS Object. Here we define the entry and the output key values
module.exports = {
  entry: './index.js',
  output: {
    path: __dirname,
    filename: './bundle.js'
  },
  /** 
   * We can use Babel in Webpack defining a loader. Inside the rules array 
   * we can add as many loaders as we want. Every loader takes a 'test' 
   * attribute that accepts a regex as a value.
  */
  module: {
    rules: {
      // Babel loader
      test: /\.js$/,
      loader: 'babel-loader'
    }
  }
};
