'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // form表单图片展示和上传接口
  app.router.get('/form', app.controller.form.show);
  app.router.post('/form', app.controller.form.upload);

};
