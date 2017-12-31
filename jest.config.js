module.exports = {
  setupFiles: [
    'mock-local-storage',

    './test/support/chrome',
    './test/support/enzyme',
  ],

  setupTestFrameworkScriptFile: './test/support/jest-environment',
}
