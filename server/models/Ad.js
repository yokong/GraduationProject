const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: { type: String },
  items: [
    {
      // 图片
      image: { type: String },
      // url-点击会跳转
      url: { type: String }
    }
  ]
});
module.exports = mongoose.model("Ad", schema);
