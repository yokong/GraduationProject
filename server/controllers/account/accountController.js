/**
 * 账户路由控制文件
 */

//  导入mongoose模块
const mongoose = require("mongoose");
// 导入账户模型文件
const Account = require("../../models/Account");

// 创建账户方法
const accountCreate = async (req, res) => {
  const model = await Account.create(req.body);
  res.send(model);
};

// 获取账户列表数据方法
const accountListGet = async (req, res) => {
  const items = await Account.aggregate([
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

// 账户 详情/编辑 页面方法
const accountDetail = async (req, res) => {
  const model = await Account.aggregate([
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

// 账户修改方法
const accountUpdate = async (req, res) => {
  // 根据id进行查询并更新
  const model = await Account.findByIdAndUpdate(req.params.id, req.body);
  res.send(model);
};

// 账户删除方法
const accountDelete = async (req, res) => {
  // 根据id进行查询并删除
  const model = await Account.findByIdAndDelete(req.params.id, req.body);
  res.send(model);
};

module.exports = {
  accountCreate,
  accountListGet,
  accountDetail,
  accountUpdate,
  accountDelete,
};
