import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import dts from "vite-plugin-dts"
import pkg from "./package.json" with { type: "json" }

export default defineConfig({
  plugins: [react(), tailwindcss(), dts({ tsconfigPath: "./tsconfig.json", include: ["src"] })],
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "src") },
  },
  build: {
    lib: {
      entry: path.resolve(import.meta.dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
      cssFileName: "owui",
    },
    rollupOptions: {
      // Hooks are used, so the bundle must be a client module for RSC frameworks.
      output: { banner: '"use client";' },
      external: [...Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies }).map((d) => new RegExp(`^${d}(/.*)?$`)), /^react\/jsx-runtime$/],
    },
  },
})
