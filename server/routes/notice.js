// 公告路由文件
const express = require("express");
const router = express.Router({
  mergeParams: true,
});

const notice = require("../controllers/notice/noticeController");
// 创建公告
router.post("/", notice.noticeCreate);
// 查询公告数据
router.get("/", notice.noticeListGet);
// 公告详情数据
router.get("/:id", notice.noticeDetail);
// 公告更新
router.put("/:id", notice.noticeUpdate);
// 公告删除
router.delete("/:id", notice.noticeDelete);

module.exports = router;
