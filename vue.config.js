const path = require('path')
module.exports = {
  devServer: {
    // 设置代理
    proxy: {
      "/api": {
        // target: "http://127.0.0.1:7001/", // 访问数据的计算机域名
        target: "http://172.16.221.13:7001/",
        ws: true, // 是否启用websockets
        changOrigin: true //开启代理
      }
    }
  }
};
