"use strict";
/**
 * Blogger
 */
const mongoose = require("mongoose"), Schema = mongoose.Schema;
const BloggerSchema = new Schema(
  {
    // 名字
    name: {
      type: String,
      unique: true
    },
    // 博客地址
    url: {
      type: String,
      default: ""
    },
    // 任务js
    taskjs: {
      type: String,
      default: ""
    },
    // 创建时间
    createTime: {
      type: Date,
      default: new Date()
    },
    // 最近一次更新
    lastUpdateTime: {
      type: Date,
      default: new Date()
    }
  },
  { versionKey: false }
);

BloggerSchema.set("toJSON", { getters: true, virtuals: true });
BloggerSchema.set("toObject", { getters: true, virtuals: true });
BloggerSchema.path("createTime").get(function(v) {
  var date = null;
  if (v) {
    date = new Date(v);
    date.setHours(date.getHours() + 8);
    date.format("yyyy-MM-dd hh:mm:ss");
    return;
  } else {
    date = new Date();
    date.setHours(date.getHours() + 8);
    return new Date().format("yyyy-MM-dd hh:mm:ss");
  }
});
BloggerSchema.path("lastUpdateTime").get(function(v) {
  var date = null;
  if (v) {
    date = new Date(v);
    date.setHours(date.getHours() + 8);
    date.format("yyyy-MM-dd hh:mm:ss");
    return;
  } else {
    date = new Date();
    date.setHours(date.getHours() + 8);
    return new Date().format("yyyy-MM-dd hh:mm:ss");
  }
});
const blogger = mongoose.model("blogger", BloggerSchema);
module.exports = blogger;
