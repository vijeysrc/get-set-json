const path = require('path')
const webpack = require('webpack')
const PrettierPlugin = require('prettier-webpack-plugin')
const getPackageJson = require('./scripts/getPackageJson')
const prettierConfig = require('./prettier.config')

const { version, name, license, repository, author } = getPackageJson(
  'version',
  'name',
  'license',
  'repository',
  'author'
)

const banner = `
  ${name} v${version}
  ${repository.url}

  Copyright (c) ${author.replace(/ *\<[^)]*\> */g, ' ')}

  This source code is licensed under the ${license} license found in the
  LICENSE file in the root directory of this source tree.
`

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'get-set-json',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new PrettierPlugin(prettierConfig),
    new webpack.BannerPlugin(banner)
  ]
}
