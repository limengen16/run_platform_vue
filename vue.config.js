module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  devServer: {
    proxy:{
      '/run': {
        // target: 'http://188.131.237.111:7001',
        target: 'http://127.0.0.1:7001',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/run': ''
        }
      }
    }
  }
}