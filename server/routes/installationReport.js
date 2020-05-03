// 安装报告单路由文件
const express = require("express");
const router = express.Router({
  mergeParams: true,
});
const installationReport = require("../controllers/installationReport/installationReportController");
// 创建报告单
router.post("/", installationReport.installationReportCreate);
// 查询报告单数据
router.get("/", installationReport.installationReportListGet);
// 报告单详情数据
router.get("/:id", installationReport.installationReportDetail);
// 报告单更新
router.put("/:id", installationReport.installationReportUpdate);
// 报告单删除
router.delete("/:id", installationReport.installationReportDelete);
// 批量删除
router.get(
  "/delete-many/:idList",
  installationReport.installationReportBatchDelete
);
module.exports = router;
