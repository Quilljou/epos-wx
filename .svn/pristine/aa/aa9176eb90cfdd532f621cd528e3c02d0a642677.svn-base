const pxtorem = require('postcss-pxtorem');

export default {
  entry: 'src/index.js',
  env: {
    development: {
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
           "target": "http://112.74.34.58:80",
           "changeOrigin": true,
           "pathRewrite": { "^/api?" : "" }
         }
       }
    },
    production: {
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
