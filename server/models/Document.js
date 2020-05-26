// 原始文档模型
const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  // 文档名称
  name: { type: String },
  // 提交人
  submitter: { type: String },
});
