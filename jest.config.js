module.exports = {
  setupFiles: [
    'mock-local-storage',
    'mutationobserver-shim',

    './test/support/chrome',
    './test/support/enzyme',
  ],

  setupTestFrameworkScriptFile: './test/support/jest-environment',
}
