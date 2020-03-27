// 数据库文件

module.exports = app => {
  const mongoose = require("mongoose");
  mongoose
    .connect("mongodb://localhost:27017/king", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    .then(() => console.log("数据库连接成功"));
};
