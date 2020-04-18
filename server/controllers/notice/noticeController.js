// 公告路由控制文件
// 导入mongoose模块
const mongoose = require("mongoose");
const Notice = require("../../models/Notice");

// 创建
const noticeCreate = async (req, res) => {
  const model = await Notice.create(req.body);
  res.send(model);
};
// 获取notice列表数据
const noticeListGet = async (req, res) => {
  const model = await Notice.find({});
  res.send(model);
};
// 获取notice详情
const noticeDetail = async (req, res) => {
  const model = await Notice.findById(req.params.id);
  res.send(model);
};
// 修改方法
const noticeUpdate = async (req, res) => {
  const model = await Notice.findByIdAndUpdate(req.params.id, req.body);
  res.send(model);
};
// 公告删除方法
const noticeDelete = async (req, res) => {
  const model = await Notice.findByIdAndDelete(req.params.id, req.body);
  res.send(model);
};
module.exports = {
  noticeCreate,
  noticeDelete,
  noticeDetail,
  noticeListGet,
  noticeUpdate,
};
