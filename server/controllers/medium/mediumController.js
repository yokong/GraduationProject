/**
 * 介质路由控制文件
 */

//  导入mongoose模块
const mongoose = require("mongoose");
// 导入介质模型文件
const Medium = require("../../models/Medium");

// 创建介质方法
const mediumCreate = async (req, res) => {
  const model = await Medium.create(req.body);
  res.send(model);
};

// 获取介质列表数据方法
const mediumListGet = async (req, res) => {
  const items = await Medium.aggregate([
    {
      $lookup: {
        from: "accounts",
        localField: "supervisor",
        foreignField: "_id",
        as: "supervisor_info",
      },
    },
    {
      $lookup: {
        from: "media",
        localField: "medium",
        foreignField: "_id",
        as: "medium_info",
      },
    },
    {
      $lookup: {
        from: "meters",
        localField: "meter",
        foreignField: "_id",
        as: "meter_info",
      },
    },
    {
      $lookup: {
        from: "accounts",
        localField: "submitter",
        foreignField: "_id",
        as: "submitter_info",
      },
    },
    {
      $lookup: {
        from: "containers",
        localField: "container",
        foreignField: "_id",
        as: "container_info",
      },
    },
  ]);
  res.send(items);
};

// 介质 详情/编辑 页面方法
const mediumDetail = async (req, res) => {
  const model = await Medium.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(req.params.id),
      },
    },
    {
      $lookup: {
        from: "accounts",
        localField: "supervisor",
        foreignField: "_id",
        as: "supervisor_info",
      },
    },
    {
      $lookup: {
        from: "meters",
        localField: "meter",
        foreignField: "_id",
        as: "meter_info",
      },
    },
    {
      $lookup: {
        from: "accounts",
        localField: "submitter",
        foreignField: "_id",
        as: "submitter_info",
      },
    },
    {
      $lookup: {
        from: "accounts",
        localField: "submitter",
        foreignField: "_id",
        as: "submitter_info",
      },
    },
    {
      $lookup: {
        from: "containers",
        localField: "container",
        foreignField: "_id",
        as: "container_info",
      },
    },
    {
      $lookup: {
        from: "media",
        localField: "medium",
        foreignField: "_id",
        as: "medium_info",
      },
    },
  ]);
  res.send(model);
};

// 介质修改方法
const mediumUpdate = async (req, res) => {
  // 根据id进行查询并更新
  const model = await Medium.findByIdAndUpdate(req.params.id, req.body);
  res.send(model);
};

// 介质删除方法
const mediumDelete = async (req, res) => {
  // 根据id进行查询并删除
  const model = await Medium.findByIdAndDelete(req.params.id, req.body);
  res.send(model);
};

// 介质批量删除方法
const mediumBatchDelete = async (req, res) => {
  // console.log(req.params);
  const { idList } = req.params;
  const idListArr = idList.split(",");
  const model = await Medium.deleteMany({ _id: { $in: idListArr } });
  res.send(model);
};

module.exports = {
  mediumCreate,
  mediumListGet,
  mediumDetail,
  mediumUpdate,
  mediumDelete,
  mediumBatchDelete,
};
