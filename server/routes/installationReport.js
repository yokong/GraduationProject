// 安装报告单路由文件
const express = require("express");
const router = express.Router({
  mergeParams: true,
});
const installationReport = require("../controllers/installationReport/installationReportController");
// 创建仪表
router.post("/", installationReport.installationReportCreate);
// 查询仪表数据
router.get("/", installationReport.installationReportListGet);
// 仪表详情数据
router.get("/:id", installationReport.installationReportDetail);
// 仪表更新
router.put("/:id", installationReport.installationReportUpdate);
// 仪表删除
router.delete("/:id", installationReport.installationReportDelete);

module.exports = router;
