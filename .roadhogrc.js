const pxtorem = require('postcss-pxtorem');
const path = require('path');
const svgSpriteDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''), // antd-mobile 内置svg
  path.resolve(__dirname, 'src/assets/img/'),  // 业务代码本地私有 svg 存放目录
];


export default {
  entry: 'src/index.js',
  env: {
    development: {
      svgSpriteLoaderDirs: svgSpriteDirs,
      extraBabelPlugins: [
        'dva-hmr',
        'transform-runtime',
        ['import', { 'libraryName': 'antd-mobile',  'style': true }]
      ],
      extraPostCSSPlugins: [
        pxtorem({
          rootValue: 100,
          propWhiteList: [],
        }),
      ],
      "proxy": {
         "/api": {
           "target": "http://116.62.68.144",
           "changeOrigin": true,
          //  "pathRewrite": { "^/api?" : "" }
         }
       }
    },
    production: {
      svgSpriteLoaderDirs: svgSpriteDirs,
      extraBabelPlugins: [
        'transform-runtime',
        ['import', { 'libraryName': 'antd-mobile',  'style': true }]
      ],
      extraPostCSSPlugins: [
        pxtorem({
          rootValue: 100,
          propWhiteList: [],
        }),
      ],
    }
  }
}
