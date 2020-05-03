/**
 * 安装包报告路由控制文件
 */

//  导入mongoose模块
const mongoose = require("mongoose");
// 导入报告单模型
const InstallationReport = require("../../models/InstallationReport");
const Account = require("../../models/Account");
const Media = require("../../models/Medium");
const Container = require("../../models/Container");
const Meter = require("../../models/Meter");

// 创建报告单方法
const installationReportCreate = async (req, res) => {
  const model = await InstallationReport.create(req.body);
  res.send(model);
};

// 获取报告单列表数据方法
const installationReportListGet = async (req, res) => {
  const items = await InstallationReport.aggregate([
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

// 报告单 详情/编辑 页面方法
const installationReportDetail = async (req, res) => {
  const model = await InstallationReport.aggregate([
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

// 报告单修改方法
const installationReportUpdate = async (req, res) => {
  // 根据id进行查询并更新
  const model = await InstallationReport.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.send(model);
};

// 报告单删除方法
const installationReportDelete = async (req, res) => {
  // 根据id进行查询并删除
  const model = await InstallationReport.findByIdAndDelete(
    req.params.id,
    req.body
  );
  res.send(model);
};
// 报告单批量删除方法
const installationReportBatchDelete = async (req, res) => {
  const { idList } = req.params;
  const idListArr = idList.split(",");
  const model = await InstallationReport.deleteMany({
    _id: { $in: idListArr },
  });
  res.send(model);
};
module.exports = {
  installationReportCreate,
  installationReportListGet,
  installationReportDetail,
  installationReportUpdate,
  installationReportDelete,
  installationReportBatchDelete,
};
