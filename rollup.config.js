import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

import packageJson from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      plugins: [terser()],
      sourcemap: true
    },
    {
      file: packageJson.module,
      format: 'esm',
      plugins: [terser()],
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
