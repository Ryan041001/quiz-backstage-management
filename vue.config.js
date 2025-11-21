const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: '/admin/',
  transpileDependencies: true,
  devServer: {
    port: 8081,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});
