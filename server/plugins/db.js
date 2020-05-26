// 数据库配置文件
module.exports = () => {
  const mongoose = require("mongoose");
  mongoose
    .connect("mongodb://localhost:27017/king", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      // useFindAndModify: false,
    })
    .then(() => console.log("数据库连接成功"))
    .catch((err) => {
      console.log("数据库连接失败", err);
    });
};
