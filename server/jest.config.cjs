module.exports = {
  testEnvironment: "node",

  // Detect only server tests
  testMatch: ["**/server/tests/**/*.test.cjs"],

  // ESM projects should disable transform entirely
  transform: {},

  setupFilesAfterEnv: ["./tests/setup.cjs"],
  roots: ["./tests"],
  testTimeout: 10000, // 10 seconds
};
