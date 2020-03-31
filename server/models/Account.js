const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  // 权限
  authority: { type: Number, required: true },
  // 账号
  account: { type: String, required: true },
  // 密码
  password: {
    type: String,
    required: true,
    // 别把它查出来查出来再保存 又会进行一次散列
    select: false,
    // 使用bcryptjs来做密码的散列
    set(val) {
      return require("bcryptjs").hashSync(val, 12);
    }
  },
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
