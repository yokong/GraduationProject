// 数据展示路由
const express = require("express");
const router = express.Router({
  mergeParams: true,
});
const dataShow = require("../controllers/dataShow/dataShowControllers");

// 获取用户信息-用作展示
router.get("/accounts", dataShow.searchAccount);
// 获取报告单信息-用作展示
// router.get("/report", account.accountListGet);
// // 获取详情数据-用作展示
router.get("/meters", dataShow.searchMeter);
// // 获取详情数据-用作展示
router.get("/mediums", dataShow.searchMedium);
// // 获取详情数据-用作展示
router.get("/containers", dataShow.searchContainer);

module.exports = router;
