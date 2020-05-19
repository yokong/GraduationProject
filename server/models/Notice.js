const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  // 公告标题
  title: { type: String },
  // 公告内容
  content: { type: String },
  // 发布日期
  date: { type: String },
});
module.exports = mongoose.model("Notice", schema);
