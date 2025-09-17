/// <reference types="vitest" />

import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from 'rollup-plugin-visualizer';
import { imagetools } from 'vite-imagetools';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    imagetools(),
    visualizer({ open: false, filename: "bundle-analysis.html" }), // Add this line
    viteCompression(),
  ],
  server: {
    port: 8080
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
  build: {
    minify: false,
  },
});
