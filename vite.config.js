/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTest.js",
    css: true,
  },
  overrides: [
    {
      files: ["**/*.test.tsx"],
      env: { "jest/globals": true },
      extends: ["plugin:jest/recommended"],
      plugins: ["jest"],
      rules: {
        "@typescript-eslint/no-empty-function": "off",
      },
    },
  ],
});
