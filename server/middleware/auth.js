// jwt-校验中间件
module.exports = (options) => {
  // 引入判断校验模块
  const assert = require("http-assert");
  // 引入jwt模块
  const jwt = require("jsonwebtoken");
  // 引入账户模型-登录信息校验
  const Account = require("../models/Account");

  return async (req, res, next) => {
    // 对request header中的authorization字段进行字符串转换并防止头部为undefined(没有该字段)出现错误,进行字符串分割 忽略barea字段 取出实际的token
    const token = String(req.headers.authorization || "")
      .split(" ")
      .pop();
    // 对token进行判断 如果token为false 证明未传递token则 返回401(未授权)
    assert(token, 401, "请提供token");
    const { id } = jwt.verify(token, req.app.get("secret"));
    // 如果id错误证明token无效
    assert(id, 401, "无效的token");
    // 根据解析token后获得的id 来进行数据库查询操作并 挂载到req.user上
    req.user = await Account.findById(id);
    // 如果未查询到这说明 还没有登录
    assert(req.user, 401, "请先登录");
    await next();
  };
};
