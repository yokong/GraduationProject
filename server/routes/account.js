// 用户账号路由文件
const express = require("express");
const router = express.Router({
  mergeParams: true,
});
const account = require("../controllers/account/accountController");
// 导入权限校验中间件
const authMiddleware = require("../middleware/auth");
// 创建仪表
router.post("/", account.accountCreate);
// 查询仪表数据
router.get("/", account.accountListGet);
// 仪表详情数据
router.get("/:id", account.accountDetail);
// 仪表更新
router.put("/:id", account.accountUpdate);
// 仪表删除
router.delete("/:id", account.accountDelete);

module.exports = router;
