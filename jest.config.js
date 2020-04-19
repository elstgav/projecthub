module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
  ],

  setupFiles: [
    'mock-local-storage',
    'mutationobserver-shim',

    '<rootDir>/test/support/chrome',
    '<rootDir>/test/support/enzyme',
  ],

  setupFilesAfterEnv: [
    '<rootDir>/test/support/jest-environment',
  ],

  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],

  testURL: 'https://localhost',
}
