const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  //-------------- 客户开始---------------
  // 用户单位
  company: { type: String },
  // 客户编码
  code: { type: Number },
  // 用户详细地址
  address: { type: String },
  // 行车路线
  route: { type: String },
  // // // 用户名称
  // name: { type: String },
  // 联系人1
  contacts1: {
    // 联系人姓名
    name: { type: String },
    // 部门职务
    department: { type: String },
    // 手机号
    phoneNumber: { type: Number },
    // 邮箱
    email: { type: String },
    // qq号
    qq: { type: Number }
  },
  // 联系人2
  contacts2: {
    // 联系人姓名
    name: { type: String },
    // 部门职务
    department: { type: String },
    // 手机号
    phoneNumber: { type: Number },
    // 邮箱
    email: { type: String },
    // qq号
    qq: { type: Number }
  },

  //----------------- 客户结束----------------

  //---------------工况开始-------------------
  // 关联一个文档 Meter
  // 仪表信息
  meter: {
    // type: mongoose.SchemaTypes.ObjectId,
    type: mongoose.SchemaTypes.ObjectId
  },
  // 其他液位计安装情况
  otherCondition: { type: String },
  // 二次仪表类型及数据存储
  meterType: { type: String },
  // 容器投用时间
  useTime: { type: String },

  // 介质信息
  medium: { type: mongoose.SchemaTypes.ObjectId },
  // 容器信息
  container: { type: mongoose.SchemaTypes.ObjectId },
  // 液体介质
  liquidMedium: { type: String },
  // 粘度
  viscosity: { type: String },
  // 密度
  density: { type: String },
  // 温度范围
  temperatureRange: { type: String },
  // 压力范围
  pressureRange: { type: String },
  // 液位变化范围
  liquidLevelRange: { type: String },
  // 用户参数
  userPreferences: { type: String },
  // ---------------工况结束-----------------

  //----------------- 技术信息开始------------------------
  // 最大电压
  maxVoltage: {
    // 电压数值
    voltage: { type: String },
    // 校准信号
    calibratingSignal: { type: String }
  },
  // 最小电压
  minVoltage: {
    // 电压数值
    voltage: { type: String },
    // 校准信号
    calibratingSignal: { type: String }
  },
  // 电流
  electricity: { type: String },
  // 实际自动复位液位值
  liquidLevel: { type: String },
  // 模拟输出回路电阻
  resistance: { type: String },
  // 内部参数
  intrinsicParameter: { type: String },
  // 安装示意图
  installationDiagram: { type: String },

  // -----------------------技术信息结束--------------------------
  //---------------------现场数据记录----------------------
  // 时间
  time: { type: String },
  // 对比液位
  contrastLiquidLevel: { type: String },
  // 仪表液位
  meterLiquidLevel: { type: String },
  // 仪表信号
  meterSignal: { type: String },
  // 信号波形文件名称
  signalFileName: { type: String },
  // 介质压力
  mediumPressure: { type: String },
  // 介质温度
  mediumTemperature: { type: String },
  // 状态
  status: {
    value: { type: Number },
    label: { type: String }
  },
  signalFigure: { type: String },
  //--------------------现场数据记录结束-------------------

  // -----------现场照片开始------------------
  // 仪表全景
  meterPanorama: { type: String },
  // 仪表近景
  meterClose: { type: String },
  // 管线全景
  pipelinePanorama: { type: String },
  // 探头全景
  probePanorama: { type: String },
  // -------------现场数据结束------------------------
  // -----------附加信息开始------------
  //主管选择
  supervisor: { type: mongoose.SchemaTypes.ObjectId },
  //安装情况说明信息
  otherContent: { type: String },
  // -----------附加信息结束-------

  // --------------特殊信息------------------
  // 报告单状态
  reportStatus: { type: String },
  //提交者
  submitter: { type: mongoose.SchemaTypes.ObjectId },
  // 退回理由
  returnReason: { type: String },
  // 报告单得分
  scoreReport: { type: Number }
});
module.exports = mongoose.model("Erectionreport", schema);
