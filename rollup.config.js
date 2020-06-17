import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

import packageJson from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [
    resolve({
      browser: true,
      extensions: ['.mjs', '.js', '.jsx', '.json']
    }),
    commonjs({
      include: ['node_modules/**'],
      exclude: ['**/*.test.js']
    })
  ]
}
