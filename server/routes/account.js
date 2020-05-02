// 用户账号路由文件
const express = require("express");
const router = express.Router({
  mergeParams: true,
});
const account = require("../controllers/account/accountController");
// 导入权限校验中间件
const authMiddleware = require("../middleware/auth");
// 创建账号
router.post("/", account.accountCreate);
// 查询账号数据
router.get("/", account.accountListGet);
// 账号详情数据
router.get("/:id", account.accountDetail);
// 账号更新
router.put("/:id", account.accountUpdate);
// 账号删除
router.get("/delete-many/:idList", account.accountBatchDelete);
module.exports = router;
