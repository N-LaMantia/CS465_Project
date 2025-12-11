import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    include: ["**/src/**/*.test.{js,ts,jsx,tsx}"], // matches all test files under src
    exclude: ["**/node_modules", "dist"], // optional
  },
});
