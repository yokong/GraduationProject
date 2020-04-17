// 仪表路由文件
const express = require("express");
const router = express.Router({
  mergeParams: true,
});
const meter = require("../controllers/meter/meterController");
// 创建仪表
router.post("/", meter.meterCreate);
// 查询仪表数据
router.get("/", meter.meterListGet);
// 仪表详情数据
router.get("/:id", meter.meterDetail);
// 仪表更新
router.put("/:id", meter.meterUpdate);
// 仪表删除
router.delete("/:id", meter.meterDelete);

module.exports = router;
