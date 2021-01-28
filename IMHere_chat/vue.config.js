module.exports = {
  devServer: {
      port: 8080,
      host: "0.0.0.0",
      https: false,  // 协议
      open: true,  // false 启动服务时自动打开浏览器访问
  },
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  indexPath: "index.html"
}
