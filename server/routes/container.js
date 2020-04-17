// 容器路由文件
const express = require("express");
const router = express.Router({
  mergeParams: true,
});
const container = require("../controllers/container/containerController");
// 创建仪表
router.post("/", container.containerCreate);
// 查询仪表数据
router.get("/", container.containerListGet);
// 仪表详情数据
router.get("/:id", container.containerDetail);
// 仪表更新
router.put("/:id", container.containerUpdate);
// 仪表删除
router.delete("/:id", container.containerDelete);

module.exports = router;
