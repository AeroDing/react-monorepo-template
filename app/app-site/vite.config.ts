import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react(), UnoCSS(), svgr(), AutoImport({
    dts: 'src/types/auto-imports.d.ts',
    include: [
      /\.ts$/,
      /\.tsx$/,
    ],
    imports: [
      'react',
      'react-router-dom',
      'ahooks',
      {
        '@/icons/IconFont': [
          'IconFont',
        ],
      },
      {
        '@/icons': [
          'Icon',
        ],
      },
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
