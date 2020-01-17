const path = require('path')

module.exports = {
  rootDir: path.join(__dirname, '..'),
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/*.test.*'],
  moduleDirectories: [
    'node_modules',
    __dirname,
    path.join(__dirname, '../'),
  ],
  coverageDirectory: path.join(__dirname, '../coverage'),
  collectCoverageFrom: [
    '**//*.tsx',
    '**//*.ts',
  ],
  coveragePathIgnorePatterns: ['.*/__tests__/.*'],
  setupFilesAfterEnv: [require.resolve('./setup-env')],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupFilesAfterEnv: ["<rootDir>/test/setupEnzyme.ts"],
}
