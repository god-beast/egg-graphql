'use strict';
const path = require('path');
module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1540876101743_1471';

  // add your config here
  config.middleware = [];

  //代理配置，所有微服务代理配置全部放置在此处
  config.httpProxy = {
    '/socket': {
      target: 'http://192.168.60.143:6003',
      changeOrigin: true,
      // pathRewrite: {'^/api' : ''}
    },
    '/api': {
      target: 'http://172.20.0.251:9023',
      changeOrigin: true,
      // pathRewrite: {'^/api' : ''}
    }
  };
  // 跨域白名单设置，指定固定域名可以进行跨域访问
  config.security = {
    // domainWhiteList: [ 'http://192.168.50.21
    csrf: {
        enable: false,
    }
  };

  config.cors = {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  config.static = {
    prefix: '/',
    dir: path.join(appInfo.baseDir, 'app/public')  
  };

  config.mongoose = {
      url: 'mongodb://127.0.0.1:27017/strapi',
      options: {},
  };


  return config;
};
