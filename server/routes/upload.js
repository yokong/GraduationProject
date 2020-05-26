// 上传文件路由文件
const express = require("express");
const router = express.Router({
  mergeParams: true,
});
const multer = require("multer");
// 因文件会被引入到到app.js文件中 所以 此处文件上传路径需要相对app.js设置
const upload = multer({ dest: "./uploads" });
router.post("/", upload.single("file"), async (req, res) => {
  const file = req.file;
  console.log(file);
  file.url = `http://localhost:3000/uploads/${file.filename}`;
  res.send(file);
});
module.exports = router;
