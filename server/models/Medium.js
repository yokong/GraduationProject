const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  // 介质名称
  mediumName: { type: String },
  // 介质编号
  mediumNumber: { type: String },
  // 备注
  note: { type: String }
});
module.exports = mongoose.model("Medium", schema);
