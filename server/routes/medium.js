// 介质路由文件
const express = require("express");
const router = express.Router({
  mergeParams: true,
});
const medium = require("../controllers/medium/mediumController");
// 创建介质
router.post("/", medium.mediumCreate);
// 查询介质数据
router.get("/", medium.mediumListGet);
// 介质详情数据
router.get("/:id", medium.mediumDetail);
// 介质更新
router.put("/:id", medium.mediumUpdate);
// 介质删除
router.delete("/:id", medium.mediumDelete);
// 介质批量删除
router.get("/delete-many/:idList", medium.mediumBatchDelete);
module.exports = router;
