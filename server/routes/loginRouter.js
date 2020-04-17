// 用户账号路由文件
const express = require("express");
const router = express.Router({
  mergeParams: true,
});
// 引入判断校验模块
const assert = require("http-assert");
// 引入jwt模块
const jwt = require("jsonwebtoken");
// 引入账户模型-登录信息校验
const Account = require("../models/Account");
const loginMethod = require("../controllers/login/loginControllers");
router.post("/", loginMethod.login);

module.exports = router;
