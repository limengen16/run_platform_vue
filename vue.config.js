module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  devServer: {
    disableHostCheck: true,
    allowedHosts: [
      //匹配单个域名
      '188.131.237.111'
    ],
    proxy:{
      '/run': {
        target: 'http://188.131.237.111:7001',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/run': ''
        }
      },
    }
  }
}