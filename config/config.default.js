'use strict';
const path = require('path');
module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1540876101743_1471';

  // add your config here
  config.middleware = ['timeout', 'graphql'];



  //代理配置，所有微服务代理配置全部放置在此处
  config.httpProxy = {
    '/socket': {
      target: 'http://192.168.60.143:6003',
      changeOrigin: true,
      // pathRewrite: {'^/api' : ''}
    },
    '/api': {
      // target: 'http://172.20.0.104:9023',
      target: 'http://47.99.126.185:8112',


      changeOrigin: true,
      // pathRewrite: {'^/api' : ''}
    }
  };
  // 跨域白名单设置，指定固定域名可以进行跨域访问
  config.security = {
    domainWhiteList: ['http://192.168.50.211:9527'],
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
    // url    : 'mongodb://127.0.0.1:27017/strapi',
    url: 'mongodb://192.168.60.143:50000/strapi',
    options: {},
  };

  // redis配置
  config.redis = {
    client: {
      port: 6379,             // Redis port
      host: '172.20.0.126',   // Redis host
      password: null,
      db: 0,
    },
  };

  // socket配置
  config.io = {
    init: {
      transports: ['websocket', 'xhr-polling', 'jsonp-polling', 'htmlfile', 'flashsocket'],
      origins: '*:*',
    }, // passed to engine.io
    namespace: {
      '/': {
        connectionMiddleware: [],
        packetMiddleware: [],
      },
    },
  };

  // 邮箱配置
  config.email = {
    username: '1141533358@qq.com',
    password: 'vqctsdkjsmrbjegi',
    host: 'smtp.qq.com',
    sender: '1141533358@qq.com',
    // ssl:true
  }

  config.graphql = {
    router: '/graphql',
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  return config;
};