'use strict';

// had enabled by egg
// exports.static = true;
// 开启代理
exports.httpProxy = {
    enable: true,
    package: 'egg-http-proxy',
};
// 开启跨域
exports.cors = {
    enable: true,
    package: 'egg-cors',
};
//mongodb模型校验
exports.mongoose = {
    enable: true,
    package: 'egg-mongoose',
};
// redis配置
exports.redis = {
    enable: true,
    package: 'egg-redis',
};
// socket配置
exports.io = {
    enable: true,
    package: 'egg-socket.io',
  };
// 邮箱配置
  exports.email = {
    enable: true,
    package: 'egg-mail',
  };

  exports.graphql = {
    enable: true,
    package: 'egg-graphql',
  }; 