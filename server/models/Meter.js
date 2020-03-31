const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  // 仪表名称
  meterName: { type: String },
  // 仪表编号
  meterNumber: { type: String },
  //   位号
  tagNumber: { type: String },
  // // 容器形状尺寸
  // shape: { type: String },
  // // 容器材质
  // material: { type: String },
  // // 保温层
  // thermalInsulation: { type: Boolean },
  // 备注
  note: { type: String }
});

module.exports = mongoose.model("Meter", schema);
