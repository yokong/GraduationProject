/*
 * @Author: 赵昱青
 * @Date: 2020-03-08 17:46:21
 * @LastEditTime: 2020-03-08 18:32:42
 * @LastEditors: 赵昱青
 * @Description:账号管理模型
 */
const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  // 权限
  authority: { type: Number, required: true },
  // 账号
  account: { type: String, required: true },
  // 密码
  password: { type: String, required: true },
  // 姓名
  name: { type: String, required: true },
  // 电话
  phoneNumber: { type: Number, required: true },
  // 邮箱
  email: { type: String, required: true },
  // 头像
  avatar: { type: String, required: true }
});

module.exports = mongoose.model("Account", schema);
