const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String },
  // 称号
  title: { type: String },
  // 分类不只有一个所以换成复数形式
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],

  // 评级
  scores: {
    // 难度
    difficult: { type: Number },
    // 技能概况
    skills: { type: Number },
    // 攻击
    attack: { type: Number },
    // 生存
    survive: { type: Number }
  },

  // 技能具体
  skills: [
    {
      // 图标
      icon: { type: String },
      // 技能名称
      name: { type: String },
      // 技能介绍
      description: { type: String },
      // 技能小提示
      tips: { type: String }
    }
  ],

  // 顺风装备
  items1: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Item"
    }
  ],

  // 逆风装备
  items2: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Item"
    }
  ],

  // 使用技巧
  usageTips: { type: String },

  // 对战技巧
  battleTips: { type: String },

  // 团战技巧
  teamTips: { type: String },

  // 搭档
  partners: [
    {
      // 搭档的英雄
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
      // 搭档关系描述
      description: { type: String }
    }
  ]
});
module.exports = mongoose.model("Hero", schema);
