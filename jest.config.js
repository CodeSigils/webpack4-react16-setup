module.exports = {
  testRegex: './src/.*?(Spec)\\.js',
  modulePathIgnorePatterns: ['node_modules', 'dist'],
  testPathIgnorePatterns: ['__snapshots__'],
  /**
   * Jest by default will try to load a static asset as a real js package.
   * Every time we try to import a module inside a test that matches a regex,
   * load a mock file instead of loading the real package.
   */
  moduleNameMapper: {
    '\\.(jpg|jpeg|png)$': '<rootDir>/src/utils/fileMock.js',
  },
  setupFiles: ['<rootDir>/src/specs/index.js'],
};
