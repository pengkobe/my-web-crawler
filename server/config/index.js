"use strict";
const path = require('path'),
  serverRoot = path.dirname(__dirname),
  root = path.resolve(serverRoot,'../'),
  staticDir = path.join(root, 'public'),
  dev = require('./dev.js'),
  fs = require('fs'),
  _ = require('lodash');
// 默认生产环境
let config = {
  app: {
    name:'crawler',
    port: 3000,
  },
  debug:false,
  env:'production',
  mongoConfig: { // 数据库配置
    url: 'mongodb://localhost:27017/crawler',
    opts:{
      user:'',
      pass:''
    }
  },
  'jwt': {
    'cert': 'crawler'
  },
  dir: { // 目录配置
    root,
    log: path.join(__dirname,'..', 'logs'),
    server:serverRoot,
    static: staticDir,
    resource: path.join(serverRoot, 'resource'),
    upload: path.join(serverRoot,'resource', 'upload')
  },
};
// 本地调试环境
if(process.env.NODE_ENV === 'development'){
  config = _.merge(config,dev);
}
// 私有配置
if(process.env.NODE_ENV === 'production'){
  if(fs.existsSync(__dirname+'/pub.js')){
    config = _.merge(config,require('./pub.js'));
  }
}

module.exports = config;
