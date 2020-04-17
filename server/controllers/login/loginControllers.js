/**
 * 登录路由控制文件
 */

// 引入判断校验模块
const assert = require("http-assert");
// 引入jwt模块
const jwt = require("jsonwebtoken");
// 引入账户模型-登录信息校验
const Account = require("../../models/Account");
const login = async (req, res) => {
  // 从请求实体中拿到account与password(form表单中的数据)
  const { account, password } = req.body;
  // 1.根据账号，查找用户
  const user = await Account.findOne({ account }).select("+password");
  // 若用户不存在则返回422状态码
  assert(user, 422, "用户不存在");
  // 2.校验密码(前提：用户名正确)
  // 数据库中的密码经过bcryptjs加密，所以此处需要对数据进行解密判断数据库中的数据和表单中的数据是否相同
  const isValid = require("bcryptjs").compareSync(password, user.password);
  // 若密码不匹配则返回422错误，提示密码不正确
  assert(isValid, 422, "密码错误");
  // 3.返回token(前提：用户名，密码正确)
  // jwt.sign生成token 接受两个参数 a. 数据 2. secret
  // token数据

  const token = jwt.sign({ id: user._id }, req.app.get("secret"));
  res.send({
    // 返回token
    token,
    // 返回其他数据用来做显示数据等其他校验 可以避免重复请求
    user,
    // authority: user.authority, // 用户权限信息
    // account: user.account,
  });
};

module.exports = {
  login,
};
