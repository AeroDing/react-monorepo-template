// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'lib',
  react: true,
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },
  ignores: [
    // 依赖相关
    '**/node_modules/**',
    '**/dist/**',
    '**/.next/**',
    '**/coverage/**',
    '**/build/**',

    // 包管理相关
    '**/pnpm-lock.yaml',
    '**/package-lock.json',
    '**/yarn.lock',

    // 资源文件
    '**/*.svg',
    '**/*.png',
    '**/*.jpg',
    '**/*.jpeg',
    '**/*.gif',
    '**/*.ico',
    '**/*.webp',

    // 其他
    '**/.git/**',
    '**/.DS_Store',
    '**/.env*',
    '**/.vscode/**',
    '**/.idea/**',
    '**/.cursor/**',

    'app/*/src/icons/fonts',
    '**/*.d.ts',
  ],
  rules: {
    'react-refresh/only-export-components': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-console': 'warn',
    'ts/strict-boolean-expressions': 'off',
    'ts/no-floating-promises': 'off',
    'ts/no-unsafe-assignment': 'off',
    'ts/no-unsafe-member-access': 'off',
    'ts/promise-function-async': 'off',
    'ts/no-misused-promises': 'off',
    'style/comma-dangle': 'off',
  },
})
