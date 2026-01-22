import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { defineConfig as testConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    hmr: {
      host: "localhost",
      port: 5173,
    },
  },
});
export const test = testConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./testSetup.ts",
  },
});
