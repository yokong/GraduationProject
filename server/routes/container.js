// 容器路由文件
const express = require("express");
const router = express.Router({
  mergeParams: true,
});
const container = require("../controllers/container/containerController");
// 创建容器
router.post("/", container.containerCreate);
// 查询容器数据
router.get("/", container.containerListGet);
// 容器详情数据
router.get("/:id", container.containerDetail);
// 容器更新
router.put("/:id", container.containerUpdate);
// 容器删除
router.delete("/:id", container.containerDelete);
// 容器批量删除
router.get("/delete-many/:idList", container.containerBatchDelete);

module.exports = router;
