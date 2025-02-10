module.exports = {
  rootDir: '.',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['<rootDir>/test/**/*.test.ts'],
  testEnvironment: 'node',
  restoreMocks: true,
  clearMocks: true,
  resetMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/{!(*.module|index|main),}.ts',
    '!src/**/database/**',
    '!src/**/entity/**',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/test/',
    '/config/',
    '/type/',
    '/error/',
    '/dto/',
  ],
  moduleNameMapper: {
    "^@user/(.*)$": "<rootDir>/src/user/$1",
    "^@content/(.*)$": "<rootDir>/src/content/$1",
    "^@company/(.*)$": "<rootDir>/src/company/$1"
  },
  coverageReporters: ['lcovonly', 'text'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}
