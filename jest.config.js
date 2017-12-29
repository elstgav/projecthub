module.exports = {
  setupFiles: [
    'mock-local-storage',
    'raf/polyfill', // Request animation frame polyfill; required for React

    './test/support/chrome',
    './test/support/enzyme',
  ],
}
