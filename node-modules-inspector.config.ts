import { defineConfig } from 'node-modules-inspector'

export default defineConfig({
  defaultFilters: {
    excludes: [
      'eslint',
      // 'webpack',
      // '@types',
    ],
  },
  defaultSettings: {
    moduleTypeSimple: true,
  },

  // Experimental publint.dev integration, default is false
  publint: true

  // ...see jsdoc for more options and details
})
