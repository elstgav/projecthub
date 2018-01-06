module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
  ],

  setupFiles: [
    'mock-local-storage',
    'mutationobserver-shim',

    './test/support/chrome',
    './test/support/enzyme',
  ],

  setupTestFrameworkScriptFile: './test/support/jest-environment',

  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
}
