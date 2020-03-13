/*
 * @Author: your name
 * @Date: 2020-03-08 11:40:26
 * @LastEditTime: 2020-03-09 22:48:27
 * @LastEditors: 赵昱青
 * @Description: 仪表模型
 * @FilePath: \King\server\models\Instrument.js
 */
const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  // 仪表名称
  meterName: { type: String },
  // 仪表编号
  meterNumber: { type: String },
  //   位号
  tagNumber: { type: String },
  // 容器形状尺寸
  shape: { type: String },
  // 容器材质
  material: { type: String },
  // 保温层
  thermalInsulation: { type: Boolean }
});

module.exports = mongoose.model("Meter", schema);
