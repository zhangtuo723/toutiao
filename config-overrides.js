const path = require('path')

const { override, addWebpackAlias,addPostcssPlugins } = require('customize-cra')
// const px2viewport = require('postcss-px-to-viewport')
const postcss = require("./postcss.config.js");
// const babelPlugins = fixBabelImports('import', {
//   libraryName: 'antd-mobile',
//   style: 'css',
// })
const postcssPlugin = Object.keys(postcss).map(key => require(key)(postcss[key]));
const webpackAlias = addWebpackAlias({
  '@': path.resolve(__dirname, 'src'),
  '@scss': path.resolve(__dirname, 'src', 'assets', 'styles'),
})

// 配置 PostCSS 样式转换插件
const postcssPlugins = addPostcssPlugins(postcssPlugin)

// 导出要进行覆盖的 webpack 配置
module.exports = override(postcssPlugins,webpackAlias)
