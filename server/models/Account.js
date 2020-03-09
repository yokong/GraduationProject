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
  authority: { type: Number },
  // 账号
  account: { type: String },
  // 密码
  password: { type: String },
  // 姓名
  name: { type: String },
  // 电话
  phoneNumber: { type: Number },
  // 邮箱
  email: { type: String },
  // 头像
  avatar: { type: String }
});

module.exports = mongoose.model("Account", schema);
