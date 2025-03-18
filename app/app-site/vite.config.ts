import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), AutoImport({
    imports: [
      'react',
      'react-router-dom',
    ],
  })],
  server: {
    port: 3000,
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
    jsx: 'automatic',
  },
})
