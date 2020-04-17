/**
 * 容器路由控制文件
 */

//  导入mongoose模块
const mongoose = require("mongoose");
// 导入容器模型文件
const Container = require("../../models/Container");

// 创建容器方法
const containerCreate = async (req, res) => {
  const model = await Container.create(req.body);
  res.send(model);
};

// 获取容器列表数据方法
const containerListGet = async (req, res) => {
  const items = await Container.aggregate([
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

// 容器 详情/编辑 页面方法
const containerDetail = async (req, res) => {
  const model = await Container.aggregate([
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

// 容器修改方法
const containerUpdate = async (req, res) => {
  // 根据id进行查询并更新
  const model = await Container.findByIdAndUpdate(req.params.id, req.body);
  res.send(model);
};

// 容器删除方法
const containerDelete = async (req, res) => {
  // 根据id进行查询并删除
  const model = await Container.findByIdAndDelete(req.params.id, req.body);
  res.send(model);
};

module.exports = {
  containerCreate,
  containerListGet,
  containerDetail,
  containerUpdate,
  containerDelete,
};
