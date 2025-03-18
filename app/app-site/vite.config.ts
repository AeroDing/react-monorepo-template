import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react(), UnoCSS(), AutoImport({
    imports: [
      'react',
      'react-router-dom',
    ],
  })],
  server: {
    host: true,
    port: 3000,
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
    jsx: 'automatic',
  },
})
