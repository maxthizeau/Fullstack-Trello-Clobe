/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "node",
  // setupFilesAfterEnv: ["<rootDir>/tests/singleton.ts"],
  modulePaths: ["<rootDir>"],
  moduleDirectories: ["node_modules"],
  testPathIgnorePatterns: ["/node_modules/", "/__utils"],
}
