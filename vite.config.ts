import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // disable sourcemap in production so original sources are not exposed
    sourcemap: false,
    // use esbuild minifier (bundled) to avoid external terser dependency
    minify: 'esbuild',
    rollupOptions: {
      plugins: [],
    },
  },
})
