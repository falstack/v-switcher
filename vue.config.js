const webpack = require('webpack')
const npmCfg = require('./package.json')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const banner = [
  npmCfg.name + ' v' + npmCfg.version,
  '(c) ' + new Date().getFullYear() + ' ' + npmCfg.author,
  npmCfg.homepage
].join('\n')

module.exports = {
  productionSourceMap: false,
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.BannerPlugin(banner),
      new CopyWebpackPlugin([
        { from: './src/v-switcher.vue' },
        { from: './src/swipe.js' },
        { from: './src/affix.js' },
        { from: './src/utils.js' }
      ])
    ]
  },
  css: {
    extract: true
  }
}
