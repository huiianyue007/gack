// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 9527,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      // '/gack': {
      //   target: 'http://172.16.41.188:8081',
      //   changeOrigin: true,
      //   // secure: false,
      //   pathRewrite: {
      //     '^/gack': ''
      //   }
      // },
      // '/gak': {
      //   target: 'http://172.16.41.188:8080',
      //   changeOrigin: true,
      //   // secure: false,
      //   pathRewrite: {
      //     '^/gak': ''
      //   }
      // },
      // '/back': {
      //   target: 'http://172.16.41.188:8080',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/back': ''
      //   }
      // },
      // '/test': {
      //   target: 'http://172.16.32.64:8081',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/test': ''
      //   }
      // },
      // '/money': {
      //   target: 'https://tpay.gack.citic',  //http://123.56.48.63
      //   changeOrigin: true,
      //   secure: false,
      //   pathRewrite: {
      //     '^/money': ''
      //   }
      // },
      // '/activity': {
      //   target: 'http://172.16.32.66:8089',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/activity': ''
      //   }
      // },
      // '/wei': {
      //   target: 'http://172.16.32.107:8080',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/wei': ''
      //   }
      // },

      // '/gack': {
      //   target: 'https://api.gack.citic:8081',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/gack': ''
      //   }
      // },
      // '/back': {
      //   target: 'https://api.gack.citic:8082',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/back': ''
      //   }
      // },
      // '/test': {
      //   target: 'https://api.gack.citic:8082',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/test': ''
      //   }
      // },
      // '/activity': {
      //   target: 'https://api.gack.citic:8083',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/activity': ''
      //   }
      // }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
