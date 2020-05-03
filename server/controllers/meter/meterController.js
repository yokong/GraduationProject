/**
 * 仪表路由控制文件
 */
//  导入mongoose模块
const mongoose = require("mongoose");
// 导入仪表模型文件
const Meter = require("../../models/Meter");
// 创建仪表方法
const meterCreate = async (req, res) => {
  const model = await Meter.create(req.body);
  res.send(model);
};
// 获取仪表列表数据方法
const meterListGet = async (req, res) => {
  const items = await Meter.find({});
  res.send(items);
};

// 仪表 详情/编辑 页面方法
const meterDetail = async (req, res) => {
  const model = await Meter.findById(req.params.id);
  // const model = await Meter.aggregate([
  //   {
  //     $match: {
  //       _id: mongoose.Types.ObjectId(req.params.id),
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "accounts",
  //       localField: "supervisor",
  //       foreignField: "_id",
  //       as: "supervisor_info",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "meters",
  //       localField: "meter",
  //       foreignField: "_id",
  //       as: "meter_info",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "accounts",
  //       localField: "submitter",
  //       foreignField: "_id",
  //       as: "submitter_info",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "accounts",
  //       localField: "submitter",
  //       foreignField: "_id",
  //       as: "submitter_info",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "containers",
  //       localField: "container",
  //       foreignField: "_id",
  //       as: "container_info",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "media",
  //       localField: "medium",
  //       foreignField: "_id",
  //       as: "medium_info",
  //     },
  //   },
  // ]);
  res.send(model);
};

// 仪表修改方法
const meterUpdate = async (req, res) => {
  // 根据id进行查询并更新
  const model = await Meter.findByIdAndUpdate(req.params.id, req.body);
  res.send(model);
};

// 仪表删除方法
const meterDelete = async (req, res) => {
  // 根据id进行查询并删除
  const model = await Meter.findByIdAndDelete(req.params.id, req.body);
  res.send(model);
};

// 仪表批量删除方法
const meterBatchDelete = async (req, res) => {
  const { idList } = req.params;
  const idListArr = idList.split(",");
  const model = await Meter.deleteMany({ _id: { $in: idListArr } });
  res.send(model);
};
module.exports = {
  meterCreate,
  meterListGet,
  meterDetail,
  meterUpdate,
  meterDelete,
  meterBatchDelete,
};
