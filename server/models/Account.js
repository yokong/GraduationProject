const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  // 权限
  authority: { type: Number, required: [true, "请选择权限"] },
  // 账号
  account: {
    type: String,
    required: true,
    unique: [true, "该账号已存在请重新输入"],
  },
  // 密码
  password: {
    type: String,
    // 别把它查出来查出来再保存 又会进行一次散列
    select: false,
    // 使用bcryptjs来做密码的散列加密
    set(val) {
      return require("bcryptjs").hashSync(val, 12);
    },
  },
  // 姓名
  name: { type: String, required: [true, "请填入姓名"] },
  // 电话
  phoneNumber: { type: Number, required: [true, "请填入电话"] },
  // 邮箱
  email: { type: String, required: [true, "请填入邮箱"] },
  // 头像
  avatar: { type: String, required: [true, "请填入头像"] },
});

module.exports = mongoose.model("Account", schema);
