// 服务端入口文件
const express = require("express");
const app = express();
// 为jwt验证设置secret并挂载到app对象上 签发 token 用的密钥，在验证 token 的时候同样需要用到这个密钥
app.set("secret", "12bvckj435czxvnk23");
// 引入multer-文件上传模块
const multer = require("multer");
//导入数据库配置文件
require("./plugins/db")();
app.use(express.json());

// cors模块 解决跨域问题
app.use(require("cors")());
const authMiddleware = require("./middleware/auth");
// const authMiddleware = require("./middleware/auth");
// 托管静态资源目录-图片上传目录
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/admin", express.static(__dirname + "/admin"));
// 引入路由文件
const meterRouter = require("./routes/meter");
const mediumRouter = require("./routes/medium");
const accountRouter = require("./routes/account");
const installationReportRouter = require("./routes/installationReport");
const containerRouter = require("./routes/container");
const uploadRouter = require("./routes/upload");
const loginRouter = require("./routes/loginRouter");
const dataShowRouter = require("./routes/dataShow");
const noticesRouter = require("./routes/notice");
// 挂载路由
app.use("/admin/api/rest/meters", authMiddleware(), meterRouter);
app.use("/admin/api/rest/mediums", authMiddleware(), mediumRouter);
app.use("/admin/api/rest/accounts", authMiddleware(), accountRouter);
app.use(
  "/admin/api/rest/installationReports",
  authMiddleware(),
  installationReportRouter
);
app.use("/admin/api/rest/containers", authMiddleware(), containerRouter);
app.use("/admin/api/rest/notices", noticesRouter);
app.use("/admin/api/upload", uploadRouter);
app.use("/admin/api/login", loginRouter);
app.use("/admin/api/rest/datashow", dataShowRouter);

app.use(function (req, res, next) {
  next(createError(404));
});
// // 错误处理 error handler

// 错误处理函数
// app.use(async (err, req, res, next) => {
//   console.log(err.statusCode, 22222222222222222222);

// });

app.listen(3000, () => {
  console.log("服务器已经运行");
});
// 全局错误捕获
app.use(function async(err, req, res, next) {
  res.status(err.statusCode || 500).send({
    message: err.message,
  });
  // res.status(err.status || 500);
});
