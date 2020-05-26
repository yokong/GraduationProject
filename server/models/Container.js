//容器模型
const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  // 容器材质编号
  materialNumber: { type: String },
  // 容器材质
  material: { type: String },
  // 材料厚度
  thickness: { type: String },
  // 是否锈蚀
  isRust: { type: Boolean },
  // 容器直径
  diameter: { type: String },
  // 容器高度
  height: { type: String },
  // 保温层
  thermalInsulation: { type: Boolean },
  // 备注
  note: { type: String },
});
module.exports = mongoose.model("Container", schema);
