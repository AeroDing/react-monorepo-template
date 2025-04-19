import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index'
  ],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
    esbuild: {
      minify: true,
      target: 'es2020'
    }
  },
  externals: [
    'react',
    'react-dom',
    'antd',
    '@ant-design/icons',
    '@ant-design/cssinjs'
  ],
  hooks: {
    'rollup:options': (ctx, options) => {
      options.treeshake = true
    }
  }
})
