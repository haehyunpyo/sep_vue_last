const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: 'C:/eGovFrameDev-4.1.0-64bit/workspace/sep19/src/main/resources/static',
  devServer: {
    proxy: {
      '/': {
      target: 'http://localhost:80',
      changeOrigin: true, // cors
      ws: false,  // 웹소켓 기능 끔
      }
    }
  }
})