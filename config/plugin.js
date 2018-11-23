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