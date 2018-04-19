module.exports = {
  testRegex: './src/.*?(Spec)\\.js',
  modulePathIgnorePatterns: ['node_modules', 'dist'],
  testPathIgnorePatterns: ['__snapshots__'],
  /**
   * We must tell Jest every time we try to import a module inside a test
   * that matches a regex, load a mock file instead of loading the real package.
   * This is because Jest does not understand static assets.
   */
  moduleNameMapper: {
    '\\.(jpg|jpeg|png)$': '<rootDir>/src/utils/fileMock.js',
  },
};
