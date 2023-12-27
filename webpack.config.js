const path = require('path');

module.exports = {
  entry: './'
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    port: 8888, // 指定端口号
  },
};
